<template>
  <div class="input-wrapper">
    <label v-if="label" class="label" :for="id">{{ label }}</label>
    <div class="styles-input-container">
      <input
        :id="id"
        :type="computedType"
        :placeholder="placeholder"
        class="styles-input"
        :value="modelValue"
        @input="onInput"
        :class="{ invalid: hasError }"
      />
      <img
        v-if="type === 'password'"
        @click="togglePasswordVisibility"
        :class="{ active: showPassword }"
        class="eye-icon"
        src="@/assets/eye.svg"
        alt="eye"
      />
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const computedType = computed(() => {
  return props.type === "password" && showPassword.value ? "text" : props.type;
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
  
  <style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
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
</style>
  