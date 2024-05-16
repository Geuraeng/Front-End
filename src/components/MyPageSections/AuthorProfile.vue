<script setup>
import { onMounted, ref} from "vue";
import { HttpStatusCode } from "axios"
import {useRouter} from "vue-router"

//Vue Material Kit 2 components
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// image
import profilePic from "@/assets/img/bruce-mars.jpg";

//api
import {getMyPage} from "@/api/user.js"

const userId = ref("")

onMounted(async () => {
  await getUserPage();
});

const getUserPage = async () => {
  await getMyPage(
    (response) => {
      if(response.status === HttpStatusCode.Ok){
        userId.value = response.data.userInfo.userId;
      }else{
        console.log("유저정보 없음")
      }
    },
    (error) => {
      console.log(error)
    }
  );
}

const router = useRouter()
const updateMypage = () =>{
  alert("페이지 이동")
  router.push({name: 'update', params: {userId: userId.value}})
}
</script>
<template>
  <section class="py-sm-7 py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-12 mx-auto">
          <div class="mt-n8 mt-md-n9 text-center">
            <div class="blur-shadow-avatar">
              <MaterialAvatar
                size="xxl"
                class="shadow-xl position-relative z-index-2"
                :image="profilePic"
                alt="Avatar"
              />
            </div>
          </div>
          <div class="row py-7">
            <div
              class="col-lg-7 col-md-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto"
            >
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h3 class="mb-0">{{ userId }}</h3>
                <div class="d-block">
                  <MaterialButton
                    class="text-nowrap mb-0"
                    variant="outline"
                    color="info"
                    size="sm"
                    >Follow</MaterialButton
                  >
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-auto">
                  <span class="h6 me-1">717</span>
                  <span>Posts</span>
                </div>
                <div class="col-auto">
                  <span class="h6 me-1">717</span>
                  <span>Followers</span>
                </div>
                <div class="col-auto">
                  <span class="h6 me-1">717</span>
                  <span>Following</span>
                </div>
              </div>
              <p class="text-lg mb-0">
                여행이 좋아
                <br /><br><a
                  @click="updateMypage"
                  class="text-info icon-move-right"
                  >프로필 수정하기
                  <i class="fas fa-arrow-right text-sm ms-1"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
