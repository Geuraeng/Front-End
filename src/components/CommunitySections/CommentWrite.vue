<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { postCommentInfo } from "@/api/comment"
import { httpStatusCode } from "@/util/http-status";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

const route = useRoute()
const router = useRouter()
const boardId = route.params.boardId;
const memberStore = useMemberStore();
const { userInfo} = storeToRefs(memberStore);

const info = ref({
  commentId:"",
  commentContent:"",
  boardIdx: ""
});

const commentInput = (input) =>{
  info.value.commentContent = input
}

const commentSave = () =>{
  info.value.commentId = userInfo.value.userId
  info.value.boardIdx = boardId
  inputComment()
}

const inputComment = () => {
  postCommentInfo(
    boardId, info.value,
    (response) => {
      if(httpStatusCode.OK == response.status){
        alert("댓글을 달았습니다")
      }else{
        alert("다시 시도해주세요")
      }
      router.replace({name : 'community'})
    },
    (error) => {
      alert("다시 시도해주세요")
      router.replace({name : 'community'})
    }
  );
};

</script>
<template>
  <section class="my-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12 m-auto position-relative">
          <h4 class="mb-4 text-white">Comment</h4>
          <div class="row justify-content-center">
            <div class="col-8">
              <MaterialInput
                class="input-group-outline"
                id="email"
                :label="{ class: 'form-label' }"
                type="email"
                placeholder="댓글을 작성하세요."
                color="aliceblue"
                @my-change="commentInput"
              />
            </div>
            <div class="col-2 ps-0">
              <MaterialButton
                variant="gradient"
                color="info"
                class="mb-0 h-100 position-relative z-index-2"
                @click="commentSave"
                >Submit</MaterialButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
