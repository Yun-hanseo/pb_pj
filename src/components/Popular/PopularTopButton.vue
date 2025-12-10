<template>
  <button class="top-btn" @click="scrollTop">
    ⬆ TOP
  </button>
</template>

<script setup>
function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
</script>

<style scoped>
.top-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  padding: 12px 16px;
  background: #ff3b57;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
  transition: 0.25s;
  z-index: 2000;
}

.top-btn:hover {
  transform: translateY(-3px);
  background: #ff506d;
}
</style>
