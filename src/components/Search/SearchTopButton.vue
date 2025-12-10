<template>
  <button
      v-if="visible"
      class="top-btn"
      @click="scrollToTop">
    ⬆ Top
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 버튼 보임 여부
const visible = ref(false);

// 스크롤 감지
function handleScroll() {
  visible.value = window.scrollY > 300;
}

// 위로 이동
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.top-btn {
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: #e50914;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 50px;
  font-size: 14px;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 2px 10px rgba(0,0,0,0.4);
  transition: 0.2s ease;
}

.top-btn:hover {
  transform: scale(1.1);
  background: #ff1e27;
}
</style>