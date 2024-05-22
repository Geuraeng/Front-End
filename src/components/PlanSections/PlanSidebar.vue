<template>
  <div class="sidebar">
    <div class="sidebar-menu">
      <div class="number-buttons">
        <button
          v-for="n in count"
          :key="n"
          class="btn btn-white"
          @click="scrollToDay(n)"
        >
          {{ n }}
        </button>
        <button v-if="count < 10" @click="addButton" class="btn btn-secondary">
          +
        </button>
      </div>
      <div
        class="card mb-3 text-dark"
        :draggable="true"
        @dragstart="dragStart(index)"
        @dragover="dragOver(index)"
        @drop="drop"
        style="cursor: pointer"
      >
        <div class="card-content">
          <div class="text-content">
            <h4 class="card-title text-center">1일차</h4>
          </div>
        </div>
      </div>
      <div
        v-for="(schedule, index) in schedules"
        :key="schedule.scheduleIdx"
        class="card mb-3 text-dark"
        :draggable="true"
        @dragstart="dragStart(index)"
        @dragover="dragOver(index)"
        @drop="drop"
        style="cursor: pointer"
      >
        <div class="card-content">
          <div class="text-content">
            <h5 class="card-title" v-if="schedule.scheduleLat !== 0">
              {{ schedule.scheduleLocation }}
            </h5>
            <h4 class="card-title text-center" v-else>
              {{ schedule.scheduleLocation }}
            </h4>
            <p class="card-text" v-if="schedule.scheduleLat !== 0">
              메모 : {{ schedule.scheduleMemo }}
            </p>
          </div>
        </div>
        <div
          v-if="schedule.scheduleLat !== 0"
          style="display: flex; justify-content: space-between"
        >
          <button
            class="btn btn-secondary"
            style="margin-left: 5px"
            @click="showScheduleModal(schedule)"
          >
            수정
          </button>
          <img
            src="@/assets/img/kakaomap.png"
            alt="Kakao Map Icon"
            style="
              width: 100px;
              height: 35px;
              margin-right: 5px;
              margin-top: 3px;
            "
            @click="findRoute(index)"
          />
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <button
        class="btn btn-light"
        style="margin-right: 10px"
        @click="updatePlan"
      >
        계획완료
      </button>
      <button class="btn btn-secondary" @click="deleteCurrentPlan">삭제</button>
    </div>
    <!-- 모달 -->
    <div v-if="showModal" class="modal is-active">
      <div class="modal-background opacity-0" style="z-index: -1"></div>
      <div class="modal-card text-dark" style="border: 3px solid navy">
        <header class="modal-card-head d-flex justify-content-center">
          <p class="modal-card-title">스케줄 상세 정보</p>
          <button class="delete" aria-label="close" @click="closeModal">
            X
          </button>
        </header>
        <section class="modal-card-body">
          <!-- 수정 가능한 입력 필드 -->
          장소 :
          <input
            type="text"
            :value="selectedSchedule.scheduleLocation"
            class="form-control mb-3"
            placeholder="장소"
            readonly
          />
          메모 :
          <textarea
            v-model="selectedSchedule.scheduleMemo"
            class="form-control mb-3"
            placeholder="메모"
          ></textarea>
          <button class="btn btn-dark" @click="updateSchedule">수정</button>
          <button class="btn btn-secondary" @click="deleteScheduleConfirmation">
            삭제
          </button>
        </section>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="showModal"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  detailPlan,
  modifySchedule,
  deleteSchedule,
  updateSchedulPlan,
  deletePlan,
} from "@/api/plan.js";

// 소켓
import Stomp from "webstomp-client";
import SockJS from "sockjs-client/dist/sockjs";

const recvList = reactive([]);
const stompClient = ref(null);
const stompSubscription = ref(null);
let isReceiving = false;

const props = defineProps(["schedule"]);
console.log("init props", props.schedule);
watch(
  () => props.schedule,
  (nv) => {
    if (nv && nv.scheduleIdx) {
      console.log("side bar receive data", nv);
      schedules.value.push(nv);
      console.log("schedules", schedules.value);
      send(schedules.value); // Assuming send is a method to notify changes to the server or other components
    }
  }
);

