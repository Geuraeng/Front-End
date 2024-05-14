<script setup>
// example components
import DefaultNavbar from "../examples/navbars/NavbarDefault.vue";
import Header from "../examples/Header.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";

// sections
import Write from "../components/CommunitySections/CommunityWrite.vue";

// image
import image from "@/assets/img/city-profile.jpg";
</script>
<template>
  <DefaultNavbar transparent />
  <Header>
    <div
      class="page-header min-height-400"
      :style="{ backgroundImage: `url(${image})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-8"></span>
      <div class="mt-4 mx-auto">
        <Write />
      </div>
    </div>
  </Header>
  <DefaultFooter />
</template>
