<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// example components
import DefaultNavbar from "../examples/navbars/NavbarDefault.vue";
import Header from "../examples/Header.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";

// sections
import Alert from "@/components/CommunitySections/CommunityAlert.vue";

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
      <div class="mt-4 mx-auto">
        <Alert/>
      </div>
    </div>
  </Header>
  <DefaultFooter />
</template>
