<template>
  <form class="auth-form-wrapper" @submit.prevent="submitRegister">
    <div class="form-container">
      <div class="birth-date">
        <label class="label">{{ $t("labels.birthDate") }}</label>
        <div class="birth-date-options">
          <Select
            v-model="registerData.day"
            :has-error="v$.registerData.day.$error"
            :options="dayOptions"
            :placeholder="$t('placeholder.day')"
          />
          <Select
            :has-error="v$.registerData.month.$error"
            v-model="registerData.month"
            :options="monthOptions"
            :placeholder="$t('placeholder.month')"
          />
          <Select
            :has-error="v$.registerData.year.$error"
            v-model="registerData.year"
            :options="yearOptions"
            :placeholder="$t('placeholder.year')"
          />
        </div>
        <div
          v-if="
            v$.registerData.day.$error ||
            v$.registerData.month.$error ||
            v$.registerData.year.$error
          "
          class="error-message"
        >
          {{ $t("errors.birthDateRequired") }}
        </div>
      </div>
      <InputField
        id="email"
        v-model="registerData.email"
        :label="$t('labels.email')"
        :placeholder="$t('placeholder.email')"
        :has-error="v$.registerData.email.$error"
        :error-message="v$.registerData.email.$errors[0]?.$message.toString()"
      />
      <InputField
        id="userName"
        v-model="registerData.username"
        :label="$t('labels.userName')"
        :placeholder="$t('placeholder.userName')"
        :has-error="v$.registerData.username.$error"
        :error-message="
          v$.registerData.username.$errors[0]?.$message.toString()
        "
      />
      <InputField
        id="password"
        v-model="registerData.password"
        :label="$t('labels.password')"
        type="password"
        :placeholder="$t('placeholder.password')"
        :has-error="v$.registerData.password.$error"
        :error-message="
          v$.registerData.password.$errors[0]?.$message.toString()
        "
      />
    </div>

    <div class="action-buttons">
      <Button class="custom-button" size="large" @click="submitRegister">
        {{ $t("registerButton") }}
      </Button>
      <Button
        size="large"
        class="custom-button--outline"
        @click="$emit('switchToRegister')"
      >
        {{ $t("switchToLogin") }}
      </Button>
    </div>
  </form>
</template>
  
  <script setup lang="ts">
import { computed, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { useI18n } from "vue-i18n";
import { useValidators } from "@/common/validators";

import Button from "@components/Button/Button.vue";
import Select from "@components/Select/Select.vue";
import InputField from "@components/InputField/InputField.vue";

const { t } = useI18n();

const registerData = ref({
  day: "",
  month: "",
  year: "",
  email: "",
  username: "",
  password: "",
});

const { requiredField, emailValidator, passwordValidator, userNameValidator } =
  useValidators();

const rules = {
  registerData: {
    email: { required: requiredField(), email: emailValidator() },
    username: {
      required: requiredField(),
      userNameValidator: userNameValidator(),
    },
    password: { required: requiredField(), password: passwordValidator() },
    day: { required: requiredField() },
    month: { required: requiredField() },
    year: { required: requiredField() },
  },
};

const v$ = useVuelidate(rules, { registerData });

const submitRegister = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    console.log("Registering with:", registerData.value);
  }
};

const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  id: (i + 1).toString(),
  name: (i + 1).toString(),
}));

const monthOptions = computed(() => {
  return [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december"),
  ].map((month, index) => ({
    id: (index + 1).toString(),
    name: month,
  }));
});

const yearOptions = Array.from({ length: 100 }, (_, i) => {
  const year = (new Date().getFullYear() - i).toString();
  return { id: year, name: year };
});
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
  