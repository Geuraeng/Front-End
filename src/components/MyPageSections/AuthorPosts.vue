<script setup>
// example components
import TransparentBlogCard from "../../examples/cards/blogCards/TransparentBlogCard.vue";
import BackgroundBlogCard from "../../examples/cards/blogCards/BackgroundBlogCard.vue";

//Vue Material Kit 2 components
import post1 from "@/assets/img/examples/testimonial-6-2.jpg";
import post2 from "@/assets/img/examples/testimonial-6-3.jpg";
import post3 from "@/assets/img/examples/blog-9-4.jpg";
import post4 from "@/assets/img/examples/blog2.jpg";

import { ref, onMounted } from "vue";
import { listPlan } from "@/api/plan.js";
//pinia
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const memberId = userInfo.value.userId;
const plans = ref([]);

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
</script>
<template>
  <section class="py-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <h3 class="mb-5">내 여행 기록 보기</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-sm-6">
          <TransparentBlogCard
            v-if="plans[0]"
            :image="post1"
            :idx="plans[0].planIdx"
            :title="plans[0].planTitle"
            :description="plans[0].planDate"
          />
        </div>
        <div class="col-lg-3 col-sm-6">
          <TransparentBlogCard
            v-if="plans[1]"
            :image="post2"
            :idx="plans[1].planIdx"
            :title="plans[1].planTitle"
            :description="plans[1].planDate"
          />
        </div>
        <div class="col-lg-3 col-sm-6">
          <TransparentBlogCard
            v-if="plans[2]"
            :image="post3"
            :idx="plans[2].planIdx"
            :title="plans[2].planTitle"
            :description="plans[2].planDate"
          />
        </div>
        <div class="col-lg-3 col-md-12 col-12">
          <BackgroundBlogCard
            :image="post4"
            title="나의 여행 더보기"
            description="이전 여행 기록"
            @onclick="planList"
          />
        </div>
      </div>
    </div>
  </section>
</template>
