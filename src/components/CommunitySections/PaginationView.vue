<script setup>
import { onMounted } from "vue";

// Pagination page components
import PaginationSimple from "./components/PaginationSimple.vue";

//nav-pills
import setNavPills from "@/assets/js/nav-pills";

//hook
onMounted(() => {
  setNavPills();
});
</script>
<template>
  <PaginationSimple />
</template>
