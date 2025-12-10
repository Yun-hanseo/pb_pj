<template>
  <header :class="{ scrolled: isScrolled, hidden: isHidden }" class="header">
    <!-- 로고 -->
    <div class="logo" @click="goHome">Home</div>

    <!-- 메뉴 -->
    <nav class="nav">
      <RouterLink to="/">홈</RouterLink>
      <RouterLink to="/popular">인기</RouterLink>
      <RouterLink to="/search">시리즈</RouterLink>
      <RouterLink to="/wishlist">관심 목록</RouterLink>
    </nav>

    <!-- 로그인 정보 -->
    <div class="user-area">
      <span v-if="user" class="user-email">{{ user.email }}</span>
      <button v-if="user" class="logout-btn" @click="logout">로그아웃</button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 🔥 로그인 정보 가져오기 (currentUser 기준)
const user = JSON.parse(localStorage.getItem("currentUser") || "null");

const isScrolled = ref(false);
const isHidden = ref(false);
let lastScrollY = 0;

// 스크롤 이벤트
function handleScroll() {
  if (window.innerWidth > 600) {
    isHidden.value = false;
    return;
  }

  const currentY = window.scrollY;
  isScrolled.value = currentY > 20;

  if (currentY > lastScrollY && currentY > 80) {
    isHidden.value = true;
  } else {
    isHidden.value = false;
  }

  lastScrollY = currentY;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

// 홈 이동
function goHome() {
  router.push("/");
}

// 로그아웃
function logout() {
  localStorage.removeItem("currentUser");
  alert("로그아웃 되었습니다!");
  router.push("/signin");
}
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  backdrop-filter: blur(10px);
  background: rgba(20, 20, 20, 0.45);
  transition: background 0.3s ease, padding 0.3s ease;
  z-index: 1000;
}

.header.scrolled {
  background: rgba(20, 20, 20, 0.85);
  padding: 8px 20px;
}

.logo {
  color:white;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
}

.nav {
  display: flex;
  gap: 20px;
  margin-left:200px;
}

.nav a {
  color: #ddd;
  font-size: 15px;
  text-decoration: none;
  transition: 0.2s;
}

.user-area {
  display: flex;
  align-items: center;
  color:white;
  gap: 12px;
  margin-right:40px;
}

.logout-btn {
  background: #ff3b57;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-left:10px;
}
</style>

