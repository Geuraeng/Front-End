<template>
  
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">Youtube V-log</h3>
          <p class="text-white opacity-8 mb-0">
            최근 국내 여행 브이로그를 조회할 수 있습니다.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="search-container">
    <div v-if="videoList.length > 0" class="video-list">
      <div v-for="(video, index) in videoList" :key="index" class="video-item">
        <img :src="video.snippet.thumbnails.medium.url" :alt="video.snippet.title" class="thumbnail" />
        <div class="video-info">
          <h2 class="video-title text-light">{{ video.snippet.title }}</h2>
          <p class="video-description text-light">{{ video.snippet.description }}</p>
          <p class="video-channel text-light">{{ video.snippet.channelTitle }}</p>
          <p class="video-date text-light">{{ formatDate(video.snippet.publishedAt) }}</p>
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue';
import axios from "axios";

const YOUTUBE_API_KEY = "API_KEY"; // 실제 YouTube API 키로 대체
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

export default {
  name: "SearchBar",
  data() {
    return {
      searchHistory: [],
      videoList: [],
    };
  },
  methods: {
    async fetchVideos(keyword) {
      this.addToSearchHistory(keyword);
      const config = {
        params: {
          part: "snippet",
          type: "video",
          q: keyword,
          key: YOUTUBE_API_KEY,
        },
      };
      try {
        const response = await axios.get(YOUTUBE_API_URL, config);
        this.videoList = response.data.items;
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    },
    addToSearchHistory(keyword) {
      if (!this.searchHistory.includes(keyword)) {
        this.searchHistory.unshift(keyword);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  },
  mounted() {
    // 컴포넌트가 마운트될 때 기본 검색어로 동영상 목록을 가져옴
    this.fetchVideos("국내 여행 브이로그");
  }
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

.video-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.video-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}

.thumbnail {
  width: 320px;
  height: 180px;
  object-fit: cover;
}

.video-info {
  flex: 1;
}

.video-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.video-description {
  font-size: 14px;
  margin: 10px 0;
  color: #555;
}

.video-channel,
.video-date {
  font-size: 12px;
  color: #888;
}
</style>
