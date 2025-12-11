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

    <!-- 설명(짧게) -->
    <p class="overview">{{ movie.overview.slice(0, 40) }}...</p>

    <!-- 관심목록 하트 버튼 -->
    <!-- 관심목록 하트 버튼 -->
    <div class="heart-area">
      <span
          :class="['heart-btn', { liked: isWish }]"
          @click="toggleWish"
      >
        {{ isWish ? '♥' : '♡' }}
      </span>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useWishlist } from "@/composables/useWishlist";

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const { toggle, isInWishlist } = useWishlist();

// 🔥 props가 준비된 후 계산되도록 computed 사용
const imgUrl = computed(() =>
    props.movie?.poster_path
        ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
        : "https://via.placeholder.com/300x450"
);

const isWish = ref(false);

onMounted(() => {
  if (props.movie) {
    isWish.value = isInWishlist(props.movie.id);
  }
});

function toggleWish() {
  toggle(props.movie);
  isWish.value = !isWish.value;
}

</script>


<style scoped>
.item-card {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 2px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.02);
  transition: 0.2s ease;
}

.item-card:hover {
  transform: scale(1.05);
}

/* 포스터 */
.poster-wrapper {
  overflow: hidden;
  border-radius: 12px;
}

.poster-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: 0.25s;
}

.item-card:hover .poster-img {
  transform: scale(1.08);
}

/* 제목 */
.title {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

/* 정보 */
.info {
  display: flex;
  gap: 10px;
  font-size: 13px;
  color: #ccc;
}

.rating {
  color: #ffb300;
}

/* 설명 */
.overview {
  font-size: 13px;
  color: #aaa;
  height: 40px;
  overflow: hidden;
}

.heart-area {
  margin-top: 8px;
  text-align: center;
}

.heart-btn {
  font-size: 28px;
  cursor: pointer;
  transition: 0.25s ease;
  color: #bbb;
  user-select: none;
}

.heart-btn:hover {
  transform: scale(1.2);
}

.heart-btn.liked {
  color: #ff3b57;
  text-shadow: 0 0 8px rgba(255, 60, 100, 0.8);
}

</style>