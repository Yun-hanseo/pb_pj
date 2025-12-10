<template>
  <div class="item-card">

    <!-- 포스터 이미지 -->
    <div class="poster-wrapper">
      <img :src="imgUrl" class="poster-img" />
    </div>

    <!-- 영화 제목 -->
    <p class="title">{{ movie.title }}</p>

    <!-- 평점 & 개봉일 -->
    <div class="info">
      <span class="rating">⭐ {{ movie.vote_average.toFixed(1) }}</span>
      <span class="date">{{ movie.release_date }}</span>
    </div>

    <!-- 삭제 버튼 -->
    <button class="remove-btn" @click="removeItem">
      삭제
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { toggleWishlist } from "@/utils/wishlist.js";

const props = defineProps({
  movie: Object
});

const emit = defineEmits(["removed"]);

const imgUrl = "https://image.tmdb.org/t/p/w500" + props.movie.poster_path;

function removeItem() {
  toggleWishlist(props.movie);
  emit("removed");
}
</script>


<style scoped>
.item-card {
  background: #1e1e1e;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.item-card:hover {
  transform: translateY(-4px);
}

.poster-wrapper {
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 8px;
}

.poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.info {
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
  font-size: 13px;
  color: #ccc;
}

.remove-btn {
  margin-top: 10px;
  width: 100%;
  padding: 6px 0;
  border: none;
  background: #ff4c4c;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.remove-btn:hover {
  background: #ff6666;
}
</style>