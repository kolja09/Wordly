<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-image-section">
        <h2>
          {{ isLogin ? $t("welcome") : $t("welcomeRegister") }}
        </h2>
        <img
          class="auth-bg-image"
          src="@/assets/bg-login.png"
          alt="Books and headphones"
        />
        <img class="auth-logo" src="@/assets/auth-logo.svg" alt="logo" />
      </div>

      <div class="auth-form-section">
        <LanguageSwitcher class="language-switcher" />
        <div class="auth-form-header">
          <span :class="{ active: !isLogin }" @click="isLogin = false">
            {{ $t("register") }}
          </span>
          <span :class="{ active: isLogin }" @click="isLogin = true">
            {{ $t("login") }}
          </span>
        </div>

        <LoginForm @switchToRegister="handleSwitchToRegister" v-if="isLogin" />
        <RegisterForm @switchToRegister="handleSwitchToRegister" v-else />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import LoginForm from "@/components/LoginForm/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm/RegisterForm.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher.vue";

import { ref } from "vue";

const isLogin = ref(true);

const handleSwitchToRegister = () => {
  isLogin.value = !isLogin.value;
};
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
  position: relative;

  box-sizing: content-box;
  margin: 0 auto;

  max-width: 576px;
  width: 100%;
  padding: 60px 20px;

  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.auth-form-section::-webkit-scrollbar {
  display: none;
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

.language-switcher {
  position: absolute;
  right: 20px;
  top: 40px;
}

@media (max-width: 1200px) {
  .auth-image-section {
    display: none;
  }
  .auth-form-section {
    width: 100%;
  }
}
</style>
