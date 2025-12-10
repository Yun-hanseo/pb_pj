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

