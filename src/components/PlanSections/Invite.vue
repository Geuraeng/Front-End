<template>
  <div class="mt-6">
    <div class="d-flex justify-content-end mb-2">
      <div class="d-flex">
        <button
          v-for="friend in invitedFriends"
          :key="friend.userId"
          class="btn btn-outline-secondary me-2"
          @click="removeFriend(friend.userId)"
        >
          {{ friend.userName }}
          <span aria-hidden="true" class="ms-1">&times;</span>
        </button>
      </div>
      <button class="btn btn-primary" @click="openModal">친구 초대하기</button>
    </div>
    <!-- Modal -->
    <div
      v-if="showModal"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              친구 초대하기
            </h5>
            <button
              type="button"
              class="close"
              @click="showModal = false"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control"
              v-model="searchQuery"
              placeholder="친구 검색"
            />
            <ul v-if="showModal" class="list-group mt-3">
              <li
                v-for="friend in filteredFriends"
                :key="friend.userId"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {{ friend.userName }}
                <button
                  class="btn btn-primary btn-sm"
                  @click="inviteFriend(friend)"
                >
                  초대
                </button>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showModal = false"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="showModal"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { listUser } from "@/api/user.js";
import { registJoin, deleteJoin, listJoin } from "@/api/join.js";

const showModal = ref(false);
const searchQuery = ref("");
const friends = ref([]);
const invitedFriends = ref([]);

const loadFriends = async () => {
  try {
    await listUser(
      ({ data }) => {
        friends.value = data; // API 응답에서 친구 목록을 추출하여 할당
      },
      (error) => {}
    );
  } catch (error) {
    alert("친구 목록을 가져오는 데 실패했습니다.");
  }
};

onMounted(async () => {
  await loadFriends();
  // 화면이 로드될 때 친구 목록을 가져옵니다.
  listJoin(
    (response) => {
      const joinList = response.data;

      // 현재 페이지의 planIdx 가져오기
      const planIdx = parseInt(window.location.pathname.match(/\d+$/)[0]);

      // planIdx에 해당하는 친구들을 invitedFriends에 추가
      invitedFriends.value = joinList
        .filter((join) => join.planIdx === planIdx)
        .map((join) => {
          // listUser에서 userId가 동일한 칼럼의 userName
          const friend = friends.value.find(
            (user) => user.userId === join.userId
          );
          if (friend) {
            return {
              userId: join.userId,
              userName: friend.userName,
            };
          } else {
            // 친구를 찾을 수 없는 경우 예외 처리
            return null;
          }
        })
        .filter((friend) => friend !== null); // null 값 제거
    },
    (error) => {
      alert("친구 목록을 가져오는 데 실패했습니다.");
    }
  );
});

const openModal = () => {
  showModal.value = true;
  loadFriends();
};

const filteredFriends = computed(() => {
  if (searchQuery.value) {
    return friends.value.filter(
      (friend) => friend.userId === searchQuery.value
    );
  }
  return [];
});

const user = ref({
  joinIdx: "",
  userId: "",
  planIdx: "",
});

const inviteFriend = async (friend) => {
  if (
    !invitedFriends.value.some((invited) => invited.userId === friend.userId)
  ) {
    invitedFriends.value.push(friend);
    user.value.planIdx = parseInt(window.location.pathname.match(/\d+$/)[0]);
    user.value.userId = friend.userId;

    registJoin(
      user.value,
      () => {},
      (error) => {
        alert("수정에 실패했습니다.");
      }
    );
  }
  showModal.value = false;
};

const removeFriend = (friendId) => {
  if (confirm("초대를 삭제하시겠습니까?")) {
    const friend = invitedFriends.value.find(
      (friend) => friend.userId === friendId
    );
    if (friend) {
      invitedFriends.value = invitedFriends.value.filter(
        (friend) => friend.userId !== friendId
      );

      // listJoin 호출하여 join 테이블의 리스트 가져오기
      listJoin(
        (response) => {
          const joinList = response.data;

          // user.value.userId와 user.value.planIdx가 모두 일치하는 join 객체 찾기
          const matchingJoin = joinList.find(
            (join) =>
              join.userId === user.value.userId &&
              join.planIdx === user.value.planIdx
          );

          if (matchingJoin) {
            // 찾은 join 객체의 joinIdx를 deleteJoin 함수에 전달하여 삭제
            deleteJoin(
              matchingJoin.joinIdx,
              () => {
                alert("삭제가 완료되었습니다.");
              },
              (error) => {
                alert("삭제에 실패했습니다.");
              }
            );
          } else {
            alert("삭제에 실패했습니다.");
          }
        },
        (error) => {
          alert("삭제에 실패했습니다.");
        }
      );
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
</style>
