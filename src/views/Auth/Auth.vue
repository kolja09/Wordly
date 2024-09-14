<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-image-section">
        <h2>
          {{
            isLogin
              ? "Щелкайте модули как орешки."
              : "Самый лучший способ учиться. Чтобы сохранить прогресс!"
          }}
        </h2>
        <img
          class="auth-bg-image"
          src="@/assets/bg-login.png"
          alt="Books and headphones"
        />
        <img class="auth-logo" src="@/assets/auth-logo.svg" alt="logo" />
      </div>

      <div class="auth-form-section">
        <div class="auth-form-header">
          <span :class="{ active: isLogin }" @click="isLogin = true">
            Вход
          </span>
          <span :class="{ active: !isLogin }" @click="isLogin = false">
            Зарегистрироваться
          </span>
        </div>

        <LoginForm v-if="isLogin" />
        <RegisterForm v-else />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import LoginForm from "@/components/LoginForm/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm/RegisterForm.vue";

import { ref } from "vue";

const isLogin = ref(true);
</script>

<style scoped>
.auth-page {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.auth-container {
  display: flex;
  width: 100%;
  height: 100vh;
}

.auth-image-section {
  position: relative;
  width: 50%;
}

.auth-bg-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.auth-logo {
  position: absolute;
  bottom: 50px;
  left: 40px;

  width: 160px;
}

.auth-image-section h2 {
  position: absolute;

  padding: 40px;

  font-size: 44px;
  line-height: 52px;
  font-family: 400;

  width: 80%;

  color: #282e3e;
}

.auth-form-section {
  margin: 0 auto;

  max-width: 576px;
  width: 100%;
  padding: 64px 0;
}

.auth-form-header {
  display: flex;
  gap: 50px;
  margin-bottom: 40px;
}

.auth-form-header span {
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;

  color: #586380;

  cursor: pointer;
}

.auth-form-header span.active {
  position: relative;
  color: #2e3856;
}

.auth-form-header span.active::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 6px;
  width: 95px;
  background-image: url("@/assets/underline.svg");
  background-repeat: no-repeat;
}

@media (max-width: 1024px) {
  .auth-image-section {
    display: none;
  }
  .auth-form-section {
    width: 100%;
  }
}
</style>
