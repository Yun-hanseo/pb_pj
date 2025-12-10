<template>
  <div class="poster-card">

    <div class="poster-wrapper">
      <img :src="imgUrl" class="poster-img" />
    </div>

    <p class="poster-title">{{ movie.title }}</p>

    <div class="poster-info">
      <span class="rating">⭐ {{ movie.vote_average.toFixed(1) }}</span>
      <span class="release">{{ movie.release_date }}</span>
    </div>

    <p class="overview">{{ movie.overview.slice(0, 30) }}...</p>

    <!-- ❤️ 관심목록 버튼 -->
    <button class="wish-btn" @click.stop="onClickHeart">
      <span class="heart">{{ isWish ? "♥" : "♡" }}</span>
    </button>

    <!-- 🎬 줄거리 보기 버튼 -->
    <button class="summary-btn" @click="openModal">
      줄거리 보기
    </button>

    <!-- 🎬 카드 내부에서만 뜨는 미니 모달 -->
    <div v-if="showModal" class="inner-popup">
      <button class="close-btn" @click="closeModal">✕</button>

      <h3 class="popup-title">{{ movie.title }}</h3>
      <p class="popup-overview">{{ movie.overview }}</p>
    </div>


  </div>
</template>



<script setup>
import { ref, onMounted } from "vue";
import { isInWishlist, toggleWishlist } from "@/utils/wishlist.js";


const props = defineProps({
  movie: Object
});

const imgUrl = props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : "https://via.placeholder.com/300x450";

const isWish = ref(false);

onMounted(() => {
  isWish.value = isInWishlist(props.movie.id);
});

function onClickHeart() {
  toggleWishlist(props.movie);
  isWish.value = !isWish.value;
}

const showModal = ref(false);

function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

</script>



<style scoped>
.poster-card {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  border-radius: 12px;
  transition: 0.25s ease;
}

.poster-wrapper img {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
}

.overview
{
  color:white;
}

.wish-btn {
  margin-bottom:15px;
  width: 30px;
  border-radius: 10px;
  border: 1px solid #555;
  background: #1f1f1f;
  color: white;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.wish-btn:hover {
  background: #333;
  transform: scale(1.02);
}

.heart {
  font-size: 18px;
  color: #ff4b4b;
}

/* hover 시 확대 */
.poster-img:hover {
  transform: scale(1.05);
}

/* 이미지 감싸는 div */
.poster-wrapper {
  border-radius: 12px;
  overflow: hidden;
}

.poster-img {
  width: 100%;
  border-radius: 12px;
}

/* 제목 */
.poster-title {
  color:white;
  font-weight: 600;
  margin-top: 4px;
  font-size: 16px;
  line-height: 1.2;
}

/* 정보 표시 */
.poster-info {
  display: flex;
  gap: 10px;
  font-size: 15px;
  color: #555;
}

.rating {
  color: #ffb300; /* 평점 색상 */
}

.release {
  opacity: 0.8;
}

/* 카드 내부 팝업 */
.inner-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.75);
  backdrop-filter: blur(6px);
  color: white;

  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  z-index: 20;

  display: flex;
  flex-direction: column;
  gap: 10px;

  animation: fadeIn 0.2s ease-out;
}

/* 오른쪽 상단 X 버튼 */
.close-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
}

/* 팝업 제목 */
.popup-title {
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
}

/* 팝업 줄거리 텍스트 */
.popup-overview {
  font-size: 14px;
  line-height: 1.4;
  white-space: normal;
  overflow-y: auto;
}

/* 팝업 등장 애니메이션 */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* ✨ 중요한 부분: 카드가 팝업을 담을 수 있게 함 */
.poster-card {
  position: relative;  /* popup이 카드 안에서만 뜨도록 */
}



@media (max-width: 600px) {
  .poster-card {
    width: 140px;
    padding: 10px;
  }

  .poster-wrapper img {
    width: 140px;
    height: 210px;
  }

  .poster-title {
    font-size: 13px;
  }

  .poster-info {
    font-size: 11px;
  }

  .overview {
    font-size: 11px;
  }
}

</style>
