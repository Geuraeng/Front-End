<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import SearchInput from "@/components/PlanSections/SearchInput.vue";
import Header from "@/examples/Header.vue";
import router from "@/router";

import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const { VITE_OPEN_API_SERVICE_KEY, VITE_SEARCH_TRIP_URL } = import.meta.env;

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
    }));
  });
};

const openPrompt = () => {
  const schedule = window.prompt("일정을 추가하세요:");
  if (schedule !== null) {
    // 사용자가 취소 버튼을 누르지 않았을 경우
    // 여기에 일정을 추가하는 로직을 추가하세요.
    console.log("추가된 일정:", schedule);
  }
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
  <Header>
    <div
      class="page-header align-items-start min-vh-100 justify-content-center"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)',
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"> </span>
      <section class="py-lg-9">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="card box-shadow-xl overflow-hidden mb-5">
                <div class="row">
                  <div class="col-lg-5 position-relative px-0" loading="lazy">
                    <div
                      class="z-index-2 text-center d-flex h-100 w-100 d-flex m-auto justify-content-center"
                    >
                      <div class="mask bg-dark opacity-8">
                        <button class="btn btn-primary" @click="openPrompt">일정 추가하기</button>
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
                          @onClickKakaoMapMarker="onClickMapMarker(marker)"
                        />
                      </KakaoMap>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-light" style="margin-right: 10px" @click="openPrompt">
              수정완료
            </button>
            <button class="btn btn-secondary" @click="openPrompt">삭제</button>
          </div>
        </div>
      </section>
    </div>
  </Header>
  <DefaultFooter />
</template>

<style scoped>
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
