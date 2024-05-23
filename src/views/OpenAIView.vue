<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 mt-5">
        <div class="card">
          <div class="card-header bg-dark text-white">여행GPT</div>
          <div class="card-body">
            <div v-for="(msg, index) in messages" :key="index" class="mb-3">
              <div :class="msg.role === 'user' ? 'text-end' : 'text-start'">
                <span :class="msg.role === 'user' ? 'badge bg-primary' : 'badge bg-secondary'">{{
                  msg.role
                }}</span>
                <div
                  :class="
                    msg.role === 'user'
                      ? 'alert alert-primary d-inline-block ml-2 text-white'
                      : 'alert alert-secondary d-inline-block mr-2 text-white'
                  "
                >
                  {{ msg.content }}
                </div>
              </div>
            </div>
            <div v-if="loading" class="text-center">
              <img src="@/assets/img/loading.gif" alt="Loading..." />
            </div>
          </div>

          <div class="card-footer" style="border-top: 1px solid lightgray">
            <div class="mb-2 align-items-center text-center">
              <div class="d-flex">
                <select
                  v-model="selectedProvince"
                  @change="onProvinceChange"
                  class="form-select form-select-sm me-2"
                >
                  <option disabled value="">도를 선택하세요</option>
                  <option
                    v-for="province in Object.keys(locations)"
                    :key="province"
                    :value="province"
                  >
                    {{ province }}
                  </option>
                </select>
                <select
                  v-model="selectedCity"
                  class="form-select form-select-sm me-2"
                  :disabled="!selectedProvince"
                >
                  <option disabled value="">시/군을 선택하세요</option>
                  <option v-for="city in sortedCities" :key="city" :value="city">
                    {{ city }}
                  </option>
                </select>
              </div>
              <br />
              <div class="btn-group btn-group-sm" role="group">
                <button class="btn btn-outline-dark" @click="setCategory('여행 계획')">
                  여행 계획
                </button>
                <button class="btn btn-outline-dark" @click="setCategory('추천 음식')">
                  추천 음식
                </button>
                <button class="btn btn-outline-dark" @click="setCategory('추천 활동')">
                  추천 활동
                </button>
              </div>
            </div>
            <div class="d-flex">
              <input
                v-model="userInput"
                @keyup.enter="sendMessage"
                placeholder="여행 관련 내용을 입력하세요"
                class="form-control"
              />
              <button class="btn btn-dark" @click="sendMessage" style="width: 100px">보내기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import OpenAI from "openai";

const messages = ref([]);
const userInput = ref("");
const selectedProvince = ref("");
const selectedCity = ref("");
const category = ref("");
const loading = ref(false);

const locations = {
  서울: ["전체"],
  부산: ["전체"],
  대구: ["전체"],
  인천: ["전체"],
  광주: ["전체"],
  대전: ["전체"],
  울산: ["전체"],
  세종: ["전체"],
  경기도: [
    "가평",
    "고양",
    "과천",
    "광명",
    "광주",
    "구리",
    "군포",
    "김포",
    "남양주",
    "동두천",
    "부천",
    "성남",
    "수원",
    "시흥",
    "안산",
    "안성",
    "안양",
    "양주",
    "양평",
    "여주",
    "연천",
    "오산",
    "용인",
    "의왕",
    "의정부",
    "이천",
    "파주",
    "평택",
    "포천",
    "하남",
    "화성",
  ],
  강원도: [
    "강릉",
    "고성",
    "동해",
    "삼척",
    "속초",
    "양구",
    "양양",
    "영월",
    "원주",
    "인제",
    "정선",
    "철원",
    "춘천",
    "태백",
    "평창",
    "홍천",
    "화천",
    "횡성",
  ],
  충청북도: [
    "괴산",
    "단양",
    "보은",
    "영동",
    "옥천",
    "음성",
    "제천",
    "증평",
    "진천",
    "청주",
    "충주",
  ],
  충청남도: [
    "계룡",
    "공주",
    "금산",
    "논산",
    "당진",
    "보령",
    "부여",
    "서산",
    "서천",
    "아산",
    "예산",
    "천안",
    "청양",
    "태안",
    "홍성",
  ],
  전라북도: [
    "고창",
    "군산",
    "김제",
    "남원",
    "무주",
    "부안",
    "순창",
    "완주",
    "익산",
    "임실",
    "장수",
    "전주",
    "정읍",
    "진안",
  ],
  전라남도: [
    "강진",
    "고흥",
    "곡성",
    "광양",
    "구례",
    "나주",
    "담양",
    "목포",
    "무안",
    "보성",
    "순천",
    "신안",
    "여수",
    "영광",
    "영암",
    "완도",
    "장성",
    "장흥",
    "진도",
    "함평",
    "해남",
    "화순",
  ],
  경상북도: [
    "경산",
    "경주",
    "고령",
    "구미",
    "군위",
    "김천",
    "문경",
    "봉화",
    "상주",
    "성주",
    "안동",
    "영덕",
    "영양",
    "영주",
    "영천",
    "예천",
    "울릉",
    "울진",
    "의성",
    "청도",
    "청송",
    "칠곡",
    "포항",
  ],
  경상남도: [
    "거제",
    "거창",
    "고성",
    "김해",
    "남해",
    "밀양",
    "사천",
    "산청",
    "양산",
    "의령",
    "진주",
    "창녕",
    "창원",
    "통영",
    "하동",
    "함안",
    "함양",
    "합천",
  ],
  제주도: ["서귀포", "제주"],
};

const cities = ref([]);

const onProvinceChange = () => {
  selectedCity.value = "";
  cities.value = locations[selectedProvince.value] || [];
};

const sortedCities = computed(() => {
  return [...cities.value].sort();
});

const setCategory = (cat) => {
  if (!selectedProvince.value) {
    alert("먼저 도를 선택하세요.");
    return;
  }
  if (locations[selectedProvince.value].length > 0 && !selectedCity.value) {
    alert("먼저 시/군을 선택하세요.");
    return;
  }

  category.value = cat;
  const location = selectedCity.value
    ? `${selectedProvince.value} ${selectedCity.value}`
    : selectedProvince.value;
  userInput.value = `${location}에서 ${cat}에 대해 알고 싶어요.`;
};

const sendMessage = async () => {
  if (userInput.value.trim() === "") return;

  // 사용자 메시지 추가
  messages.value.push({ role: "user", content: userInput.value });
  loading.value = true;

  try {
    const openai = new OpenAI({
      apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: userInput.value }],
      model: "gpt-3.5-turbo",
    });

    const reply = response.choices[0].message.content;
    messages.value.push({ role: "ChatGPT", content: reply });
  } catch (error) {
    alert("error");
  } finally {
    // 사용자 입력 초기화
    userInput.value = "";
    loading.value = false;
  }
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.01);
}
</style>
