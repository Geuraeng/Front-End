<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailPlan, modifyPlan, registSchedule } from "@/api/plan.js";
import axios from "axios";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import SearchInput from "@/components/PlanSections/SearchInput.vue";
import Header from "@/examples/Header.vue";

import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import PlanSidebar from "@/components/PlanSections/PlanSidebar.vue";
import Invite from "@/components/PlanSections/Invite.vue";
import UserChat from "@/components/PlanSections/UserChat.vue";
const { VITE_OPEN_API_SERVICE_KEY, VITE_SEARCH_TRIP_URL } = import.meta.env;

//route 플랜 가져오기
const route = useRoute();
const { planIdx } = route.params;
//router
const router = useRouter();

const plan = ref({
  planTitle: "",
  planDate: "",
});

const schedule = ref({
  scheduleLocation: "",
  scheduleLat: "",
  scheduleLon: "",
  scheduleMemo: "",
  planIdx: route.params.planIdx,
});

onMounted(() => {
  getPlan();
});

const getPlan = () => {
  detailPlan(
    planIdx,
    ({ data }) => {
      plan.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const updatePlan = async () => {
  if (confirm("정말로 수정하시겠습니까?")) {
    const updatedPlan = {
      planIdx: planIdx,
      planTitle: plan.value.planTitle,
      planDate: plan.value.planDate,
    };

    try {
      await modifyPlan(
        updatedPlan,
        () => {
          alert("수정이 완료되었습니다.");
        },
        (error) => {
          console.error("수정 실패:", error);
          alert("수정에 실패했습니다.");
        }
      );
    } catch (error) {
      console.error("수정 중 오류 발생:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  }
};

const addSchedule = async () => {
  try {
    await registSchedule(
      schedule.value,
      () => {
        alert("일정이 추가되었습니다.");
        // 추가 후 필요한 동작을 여기에 작성하세요
      },
      (error) => {
        console.error("일정 추가 실패:", error);
        alert("일정 추가에 실패했습니다.");
      }
    );
  } catch (error) {
    console.error("일정 추가 중 오류 발생:", error);
    alert("일정 추가 중 오류가 발생했습니다.");
  }
};

//라이브러리 사용 방법을 반드시 참고하여 주시기 바랍니다.
const map = ref();
const markerList = ref([]);
const latitude = ref(37.566826); // Default latitude
const longitude = ref(126.9786567); // Default longitude

// 검색어를 저장할 ref
const searchQuery = ref("");

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;

  // 검색어가 변경될 때마다 호출될 함수
  const performSearch = (query) => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(query, placesSearchCB);
  };

  // 초기 검색을 수행합니다.
  performSearch("");
};

// 키워드 검색 완료 시 호출되는 콜백함수
const placesSearchCB = (data, status) => {
  if (status === kakao.maps.services.Status.OK) {
    // 검색 결과를 처리하는 로직
    const bounds = new kakao.maps.LatLngBounds();
    for (let marker of data) {
      const markerItem = {
        lat: marker.y,
        lng: marker.x,
        infoWindow: {
          content: marker.place_name,
          visible: false,
        },
        data: marker, // Marker의 모든 데이터를 저장
      };
      markerList.value.push(markerItem);
      bounds.extend(new kakao.maps.LatLng(Number(marker.y), Number(marker.x)));
    }
    map.value?.setBounds(bounds);
  }
};

// 마커 클릭 시 인포윈도우의 visible 값을 반전시킵니다
const onClickMapMarker = (markerItem) => {
  if (markerItem.infoWindow?.visible !== null && markerItem.infoWindow?.visible !== undefined) {
    markerItem.infoWindow.visible = !markerItem.infoWindow.visible;
  } else {
    markerItem.infoWindow.visible = true;
  }

  latitude.value = markerItem.lat;
  longitude.value = markerItem.lng;

  // Marker의 데이터를 출력
  console.log("Marker Data:", markerItem.data);
  if (markerItem.data.title != null) {
    schedule.value.scheduleLocation = markerItem.data.title;
    schedule.value.scheduleLat = markerItem.data.mapy;
    schedule.value.scheduleLon = markerItem.data.mapx;
  } else {
    schedule.value.scheduleLocation = markerItem.data["place_name"];
    schedule.value.scheduleLat = markerItem.data.y;
    schedule.value.scheduleLon = markerItem.data.x;
  }
};

// SearchInput에서 입력값이 변경될 때마다 호출될 함수
const onSearchInputChange = (value) => {
  // 검색어를 변경하고 검색을 수행합니다.
  searchQuery.value = value;
  performSearch(searchQuery.value);
};

// 검색을 수행하는 함수
const performSearch = (query) => {
  const ps = new kakao.maps.services.Places();
  ps.keywordSearch(query, placesSearchCB);
};

const params = ref({
  serviceKey: VITE_OPEN_API_SERVICE_KEY,
  numOfRows: 10,
  pageNo: 1,
  MobileOS: "ETC",
  MobileApp: "AppTest",
  _type: "json",
  listYN: "Y",
  arrange: "A",
  mapX: 126.9786567,
  mapY: 37.566826,
  radius: 1000,
  contentTypeId: 12,
});

const attractions = ref([]);

const load1 = () => {
  params.value.mapX = longitude.value;
  params.value.mapY = latitude.value;
  params.value.contentTypeId = 12;

  axios.get(VITE_SEARCH_TRIP_URL, { params: params.value }).then(({ data }) => {
    attractions.value = data.response.body.items.item;
    console.log(attractions.value);
    markerList.value = Array.from(attractions.value).map((item) => ({
      lat: item.mapy,
      lng: item.mapx,
      infoWindow: {
        content: item.title,
        visible: false,
      },
      data: item, // Marker의 모든 데이터를 저장
    }));
  });
};

const load2 = () => {
  params.value.mapX = longitude.value;
  params.value.mapY = latitude.value;
  params.value.contentTypeId = 15;

  axios.get(VITE_SEARCH_TRIP_URL, { params: params.value }).then(({ data }) => {
    attractions.value = data.response.body.items.item;
    console.log(attractions.value);
    markerList.value = Array.from(attractions.value).map((item) => ({
      lat: item.mapy,
      lng: item.mapx,
      infoWindow: {
        content: item.title,
        visible: false,
      },
      data: item, // Marker의 모든 데이터를 저장
    }));
  });
};

const load3 = () => {
  params.value.mapX = longitude.value;
  params.value.mapY = latitude.value;
  params.value.contentTypeId = 32;

  axios.get(VITE_SEARCH_TRIP_URL, { params: params.value }).then(({ data }) => {
    attractions.value = data.response.body.items.item;
    console.log(attractions.value);
    markerList.value = Array.from(attractions.value).map((item) => ({
      lat: item.mapy,
      lng: item.mapx,
      infoWindow: {
        content: item.title,
        visible: false,
      },
      data: item, // Marker의 모든 데이터를 저장
    }));
  });
};

const load4 = () => {
  params.value.mapX = longitude.value;
  params.value.mapY = latitude.value;
  params.value.contentTypeId = 38;

  axios.get(VITE_SEARCH_TRIP_URL, { params: params.value }).then(({ data }) => {
    attractions.value = data.response.body.items.item;
    console.log(attractions.value);
    markerList.value = Array.from(attractions.value).map((item) => ({
      lat: item.mapy,
      lng: item.mapx,
      infoWindow: {
        content: item.title,
        visible: false,
      },
      data: item, // Marker의 모든 데이터를 저장
    }));
  });
};

const load5 = () => {
  params.value.mapX = longitude.value;
  params.value.mapY = latitude.value;
  params.value.contentTypeId = 39;

  axios.get(VITE_SEARCH_TRIP_URL, { params: params.value }).then(({ data }) => {
    attractions.value = data.response.body.items.item;
    console.log(attractions.value);
    markerList.value = Array.from(attractions.value).map((item) => ({
      lat: item.mapy,
      lng: item.mapx,
      infoWindow: {
        content: item.title,
        visible: false,
      },
      data: item, // Marker의 모든 데이터를 저장
    }));
  });
};
</script>
<template>
  <DefaultNavbar
    :action="{
      route: 'javascript:;',
      label: 'Buy Now',
      color: 'btn-white',
    }"
    transparent
  />
  <Header class="no-select">
    <div
      class="page-header align-items-start min-vh-100 justify-content-center"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)',
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"> </span>
      <PlanSidebar />
      <section class="py-lg-5">
        <div class="container">
          <div class="row">
            <div class="col-12 d-flex justify-content-end">
              <Invite class="ms-4" />
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="card box-shadow-xl overflow-hidden mb-5">
                <div class="d-flex justify-content-center align-items-center">
                  <div class="input-container">
                    <div class="col-md-12 pe-2 mb-3">
                      <input
                        label="Title"
                        type="text"
                        placeholder="제목"
                        v-model="plan.planTitle"
                        class="form-control input-lg"
                      />
                    </div>
                    <div class="col-md-12 pe-2 mb-3">
                      <input
                        label="PlanDate"
                        type="text"
                        placeholder="여행 일자"
                        v-model="plan.planDate"
                        class="form-control input-lg"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-5 position-relative px-0" loading="lazy">
                    <div
                      class="z-index-2 text-center d-flex h-100 w-100 d-flex m-auto justify-content-center"
                    >
                      <div class="mask bg-dark opacity-8">
                        <form @submit.prevent="addSchedule" class="p-3">
                          <div class="mb-3">
                            <label for="scheduleLocation" class="form-label">장소</label>
                            <input
                              type="text"
                              class="form-control"
                              id="scheduleLocation"
                              v-model="schedule.scheduleLocation"
                              style="color: brown; background-color: antiquewhite"
                              readonly
                            />
                          </div>
                          <div class="mb-3">
                            <label for="scheduleMemo" class="form-label">메모</label>
                            <textarea
                              class="form-control"
                              id="scheduleMemo"
                              v-model="schedule.scheduleMemo"
                              style="color: white"
                            ></textarea>
                          </div>
                          <input type="hidden" v-model="schedule.planIdx" />
                          <button type="submit" class="btn btn-primary">일정 추가하기</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <div class="col-lg-4 mx-auto">
                      <p></p>
                      <SearchInput
                        class="input-group-dynamic mb-4"
                        icon="search"
                        type="text"
                        placeholder="장소를 검색하세요."
                        @myChange="onSearchInputChange"
                      />
                    </div>
                    <div class="card-body" style="overflow: hidden">
                      <p>아래 버튼을 눌러 근처 정보를 조회하세요.</p>
                      <div class="row">
                        <div class="col">
                          <button class="btn btn-primary" @click="load1">관광</button>
                        </div>
                        <div class="col">
                          <button class="btn btn-primary" @click="load2">축제</button>
                        </div>
                        <div class="col">
                          <button class="btn btn-primary" @click="load3">숙박</button>
                        </div>
                        <div class="col">
                          <button class="btn btn-primary" @click="load4">쇼핑</button>
                        </div>
                        <div class="col">
                          <button class="btn btn-primary" @click="load5">음식</button>
                        </div>
                      </div>
                      <KakaoMap
                        :lat="37.566826"
                        :lng="126.9786567"
                        @onLoadKakaoMap="onLoadKakaoMap"
                      >
                        <KakaoMapMarker
                          v-for="(marker, index) in markerList"
                          :key="marker.key === undefined ? index : marker.key"
                          :lat="marker.lat"
                          :lng="marker.lng"
                          :infoWindow="marker.infoWindow"
                          :clickable="true"
                          @onClickKakaoMapMarker="() => onClickMapMarker(marker)"
                        />
                      </KakaoMap>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-light" style="margin-right: 10px" @click="updatePlan">
              수정완료
            </button>
            <button class="btn btn-secondary" @click="deleteCurrentPlan">삭제</button>
          </div>
        </div>
      </section>
    </div>
  </Header>
  <UserChat />
  <DefaultFooter />
</template>

<style scoped>
.no-select {
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.page-header {
  height: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

section {
  width: 100%;
  max-width: 1300px;
  padding: 0 15px;
}
</style>
