import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const userLoginInfo = defineStore("login", () => {
  const userId = ref("");
  const userPw = ref("");

  //   const doubleCount = computed(() => count.value * 2);
  //   function increment() {
  //     count.value++;
  //   }

  return { userId, userPw };
});
