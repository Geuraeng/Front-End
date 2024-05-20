<script setup>
import {onMounted, ref} from "vue"
import { useRoute, useRouter } from "vue-router";
import AboutUsOption from "./components/AboutUsOption.vue";
import { getCommentList, deleteCommentInfo } from "@/api/comment"
import { httpStatusCode } from "@/util/http-status"

import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const route = useRoute()
const router = useRouter()
const boardId = route.params.boardId;

const commentInfo = ref()

onMounted(()=>{
  commentList();
})
const commentList = () => {
  getCommentList(
    boardId,
    ({ data }) => {
      commentInfo.value = data.commentInfo;
    },
    (error) => {
      console.log(error);
    }
  );
};

const checkUserId = (commendId) =>{
  if(userInfo.value.userId == commendId){
    return true
  }
}

const deleteComment = (idx) =>{
  if(confirm("삭제하시겠습니까? ")){
    deleteCommentInfo(
    idx,
    ( response ) => {
      if(response.status == httpStatusCode.OK){
        alert("댓글이 삭제 되었습니다.")
      }else{
        alert("오류가 발생했습니다 다시 해주세요")
      }
      router.replace({name : "community"})
    },
    (error) => {
      alert("오류 발생")
    }
    );
  }
}

</script>
<template>
  <section class="py-4">
    <div class="container">
      <div class="row position-relative text-white">
        <div class="mt-lg-0 mt-5 ps-lg-6 ps-0">
          <div v-for="(item, index) in commentInfo" :key="item.commentIdx" class="d-flex align-items-center justify-content-between mb-3">
            <AboutUsOption icon="mediation" :writer="item.commentWriter" :content="item.commentContent" />
            <div class="ms-3" v-if="checkUserId(item.commentId)">
              <button class="btn btn-primary me-2">수정</button>
              <button class="btn btn-danger" @click="deleteComment(item.commentIdx)">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
