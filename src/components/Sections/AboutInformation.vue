<script setup>
// example components
import DefaultInfoCard from "../../examples/cards/infoCards/DefaultInfoCard.vue";
import CenteredBlogCard from "../../examples/cards/blogCards/CenteredBlogCard.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="row justify-content-start">
            <DefaultInfoCard
              color="info"
              icon="public"
              title="친구 초대하기"
              description="친구를 초대해서 같이 일정을 관리할 수 있습니다."
            />
            <DefaultInfoCard
              color="info"
              icon="payments"
              title="지도로 위치 확인 및 주변 컨텐츠 선택"
              description="여행 경로를 계획하고 여행 컨텐츠를 찾을 수 있습니다."
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="info"
              icon="apps"
              title="일자별 정리"
              description="일자별로 드래그를 통해 여행 일정을 정리할 수 있습니다."
            />
            <DefaultInfoCard
              color="info"
              icon="3p"
              title="GPT 추천 서비스"
              description="GPT에게 여행 일정, 음식, 컨텐츠 등을 추천받을 수 있습니다."
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <CenteredBlogCard
            image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            title="서비스를 이용하려면?"
            description="친구들과의 여행 계획하러
          가기"
          />
        </div>
      </div>
    </div>
  </section>
</template>
