<script setup>
import { ref, onMounted } from "vue";
import { listPlan, getIdx, registPlan } from "@/api/plan.js";
import { registJoin } from "@/api/join.js";

//example components
import DefaultNavbar from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";

//image
import bg0 from "@/assets/img/bg9.jpg";

//sections
import List from "../components/PlanSections/List.vue";

//pinia
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const memberId = userInfo.value.userId;

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

const getPlanList = () => {
  listPlan(
    memberId,
    ({ data }) => {
      plans.value = data.planList;
    },
    (error) => {
      alert("error");
    }
  );
};

// 모달 열기
const showPlanModal = (plan) => {
  selectedPlan.value = {
    planIdx: plan.planIdx,
    planTitle: plan.planTitle,
    planDate: plan.planDate,
  };
  showModal.value = true;
};

// 모달 닫기
const closeModal = () => {
  showModal.value = false;
};

const info = ref({
  userId: "",
  planIdx: "",
});

// 일정 업데이트
const writePlan = () => {
  getPlanIdx().then(() => {
    // 사용자에게 한 번 더 확인을 받기 위한 프롬프트
    registPlan(selectedPlan.value, () => {
      info.value.userId = memberId;
      registJoin(
        info.value,
        () => {
          // 업데이트 성공 시 모달 닫기
          closeModal();
          // 새로 추가된 계획을 plans 배열에 추가
          plans.value.push({ ...selectedPlan.value });
        },
        (error) => {
          alert("수정에 실패했습니다.");
        }
      );
    });
  });
};

const getPlanIdx = () => {
  return new Promise((resolve, reject) => {
    getIdx(
      ({ data }) => {
        info.value.planIdx = data.idx + 1;
        selectedPlan.value.planIdx = data.idx + 1; // 새 계획의 planIdx 설정
        resolve();
      },
      (error) => {
        reject();
      }
    );
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
  <header class="bg-gradient-dark no-select">
    <div class="page-header min-vh-75" :style="{ backgroundImage: `url(${bg0})` }">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white gamja-flower-regular">
              나의 여행 목록 <span class="text-white" id="typed"></span>
            </h1>
            <h2 class="lead mb-4 text-white opacity-8 gamja-flower-regular">
              친구들과 여행 계획을 세우고 여행을 기록하세요.
            </h2>
            <button
              type="button"
              class="btn bg-white text-dark"
              @click="showPlanModal({ planIdx: '', planTitle: '', planDate: '' })"
            >
              Create New Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- 모달 -->
  <div v-if="showModal" class="modal fade show no-select" tabindex="-1" style="display: block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">스케줄 상세 정보</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
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
          <button type="button" class="btn btn-primary" @click="writePlan">등록</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">취소</button>
        </div>
      </div>
    </div>
  </div>

  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6 no-select">
    <section class="pb-5 position-relative bg-gradient-dark mx-n3">
      <div class="container">
        <div class="row">
          <div class="col-md-8 text-start mb-5 mt-5">
            <h3 class="text-white z-index-1 position-relative gamja-flower-regular">여행 목록</h3>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <List v-for="(plan, index) in plans" :key="index" :plan="plan" />
          </div>
        </div>
      </div>
    </section>
  </div>
  <DefaultFooter />
</template>

<style>
.no-select {
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

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
