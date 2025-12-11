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
import { useTMDB } from "@/composables/useTMDB";

const { getPopular } = useTMDB();

const movies = ref([]);
const page = ref(1);
const maxPage = 20;
const isLoading = ref(false);
const showTop = ref(false);

// 최초 로드
onMounted(() => {
  loadMore();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 🔥 무한 스크롤 로딩
async function loadMore() {
  if (isLoading.value) return;
  isLoading.value = true;

  if (page.value > maxPage) page.value = 1;

  const data = await getPopular(page.value);
  if (Array.isArray(data.results)) {
    movies.value.push(...data.results);
  }

  page.value++;
  isLoading.value = false;
}

// 스크롤 감지
function handleScroll() {
  const scrollEnd =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300;

  if (scrollEnd) loadMore();
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
</style>