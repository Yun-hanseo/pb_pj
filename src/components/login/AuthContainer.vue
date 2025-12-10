<template>
  <div class="auth-container">   <!-- ⬅ 전체 중앙 배치 -->
    <div class="auth-wrapper">   <!-- ⬅ 애니메이션 영역 -->
      <transition name="slide-fade" mode="out-in">
        <component
            :is="isLogin ? LoginForm : RegisterForm"
            @goRegister="showRegister"
            @goLogin="showLogin"
        />
      </transition>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

const isLogin = ref(true)

const showRegister = () => (isLogin.value = false)
const showLogin = () => (isLogin.value = true)
</script>


<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* 전체 레이아웃 (중앙 그대로 유지) */
.auth-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background:
      linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
      url("/netflix.png");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 카드 박스 (원래 너 UI 그대로 유지 + 감성만 업그레이드) */
.auth-card {
  width: 550px;
  max-width: 490px;
  padding: 80px;
  border-radius: 16px;

  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);

  box-shadow: 0 8px 24px rgba(0,0,0,0.35);

  display: flex;
  flex-direction: column;
  gap: 24px;

  animation: fadeUp 0.4s ease-out;
  color: white;
}

/* 제목 (크기 조정 X, 그대로 유지) */
.auth-title {
  text-align: center;
  font-size: 40px;
  font-weight: 700;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 22px;   /* 🔥 입력칸 사이 간격 넓히기 */
}


.input-group label {
  display: none;
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-size: 15px;
}

.input-group input {
  width:95%;
  height:30px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.25);

  background: rgba(255,255,255,0.1);
  color: white;

  transition: 0.25s;
}

.input-group input::placeholder {
  color: rgba(255,255,255,0.5);
}

.input-group input:focus {
  border-color: #e50914;
  box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.2);
  outline: none;
}

/* 버튼 그대로 + 넷플릭스 레드 */
.auth-btn {
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  border: none;

  background: #e50914;
  color: white;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;
  transition: 0.25s;
}

.auth-btn:hover {
  background: #f6121d;
}

/* 푸터 텍스트 */
.remember-me,
.terms,
.auth-footer {
  color: white;
}

.auth-link {
  color: #4dabff;
  cursor: pointer;
}

/* fade 애니메이션 그대로 유지 */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>