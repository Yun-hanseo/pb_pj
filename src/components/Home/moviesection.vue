<template>
  <div class="section">
    <h2 class="section-title">{{ title }}</h2>

    <div class="movie-row">

      <!-- 로딩 중일 때 Skeleton 6개 표시 -->
      <loadingposter v-if="isLoading" v-for="n in 6" :key="n" />

      <!-- 로딩 끝나면 영화 목록 표시 -->
      <Poster
          v-else
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
      />

    </div>
  </div>
</template>

<script setup>
import Poster from "./poster.vue"
import loadingposter from "../common/loadingposter.vue"

const props = defineProps({
  title: String,
  movies: Array,
  isLoading: Boolean
})
</script>


<style scoped>
.section {
  margin-bottom: 40px;

  background: linear-gradient(
      to right,
      #0f0f11 0%,
      #1a1b1e 30%,
      #1a1b1e 70%,
      #0f0f11 100%
  );
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color:white;
  margin: 40px 0 15px 0px;
}

.movie-row {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 10px;
}

/* Chrome, Safari */
.movie-row::-webkit-scrollbar {
  height: 6px;
}

.movie-row::-webkit-scrollbar-track {
  background: transparent;
}

.movie-row::-webkit-scrollbar-thumb {
  background: #ff4b4b;
  border-radius: 4px;
}

.movie-row::-webkit-scrollbar-thumb:hover {
  background: #ff2e2e;
}

/* Firefox */
.movie-row {
  scrollbar-width: thin;
  scrollbar-color: #ff4b4b transparent;
}

@media (max-width: 600px) {
  .section-title {
    font-size: 18px;
    margin-left: 5px;
  }

  .movie-row {
    gap: 12px;
    padding-bottom: 6px;
  }
}


</style>
