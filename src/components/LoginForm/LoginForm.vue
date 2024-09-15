<template>
  <form class="auth-form-wrapper" @submit.prevent="submitLogin">
    <div class="form-container">
      <InputField
        id="email"
        v-model="loginData.email"
        :label="$t('labels.email')"
        :placeholder="$t('placeholder.email')"
        :has-error="v$.loginData.email.$error"
        :error-message="v$.loginData.email.$errors[0]?.$message.toString()"
      />

      <InputField
        id="password"
        v-model="loginData.password"
        :label="$t('labels.password')"
        type="password"
        :placeholder="$t('placeholder.password')"
        :has-error="v$.loginData.password.$error"
        :error-message="v$.loginData.password.$errors[0]?.$message.toString()"
      />

      <a href="#" class="forgot-password">{{ $t("forgotPassword") }}</a>
    </div>

    <div class="action-buttons">
      <Button class="custom-button" size="large" @click="submitLogin">
        {{ $t("loginButton") }}
      </Button>
      <Button
        size="large"
        class="custom-button--outline"
        @click="$emit('switchToRegister')"
      >
        {{ $t("switchToRegister") }}
      </Button>
    </div>
  </form>
</template>
  
  
  <script setup lang="ts">
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";

import Button from "@components/Button/Button.vue";
import InputField from "@components/InputField/InputField.vue";

import { useValidators } from "@/common/validators";

const loginData = ref({
  email: "",
  password: "",
});

const { requiredField, emailValidator, passwordValidator } = useValidators();

const rules = {
  loginData: {
    email: { required: requiredField(), email: emailValidator() },
    password: { required: requiredField(), password: passwordValidator() },
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

.forgot-password {
  display: flex;
  justify-content: flex-end;

  color: #4255ff;

  font-weight: 600;
  font-size: 14px;

  margin-top: 7px;

  transition: all 0.3s;

  outline: none;
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

.action-buttons {
  margin-top: 45px;
}
</style>
  