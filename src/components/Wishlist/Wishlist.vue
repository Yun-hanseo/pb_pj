<template>
  <div class="wishlist-page">

    <h2 class="title">내가 찜한 영화</h2>

    <!-- 찜한 영화가 없을 때 -->
    <p v-if="movies.length === 0" class="empty">
      아직 찜한 영화가 없습니다.
    </p>

    <!-- 찜한 영화 목록 -->
    <div v-else class="movie-grid">
      <WishlistItem
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @removed="reloadList"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import WishlistItem from "./WishlistItem.vue";
import { getWishlist } from "@/utils/wishlist.js";

const movies = ref([]);

function reloadList() {
  movies.value = getWishlist();
}

onMounted(() => {
  reloadList();
});
</script>

<style scoped>
.wishlist-page {
  padding: 20px;
  margin-top: 80px; /* 헤더에 안 가려지게 */
  color: white;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.empty {
  margin-top: 30px;
  font-size: 18px;
  opacity: 0.7;
}

/* 카드 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

/* 모바일 대응 */
@media (max-width: 600px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style>