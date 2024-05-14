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
              title="카테고리로 컨텐츠 선택"
              description="여러 카테고리를 통해 여행 컨텐츠를 계획할 수 있습니다."
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="info"
              icon="apps"
              title="지도로 경로 확인하기"
              description="마커 표시와 경로 표시를 통해 효율적인 여행 경로를 계획할 수 있습니다."
            />
            <DefaultInfoCard
              color="info"
              icon="3p"
              title="날짜별, 시간별 정리"
              description="날짜와 시간별로 여행 일정을 정리할 수 있습니다."
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <CenteredBlogCard
            image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            title="여행 계획하기"
            description="친구들과의 여행을 계획해 보세요."
          />
        </div>
      </div>
    </div>
  </section>
</template>
