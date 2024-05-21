<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { postCommentInfo } from "@/api/comment";
import { httpStatusCode } from "@/util/http-status";
import CommunityComments from "@/components/CommunitySections/CommunityComments.vue";

const route = useRoute();
const router = useRouter();
const boardId = route.params.boardId;
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const info = ref({
  commentId: "",
  commentContent: "",
  boardIdx: "",
});

const commentSave = () => {
  info.value.commentId = userInfo.value.userId;
  info.value.boardIdx = boardId;
  inputComment();
};

const inputComment = () => {
  postCommentInfo(
    boardId,
    info.value,
    (response) => {
      if (httpStatusCode.OK == response.status) {
        alert("댓글을 달았습니다");
      } else {
        alert("다시 시도해주세요");
      }
      router.replace({ name: "community" });
    },
    (error) => {
      alert("다시 시도해주세요");
      router.replace({ name: "community" });
    }
  );
};
</script>

<template>
  <section class="py-lg-7">
    <div class="card box-shadow-xl overflow-hidden mb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12 m-auto position-relative">
            <div class="comment-section">
              <div class="comment-form">
                <textarea placeholder="댓글을 입력하세요." v-model="info.commentContent"></textarea>
                <button type="button" @click="commentSave">등록</button>
              </div>

              <CommunityComments />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comment {
  justify-content: space-between;
  align-items: center;
}

.author-date {
  display: flex;
  display: flex;
  align-items: center;
}

.author-date .author {
  font-weight: bold;
  margin-right: 10px; /* 작성자 이름과 작성 날짜 사이의 간격 조정 */
}

.buttons {
  display: flex;
  margin-right: 100px;
}
.author-btn {
  background-color: transparent;
  border: none;
  padding: 0;
  font-size: inherit;
  margin-left: 15px;
}

.comment-content {
  margin-top: 10px; /* 댓글 내용 위의 간격 조정 */
  display: block;
  text-align: left;
}

.comment-section {
  width: 600px;
  height: 650px;
  margin: 0 auto;
  max-height: 650px; /* Set the maximum height */
  overflow-y: auto; /* Add vertical scroll if content exceeds max-height */
}

/* Hide scrollbar for WebKit-based browsers */
.comment-section::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for other browsers */
.comment-section {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.comment-form {
  margin-top: 20px;
  display: flex; /* Use flexbox to align items */
  flex-direction: column; /* Align children vertically */
}

.comment-form textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px; /* Add some space between textarea and button */
}

.comment-form button {
  align-self: flex-end; /* Align button to the right */
  padding: 10px 20px;
}

.comments {
  margin-top: 20px; /* Add some space between form and comments */
}

.comment {
  border-top: 1px solid #ddd;
  padding-top: 20px;
  margin-top: 20px;
}

.comment .author {
  font-weight: bold;
}

.comment .date {
  color: #777;
}

.comment .content {
  margin-top: 10px;
}
</style>
