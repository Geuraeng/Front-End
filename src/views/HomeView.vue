<script setup>
//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";
import DefaultNavbar from "../examples/navbars/NavbarDefault.vue";

// image
const bgImage =
  "https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
</script>
<template>
  <header class="no-select">
    <DefaultNavbar
      :action="{
        route: 'javascript:;',
        label: 'Buy Now',
        color: 'btn-white',
      }"
      transparent
    />
    <div
      class="page-header min-vh-100"
      :style="{
        backgroundImage: `url(${bgImage})`,
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-5"></span>
      <div class="container">
        <div class="row">
          <div
            class="col-lg-6 col-md-7 d-flex justify-content-center flex-column"
          >
            <h1 class="text-white mb-4 gamja-flower-regular">그랭</h1>
            <p class="text-white opacity-8 lead pe-5 me-5 gamja-flower-regular">
              친구들과 여행 계획을 세우고 여행을 기록하세요♡
            </p>
            <div class="buttons">
              <RouterLink :to="{ name: 'signIn' }">
                <MaterialButton color="white" class="mt-4"
                  >Sign in</MaterialButton
                >
              </RouterLink>
              <RouterLink :to="{ name: 'signUp' }">
                <MaterialButton color="none" class="text-white shadow-none mt-4"
                  >Sign up</MaterialButton
                >
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.no-select {
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
