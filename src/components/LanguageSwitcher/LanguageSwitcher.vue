<template>
  <div class="language-switcher">
    <button
      v-for="lang in availableLanguages"
      :key="lang"
      @click="switchLanguage(lang)"
      :class="{ active: currentLang === lang }"
    >
      <img v-if="lang === 'ua'" src="@/assets/flag-ua.png" alt="UA" />
      <img v-if="lang === 'en'" src="@/assets/flag-en.png" alt="EN" />
      {{ $t(getLanguageName(lang)) }}
    </button>
  </div>
</template>
  
  <script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const availableLanguages = ["ua", "en"];

const { locale } = useI18n();
const currentLang = ref(locale.value);

const switchLanguage = (lang: string) => {
  locale.value = lang;
  currentLang.value = lang;
  document.cookie = `lang=${lang};path=/`;
};

const getLanguageName = (lang: string) => {
  switch (lang) {
    case "ua":
      return "ua";
    case "en":
      return "en";
    default:
      return lang.toUpperCase();
  }
};
</script>
  
  <style scoped>
.language-switcher {
  display: flex;
  gap: 15px;
  align-items: center;
}

.language-switcher button {
  background: none;
  border: none;
  cursor: pointer;
  color: #586380;
  display: flex;
  align-items: center;
  font-size: 14px;
  outline: none;
}

.language-switcher img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.language-switcher button.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
  