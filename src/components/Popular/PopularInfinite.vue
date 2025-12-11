<template>
  <div class="infinite-container">

    <div class="movie-grid">
      <PopularItem v-for="m in movies" :key="m.id + '-' + Math.random()" :movie="m" />
    </div>

    <!-- 로딩 표시 -->
    <div class="loading-box" v-if="isLoading">
      <div class="spinner"></div>
      <p>불러오는 중...</p>
    </div>

    <PopularTopButton v-if="showTop" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import PopularItem from "./PopularItem.vue";
import PopularTopButton from "./PopularTopButton.vue";
import { getPopularPage } from "@/utils/movie.js";

const movies = ref([]);
const page = ref(1);
const maxPage = 20;
const isLoading = ref(false);
const showTop = ref(false);

// 최초 로드 + 스크롤 이벤트 등록
onMounted(() => {
  loadMore();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 🔥 무한 루프 스크롤 핵심 로직
async function loadMore() {
  if (isLoading.value) return;

  isLoading.value = true;

  // TMDB는 20페이지까지만 지원 → 넘어가면 다시 반복
  if (page.value > maxPage) {
    page.value = 1;   // 🔥 여기서 루프 시작됨
  }

  const data = await getPopularPage(page.value);

  if (Array.isArray(data)) {
    movies.value.push(...data);  // 기존 목록 아래에 이어붙임
  }

  page.value++;
  isLoading.value = false;
}

// 스크롤 감지
function handleScroll() {
  const scrollEnd =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300;

  if (scrollEnd) {
    loadMore();
  }

  showTop.value = window.scrollY > 400;
}
</script>

<style scoped>
.infinite-container {
  width: 99%;
  padding: 15px;
  overflow: visible;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.loading-box {
  width: 100%;
  text-align: center;
  padding: 20px;
  color: #ccc;
}

.spinner {
  width: 35px;
  height: 35px;
  border: 4px solid #555;
  border-top-color: #ff3b57;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 📱 모바일에서는 카드 크기 자체 축소 + 2열 강제 */
@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px !important;
  }

  .item-card {
    width: 100% !important;
    padding: 6px !important;
    border-radius: 10px !important;
  }

  .poster-img {
    height: 160px !important;   /* 🔥 기존 250px → 160px */
    border-radius: 8px !important;
  }

  .title {
    font-size: 13px !important;
  }

  .info {
    font-size: 11px !important;
    gap: 6px !important;
  }

  .overview {
    font-size: 11px !important;
    height: 32px !important;
  }

  .heart-btn {
    font-size: 20px !important;
  }
}


</style>