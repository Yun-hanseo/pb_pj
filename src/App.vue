<template>
  <div
      class="app-wrapper"
      :class="{ noHeader: $route.path === '/signin' }"
  >
    <Header v-if="$route.path !== '/signin'" />

    <transition name="fade" mode="out-in">
      <RouterView />
    </transition>
  </div>
</template>

<script setup>
import Header from "@/components/common/Header.vue";
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

.app-wrapper.noHeader {
  padding-top: 0;
}
</style>
