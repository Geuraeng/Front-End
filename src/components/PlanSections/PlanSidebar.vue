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
        v-for="schedule in filteredSchedules"
        :key="schedule.scheduleIdx"
        class="card mb-3 text-dark"
        @click="showScheduleModal(schedule)"
        style="cursor: pointer"
      >
        <h5 class="card-title">
          {{ schedule.scheduleLocation }}
        </h5>
        <p class="card-text">메모 : {{ schedule.scheduleMemo }}</p>
      </div>
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
            v-model="selectedSchedule.scheduleLocation"
            class="form-control mb-3"
            placeholder="장소"
          />
          위도 :
          <input
            type="text"
            v-model="selectedSchedule.scheduleLat"
            class="form-control mb-3"
            placeholder="위도"
          />
          경도 :
          <input
            type="text"
            v-model="selectedSchedule.scheduleLon"
            class="form-control mb-3"
            placeholder="경도"
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
import { ref, onMounted, computed } from "vue";
import { detailPlan, modifySchedule, deleteSchedule } from "@/api/plan.js";

const schedules = ref([]);
const count = ref(1);
const showModal = ref(false);

const selectedSchedule = ref({
  scheduleIdx: "",
  scheduleLocation: "",
  scheduleLat: "",
  scheduleLon: "",
  scheduleMemo: "",
});

onMounted(() => {
  getPlan();
});

const getPlan = () => {
  const planIdx = parseInt(window.location.pathname.match(/\d+$/)[0]);
  detailPlan(
    planIdx,
    ({ data }) => {
      schedules.value = data.schedules;
      count.value = data.schedules.length;
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

const scrollToDay = (day) => {
  const targetDay = document.getElementById(`day-${day}`);
  if (targetDay) {
    targetDay.scrollIntoView({ behavior: "smooth" });
  }
};

const filteredSchedules = computed(() => {
  const planIdx = parseInt(window.location.pathname.match(/\d+$/)[0]);
  return schedules.value.filter((schedule) => schedule.planIdx === planIdx);
});

// 모달 열기
const showScheduleModal = (schedule) => {
  selectedSchedule.value = {
    scheduleIdx: schedule.scheduleIdx,
    scheduleLocation: schedule.scheduleLocation,
    scheduleLat: schedule.scheduleLat,
    scheduleLon: schedule.scheduleLon,
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
  // 사용자에게 한 번 더 확인을 받기 위한 프롬프트
  if (confirm("정말로 수정하시겠습니까?")) {
    modifySchedule(selectedSchedule.value, () => {
      // 업데이트 성공 시 모달 닫기
      closeModal();
      // 다시 불러오거나 화면 갱신하는 등의 작업 수행
    });
  }
};

// 삭제 확인 창을 띄우고, 확인 시 삭제 실행
const deleteScheduleConfirmation = () => {
  if (confirm("정말로 삭제하시겠습니까?")) {
    deleteSchedule(selectedSchedule.value.scheduleIdx, () => {
      // 삭제 성공 시 모달 닫기
      closeModal();
      // 다시 불러오거나 화면 갱신하는 등의 작업 수행
    });
  }
};
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
