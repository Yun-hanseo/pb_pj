<template>
  <div class="table-container">

    <div class="movie-grid">
      <PopularItem
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
      />
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">◀ 이전</button>
      <span class="page-number">{{ page }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages">다음 ▶</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PopularItem from "./PopularItem.vue";
import { getPopularPage } from "@/utils/movie.js";

const page = ref(1);
const totalPages = 10;
const movies = ref([]);

async function loadMovies() {
  movies.value = await getPopularPage(page.value);
}

function nextPage() {
  if (page.value < totalPages) {
    page.value++;
    loadMovies();
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--;
    loadMovies();
  }
}

onMounted(() => {
  loadMovies();
});
</script>




<style scoped>
.table-container {
  width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 20px;
  width: 90%;
  max-width: 1200px;
  padding: 20px 0;
}

.pagination {
  margin: 20px 0 40px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.pagination button {
  padding: 8px 16px;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-number {
  color: white;
  font-size: 16px;
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