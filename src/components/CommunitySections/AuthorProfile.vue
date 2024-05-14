<script setup>
import { onMounted } from "vue";

//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <section class="py-sm-0 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-12 mx-auto">
          <div class="row py-3">
            <div
              class="col-lg-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto border border-secondary-300 rounded"
            >
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h3 class="mb-0">{{ props.post.boardTitle }}</h3>
                <div class="d-block">
                  <MaterialButton class="text-nowrap mb-0" variant="outline" color="info" size="sm"
                    >Follow</MaterialButton
                  >
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-auto">
                  <span class="h6 me-1">좋아요</span>
                  <span>{{ props.post.boardLike }}</span>
                </div>
                <div class="col-auto">
                  <span class="h6 me-1">조회수</span>
                  <span>{{ props.post.boardCnt }}</span>
                </div>
                <div class="col-auto">
                  <span class="h6 me-1">댓글수</span>
                  <span>{{ props.post.boardCommentCnt }}</span>
                </div>
              </div>
              <p class="text-base mb-0">
                작성자 : {{ props.post.userId }} <br /><br />
                <RouterLink
                  :to="'/community/detail/' + props.post.boardIdx"
                  :postId="props.post.boardIdx"
                  class="text-info icon-move-right"
                  >보러 가기
                  <i class="fas fa-arrow-right text-sm ms-1"></i>
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
