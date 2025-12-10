<template>
  <div class="search-page">

    <SearchFilter
        :genres="genres"
        @filter-change="applyFilter"
        @reset="resetFilter"
    />

    <SearchList
        :movies="filteredMovies"
        :isLoading="isLoading"
    />

    <SearchTopButton />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SearchFilter from "./SearchFilter.vue";
import SearchList from "./SearchList.vue";
import SearchTopButton from "./SearchTopButton.vue";
import { fetchSearchMovies, fetchGenres } from "@/utils/movie.js";

const movies = ref([]);          // 전체 영화 데이터
const filteredMovies = ref([]);  // 필터 적용 후 데이터
const genres = ref([]);          // 장르 목록
const isLoading = ref(false);

const MAX_PAGE = 20;  // ⭐ 한번에 불러올 페이지 수 (400개)


async function loadManyMovies() {
  isLoading.value = true;

  for (let page = 1; page <= MAX_PAGE; page++) {
    const data = await fetchSearchMovies(page);

    if (Array.isArray(data.results)) {
      movies.value.push(...data.results);
    }
  }

  filteredMovies.value = movies.value;
  isLoading.value = false;
}

function applyFilter(options) {
  const { genre, rating, sort } = options;

  let list = [...movies.value];

  // 장르 필터
  if (genre) {
    list = list.filter(m => m.genre_ids.includes(Number(genre)));
  }

  // 평점 필터
  if (rating) {
    list = list.filter(m => m.vote_average >= Number(rating));
  }

  // 정렬
  if (sort === "popular") {
    list.sort((a, b) => b.popularity - a.popularity);
  } else if (sort === "rating") {
    list.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sort === "newest") {
    list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  }

  filteredMovies.value = list;
}

function resetFilter() {
  filteredMovies.value = movies.value;
}

onMounted(async () => {
  genres.value = await fetchGenres(); // 장르 로드
  await loadManyMovies();            // 영화 400개 로드
});
</script>

<style scoped>
.search-page {
  padding: 20px;
  margin-top: 80px;
}


</style>