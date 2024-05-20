<script setup>
import DefaultReviewCard from "@/examples/cards/reviewCards/DefaultReviewCard.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 mx-auto text-center">
          <h2 class="mb-0">Trusted by over</h2>
          <h2 class="text-gradient text-dark mb-3">
            1,679,477+ web developers
          </h2>
          <p class="lead">
            서비스 이용자 실제 후기
          </p>
        </div>
      </div>
      <div class="row mt-6">
        <DefaultReviewCard
          name="윤보은"
          date="1 day ago"
          review='"친구와 공유할 수 있어서 좋아요."'
          :rating="5.0"
        />
        <DefaultReviewCard
          class="ms-md-auto"
          color="bg-gradient-secondary"
          name="최용훈"
          date="1 week ago"
          review='"제가 사용했던 여행 기록 서비스 중 최고예요!"'
          :rating="5.0"
        />

        <DefaultReviewCard
          name="이소민"
          date="3 weeks ago"
          review='"여행지를 추천받아서 잘 다녀왔어요."'
          :rating="5.0"
        />
      </div>
      <hr class="horizontal dark my-5" />
    </div>
  </section>
</template>
