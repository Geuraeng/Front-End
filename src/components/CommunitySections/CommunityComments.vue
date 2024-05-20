<script setup>
import {onMounted, ref} from "vue"
import { useRoute } from "vue-router";
import AboutUsOption from "./components/AboutUsOption.vue";
import { getCommentList } from "@/api/comment"

const route = useRoute()
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

</script>
<template>
  <section class="py-4">
    <div class="container">
      <div class="row position-relative text-white">
        <div class="mt-lg-0 mt-5 ps-lg-6 ps-0">
          <div v-for="(item, index) in commentInfo" :key="item.commentIdx">
            <AboutUsOption icon="mediation" :writer="item.commentWriter" :content="item.commentContent" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
