<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import {useRouter} from "vue-router"
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

// example components
import Header from "@/examples/Header.vue";
import image from "@/assets/img/city-profile.jpg";

//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";

const memberStore = useMemberStore();
const { isDetailInfo } = storeToRefs(memberStore);
const { userDetailInfo, updateUserInfo } = memberStore;
const userData = ref("");
const router = useRouter()

onBeforeMount(() => {
  userDetailInfo().then(() => {
    userData.value = isDetailInfo._rawValue;
  });
});

const updateInfo = () =>{
  updateUserInfo(userData.value)
  alert("수정 완료 되었습니다")
  router.replace({name: 'myPage'})
}
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
                <form role="form" class="text-start" @submit.prevent="updateInfo">
                  <label for="name" style="display: block; margin-bottom: 0;">Name</label>
                  <input type="text" id="name" style="background-color: #eee;
                    border: none;
                    padding: 7px 8px;
                    margin: -2px 0 8px 0;
                    width: 100%;
                    border-radius: 10px;" v-model="userData.userName">

                  <label for="name" style="display: block; margin-bottom: 0;">Tel</label>
                  <input type="text" id="name" style="background-color: #eee;
                    border: none;
                    padding: 7px 8px;
                    margin: -2px 0 8px 0;
                    width: 100%;
                    border-radius: 10px;" v-model="userData.userTel">
                    
                  <label for="name" style="display: block; margin-bottom: 0;">Zip</label>
                  <input type="text" id="name" style="background-color: #eee;
                    border: none;
                    padding: 7px 8px;
                    margin: -2px 0 8px 0;
                    width: 100%;
                    border-radius: 10px;" v-model="userData.zipCode">

                  <label for="name" style="display: block; margin-bottom: 0;">Address</label>
                  <input type="text" id="name" style="background-color: #eee;
                    border: none;
                    padding: 7px 8px;
                    margin: -2px 0 8px 0;
                    width: 100%;
                    border-radius: 10px;" v-model="userData.userAddress">

                  <label for="name" style="display: block; margin-bottom: 0;">Detail Address</label>
                  <input type="text" id="name" style="background-color: #eee;
                    border: none;
                    padding: 7px 8px;
                    margin: -2px 0 8px 0;
                    width: 100%;
                    border-radius: 10px;" v-model="userData.userAddressDetail">

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
