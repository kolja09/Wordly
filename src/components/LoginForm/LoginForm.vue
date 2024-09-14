<template>
  <form class="auth-form-wrapper" @submit.prevent="submitLogin">
    <div class="form-container">
      <div class="input-wrapper">
        <label class="label" for="email">Эл. почта</label>
        <div class="styles-input-container">
          <input
            class="styles-input"
            id="email"
            placeholder="Введите адрес эл. почты или имя пользователя"
            v-model="loginData.email"
            :class="{ invalid: v$.loginData.email.$error }"
          />
        </div>
        <div v-if="v$.loginData.email.$error" class="error-message">
          Некорректный адрес электронной почты
        </div>
      </div>

      <div class="input-wrapper password-field">
        <label class="label" for="password">Пароль</label>
        <div class="styles-input-container">
          <input
            class="styles-input"
            id="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Введите пароль"
            v-model="loginData.password"
            :class="{ invalid: v$.loginData.password.$error }"
          />
          <img
            @click="showPassword = !showPassword"
            :class="{ active: showPassword }"
            class="eye-icon"
            src="@/assets/eye.svg"
            alt="eye"
          />
        </div>
        <div v-if="v$.loginData.password.$error" class="error-message">
          {{ v$.loginData.password.$errors[0]?.$message }}
        </div>
        <a href="#" class="forgot-password">Забыли пароль?</a>
      </div>
    </div>

    <div class="action-buttons">
      <Button class="custom-button" size="large" @click="submitLogin">
        Войти
      </Button>
    </div>
  </form>
</template>
  
  <script setup lang="ts">
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

import Button from "@components/Button/Button.vue";

const showPassword = ref(false);

const loginData = ref({
  email: "",
  password: "",
});

const requiredField = helpers.withMessage(
  "Это поле обязательно для заполнения",
  required
);

const password = helpers.withMessage(
  "Пароль должен содержать минимум 8 символов, включая заглавную букву, строчную букву, цифру и специальный символ",
  (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/.test(
      value as string
    )
);

const rules = {
  loginData: {
    email: { required: requiredField, email },
    password: { required: requiredField, password },
  },
};

const v$ = useVuelidate(rules, { loginData });

const submitLogin = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    console.log("Logging in with:", loginData.value);
  }
};
</script>
  
  <style scoped>
.auth-form-wrapper {
  display: flex;
  flex-direction: column;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.label {
  font-size: 14px;
  font-weight: bold;

  color: #586380;
}

.styles-input-container {
  position: relative;

  margin-top: 8px;
}

.styles-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  color: #282e3e;
  background-color: #f6f7fb;
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.styles-input:focus {
  border-bottom-color: black;
}

.styles-input.invalid {
  border-bottom-color: #e57373;
  background-color: #fce4ec;
}

.error-message {
  color: #e57373;
  font-size: 0.9rem;
  font-weight: 600;
}

.forgot-password {
  display: flex;
  justify-content: flex-end;

  color: #4255ff;

  font-weight: 600;
  font-size: 14px;

  margin-top: 7px;

  transition: all 0.3s;
}

.forgot-password:hover {
  color: #2d3ab2;
  text-decoration: underline;

  transition: all 0.3s;
}

.custom-button {
  width: 100%;
}

.custom-button--outline {
  background: none;
  border: 2px solid #d9dde8;
  color: #586380;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  margin-top: 20px;
}

.custom-button--outline:hover {
  background-color: #edeff4;
}

.eye-icon {
  padding: 5px;

  width: 30px;

  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.eye-icon:hover {
  background-color: #edeff4;
  border-radius: 50%;
}

.eye-icon.active {
  background-color: #edeff4;
  border-radius: 50%;
}

.action-buttons {
  margin-top: 45px;
}
</style>
  