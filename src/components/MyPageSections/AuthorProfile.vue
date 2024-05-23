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
              <p class="text-lg text-center mt-4 mb-0">
                <a @click="showModal = true" class="text-info icon-move-right"
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

  <!-- Modal -->
  <div v-if="showModal" class="modal-overlay" @click="showModal = false">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h4>My Profile</h4>
        <button class="close-button" @click="showModal = false">&times;</button>
      </div>
      <div class="modal-body">
        <form role="form" class="text-start" @submit.prevent="updateInfo">
          <label for="name" style="display: block; margin-bottom: 0">이름</label>
          <input
            type="text"
            id="name"
            style="
              background-color: #eee;
              border: none;
              padding: 7px 8px;
              margin: -2px 0 8px 0;
              width: 100%;
              border-radius: 10px;
            "
            v-model="userData.userName"
          />

          <label for="name" style="display: block; margin-bottom: 0">전화번호</label>
          <input
            type="text"
            id="name"
            style="
              background-color: #eee;
              border: none;
              padding: 7px 8px;
              margin: -2px 0 8px 0;
              width: 100%;
              border-radius: 10px;
            "
            v-model="userData.userTel"
          />

          <div class="text-center">
            <MaterialButton class="my-4 mb-2" variant="gradient" color="secondary" fullWidth
              >수정하기</MaterialButton
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

import profilePic from "@/assets/img/profile.png";
import Header from "@/examples/Header.vue";
import image from "@/assets/img/city-profile.jpg";
import MaterialButton from "@/components/MaterialButton.vue";
import { getMyPage } from "@/api/user.js";
import { HttpStatusCode } from "axios";

const memberStore = useMemberStore();
const { isDetailInfo } = storeToRefs(memberStore);
const { userDetailInfo, updateUserInfo } = memberStore;
const userData = ref("");
const showModal = ref(false);
const router = useRouter();
const userId = ref("");

onBeforeMount(() => {
  userDetailInfo().then(() => {
    userData.value = isDetailInfo._rawValue;
  });
});

const updateInfo = () => {
  updateUserInfo(userData.value);
  alert("수정 완료 되었습니다");
  showModal.value = false;
};

onMounted(async () => {
  await getUserPage();
});

const getUserPage = async () => {
  await getMyPage(
    (response) => {
      if (response.status === HttpStatusCode.Ok) {
        userId.value = response.data.userInfo.userId;
      } else {
        alert("유저 정보가 없습니다");
      }
    },
    (error) => {
      alert("error");
    }
  );
};
</script>

<style scoped>
section {
  background-color: #f6f8fa;
}

.text-info:hover {
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}

.modal-header h4 {
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
}

.close-button:hover {
  cursor: pointer;
  color: red;
}

.card-body {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>
