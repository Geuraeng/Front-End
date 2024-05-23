<template>
  <section class="pb-5 position-relative mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-3 mt-5">
          <h3 class="z-index-1 position-relative">Daum Blog</h3>
          <p class="opacity-8 mb-0">국내 여행 관련 게시물을 검색할 수 있습니다.</p>
        </div>
      </div>
      <div class="row">
        <div class="search-container">
          <input
            type="text"
            v-model="keyword"
            @keyup.enter="searchBlogs"
            placeholder="검색어를 입력하세요..."
            class="search-input"
          />
          <div v-if="blogs.length > 0" class="blog-list">
            <div v-for="(blog, index) in blogs" :key="index" class="blog-item">
              <a :href="blog.url" target="_blank" class="blog-link">
                <img
                  :src="blog.thumbnail"
                  alt="thumbnail"
                  class="blog-thumbnail"
                  v-if="blog.thumbnail"
                />
                <div class="blog-content">
                  <h2 class="blog-title" v-html="blog.title"></h2>
                  <p class="blog-contents" v-html="blog.contents"></p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "BlogSearch",
  data() {
    return {
      keyword: "국내 여행지 추천",
      blogs: [],
    };
  },
  methods: {
    async searchBlogs() {
      if (!this.keyword) return;

      const config = {
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_OPEN_API_REST_KEY}`,
        },
        params: {
          query: this.keyword,
        },
      };

      try {
        const response = await axios.get("https://dapi.kakao.com/v2/search/blog", config);
        this.blogs = response.data.documents;
      } catch (error) {
        alert("error");
      }
    },
  },
  mounted() {
    this.searchBlogs();
  },
};
</script>

<style>
.search-container {
  padding: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.blog-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: box-shadow 0.3s;
}

.blog-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.blog-thumbnail {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.blog-content {
  flex: 1;
}

.blog-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px;
}

.blog-contents {
  font-size: 14px;
  color: #555;
  margin: 0 0 10px;
}

.blog-link {
  font-size: 14px;
  color: #1a73e8;
  text-decoration: none;
}

.blog-link:hover {
  text-decoration: underline;
}
</style>
