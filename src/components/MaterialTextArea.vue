<script setup>
import { defineEmits, ref } from "vue";

const input = ref("");

const emit = defineEmits(["myChange"]);

const myChange = () => {
  emit("myChange", input.value);
};

defineProps({
  id: {
    type: String,
    default: "message",
  },
  rows: {
    type: Number,
    default: 4,
  },
  placeholder: {
    type: String,
    default: "",
  },
  labelClass: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div class="input-group">
    <label :for="id" :class="labelClass"><slot /></label>
    <textarea
      name="message"
      class="form-control"
      :id="id"
      :placeholder="placeholder"
      :rows="rows"
      @input="myChange"
      v-model="input"
    />
  </div>
</template>
