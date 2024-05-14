<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";
import { modifyArticle, detailArticle } from "@/api/board.js";

// image
import bgContact from "@/assets/img/examples/blog2.jpg";

//route
const route = useRoute();
const { boardId } = route.params;

//v-model
const info = ref({
  boardIdx: 0,
  boardTitle: "",
  boardContent: "",
  userId: "",
});

onMounted(() => {
  getArticle();
});

const getArticle = () => {
  detailArticle(
    boardId,
    ({ data }) => {
      console.log(data);
      info.value = data;
      console.log("여기" + info);
    },
    (error) => {
      console.log(error);
    }
  );
};
//alert function
const alertOk = () => {
  updateArticle();
};

function updateArticle() {
  // console.log(info.value.boardIdx + "번글 수정하자!!", info.value)
  modifyArticle(
    info.value,
    (response) => {
      let msg = "글수정 처리시 문제 발생했습니다.";
      if (response.status == 200) msg = "글정보 수정이 완료되었습니다.";
      alert(msg);
      moveList();
    },
    (error) => console.log(error)
  );
}

function moveList() {
  router.replace({ name: "community" });
}

// router
const router = useRouter();
const boardList = () => {
  router.replace({ name: "community" });
};
</script>
<template>
  <section class="py-lg-7">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card box-shadow-xl overflow-hidden mb-5">
            <div class="row">
              <div
                class="col-lg-5 position-relative bg-cover px-0"
                :style="{ backgroundImage: `url(${bgContact})` }"
                loading="lazy"
              >
                <div
                  class="z-index-2 text-center d-flex h-100 w-100 d-flex m-auto justify-content-center"
                >
                  <div class="mask bg-gradient-dark opacity-8"></div>
                  <div
                    class="p-5 ps-sm-8 position-relative text-start text-center my-auto z-index-2"
                  >
                    <h3 class="text-white">사진</h3>
                  </div>
                </div>
              </div>
              <div class="col-lg-7">
                <form class="p-3" id="contact-form" @submit.prevent="alertOk" method="post">
                  <div class="card-header px-4 py-sm-5 py-3">
                    <h2>View Post</h2>
                    <p class="lead">글 수정하기</p>
                  </div>
                  <div class="card-body pt-1">
                    <div class="row">
                      <div class="col-md-12 pe-2 mb-3">
                        <input
                          class="input-group-static mb-4"
                          label="Title"
                          type="text"
                          placeholder="제목"
                          v-model="info.boardTitle"
                        />
                      </div>
                      <div class="col-md-12 pe-2 mb-3">
                        <input
                          class="input-group-static mb-4"
                          label="Writer"
                          type="text"
                          placeholder="작성자"
                          disabled
                          v-model="info.userId"
                        />
                      </div>
                      <div class="col-md-12 pe-2 mb-3">
                        <textarea
                          class="input-group-static mb-4"
                          placeholder="내용"
                          :rows="6"
                          v-model="info.boardContent"
                        ></textarea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 text-end ms-auto">
                        <MaterialButton
                          variant="gradient"
                          color="info"
                          type="submit"
                          class="mb-0 mx-2"
                          >완료</MaterialButton
                        >
                        <MaterialButton
                          variant="gradient"
                          color="light"
                          type="submit"
                          class="mb-0"
                          @click="boardList"
                          >목록</MaterialButton
                        >
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
