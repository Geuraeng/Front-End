<script setup>
import { onMounted } from "vue";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <!-- <DefaultNavbar transparent /> -->
  <Header>
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)'
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
              >
                <div
                  class="bg-gradient-info shadow-info border-radius-lg py-3 pe-1"
                >
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    Sign Up
                  </h4>
                  <div class="row mt-3">
                    <div class="col-2 text-center ms-auto">
                      <a class="btn btn-link px-3" href="javascript:;">
                        <i class="fa fa-facebook text-white text-lg"></i>
                      </a>
                    </div>
                    <div class="col-2 text-center px-1">
                      <a class="btn btn-link px-3" href="javascript:;">
                        <i class="fa fa-github text-white text-lg"></i>
                      </a>
                    </div>
                    <div class="col-2 text-center me-auto">
                      <a class="btn btn-link px-3" href="javascript:;">
                        <i class="fa fa-google text-white text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start">
                  <MaterialInput
                    id="userId"
                    class="input-group-outline my-3"
                    :label="{ text: 'ID', class: 'form-label' }"
                    type="userId"
                  />
                  <MaterialInput
                    id="userPw"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Password', class: 'form-label' }"
                    type="userPw"
                  />
                  <MaterialInput
                    id="userName"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Name', class: 'form-label' }"
                    type="userName"
                  />
                  <MaterialInput
                    id="userTel"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Phone Number', class: 'form-label' }"
                    type="userTel"
                  />
                  <MaterialInput
                    id="zipCode"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Zip Code', class: 'form-label' }"
                    type="zipCode"
                  />
                  <MaterialInput
                    id="userAddress"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Address', class: 'form-label' }"
                    type="userAddress"
                  />
                  <MaterialInput
                    id="userAddressDetail"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Address Detail', class: 'form-label' }"
                    type="userAddressDetail"
                  />
                  <MaterialInput
                    id="userProfile"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Profile', class: 'form-label' }"
                    type="userProfile"
                  />
                  

                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="info"
                      fullWidth
                      >Sign Up</MaterialButton
                    >
                  </div>
                  <p class="mt-4 text-sm text-center">
                    Already have an account?
                    <a
                      href="/signIn"
                      class="text-info text-gradient font-weight-bold"
                      >Sign In</a
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer position-absolute bottom-2 py-2 w-100">
        <div class="container">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-12 col-md-6 my-auto">
              <div
                class="copyright text-center text-sm text-white text-lg-start"
              >
                © {{ new Date().getFullYear() }}, made with SSAFY 11th
                <i class="fa fa-heart" aria-hidden="true"></i> 
                조영서, 최태민
              </div>
            </div>
            <div class="col-12 col-md-6">
              <ul
                class="nav nav-footer justify-content-center justify-content-lg-end"
              >
                <li class="nav-item">
                  <a
                    href="https://www.ssafy.com/"
                    class="nav-link text-white"
                    target="_blank"
                    >SSAFY</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link text-white"
                    target="_blank"
                    >About Us</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link text-white"
                    target="_blank"
                    >YoungSeo GitHub</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link pe-0 text-white"
                    target="_blank"
                    >TaeMin GitHub</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </Header>
</template>
