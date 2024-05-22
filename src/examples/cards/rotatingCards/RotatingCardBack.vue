<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  action: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div
    class="back back-background"
    :style="{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
    }"
  >
    <div class="card-body pt-7 text-center">
      <h3 class="text-white" v-html="title"></h3>
      <p class="text-white opacity-8">
        {{ description }}
      </p>
      <div class="buttons-group">
        <RouterLink
          v-for="(item, index) of action"
          :key="index"
          :to="item.route"
          class="btn btn-sm mt-3 inline-block ms-1"
          :class="`${item.color ? `btn-${item.color}` : 'btn-white'}`"
          >{{ item.label }}</RouterLink
        >
      </div>
    </div>
  </div>
</template>
