<script setup>
import logoDark from "@/assets/img/logo-ct-dark.png";
defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "SSAFY 11th 조영서, 최태민",
      logo: logoDark,
      route: "/",
    }),
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://github.com/Geuraeng",
      },
      {
        icon: '<i class="fab fa-instagram text-lg opacity-8"></i>',
        link: "https://www.instagram.com/hellossafy/",
      },
      {
        icon: '<i class="fab fa-youtube text-lg opacity-8"></i>',
        link: "https://www.youtube.com/channel/UC_XI3ByFO1uZIIH-g-zJZiw",
      },
    ],
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String,
    },
    default: () => [
      {
        name: "",
        items: [
          {
            name: "",
            href: "",
          },
          {
            name: "",
            href: "",
          },
          {
            name: "",
            href: "",
          },
        ],
      },
      {
        name: "TEAM",
        items: [
          {
            name: "SSAFY",
            href: "https://www.ssafy.com/",
          },
          {
            name: "About Us",
            href: "https://github.com/Geuraeng",
          },
          {
            name: "YoungSeo Github",
            href: "https://github.com/ch00me",
          },
          { name: "Taemin Github", href: "https://github.com/tam31" },
        ],
      },
      {
        name: "MENU",
        items: [
          { name: "Home", href: "/" },
          {
            name: "My Plan",
            href: "/plan/list",
          },
          {
            name: "Community",
            href: "/community",
          },
          {
            name: "My Page",
            href: "/myPage",
          },
        ],
      },
      {
        name: "Project",
        items: [
          {
            name: "Front-End",
            href: "https://github.com/Geuraeng/Front-End",
          },
          {
            name: "Back-End",
            href: "https://github.com/Geuraeng/Back-End",
          },
          {
            name: "GIT",
            href: "https://github.com/Geuraeng",
          },
        ],
      },
    ],
  },
});
</script>
<template>
  <footer class="footer pt-5 mt-5 no-select">
    <div class="container">
      <div class="row">
        <div class="col-md-3 mb-4 ms-auto">
          <div>
            <a :href="brand.route">
              <img :src="brand.logo" class="mb-3 footer-logo" alt="main_logo" />
            </a>
            <h6 class="font-weight-bolder mb-4">{{ brand.name }}</h6>
          </div>
          <div>
            <ul class="d-flex flex-row ms-n3 nav">
              <li
                class="nav-item"
                v-for="{ icon, link } of socials"
                :key="link"
              >
                <a
                  class="nav-link pe-1"
                  :href="link"
                  target="_blank"
                  v-html="icon"
                >
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-md-2 col-sm-6 col-6 mb-4"
          v-for="{ name, items } of menus"
          :key="name"
        >
          <h6 class="text-sm">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item" v-for="item of items" :key="item.name">
              <a class="nav-link" :href="item.href" target="_blank">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <div class="col-12">
          <div class="text-center">
            <p class="text-dark my-4 text-sm font-weight-normal">
              Copyright ©
              {{ new Date().getFullYear() }}
              by SSAFY 11th 조영서, 최태민
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
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
