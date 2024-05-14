<script setup>
import { onMounted } from "vue";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import image from "@/assets/img/city-profile.jpg";

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
      :style="{ backgroundImage: `url(${image})` }"
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
                    Modify Profile
                  </h4>
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
                      >Modify</MaterialButton
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>
