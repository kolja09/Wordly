<template>
  <form class="auth-form-wrapper" @submit.prevent="submitRegister">
    <div class="form-container">
      <div class="birth-date">
        <label class="label">Дата рождения</label>
        <div class="birth-date-options">
          <Select
            v-model="registerData.day"
            :options="dayOptions"
            placeholder="Число"
          />
          <Select
            v-model="registerData.month"
            :options="monthOptions"
            placeholder="Месяц"
          />
          <Select
            v-model="registerData.year"
            :options="yearOptions"
            placeholder="Год"
          />
        </div>
      </div>

      <div class="input-wrapper">
        <label class="label" for="email">Эл. почта</label>
        <div class="styles-input-container">
          <input
            id="email"
            placeholder="Введите адрес эл. почты или имя пользователя"
            class="styles-input"
            v-model="registerData.email"
            :class="{ invalid: v$.registerData.email.$error }"
          />
        </div>
        <div v-if="v$.registerData.email.$error" class="error-message">
          Некорректный адрес электронной почты
        </div>
      </div>

      <div class="input-wrapper">
        <label class="label" for="userName">Имя пользователя</label>
        <div class="styles-input-container">
          <input
            id="userName"
            type="text"
            placeholder="Введите имя пользователя"
            class="styles-input"
            v-model="registerData.username"
            :class="{ invalid: v$.registerData.username.$error }"
          />
        </div>
        <div v-if="v$.registerData.username.$error" class="error-message">
          {{ v$.registerData.username.$errors[0]?.$message }}
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
            v-model="registerData.password"
            :class="{ invalid: v$.registerData.password.$error }"
          />
          <img
            @click="showPassword = !showPassword"
            :class="{ active: showPassword }"
            class="eye-icon"
            src="@/assets/eye.svg"
            alt="eye"
          />
        </div>
        <div v-if="v$.registerData.password.$error" class="error-message">
          {{ v$.registerData.password.$errors[0]?.$message }}
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <Button class="custom-button" size="large" @click="submitRegister">
        Зарегистрироваться
      </Button>
    </div>
  </form>
</template>
  
  <script setup lang="ts">
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import Button from "@components/Button/Button.vue";
import Select from "@components/Select/Select.vue";

const showPassword = ref(false);

const registerData = ref({
  day: "",
  month: "",
  year: "",
  email: "",
  username: "",
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

const userNameField = helpers.withMessage(
  "Имя пользователя должно содержать минимум 2 символа",
  (value) => (value as string).length >= 3
);

const rules = {
  registerData: {
    email: { required: requiredField, email },
    password: { required: requiredField, password },
    username: { required: requiredField, userNameField },
  },
};

const v$ = useVuelidate(rules, { registerData });

const submitRegister = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    console.log("Registering with:", registerData.value);
  }
};

const dayOptions = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const monthOptions = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const yearOptions = Array.from({ length: 100 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);
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

.birth-date {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.birth-date-options {
  display: flex;
  gap: 10px;
}
</style>
  