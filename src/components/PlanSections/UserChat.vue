<template>
  <div id="app">
    유저이름:
    <input v-model="userName" type="text" />
    내용: <input v-model="message" type="text" @keyup.enter="sendMessage" />
    <div v-for="(item, idx) in recvList" :key="idx">
      <h3>유저이름: {{ item.userName }}</h3>
      <h3>내용: {{ item.content }}</h3>
      <button @click="editMessage(item)">수정</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client/dist/sockjs";

// 상태 관리
const userName = ref("");
const message = ref("");
const recvList = reactive([]);
const stompClient = ref(null); // stompClient를 ref로 선언

// connect 함수
const connect = () => {
  const serverURL = "http://localhost:8089/app/ws";
  let socket = new SockJS(serverURL);
  stompClient.value = Stomp.over(socket);

  console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
  stompClient.value.connect(
    {},
    (frame) => {
      console.log("소켓 연결 성공", frame);
      stompClient.value.subscribe("/send", (res) => {
        console.log("구독으로 받은 메시지 입니다.", res.body);
        recvList.push(JSON.parse(res.body));
        console.log(recvList);
      });
      stompClient.value.subscribe("/edit", () => {
        console.log("메시지 수정됨");
        // 수정된 내용을 받아오기 위해 전체 리스트를 다시 불러옴
        getMessages();
      });
    },
    (error) => {
      console.log("소켓 연결 실패", error);
    }
  );
};

// send 함수
const send = () => {
  console.log("Send message:" + message.value);
  if (stompClient.value && stompClient.value.connected) {
    const msg = {
      userName: userName.value,
      content: message.value,
    };
    stompClient.value.send("/receive", JSON.stringify(msg), {});
  }
};

// sendMessage 함수
const sendMessage = () => {
  if (userName.value !== "" && message.value !== "") {
    send();
    message.value = "";
  }
};

// editMessage 함수
const editMessage = (item) => {
  const updatedMessage = prompt("수정할 내용을 입력하세요", item.content);
  if (updatedMessage !== null && updatedMessage !== "") {
    // 수정된 메시지를 서버로 전송
    const editedMsg = {
      userName: userName.value,
      content: updatedMessage,
    };
    stompClient.value.send("/edit", JSON.stringify(editedMsg), {});
  }
};

// getMessages 함수: 서버로부터 전체 리스트를 받아옴
const getMessages = () => {
  console.log("메시지를 다시 받아옵니다.");
  // 서버로부터 전체 리스트를 받아옴
  // 이후 recvList에 할당하여 화면을 업데이트함
};

// 컴포넌트가 마운트되면 소켓 연결을 시도합니다.
onMounted(() => {
  connect();
});
</script>

<style scoped></style>
