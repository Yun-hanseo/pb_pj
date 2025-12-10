<template>
  <div class="auth-card">
    <h2 class="auth-title">회원가입</h2>

    <form class="auth-form" @submit.prevent="handleRegister">

      <div class="input-group">
        <label>이메일</label>
        <input
            type="email"
            placeholder="이메일을 입력하세요"
            v-model="email"
        />
      </div>

      <div class="input-group">
        <label>비밀번호(API KEY)</label>
        <input
            type="password"
            placeholder="TMDB API KEY를 입력하세요"
            v-model="password"
        />
      </div>

      <div class="input-group">
        <label>비밀번호 확인</label>
        <input
            type="password"
            placeholder="비밀번호(API KEY)를 다시 입력하세요"
            v-model="confirmPassword"
        />
      </div>

      <!-- ⭐ 필수 약관 동의 -->
      <div class="terms">
        <input type="checkbox" id="terms" v-model="acceptTerms" />
        <label for="terms">서비스 이용약관에 동의합니다 (필수)</label>
      </div>

      <button type="submit" class="auth-btn">회원가입</button>
    </form>

    <p class="auth-footer">
      이미 계정이 있나요?
      <span class="auth-link" @click="emit('goLogin')">로그인</span>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { registerUser } from "@/utils/login.js";

const emit = defineEmits(["goLogin"]);

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptTerms = ref(false);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleRegister() {
  if (!emailRegex.test(email.value)) {
    showToast("올바른 이메일 형식이 아닙니다!", "red");
    return;
  }

  if (password.value !== confirmPassword.value) {
    showToast("비밀번호(API KEY)가 일치하지 않습니다!", "red");
    return;
  }

  if (!acceptTerms.value) {
    showToast("필수 약관에 동의해야 회원가입이 가능합니다.", "red");
    return;
  }

  const result = await registerUser(email.value, password.value);

  if (result.success) {
    showToast("회원가입 성공! 로그인해주세요.", "#4c7fff");

    // 값 초기화
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    acceptTerms.value = false;

    setTimeout(() => {
      emit("goLogin");
    }, 500);
  } else {
    showToast("회원가입 실패: " + result.message, "red");
  }
}

function showToast(message, color = "#4c7fff") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    backgroundColor: color,
  }).showToast();
}
</script>