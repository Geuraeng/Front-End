<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
// example components
import DefaultNavbar from "../examples/navbars/NavbarDefault.vue";
import Header from "../examples/Header.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";

// sections
import Profile from "../components/CommunitySections/AuthorProfile.vue";
import Pagination from "../components/CommunitySections/PaginationView.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// image
import image from "@/assets/img/city-profile.jpg";

const posts = ref([]);

onMounted(() => {
  try {
    axios.get("http://localhost:8089/board/list").then((response) => {
      posts.value = response.data.boardList;
    });
    // boardList만 가져와서 할당합니다.
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});
console.log("목록");
</script>
<template>
  <DefaultNavbar transparent />
  <Header>
    <div
      class="page-header min-height-400 d-flex justify-content-center align-items-center position-relative"
      :style="{ backgroundImage: `url(${image})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-8"></span>
      <div class="text-center">
        <h1 class="mx-5 opacity-8 text-white">Community</h1>
        <br />
        <RouterLink :to="{ name: 'communityWrite' }">
          <MaterialButton variant="outline" color="light" class="w-auto me-2"
            >글 작성</MaterialButton
          >
        </RouterLink>
      </div>
    </div>
  </Header>
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6 mb-4">
    <Profile v-for="(post, index) in posts" :key="index" :post="post" />
    <Pagination />
  </div>
  <DefaultFooter />
</template>
