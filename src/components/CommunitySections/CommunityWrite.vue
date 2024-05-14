<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
//Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";

// image
import bgContact from "@/assets/img/examples/blog2.jpg";

// tooltip
import setTooltip from "@/assets/js/tooltip";

// store
import { useAppStore } from "@/stores";
const store = useAppStore();

//api
import { registArticle } from "@/api/board.js";

onMounted(() => {
  setTooltip(store.bootstrap);
});

const WInfo = ref({
  boardTitle: "",
  boardContent: "",
  boardRegDate: "",
  userId: "",
});

const titleInput = (input) => {
  console.log(input);
  WInfo.value.boardTitle = input;
};
const contentInput = (input) => {
  WInfo.value.boardContent = input;
};

const userInput = (input) => {
  WInfo.value.userId = input;
};

const writeSbmit = () => {
  writeArticle();
};

function writeArticle() {
  console.log("글등록하자!!", WInfo.value);
  registArticle(
    WInfo.value,
    (response) => {
      let msg = "글등록 처리시 문제 발생했습니다.";
      if (response.status == 201) msg = "글등록이 완료되었습니다.";
      alert(msg);
      moveList();
    },
    (error) => console.log(error)
  );
}

//router
// router
const router = useRouter();
const moveList = () => {
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
                    <h3 class="text-white">사진 추가하기</h3>
                    <p class="text-white opacity-8 mb-4">올리고 싶은 사진을 추가하세요.</p>
                    <div class="mt-4 text-center">
                      <!-- <MaterialButton variant="outline" color="light" class="w-auto me-2"
                        >파일 업로드</MaterialButton
                      > -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-7">
                <form class="p-3" id="contact-form" method="post" @submit.prevent="writeSbmit">
                  <div class="card-header px-4 py-sm-5 py-3">
                    <h2>Write Page</h2>
                    <p class="lead">다른 여행자와 공유할 정보를 작성하세요.</p>
                  </div>
                  <div class="card-body pt-1">
                    <div class="row">
                      <div class="col-md-12 pe-2 mb-3">
                        <MaterialInput
                          class="input-group-static mb-4"
                          label="Title"
                          type="text"
                          placeholder="제목을 입력하세요."
                          @my-change="titleInput"
                        />
                      </div>
                      <div class="col-md-12 pe-2 mb-3">
                        <MaterialInput
                          class="input-group-static mb-4"
                          label="Writer"
                          type="text"
                          placeholder="작성자를 입력하세요."
                          @my-change="userInput"
                        />
                      </div>
                      <div class="col-md-12 pe-2 mb-3">
                        <MaterialTextArea
                          class="input-group-static mb-4"
                          placeholder="내용을 입력하세요."
                          :rows="6"
                          @my-change="contentInput"
                          >Content</MaterialTextArea
                        >
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 text-end ms-auto">
                        <MaterialButton variant="gradient" color="info" type="submit" class="mb-0"
                          >Submit</MaterialButton
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
