<template>
  <div class="mt-6">
    <div class="d-flex justify-content-end mb-2">
      <div class="d-flex">
        <button
          v-for="friend in invitedFriends"
          :key="friend.id"
          class="btn btn-outline-secondary me-2"
          @click="removeFriend(friend.id)"
        >
          {{ friend.name }}
          <span aria-hidden="true" class="ms-1">&times;</span>
        </button>
      </div>
      <button class="btn btn-primary" @click="showModal = true">친구 초대하기</button>
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
            <h5 class="modal-title" id="exampleModalCenterTitle">친구 초대하기</h5>
            <button type="button" class="close" @click="showModal = false" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" v-model="searchQuery" placeholder="친구 검색" />
            <ul v-if="showModal" class="list-group mt-3">
              <li
                v-for="friend in filteredFriends"
                :key="friend.id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {{ friend.name }}
                <button class="btn btn-primary btn-sm" @click="inviteFriend(friend)">초대</button>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">닫기</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="showModal"></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const showModal = ref(false);
const searchQuery = ref("");
const friends = ref([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
]);
const invitedFriends = ref([]);

const filteredFriends = computed(() => {
  if (searchQuery.value) {
    return friends.value.filter((friend) =>
      friend.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return friends.value;
});

const inviteFriend = (friend) => {
  if (!invitedFriends.value.some((invited) => invited.id === friend.id)) {
    invitedFriends.value.push(friend);
  }
  showModal.value = false;
};

const removeFriend = (friendId) => {
  invitedFriends.value = invitedFriends.value.filter((friend) => friend.id !== friendId);
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
