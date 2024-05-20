<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 mt-5">
        <div class="card">
          <div class="card-header bg-primary text-white">ChatGPT</div>
          <div class="card-body">
            <div v-for="(msg, index) in messages" :key="index" class="mb-3">
              <div class="text-start">
                <span class="badge bg-secondary">ChatGPT</span>
                <div class="alert alert-secondary d-inline-block mr-2 text-white">
                  {{ msg.content }}
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary" @click="getGPTPlan">하루 계획 추천</button>
            <button class="btn btn-primary" @click="getGPTFood">음식 추천</button>
            <button class="btn btn-primary" @click="getGPTConcept">컨셉 추천</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import OpenAI from "openai";

const messages = ref([]);

async function getGPTPlan() {
  try {
    const openai = new OpenAI({
      apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
      dangerouslyAllowBrowser: true,
    });

    const prompt = "하루 여행 계획을 시간 단위로 세워줘.";

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const reply = response.choices[0].message.content;
    messages.value.push({ role: "ChatGPT", content: reply });
  } catch (error) {
    console.log("chatGPT: 🚨 에러가 발생했습니다.", error);
  }
}

async function getGPTFood() {
  try {
    const openai = new OpenAI({
      apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
      dangerouslyAllowBrowser: true,
    });

    const prompt = "여행을 갈 때 먹을만한 음식을 추천해줘.";

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const reply = response.choices[0].message.content;
    messages.value.push({ role: "ChatGPT", content: reply });
  } catch (error) {
    console.log("chatGPT: 🚨 에러가 발생했습니다.", error);
  }
}

async function getGPTConcept() {
  try {
    const openai = new OpenAI({
      apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
      dangerouslyAllowBrowser: true,
    });

    const prompt = "여행을 갈 때 할 수 있는 컨셉을 추천해줘.";

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const reply = response.choices[0].message.content;
    messages.value.push({ role: "ChatGPT", content: reply });
  } catch (error) {
    console.log("chatGPT: 🚨 에러가 발생했습니다.", error);
  }
}
</script>

<style>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.01);
}
</style>
