<template>
  <div class="home-container">

    <!-- 인기 영화 -->
    <MovieSection
        title="인기 영화"
        :movies="popularMovies"
        :isLoading="loadingPopular"
    />

    <!-- 현재 상영작 -->
    <MovieSection
        title="현재 상영작"
        :movies="nowPlayingMovies"
        :isLoading="loadingNowPlaying"
    />

    <!-- 평점 좋은 영화 -->
    <MovieSection
        title="평점 좋은 영화"
        :movies="topRatedMovies"
        :isLoading="loadingTopRated"
    />

    <!-- 트렌딩 영화 -->
    <MovieSection
        title="트렌딩 영화"
        :movies="trendingMovies"
        :isLoading="loadingTrending"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieSection from "./moviesection.vue";

// 🔥 axios Composable 가져오기
import { useTMDB } from "@/composables/useTMDB";

// 🔥 필요한 API만 구조분해
const {
  getPopular,
  getNowPlaying,
  getTopRated,
  getTrending
} = useTMDB();

// 상태값들
const popularMovies = ref([]);
const nowPlayingMovies = ref([]);
const topRatedMovies = ref([]);
const trendingMovies = ref([]);

const loadingPopular = ref(true);
const loadingNowPlaying = ref(true);
const loadingTopRated = ref(true);
const loadingTrending = ref(true);

// 🔥 페이지 진입 시 데이터 가져오기
onMounted(async () => {

  // 인기 영화
  loadingPopular.value = true;
  const popularData = await getPopular();
  popularMovies.value = popularData.results ?? [];
  loadingPopular.value = false;

  // 현재 상영작
  loadingNowPlaying.value = true;
  const nowPlayingData = await getNowPlaying();
  nowPlayingMovies.value = nowPlayingData.results ?? [];
  loadingNowPlaying.value = false;

  // 평점 좋은 영화
  loadingTopRated.value = true;
  const topRatedData = await getTopRated();
  topRatedMovies.value = topRatedData.results ?? [];
  loadingTopRated.value = false;

  // 트렌딩 영화
  loadingTrending.value = true;
  const trendingData = await getTrending();
  trendingMovies.value = trendingData.results ?? [];
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


