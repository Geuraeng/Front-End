// src/store/posts.js
import { defineStore } from "pinia";

export const usePostsStore = defineStore({
  id: "posts",
  state: () => ({
    posts: [],
  }),
  actions: {
    setPosts(posts) {
      this.posts = posts;
    },
  },
});
