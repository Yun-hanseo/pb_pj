<template>
  <div class="filter-container">
    <div class="filter-item">
      <label>장르</label>
      <select v-model="selectedGenre" @change="emitChange">
        <option value="">전체</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>
    </div>

    <div class="filter-item">
      <label>평점</label>
      <select v-model="selectedRating" @change="emitChange">
        <option value="">전체</option>
        <option value="5">5점 이상</option>
        <option value="6">6점 이상</option>
        <option value="7">7점 이상</option>
        <option value="8">8점 이상</option>
      </select>
    </div>

    <div class="filter-item">
      <label>정렬</label>
      <select v-model="selectedSort" @change="emitChange">
        <option value="">기본</option>
        <option value="popular">인기순</option>
        <option value="rating">평점순</option>
        <option value="newest">최신순</option>
      </select>
    </div>

    <button class="reset-btn" @click="resetFilters">초기화</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// 부모에서 내려받는 props
const props = defineProps({
  genres: {
    type: Array,
    required: true
  }
});

// 내부 상태
const selectedGenre = ref("");
const selectedRating = ref("");
const selectedSort = ref("");

// 부모(Search.vue)로 이벤트 emit
const emit = defineEmits(["filter-change", "reset"]);

function emitChange() {
  emit("filter-change", {
    genre: selectedGenre.value,
    rating: selectedRating.value,
    sort: selectedSort.value,
  });
}

function resetFilters() {
  selectedGenre.value = "";
  selectedRating.value = "";
  selectedSort.value = "";

  emit("reset");
}
</script>

<style scoped>
.filter-container {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  padding: 16px;
  background: #111;
  border-radius: 10px;
  margin-bottom: 20px;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

select {
  padding: 8px;
  border-radius: 6px;
  background: #222;
  color: white;
  border: 1px solid #444;
}

.reset-btn {
  padding: 10px 14px;
  background: #444;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.reset-btn:hover {
  background: #666;
}
</style>