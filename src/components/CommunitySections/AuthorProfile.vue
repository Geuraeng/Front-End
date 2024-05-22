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
  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <h3 class="card-title">{{ props.post.boardTitle }}</h3>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span class="me-3">{{ props.post.userId }}</span>
                  <span class="badge bg-secondary">{{ props.post.boardRegDate }}</span>
                </div>
                <div>
                  <MaterialButton class="text-nowrap" variant="outline" color="dark" size="sm"
                    >🧡</MaterialButton
                  >
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-auto">
                  <span class="me-1">좋아요</span>
                  <span>{{ props.post.boardLike }}</span>
                </div>
                <div class="col-auto">
                  <span class="me-1">조회수</span>
                  <span>{{ props.post.boardCnt }}</span>
                </div>
                <div class="col-auto">
                  <span class="me-1">댓글수</span>
                  <span>{{ props.post.boardCommentCnt }}</span>
                </div>
              </div>
              <p class="card-text">{{ props.post.boardContent }}</p>
              <RouterLink :to="'/community/detail/' + props.post.boardIdx" class="btn btn-dark">
                보러 가기
                <i class="fas fa-arrow-right ms-1"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
