<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCommentList, deleteCommentInfo } from "@/api/comment";

import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import CommentInfo from "./components/CommentInfo.vue";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const route = useRoute();
const boardId = route.params.boardId;

const commentInfo = ref();

onMounted(() => {
  commentList();
});
const commentList = () => {
  getCommentList(
    boardId,
    ({ data }) => {
      commentInfo.value = data.commentInfo;
    },
    (error) => {
      alert("error");
    }
  );
};

const checkUserId = (commendId) => {
  if (userInfo.value.userId == commendId) {
    return true;
  }
};
</script>
<template>
  <div
    v-for="(item, index) in commentInfo"
    :key="item.commentIdx"
    class="d-flex align-items-center justify-content-between mb-3"
  >
    <CommentInfo
      :writer="item.commentWriter"
      :content="item.commentContent"
      :regdate="item.commentRegDate"
      :commentIdx="item.commentIdx"
    />
  </div>
</template>
