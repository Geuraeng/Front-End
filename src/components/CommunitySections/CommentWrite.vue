<script setup>
import { onMounted } from "vue";
//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <section class="my-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12 m-auto position-relative">
          <h4 class="mb-4 text-white">Comment</h4>
          <div class="row justify-content-center">
            <div class="col-8">
              <MaterialInput
                class="input-group-outline"
                id="email"
                :label="{ text: '댓글을 작성하세요.', class: 'form-label' }"
                type="email"
              />
            </div>
            <div class="col-2 ps-0">
              <MaterialButton
                variant="gradient"
                color="info"
                class="mb-0 h-100 position-relative z-index-2"
                >Submit</MaterialButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
