<template>
  <div class="sidebar mt-9">
    <div class="sidebar-menu">
      <div class="number-buttons">
        <button
          v-for="n in count"
          :key="n"
          class="btn btn-primary"
          @click="scrollToDay(n)"
        >
          {{ n }}
        </button>
        <button v-if="count < 10" @click="addButton" class="btn btn-success">
          +
        </button>
      </div>
      <div v-for="n in count" :key="n" :id="'day-' + n">{{ n }}일차</div>
      <div
        v-for="schedule in filteredSchedules"
        :key="schedule.scheduleIdx"
        class="card mb-3 text-dark"
      >
        <h5 class="card-title">
          {{ schedule.scheduleLocation }}
        </h5>
        <p class="card-text">메모 : {{ schedule.scheduleMemo }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { detailPlan } from "@/api/plan.js";

const schedules = ref([]);
const count = ref(1);
const showModal = ref(false);
const selectedSchedule = ref({});

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
