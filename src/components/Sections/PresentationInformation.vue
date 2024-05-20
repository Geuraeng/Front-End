<script setup>
import RotatingCard from "../../examples/cards/rotatingCards/RotatingCard.vue";
import RotatingCardFront from "../../examples/cards/rotatingCards/RotatingCardFront.vue";
import RotatingCardBack from "../../examples/cards/rotatingCards/RotatingCardBack.vue";
import DefaultInfoCard from "../../examples/cards/infoCards/DefaultInfoCard.vue";
</script>
<template>
  <section class="my-5 py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              image="https://images.unsplash.com/photo-1569683795645-b62e50fbf103?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              icon="touch_app"
              title="여행 <br /> 계획하기"
              description="여행을 계획하고 기록해 보세요."
            />

            <RotatingCardBack
              image="https://images.unsplash.com/photo-1498889444388-e67ea62c464b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1365&q=80"
              title="여행 계획하기"
              description="친구를 초대해서 여행 일정을 계획해 보세요."
              :action="[
                {
                  route: '/plan/list',
                  label: 'New Plan',
                },
              ]"
            />
          </RotatingCard>
        </div>
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              image="https://images.unsplash.com/photo-1569683795645-b62e50fbf103?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              icon="touch_app"
              title="여행 <br /> 공유하기"
              description="다른 여행자와 팁을 공유해 보세요."
            />

            <RotatingCardBack
              image="https://images.unsplash.com/photo-1498889444388-e67ea62c464b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1365&q=80"
              title="여행 공유하기"
              description="나만의 추천 여행지가 있다면 공유해 주세요."
              :action="[
                {
                  route: '/community',
                  label: 'Community',
                },
              ]"
            />
          </RotatingCard>
        </div>
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              image="https://images.unsplash.com/photo-1569683795645-b62e50fbf103?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              icon="touch_app"
              title="프로필 <br /> 관리하기"
              description="나만의 프로필을 만들고 꾸며보세요."
            />

            <RotatingCardBack
              image="https://images.unsplash.com/photo-1498889444388-e67ea62c464b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1365&q=80"
              title="프로필 관리하기"
              description="다른 사용자들에게 보이는 프로필을 만들어 보세요."
              :action="[
                {
                  route: '/myPage',
                  label: 'My Page',
                },
              ]"
            />
          </RotatingCard>
        </div>
      </div>
    </div>
  </section>
</template>
