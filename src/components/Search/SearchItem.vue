<template>
  <div class="item-card">
    <img
        class="poster"
        :src="imgUrl"
        alt="movie poster"
    />

    <p class="title">{{ movie.title }}</p>

    <div class="info">
      <span>⭐ {{ movie.vote_average.toFixed(1) }}</span>
      <span class="date">{{ movie.release_date }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  movie: { type: Object, required: true }
});

const imgUrl = computed(() => {
  return `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`;
});
</script>

<style scoped>
.item-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  background: #1a1a1a;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.item-card:hover {
  transform: scale(1.05);
}

.poster {
  width: 100%;
  border-radius: 8px;
}

.title {
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.info {
  font-size: 12px;
  color: #bbb;
  display: flex;
  justify-content: space-between;
}
</style>