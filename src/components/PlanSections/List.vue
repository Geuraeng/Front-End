<script setup>
// example component
import HorizontalTeamCard from "@/examples/cards/teamCards/HorizontalTeamCard.vue";

// images
import emma from "@/assets/img/team-5.jpg";
</script>

<template>
  <div class="row" style="overflow: auto;">
    <div class="col-8">
      <HorizontalTeamCard
        :image="emma"
        :profile="{ name: '정경원', link: 'javascript:;' }"
        :position="{ label: '여행지 : 제주도', color: 'info' }"
        description="제주도는 카약이 재밌어요...................................................................."
      />
    </div>
  </div>
</template>

