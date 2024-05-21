<script setup>
import { deleteCommentInfo, updateCommentInfo } from "@/api/comment";
import { httpStatusCode } from "@/util/http-status";
import { useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";

import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const props = defineProps({
  writer: {
    type: String,
  },
  content: {
    type: String,
  },
  regdate: {
    type: String,
  },
  commentIdx: {
    type: Number,
  },
});

const router = useRouter();

const deleteComment = (idx) => {
  if (confirm("삭제하시겠습니까? ")) {
    deleteCommentInfo(
      idx,
      (response) => {
        if (response.status == httpStatusCode.OK) {
          alert("댓글이 삭제 되었습니다.");
        } else {
          alert("오류가 발생했습니다 다시 해주세요");
        }
        router.replace({ name: "community" });
      },
      (error) => {
        alert("오류 발생");
      }
    );
  }
};

const info = ref({
  commentContent: "",
  commentIdx: "",
});
const modifyCheck = ref(true);
const name = ref("");

const showContent = (idx) => {
  modifyCheck.value = !modifyCheck.value;
  info.value.commentIdx = idx;
};

onMounted(() => {
  info.value.commentContent = props.content;
  name.value = props.writer;
});

const updateInfo = (idx) => {
  updateCommentInfo(
    idx,
    info.value,
    (response) => {
      if (response.status == httpStatusCode.OK) {
        alert("댓글이 수정 되었습니다.");
      } else {
        alert("오류가 발생했습니다 다시 해주세요");
      }
      router.replace({ name: "community" });
    },
    (error) => {
      alert("오류 발생");
    }
  );
};

const isUserAuthorized = computed(() => {
  return name.value === userInfo.value.userId;
});
</script>

<template>
  <div class="comments">
    <div class="comment">
      <div class="author-date">
        <span class="author">{{ writer }}</span>
        <span class="date">{{ regdate }}</span>
        <div class="buttons" v-if="isUserAuthorized">
          <button class="author-btn" @click="showContent(commentIdx)">수정</button>
          <button class="author-btn" @click="deleteComment(commentIdx)">삭제</button>
        </div>
      </div>
      <div class="comment-content" readonly>
        <textarea
          name="content"
          cols="70"
          rows="3"
          :readonly="modifyCheck"
          v-model="info.commentContent"
          style="border: none"
        />
      </div>
      <button v-if="!modifyCheck" @click="updateInfo(commentIdx)">수정완료</button>
    </div>
  </div>
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
  text-decoration: none; /* 기본적으로 밑줄 없앰 */
}

.author-btn:hover {
  text-decoration: underline; /* 마우스 호버 시 밑줄 추가 */
  color: red; /* 예시로 버튼 텍스트 색상을 빨간색으로 변경 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경하여 클릭 가능한 상태로 표시 */
}

.comment-content {
  margin-top: 10px; /* 댓글 내용 위의 간격 조정 */
  display: block;
  text-align: left;
}

.comment {
  width: 600px;
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
