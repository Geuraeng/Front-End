// socketSetup.js
import { reactive, ref } from "vue";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client/dist/sockjs";

// 소켓 연결 상태 및 데이터 관리
export const recvList = reactive([]);
export const stompClient = ref(null);
export const stompSubscription = ref(null);
export let isReceiving = false;

// 소켓 연결 함수
export const connect = (onMessageReceived) => {
  const serverURL = "http://localhost:8089/app/ws";
  let socket = new SockJS(serverURL);
  stompClient.value = Stomp.over(socket);

  console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
  stompClient.value.connect(
    {},
    (frame) => {
      console.log("소켓 연결 성공", frame);
      // 이전 구독 취소
      if (stompSubscription.value) {
        stompSubscription.value.unsubscribe();
      }
      // 새로운 구독 등록
      stompSubscription.value = stompClient.value.subscribe("/send", (res) => {
        console.log("구독으로 받은 메시지 입니다.", res.body);
        isReceiving = true;
        recvList.push(JSON.parse(res.body));
        console.log(recvList);
        isReceiving = false;
        if (onMessageReceived) {
          onMessageReceived();
        }
      });
    },
    (error) => {
      console.log("소켓 연결 실패", error);
    }
  );
};

// 소켓 메시지 전송 함수
export const send = (msg) => {
  console.log("Send message:", msg);
  if (stompClient.value && stompClient.value.connected) {
    stompClient.value.send("/receive", JSON.stringify(msg), {});
  }
};
