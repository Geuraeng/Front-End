<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import Header from "@/examples/Header.vue";
import image from "@/assets/img/city-profile.jpg";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const memberStore = useMemberStore();
const { isDetailInfo } = storeToRefs(memberStore);
const { userDetailInfo } = memberStore;
const userData = ref({
  userId: "",
});

onBeforeMount(() => {
  userDetailInfo().then(() => {
    userData.value = isDetailInfo._rawValue;
    // userData.value.userId = isDetailInfo._rawValue.userId;
    // userData.value.userName = isDetailInfo._rawValue.userName;
    // userData.value.userTel = isDetailInfo._rawValue.userTel;
    console.log(1111);
    console.log(userData.value.userId);
    console.log(isDetailInfo._rawValue);
  });
});

const userIdInput = (input) => {
  // userData.value.userId = input;
  console.log(22222);
  console.log(input);
};
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
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div class="bg-gradient-info shadow-info border-radius-lg py-3 pe-1">
                  <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                    Modify Profile
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start">
                  <input type="text" v-model="userData.userId" />
                  <!-- <input type="text" v-model="userData.userName" /> -->
                  <MaterialInput
                    id="userId"
                    class="input-group-outline my-3"
                    :label="{ class: 'form-label' }"
                    type="userId"
                    @my-change="userIdInput"
                  />
                  <MaterialInput
                    id="userName"
                    class="input-group-outline mb-3"
                    :label="{ class: 'form-label' }"
                    placeholder="Name"
                    type="userName"
                  />
                  <MaterialInput
                    id="userTel"
                    class="input-group-outline mb-3"
                    :label="{ class: 'form-label' }"
                    placeholder="Phone Number"
                    type="userTel"
                  />
                  <MaterialInput
                    id="zipCode"
                    class="input-group-outline mb-3"
                    :label="{ class: 'form-label' }"
                    placeholder="Zip Code"
                    type="zipCode"
                  />
                  <MaterialInput
                    id="userAddress"
                    class="input-group-outline mb-3"
                    :label="{ class: 'form-label' }"
                    placeholder="Address"
                    type="userAddress"
                  />
                  <MaterialInput
                    id="userAddressDetail"
                    class="input-group-outline mb-3"
                    :label="{ class: 'form-label' }"
                    placeholder="Address Detail"
                    type="userAddressDetail"
                  />
                  <MaterialInput
                    id="userProfile"
                    class="input-group-outline mb-3"
                    :label="{ class: 'form-label' }"
                    placeholder="Profile"
                    type="userProfile"
                  />

                  <div class="text-center">
                    <MaterialButton class="my-4 mb-2" variant="gradient" color="info" fullWidth
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
