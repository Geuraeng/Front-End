<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import DefaultNavbar from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";

//image
import bg0 from "@/assets/img/bg9.jpg";

//dep
import Typed from "typed.js";

//sections
import Information from "../components/Sections/AboutInformation.vue";
import AboutTeam from "../components/Sections/AboutTeam.vue";
import PresentationInformation from "@/components/Sections/PresentationInformation.vue";
import PresentationTestimonials from "@/components/Sections/PresentationTestimonials.vue";

const body = document.getElementsByTagName("body")[0];
//hooks
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});
</script>
<template>
  <DefaultNavbar
    :action="{
      route: 'javascript:;',
      label: 'Buy Now',
      color: 'btn-white',
    }"
    transparent
  />
  <header class="bg-gradient-dark no-select">
    <div class="page-header min-vh-75" :style="{ backgroundImage: `url(${bg0})` }">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">Trip <span class="text-white" id="typed"></span></h1>
            <div id="typed-strings">
              <h1>Log</h1>
              <h1>History</h1>
              <h1>Record</h1>
            </div>
            <p class="lead mb-4 text-white opacity-8 gamja-flower-regular">
              친구들과 여행 계획을 세우고 여행을 기록하세요.
            </p>
            <RouterLink class="nav-link text-white" :to="{ name: 'planList' }">
              <button type="submit" class="btn bg-white text-dark">Create New Schedule</button>
            </RouterLink>
            <h6 class="text-white mb-2 mt-5"></h6>
            <div class="d-flex justify-content-center">
              <a href="https://github.com/Geuraeng"
                ><i class="fab fa-github text-lg text-white me-5"></i
              ></a>
              <a href="https://www.instagram.com/hellossafy/"
                ><i class="fab fa-instagram text-lg text-white me-5"></i
              ></a>
              <a href="https://www.youtube.com/channel/UC_XI3ByFO1uZIIH-g-zJZiw"
                ><i class="fab fa-youtube text-lg text-white me-3"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6 no-select">
    <PresentationInformation />
    <Information />
    <AboutTeam />
    <PresentationTestimonials />
  </div>
  <DefaultFooter />
</template>

<style>
.no-select {
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
