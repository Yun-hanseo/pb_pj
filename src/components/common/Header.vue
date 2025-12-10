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
  color: white;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s ease;
}

.logo:hover {
  transform: scale(1.07);
  text-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
}


.nav {
  display: flex;
  gap: 40px;
  margin-left: 80px;
}

.nav a {
  color: #ddd;
  font-size: 15px;
  text-decoration: none;
  position: relative;
  padding-bottom: 3px;
  transition: 0.25s ease;
}

.nav a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0%;
  background: #ff3b57;
  transition: width 0.25s ease;
}

.nav a:hover {
  color: white;
  transform: scale(1.05);
}

.nav a:hover::after {
  width: 100%;
}


.user-area {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 30px;
  color: white;
}

.user-email {
  color: white;
}


.logout-btn {
  background: #ff3b57;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  transition: 0.25s ease;
}

.logout-btn:hover {
  background: #ff506d;
  transform: scale(1.07);
  box-shadow: 0 0 8px rgba(255, 80, 120, 0.5);
}

/* =============================== */
/* 🔥 모바일 버전 (max-width: 600px) */
/* =============================== */
@media (max-width: 600px) {

  .header {
    padding: 10px 12px;
    justify-content: space-between;
  }

  /* 로고 크기 축소 */
  .logo {
    font-size: 18px;
  }

  /* 메뉴(nav) 자동 축소 */
  .nav {
    gap: 12px;            /* 메뉴 간격 줄이기 */
    margin-left: 10px;    /* 가운데 정렬 무너짐 방지 */
  }

  .nav a {
    font-size: 13px;      /* 글자 크기 축소 */
    padding-bottom: 2px;
  }

  /* 이메일 너무 길면 숨기기 */
  .user-email {
    max-width: 80px;      /* 영역 제한 */
    white-space: nowrap;  /* 줄바꿈 금지 */
    overflow: hidden;     /* 영역 넘치면 숨김 */
    text-overflow: ellipsis; /* ... 처리 */
    display: inline-block;
    font-size: 12px;
  }

  .user-area {
    gap: 6px;
    margin-right: 12px;
  }

  .logout-btn {
    padding: 4px 8px;
    font-size: 12px;
    margin-left: 10px;
  }
}

</style>



