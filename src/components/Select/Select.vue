<template>
  <div
    class="custom-select-wrapper"
    :class="{ open: isOpen }"
    v-click-outside="closeDropdown"
  >
    <div class="custom-select" @click="toggleDropdown">
      <span class="custom-select-value">{{
        selectedValue || placeholder
      }}</span>
      <span class="custom-select-arrow">▼</span>
    </div>
    <ul v-if="isOpen" class="custom-select-options">
      <li
        v-for="option in options"
        :key="option"
        class="custom-select-option"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  options: Array as () => string[],
  placeholder: {
    type: String,
    default: "Выберите",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedValue = ref(props.modelValue);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectOption = (option: string) => {
  selectedValue.value = option;
  emit("update:modelValue", option);
  isOpen.value = false;
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue;
  }
);
</script>

<style scoped>
.custom-select-wrapper {
  position: relative;
  width: 100%;
  cursor: pointer;
}

.custom-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #d9dde8;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  color: #586380;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

.custom-select:hover {
  border-color: #4255ff;
}

.custom-select-arrow {
  font-size: 12px;
  color: #586380;
}

.custom-select-options {
  list-style: none;
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid #d9dde8;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
}

.custom-select-option {
  padding: 10px 15px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
}

.custom-select-option:hover {
  background-color: #f3f4f6;
}

.custom-select-wrapper.open .custom-select-arrow {
  transform: rotate(180deg);
}
</style>