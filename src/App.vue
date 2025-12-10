<template>
  <div :class="['app-wrapper', { 'no-padding': isLoginPage }]">
    <Header v-if="!isLoginPage" />

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Header from "@/components/common/Header.vue";

const route = useRoute();

// Hash 모드이기 때문에 fullPath 체크
const isLoginPage = computed(() =>
    route.fullPath.includes("/signin")
);
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #1a1a1d;
  width: 100%;
  height: 100%;
  overflow-x: hidden !important;
}

.app-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: #1a1a1d;
  padding-top: 70px;
  overflow-x: hidden;
}

.no-padding {
  padding-top: 0 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}



@keyframes nf-slide-in {
  from {
    opacity: 0;
    transform: translateX(40px); /* 오른쪽에서 등장 */
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes nf-slide-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-40px); /* 왼쪽으로 나감 */
  }
}
</style>

