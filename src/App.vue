<template>
  <div :class="['app-wrapper', { 'no-padding': isLoginPage }]">
    <!-- 로그인 페이지가 아닐 때만 헤더 표시 -->
    <Header v-if="!isLoginPage" />

    <!-- RouterView + transition (Vue 경고 해결) -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import Header from "@/components/common/Header.vue";
import { getCurrentUser } from "@/utils/login.js";

const route = useRoute();
const router = useRouter();

// 로그인 페이지 여부
const isLoginPage = computed(() => route.path === "/signin");

// ⭐ 앱 실행 시 자동 로그인 처리
onMounted(() => {
  const user = getCurrentUser();
  if (user && route.path === "/signin") {
    router.push("/"); // 로그인 돼있으면 홈으로 이동
  }
});
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #1a1a1d;
  width: 100%;
  height: 100%;
}

.app-wrapper {
  min-height: 100vh;
  width: 100%;
  background-color: #1a1a1d;
  padding-top: 70px;
}

.no-padding {
  padding-top: 0 !important;
}
</style>
