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
      component: PlanListView,
    },
    {
      path: "/plan/detail",
      name: "planDetail",
      component: PlanDetailView,
    },
  ],
});

export default router;
