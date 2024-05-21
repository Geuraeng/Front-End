<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// example components
import DefaultNavbar from "../examples/navbars/NavbarDefault.vue";
import Header from "../examples/Header.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";

// sections
import Detail from "../components/CommunitySections/CommunityDetail.vue";
import CommentWrite from "@/components/CommunitySections/CommentWrite.vue";
// import CommunityComments from "@/components/CommunitySections/CommunityComments.vue";

// image
import image from "@/assets/img/city-profile.jpg";

const postId = ref(null);

// Access route params
const route = useRoute();
const postIdFromRoute = route.params.postId;

// Set postId value on component mount
onMounted(() => {
  postId.value = postIdFromRoute;
});
</script>

<template>
  <DefaultNavbar transparent />
  <Header>
    <div
      class="page-header min-height-400 text-center"
      :style="{ backgroundImage: `url(${image})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-8"></span>
      <div class="mt-8 mx-auto">
        <div class="flex-container">
          <Detail />
          <CommentWrite />
        </div>
        <!-- <CommunityComments /> -->
      </div>
    </div>
  </Header>
  <DefaultFooter />
</template>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-between;
  gap: 20px; /* Optional: add some space between the two components */
}

.flex-container > * {
  flex: 1;
}

/* 추가된 스타일 */
.comment-write {
  height: 1000px; /* 여기에 원하는 높이를 설정합니다 */
  overflow: auto; /* 필요에 따라 내용이 넘칠 경우 스크롤바를 표시합니다 */
}
</style>
