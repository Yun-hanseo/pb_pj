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
import { useTMDB } from "@/composables/useTMDB";

const { getGenres, getDiscoverMovies } = useTMDB();

const movies = ref([]);          // 전체 영화
const filteredMovies = ref([]);  // 필터 적용 결과
const genres = ref([]);          // 장르 목록
const isLoading = ref(false);

const MAX_PAGE = 20;

// 400개 로딩(20페이지)
async function loadManyMovies() {
  isLoading.value = true;

  for (let page = 1; page <= MAX_PAGE; page++) {
    const data = await getDiscoverMovies(page);
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

  if (genre) list = list.filter(m => m.genre_ids.includes(Number(genre)));
  if (rating) list = list.filter(m => m.vote_average >= Number(rating));

  if (sort === "popular") list.sort((a, b) => b.popularity - a.popularity);
  else if (sort === "rating") list.sort((a, b) => b.vote_average - a.vote_average);
  else if (sort === "newest") list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

  filteredMovies.value = list;
}

function resetFilter() {
  filteredMovies.value = movies.value;
}

onMounted(async () => {
  genres.value = await getGenres();
  await loadManyMovies();
});
</script>


<style scoped>
.search-page {
  padding: 20px;
  margin-top: 80px;
}


</style>