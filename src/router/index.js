import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";
import MainView from "../views/MainView.vue";
import MyPageView from "../views/MyPageView.vue";
import MyPageUpdateView from "../views/MyPageUpdateView.vue";
import CommunityView from "../views/CommunityView.vue";
import CommunityWriteView from "../views/CommunityWriteView.vue";
import CommunityDetailView from "../views/CommunityDetailView.vue";
import CommunityAlertView from "@/views/CommunityAlertView.vue";
import PlanListView from "@/views/PlanListView.vue";
import PlanDetailView from "@/views/PlanDetailView.vue";
import OpenAIView from "@/views/OpenAIView.vue";

import { storeToRefs } from "pinia";

import { useMemberStore } from "@/stores/member";

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore();
  const { userInfo, isValidToken } = storeToRefs(memberStore);
  const { getUserInfo } = memberStore;

  let token = sessionStorage.getItem("accessToken");

  if (userInfo.value != null && token) {
    await getUserInfo(token);
  }
  if (!isValidToken.value || userInfo.value === null) {
    alert("다시 로그인을 해주세요");
    next({ name: "signIn" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signIn",
      name: "signIn",
      component: SignInView,
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUpView,
    },
    {
      path: "/main",
      name: "main",
      component: MainView,
    },
    {
      path: "/myPage",
      name: "myPage",
      beforeEnter: onlyAuthUser,
      component: MyPageView,
    },
    {
      path: "/myPage/update",
      name: "update",
      component: MyPageUpdateView,
    },
    {
      path: "/community",
      name: "community",
      component: CommunityView,
    },
    {
      path: "/communityWrite",
      name: "communityWrite",
      beforeEnter: onlyAuthUser,
      component: CommunityWriteView,
    },
    {
      path: "/community/detail/:boardId",
      name: "communityDetail",
      component: CommunityDetailView,
    },
    {
      path: "/community/alert/:boardId",
      name: "boardAlert",
      component: CommunityAlertView,
    },
    {
      path: "/plan/list",
      name: "planList",
      beforeEnter: onlyAuthUser,
      component: PlanListView,
    },
    {
      path: "/plan/detail/:planIdx",
      name: "planDetail",
      component: PlanDetailView,
    },
    {
      path: "/openAI",
      name: "openAI",
      component: OpenAIView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 2 };
    }
  },
});

export default router;
