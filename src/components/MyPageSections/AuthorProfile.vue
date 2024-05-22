<template>
  <section class="py-5 position-relative">
    <div class="container">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <div class="text-center">
            <div class="position-relative" style="margin-top: -6rem">
              <img
                :src="profilePic"
                class="img-fluid rounded-circle shadow-lg"
                alt="Profile Picture"
                style="width: 180px"
              />
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-8 mx-auto">
              <h2 class="text-center">{{ userId }}</h2>
              <div class="row mt-4">
                <div class="col-md-4 text-center">
                  <h5>Posts</h5>
                  <p class="mb-0">717</p>
                </div>
                <div class="col-md-4 text-center">
                  <h5>Followers</h5>
                  <p class="mb-0">717</p>
                </div>
                <div class="col-md-4 text-center">
                  <h5>Following</h5>
                  <p class="mb-0">717</p>
                </div>
              </div>
              <p class="text-lg text-center mt-4 mb-0">
                <a @click="updateMypage" class="text-info icon-move-right"
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

<script setup>
import { onMounted, ref } from "vue";
import { HttpStatusCode } from "axios";
import { useRouter } from "vue-router";

// 이미지
import profilePic from "@/assets/img/profile.png";

// api
import { getMyPage } from "@/api/user.js";

const userId = ref("");

onMounted(async () => {
  await getUserPage();
});

const getUserPage = async () => {
  await getMyPage(
    (response) => {
      if (response.status === HttpStatusCode.Ok) {
        userId.value = response.data.userInfo.userId;
      } else {
        console.log("유저정보 없음");
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

const router = useRouter();
const updateMypage = () => {
  router.push({ name: "update" });
};
</script>

<style scoped>
section {
  background-color: #f6f8fa;
}

.btn-outline-info {
  color: #0366d6;
  border-color: #0366d6;
}

.btn-outline-info:hover {
  color: #fff;
  background-color: #0366d6;
  border-color: #0366d6;
}

.card-body {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>
