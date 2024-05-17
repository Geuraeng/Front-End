<script setup>
import { ref, onMounted } from "vue";
import { listPlan, modifyPlan, registPlan } from "@/api/plan.js";

//example components
import DefaultNavbar from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";

//image
import bg0 from "@/assets/img/bg9.jpg";

//sections
import List from "../components/PlanSections/List.vue";

const plans = ref([]);
const showModal = ref(false);

const selectedPlan = ref({
  planIdx: "",
  planTitle: "",
  planDate: "",
});

onMounted(() => {
  getPlanList();
});

// onMounted(async () => {
//   // listJoin 호출하여 세션에 저장된 userId와 join 테이블에 있는 userId가 일치하는 데이터 가져오기
//   await listJoin(
//     (response) => {
//       const joinList = response.data;
//       const sessionUserId = ''; // 세션에 저장된 userId 가져오기 (예: localStorage.getItem('userId'))

//       // joinList에서 세션에 저장된 userId와 일치하는 데이터만 필터링하여 userId를 포함하는 planList 가져오기
//       const planList = joinList.filter(join => join.userId === sessionUserId).map(join => join.planIdx);

//       // listPlan 호출하여 planList에 해당하는 plan 정보 가져오기
//       listPlan(
//         ({ data }) => {
//           plans.value = data.planList.filter(plan => planList.includes(plan.planIdx));
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// });

const getPlanList = () => {
  listPlan(
    ({ data }) => {
      plans.value = data.planList;
    },
    (error) => {
      console.log(error);
    }
  );
};

// 모달 열기
const showPlanModal = (selectedPlan) => {
  selectedPlan.value = {
    planIdx: selectedPlan.planIdx,
    planTitle: selectedPlan.planTitle,
    planDate: selectedPlan.planDate,
  };
  showModal.value = true;
};

// 모달 닫기
const closeModal = () => {
  showModal.value = false;
};

// 일정 업데이트
const writePlan = () => {
  // 사용자에게 한 번 더 확인을 받기 위한 프롬프트
  registPlan(selectedPlan.value, () => {
    // 업데이트 성공 시 모달 닫기
    closeModal();
    // 다시 불러오거나 화면 갱신하는 등의 작업 수행
  });
};
</script>
<template>
  <DefaultNavbar
    :action="{
      route: 'javascript:;',
      label: 'Buy Now',
      color: 'btn-white',
    }"
    transparent
  />
  <header class="bg-gradient-dark">
    <div
      class="page-header min-vh-75"
      :style="{ backgroundImage: `url(${bg0})` }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">
              Plan <span class="text-white" id="typed"></span>
            </h1>
            <p class="lead mb-4 text-white opacity-8">
              친구들과 여행 계획을 세우고 여행을 기록하세요.
            </p>
            <button
              type="button"
              class="btn bg-white text-dark"
              @click="showPlanModal(selectedPlan)"
            >
              Create New Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- 모달 -->
  <div
    v-if="showModal"
    class="modal fade show"
    tabindex="-1"
    style="display: block"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">스케줄 상세 정보</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 수정 가능한 입력 필드 -->
          여행 제목 :
          <input
            type="text"
            v-model="selectedPlan.planTitle"
            class="form-control mb-3"
            placeholder="여행 제목"
          />
          여행 일자 :
          <input
            type="text"
            v-model="selectedPlan.planDate"
            class="form-control mb-3"
            placeholder="여행 일자"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="writePlan">
            등록
          </button>
          <button type="button" class="btn btn-secondary" @click="closeModal">
            취소
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <section class="pb-5 position-relative bg-gradient-dark mx-n3">
      <div class="container">
        <div class="row">
          <div class="col-md-8 text-start mb-5 mt-5">
            <h3 class="text-white z-index-1 position-relative">Plan List</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <List v-for="(plan, index) in plans" :key="index" :plan="plan" />
          </div>
        </div>
      </div>
    </section>
  </div>
  <DefaultFooter />
</template>

<style>
/* 모달 스타일 */
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
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
