<template>
  <div class="skeleton-card">
    <div class="skeleton poster"></div>
    <div class="skeleton title"></div>
    <div class="skeleton info"></div>
  </div>
</template>

<style scoped>
.skeleton-card {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
}

.skeleton {
  background: linear-gradient(90deg, #2a2a2a 0%, #3d3d3d 50%, #2a2a2a 100%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 10px;
}

.poster {
  width: 200px;
  height: 300px;
}

.title {
  width: 60%;
  height: 14px;
}

.info {
  width: 40%;
  height: 14px;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
<script setup lang="ts">
</script>