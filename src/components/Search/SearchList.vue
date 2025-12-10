<template>
  <div class="list-container">
    <div class="movie-grid">
      <SearchItem
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
      />
    </div>

    <div v-if="isLoading" class="loading">
      Loading...
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps, defineEmits } from "vue";
import SearchItem from "./SearchItem.vue";

const props = defineProps({
  movies: Array,
  isLoading: Boolean
});

const emit = defineEmits(["loadMore"]);

function handleScroll() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.body.scrollHeight;

  if (scrollTop + windowHeight >= fullHeight - 300) {
    emit("loadMore");
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.list-container {
  width: 100%;
  padding: 10px;
  background: transparent;
  overflow: visible;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.loading {
  margin-top: 20px;
  text-align: center;
  color: #ccc;
}
</style>