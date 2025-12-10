<template>
  <div class="home-container">

    <!-- 아래는 기존 섹션들 -->
    <MovieSection
        title="인기 영화"
        :movies="popularMovies"
        :isLoading="loadingPopular"
    />

    <MovieSection
        title="현재 상영작"
        :movies="nowPlayingMovies"
        :isLoading="loadingNowPlaying"
    />

    <MovieSection
        title="평점 좋은 영화"
        :movies="topRatedMovies"
        :isLoading="loadingTopRated"
    />

    <MovieSection
        title="트렌딩 영화"
        :movies="trendingMovies"
        :isLoading="loadingTrending"
    />

  </div>
</template>

<script setup>
import Header from "@/components/common/Header.vue";
import { ref, onMounted } from "vue";
import MovieSection from "./moviesection.vue";
import { getPopular, getNowPlaying, getTopRated, getTrending } from "@/utils/movie.js";

const popularMovies = ref([]);
const nowPlayingMovies = ref([]);
const topRatedMovies = ref([]);
const trendingMovies = ref([]);

const loadingPopular = ref(true);
const loadingNowPlaying = ref(true);
const loadingTopRated = ref(true);
const loadingTrending = ref(true);


onMounted(async () => {
  // 인기 영화
  loadingPopular.value = true;
  popularMovies.value = await getPopular();
  loadingPopular.value = false;

  // 현재 상영작
  loadingNowPlaying.value = true;
  nowPlayingMovies.value = await getNowPlaying();
  loadingNowPlaying.value = false;

  // 평점 좋은 영화
  loadingTopRated.value = true;
  topRatedMovies.value = await getTopRated();
  loadingTopRated.value = false;

  // 트렌딩 영화
  loadingTrending.value = true;
  trendingMovies.value = await getTrending();
  loadingTrending.value = false;
});

</script>

<style scoped>
.home-container {
  background-color:#1a1a1d;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
}

@media (max-width: 600px) {
  .home-container {
    padding: 10px;
    gap: 30px;
  }
}

</style>

