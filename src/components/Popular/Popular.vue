<template>
  <div class="popular-container">
    <Header />

    <!-- 보기 방식 선택 버튼 -->
    <div class="view-toggle">
      <button
          :class="{ active: viewType === 'table' }"
          @click="viewType = 'table'"
      >
        Table View
      </button>

      <button
          :class="{ active: viewType === 'infinite' }"
          @click="viewType = 'infinite'"
      >
        Infinite Scroll
      </button>
    </div>

    <!-- View 전환 -->
    <transition name="fade" mode="out-in">
      <PopularTable v-if="viewType === 'table'" />
      <PopularInfinite v-else />
    </transition>

  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "@/components/common/Header.vue";
import PopularTable from "./PopularTable.vue";
import PopularInfinite from "./PopularInfinite.vue";

const viewType = ref("table"); // 기본값은 Table View
</script>

<style scoped>
.popular-container {
  background-color: #1a1a1d;
  padding-top: 60px;
  color: white;
  min-height: auto;
}


/* 뷰 선택 버튼 */
.view-toggle {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
}

.view-toggle button {
  padding: 8px 18px;
  border-radius: 8px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.25s;
  font-size: 15px;
}

.view-toggle button.active {
  background: #ff3b57;
  transform: scale(1.05);
}
</style>