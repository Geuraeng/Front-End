<script setup>
import { ref, onMounted } from "vue";
import { listPlan } from "@/api/plan.js";

//example components
import DefaultNavbar from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";

//image
import bg0 from "@/assets/img/bg9.jpg";

//sections
import List from "../components/PlanSections/List.vue";

const plans = ref([]);

onMounted(() => {
  getPlanList();
});

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
    <div class="page-header min-vh-75" :style="{ backgroundImage: `url(${bg0})` }">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">Plan <span class="text-white" id="typed"></span></h1>
            <p class="lead mb-4 text-white opacity-8">
              친구들과 여행 계획을 세우고 여행을 기록하세요.
            </p>
            <button type="submit" class="btn bg-white text-dark">Create New Plan</button>
          </div>
        </div>
      </div>
    </div>
  </header>

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
