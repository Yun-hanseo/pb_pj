<template>
  <header :class="{ scrolled: isScrolled, hidden: isHidden }" class="header">

    <!-- 로고 -->
    <div class="logo" @click="goHome">
      Home
    </div>

    <!-- 네비 메뉴 -->
    <nav class="nav">
      <RouterLink to="/">홈</RouterLink>
      <RouterLink to="/popular">인기</RouterLink>
      <RouterLink to="/search">시리즈</RouterLink>
      <RouterLink to="/wishlist">관심 목록</RouterLink>
    </nav>

    <!-- 로그인 사용자, 로그아웃 -->
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
const user = JSON.parse(localStorage.getItem("user") || "null");

const isScrolled = ref(false);
const isHidden = ref(false);      // 🔥 추가됨
let lastScrollY = 0;              // 🔥 스크롤 비교용 변수

function handleScroll() {
  // 🔥 모바일에서만 동작하도록 조건 추가
  if (window.innerWidth > 600) {
    isHidden.value = false;
    return;
  }

  const currentY = window.scrollY;

  isScrolled.value = currentY > 20;

  // 스크롤 방향 감지 (모바일 전용)
  if (currentY > lastScrollY && currentY > 80) {
    isHidden.value = true;   // 아래로 스크롤 → 숨김
  } else {
    isHidden.value = false;  // 위로 스크롤 → 나타남
  }

  lastScrollY = currentY;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 홈 이동
function goHome() {
  router.push("/");
}

// 로그아웃
function logout() {
  localStorage.removeItem("user");
  router.push("/signin");
  alert("로그아웃 되었습니다!");
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

.nav a:hover {
  color: white;
  transform: translateY(-2px);
}

.user-area {
  display: flex;
  align-items: center;
  margin-right:30px;
  gap: 12px;
}

.user-email {
  color: #aaa;
  font-size: 14px;
  left:20px;
}

.logout-btn {
  background: #ff3b57;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: 0.2s ease;
}

.logout-btn:hover {
  background: #ff506d;
}

/* 🔥 모바일 헤더 전용 스타일 */
@media (max-width: 600px) {
  .header {
    padding: 10px 15px;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    text-align: center;
  }

  .logo {
    font-size: 20px;
  }

  .nav {
    display: flex;
    gap: 14px;
    font-size: 14px;
  }

  .nav a {
    font-size: 13px;
  }
}

/* 🔥 모바일에서만 헤더 숨김 애니메이션 적용 */
@media (max-width: 600px) {
  .header {
    transition: background 0.3s ease, padding 0.3s ease, transform 0.35s ease;
  }

  .header.hidden {
    transform: translateY(-100%);
  }
}


</style>
