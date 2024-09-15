<template>
  <button
    :class="['custom-button', `custom-button--${props.size}`]"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>
  
  <script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "medium",
    validator: (value: string) => ["large", "medium", "small"].includes(value),
  },
});

const emit = defineEmits(["click"]);

// Обработка клика
const onClick = () => {
  emit("click");
};
</script>
  
  <style scoped>
.custom-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  outline: none;
}

.custom-button:hover {
  background-color: #2563eb;
}

.custom-button--large {
  font-size: 1.2rem;
  padding: 15px 30px;
}

.custom-button--medium {
  font-size: 1rem;
  padding: 10px 20px;
}

.custom-button--small {
  font-size: 0.8rem;
  padding: 5px 15px;
}
</style>
  