// connect 함수
const connect = () => {
  const serverURL = "http://localhost:8089/app/ws";
  let socket = new SockJS(serverURL);
  stompClient.value = Stomp.over(socket);

  console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
  stompClient.value.connect(
    {},
    (frame) => {
      console.log("소켓 연결 성공", frame);
      // 이전 구독 취소
      if (stompSubscription.value) {
        stompSubscription.value.unsubscribe();
      }
      // 새로운 구독 등록
      stompSubscription.value = stompClient.value.subscribe("/send", (res) => {
        console.log("구독으로 받은 메시지 입니다.", res.body);
        const messages = JSON.parse(res.body);
        recvList.splice(0, recvList.length);
        if (Array.isArray(messages)) {
          console;
          // 배열 형태의 메시지일 경우 각 요소를 처리
          for (const message of messages) {
            recvList.push(message);
          }
        } else {
          // 배열 형태가 아닌 경우 그대로 추가
          recvList.push(messages);
        }
        console.log(recvList);
        isReceiving = false;
        // 화면 새로고침 대신 schedules 업데이트
        updateSchedules();
      });
    },
    (error) => {
      console.log("소켓 연결 실패", error);
    }
  );
};

const updateSchedules = () => {
  schedules.value = [...recvList];
};

// send 함수
const send = (msg) => {
  console.log("Send message:", msg);
  if (stompClient.value && stompClient.value.connected) {
    stompClient.value.send("/receive", JSON.stringify(msg), {});
  }
};

// 컴포넌트가 마운트되면 소켓 연결을 시도합니다.
onMounted(() => {
  connect();
});

const route = useRoute();
const planIdx = route.params.planIdx;
const router = useRouter();

const schedules = ref([]);
const count = ref(1);
const showModal = ref(false);

const selectedSchedule = ref({
  planIdx: "",
  scheduleIdx: "",
  scheduleLocation: "",
  scheduleLat: "",
  scheduleLon: "",
  scheduleMemo: "",
  scheduleOrder: "",
  scheduleDate: "",
});

onMounted(() => {
  getPlan();
});

const getPlan = () => {
  detailPlan(
    planIdx,
    ({ data }) => {
      schedules.value = data.schedules;
    },
    (error) => {
      console.log(error);
    }
  );
};

const idx = ref(-1);
const addButton = () => {
  if (count.value < 10) {
    count.value++;
    const newSchedule = {
      scheduleIdx: idx.value,
      scheduleLocation: `${count.value}일차`, // Set the schedule location based on the day number
    };
    idx.value = idx.value - 1;
    schedules.value.push(newSchedule);
    send(schedules.value);
  }
};

const updatePlan = () => {
  try {
    updateSchedulPlan(
      schedules.value,
      (response) => {
        if (response.status == 200) {
          alert("수정완료 되었습니다");
          router.replace({ name: "planList" });
        }
      },
      (error) => {
        console.error("수정 실패:", error);
        alert("수정에 실패했습니다.");
      }
    );
  } catch (error) {
    console.error("수정 중 오류 발생:", error);
    alert("수정 중 오류가 발생했습니다.");
  }
};

