<script setup>
// example component
import HorizontalTeamCard from "@/examples/cards/teamCards/HorizontalTeamCard.vue";

// images
import emma from "@/assets/img/team-5.jpg";
import william from "@/assets/img/bruce-mars.jpg";
import ivana from "@/assets/img/ivana-squares.jpg";
import marquez from "@/assets/img/ivana-square.jpg";
</script>

<template>
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">
            Community
          </h3>
          <p class="text-white opacity-8 mb-0">
            여행지 추천과 실제 후기, 팁 등을 공유할 수 있습니다.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4"
            :image="emma"
            :profile="{ name: '정경원', link: 'javascript:;' }"
            :position="{ label: '여행지 : 제주도', color: 'info' }"
            description="제주도는 카약이 재밌어요...................................................................."
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="william"
            :profile="{ name: '박찬수', link: 'javascript:;' }"
            :position="{ label: '여행지 : 부산', color: 'info' }"
            description="광안리 최고........................................................................................"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4 z-index-2"
            :image="ivana"
            :profile="{ name: '라송연', link: 'javascript:;' }"
            :position="{ label: '여행지 : 전주', color: 'info' }"
            description="전주에서 비빔밥 먹으면 바보래요......................................................................"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5 z-index-2"
            :image="marquez"
            :profile="{ name: '정석영', link: 'javascript:;' }"
            :position="{ label: '여행지 : 강릉', color: 'info' }"
            description="장칼국수 맛있어요................................................................................."
          />
        </div>
      </div>
    </div>
  </section>
</template>
