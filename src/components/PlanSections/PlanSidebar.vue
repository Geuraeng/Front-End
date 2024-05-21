<template>
  <div class="sidebar mt-9">
    <div class="sidebar-menu">
      <div class="number-buttons">
        <button v-for="n in count" :key="n" class="btn btn-primary" @click="scrollToDay(n)">
          {{ n }}
        </button>
        <button v-if="count < 10" @click="addButton" class="btn btn-success">+</button>
      </div>
      <div v-for="n in count" :key="n" :id="'day-' + n">{{ n }}일차</div>
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
            <h5 class="card-title">{{ schedule.scheduleLocation }}</h5>
            <p class="card-text">메모 : {{ schedule.scheduleMemo }}</p>
          </div>
          <button class="btn btn-secondary" @click="showScheduleModal(schedule)">수정</button>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <button class="btn btn-light" style="margin-right: 10px" @click="updatePlan">계획완료</button>
      <button class="btn btn-secondary" @click="deleteCurrentPlan">삭제</button>
    </div>
    <!-- 모달 -->
    <div v-if="showModal" class="modal is-active">
      <div class="modal-background opacity-0" style="z-index: -1"></div>
      <div class="modal-card text-dark">
        <header class="modal-card-head d-flex">
          <p class="modal-card-title">스케줄 상세 정보</p>
          <button class="delete" aria-label="close" @click="closeModal">X</button>
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
          <button class="btn btn-primary" @click="updateSchedule">수정</button>
          <button class="btn btn-danger" @click="deleteScheduleConfirmation">삭제</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, onMounted, computed } from "vue";
=======
import { ref, onMounted, watch, reactive } from "vue";
>>>>>>> a4c327ee6f69dcf29f4a018d8091aa1bfbae375c
import { useRoute, useRouter } from "vue-router";
import {
  detailPlan,
  modifySchedule,
  deleteSchedule,
  updateSchedulPlan,
  deletePlan,
} from "@/api/plan.js";

<<<<<<< HEAD
=======
// 소켓
import Stomp from "webstomp-client";
import SockJS from "sockjs-client/dist/sockjs";

const recvList = reactive([]);
const stompClient = ref(null);
let isReceiving = false;

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
      stompClient.value.subscribe("/send", (res) => {
        console.log("구독으로 받은 메시지 입니다.", res.body);
        isReceiving = true;
        recvList.push(JSON.parse(res.body));
        console.log(recvList);
        isReceiving = false;
      });
    },
    (error) => {
      console.log("소켓 연결 실패", error);
    }
  );
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

>>>>>>> a4c327ee6f69dcf29f4a018d8091aa1bfbae375c
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
});

onMounted(() => {
  getPlan();
});

const getPlan = () => {
  detailPlan(
    planIdx,
    ({ data }) => {
      schedules.value = data;
      count.value = schedules.value.length;
    },
    (error) => {
      console.log(error);
    }
  );
};

const addButton = () => {
  if (count.value < 10) {
    count.value++;
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
<<<<<<< HEAD
    schedules.value[draggingIndex].scheduleOrder = index;
=======
    schedules.value.forEach((schedule, index) => {
      schedule.scheduleOrder = index; // 드래그 후 스케줄 순서를 업데이트
    });
>>>>>>> a4c327ee6f69dcf29f4a018d8091aa1bfbae375c
  }
};

const drop = () => {
  draggingIndex = null;
  // 변경된 스케줄 데이터를 서버로 전송
  schedules.value.forEach((schedule) => {
    send(schedule);
  });
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
  };
  showModal.value = true;
};

// 모달 닫기
const closeModal = () => {
  showModal.value = false;
};

// 일정 업데이트
const updateSchedule = () => {
  if (confirm("정말로 수정하시겠습니까?")) {
    modifySchedule(selectedSchedule.value, () => {
      // schedules 배열에서 수정된 스케줄을 찾아 업데이트
      const index = schedules.value.findIndex(
        (schedule) => schedule.scheduleIdx === selectedSchedule.value.scheduleIdx
      );
      // 수정 인덱스 찾아 업데이트하기
      if (index !== -1) {
        schedules.value[index] = { ...selectedSchedule.value };
      }

      // 업데이트 성공 시 모달 닫기
      closeModal();

      send(selectedSchedule.value);
    });
  }
};

const deleteScheduleConfirmation = () => {
  if (confirm("정말로 삭제하시겠습니까?")) {
<<<<<<< HEAD
    deleteSchedule(selectedSchedule.value.scheduleIdx, () => {
      const idx = schedules.value.findIndex(
        (schedule) => schedule.scheduleIdx === selectedSchedule.value.scheduleIdx
=======
    const deletedScheduleIdx = selectedSchedule.value.scheduleIdx; // 삭제된 스케줄의 인덱스 저장
    deleteSchedule(deletedScheduleIdx, () => {
      const idx = schedules.value.findIndex(
        (schedule) => schedule.scheduleIdx === deletedScheduleIdx
>>>>>>> a4c327ee6f69dcf29f4a018d8091aa1bfbae375c
      );
      if (idx !== -1) {
        schedules.value.splice(idx, 1);
      }

      // 삭제된 스케줄의 정보를 제외하고 소켓으로 데이터를 전송합니다.
      const schedulesToSend = schedules.value.filter(
        (schedule) => schedule.scheduleIdx !== deletedScheduleIdx
      );
      schedulesToSend.forEach((schedule) => {
        send(schedule);
      });

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
        console.log("!!!!!");
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

.btn-secondary {
  background-color: #e91e63;
  flex-shrink: 0;
  padding: 5px 10px; /* 버튼 크기를 줄이기 위해 패딩 조정 */
  font-size: 0.9rem; /* 버튼 글꼴 크기를 줄이기 위해 폰트 사이즈 조정 */
  margin-right: 7px; /* 수정 버튼의 오른쪽 마진 설정 */
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