const deleteCurrentPlan = async () => {
  if (confirm("정말로 삭제하시겠습니까?")) {
    try {
      await deletePlan(
        planIdx,
        () => {
          alert("삭제가 완료되었습니다.");
          router.push({ name: "planList" });
        },
        (error) => {
          console.error("삭제 실패:", error);
          alert("삭제에 실패했습니다.");
        }
      );
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  }
};

// 드래그 앤 드랍
let draggingIndex = null;

// 드래그 앤 드랍
const dragStart = (index) => {
  draggingIndex = index;
};

const dragOver = (index) => {
  if (draggingIndex !== index) {
    const draggedItem = schedules.value[draggingIndex];
    schedules.value.splice(draggingIndex, 1);
    schedules.value.splice(index, 0, draggedItem);
    draggingIndex = index;
    schedules.value.forEach((schedule, index) => {
      schedule.scheduleOrder = index; // 드래그 후 스케줄 순서를 업데이트
    });

    send(schedules.value);
  }
};

const drop = () => {
  draggingIndex = null;
};

// 드래그 end
const scrollToDay = (day) => {
  const targetDay = document.getElementById(`day-${day}`);
  if (targetDay) {
    targetDay.scrollIntoView({ behavior: "smooth" });
  }
};

// 모달 열기
const showScheduleModal = (schedule) => {
  selectedSchedule.value = {
    scheduleIdx: schedule.scheduleIdx,
    scheduleLocation: schedule.scheduleLocation,
    scheduleMemo: schedule.scheduleMemo,
    scheduleLat: schedule.scheduleLat,
    scheduleLon: schedule.scheduleLon,
    scheduleOrder: schedule.scheduleOrder,
    planIdx: schedule.planIdx,
    scheduleDate: schedule.scheduleDate,
  };
  showModal.value = true;
};

// 모달 닫기
const closeModal = () => {
  showModal.value = false;
};

const findRoute = function (index) {
  if (index + 1 < this.schedules.length) {
    const startSchedule = this.schedules[index];
    const endSchedule = this.schedules[index + 1];
    const sY = startSchedule.scheduleLat;
    const sX = startSchedule.scheduleLon;
    const eY = endSchedule.scheduleLat;
    const eX = endSchedule.scheduleLon;
    const startLocation = encodeURIComponent(startSchedule.scheduleLocation);
    const endLocation = encodeURIComponent(endSchedule.scheduleLocation);
    const url = `https://map.kakao.com/link/to/${endLocation},${eY},${eX}/from/${startLocation},${sY},${sX}`;
    window.open(url, "_blank");
  } else {
    const startSchedule = this.schedules[index];
    const sY = startSchedule.scheduleLat;
    const sX = startSchedule.scheduleLon;
    const startLocation = encodeURIComponent(startSchedule.scheduleLocation);
    const url = `https://map.kakao.com/link/from/${startLocation},${sY},${sX}`;
    window.open(url, "_blank");
  }
};

// 일정 업데이트
const updateSchedule = () => {
  if (confirm("정말로 수정하시겠습니까?")) {
    modifySchedule(selectedSchedule.value, () => {
      // schedules 배열에서 수정된 스케줄을 찾아 업데이트
      const index = schedules.value.findIndex(
        (schedule) =>
          schedule.scheduleIdx === selectedSchedule.value.scheduleIdx
      );
      // 수정 인덱스 찾아 업데이트하기
      if (index !== -1) {
        schedules.value[index] = { ...selectedSchedule.value };
      }

      // 업데이트 성공 시 모달 닫기
      closeModal();

      send(schedules.value);
    });
  }
};

const deleteScheduleConfirmation = () => {
  if (confirm("정말로 삭제하시겠습니까?")) {
    const deletedScheduleIdx = selectedSchedule.value.scheduleIdx; // 삭제된 스케줄의 인덱스 저장
    deleteSchedule(deletedScheduleIdx, () => {
      const idx = schedules.value.findIndex(
        (schedule) => schedule.scheduleIdx === deletedScheduleIdx
      );
      if (idx !== -1) {
        schedules.value.splice(idx, 1);
      }

      send(schedules.value);

      // 삭제 성공 시 모달 닫기
      closeModal();
    });
  }
};

// recvList 배열을 감시하여 업데이트될 때마다 schedules에 반영합니다.
watch(
  recvList,
  (newList) => {
    newList.forEach((newSchedule) => {
      const index = schedules.value.findIndex(
        (schedule) => schedule.scheduleIdx === newSchedule.scheduleIdx
      );
      if (index !== -1) {
        // 변경 사항을 적용하기 전에 소켓 수신 중인지 확인
        if (!isReceiving) {
          schedules.value[index] = newSchedule;
        }
      } else {
        schedules.value.push(newSchedule);
      }
    });
  },
  { deep: true }
);

// // schedules 배열을 감시하여 업데이트될 때마다 소켓으로 데이터를 전송합니다.
// watch(
//   schedules,
//   (newSchedules) => {
//     // 변경 사항을 소켓으로 전송할 때는 isReceiving이 false인 경우에만 전송합니다.
//     if (!isReceiving) {
//       newSchedules.forEach((schedule) => {
//         send(schedule);
//       });
//     }
//   },
//   { deep: true }
// );
</script>

<style scoped>
.sidebar {
  width: 400px;
  height: 100%;
  background-color: #333;
  color: #fff;
  padding: 20px;
}

.sidebar-menu {
  margin-top: 20px; /* 위쪽 여백 추가 */
}

.number-buttons {
  margin-top: 20px;
}

.number-buttons button {
  margin-right: 5px;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-content {
  flex-grow: 1;
  margin-right: 5px; /* 간격을 더 줄이기 위해 마진 감소 */
}

/* 모달 스타일 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
}

.modal.is-active {
  display: flex;
}

.modal-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-card {
  width: 50%;
  max-width: 600px;
}

.modal-card-head,
.modal-card-foot {
  background-color: #f0f0f0;
}

.modal-card-body {
  background-color: #fff;
}
</style>
