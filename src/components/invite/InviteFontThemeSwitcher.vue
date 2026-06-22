<template>
  <aside v-if="isDev" class="font-theme-switcher">
    <div class="font-theme-switcher__eyebrow">Font Theme Tester</div>
    <label class="font-theme-switcher__field">
      <span>Font Theme</span>
      <select v-model="selectedTheme" @change="handleThemeChange">
        <option v-for="theme in themeOptions" :key="theme.id" :value="theme.id">
          {{ theme.name }}
        </option>
      </select>
    </label>

    <div class="font-theme-switcher__current">
      <strong>{{ themeConfig.name }}</strong>
      <span>{{ themeConfig.label }}</span>
    </div>

    <div class="font-theme-switcher__preview">
      <p class="font-theme-switcher__label">Couple Preview</p>
      <div class="font-theme-switcher__couple">
        <span>Trương Đình Vinh</span>
        <small>&</small>
        <span>Võ Thị Minh Nguyệt</span>
      </div>

      <p class="font-theme-switcher__heading">THÔNG TIN LỄ CƯỚI</p>
      <p class="font-theme-switcher__body">
        Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi.
      </p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { type FontTheme, useFontTheme } from "@/composables/useFontTheme";

const isDev = import.meta.env.DEV;
const { currentTheme, setTheme, themeConfig, themes } = useFontTheme();

const selectedTheme = ref<FontTheme>(currentTheme.value);
const themeOptions = computed(() => Object.values(themes));

watch(currentTheme, (theme) => {
  selectedTheme.value = theme;
});

function handleThemeChange() {
  setTheme(selectedTheme.value);
}
</script>

<style scoped>
.font-theme-switcher {
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 3000;
  width: min(300px, calc(100vw - 32px));
  padding: 14px;
  border: 1px solid rgba(185, 74, 88, 0.24);
  border-radius: 10px;
  background: rgba(255, 248, 248, 0.94);
  color: #8f3140;
  box-shadow: 0 18px 44px rgba(72, 30, 38, 0.22);
  backdrop-filter: blur(10px);
}

.font-theme-switcher__eyebrow,
.font-theme-switcher__label {
  font-family: var(--font-form);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.font-theme-switcher__field {
  display: grid;
  gap: 6px;
  margin-top: 10px;
  font-family: var(--font-form);
  font-size: 0.8rem;
}

.font-theme-switcher__field select {
  width: 100%;
  border: 1px solid rgba(185, 74, 88, 0.28);
  border-radius: 8px;
  padding: 8px 10px;
  background: #fff;
  color: #8f3140;
  font-family: var(--font-form);
  outline: none;
}

.font-theme-switcher__current {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
  font-family: var(--font-form);
  font-size: 0.78rem;
}

.font-theme-switcher__current span {
  color: rgba(143, 49, 64, 0.7);
}

.font-theme-switcher__preview {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(185, 74, 88, 0.16);
}

.font-theme-switcher__couple {
  display: grid;
  gap: 3px;
  margin: 6px 0 12px;
  color: #b94a58;
  font-family: var(--font-couple);
  font-size: 1.45rem;
  line-height: 1.08;
  text-align: center;
}

.font-theme-switcher__couple small {
  font-size: 1rem;
}

.font-theme-switcher__heading {
  margin: 0 0 6px;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.font-theme-switcher__body {
  margin: 0;
  font-family: var(--font-body);
  font-size: 0.82rem;
  line-height: 1.5;
}

@media (max-width: 520px) {
  .font-theme-switcher {
    max-height: 50vh;
    overflow: auto;
  }
}
</style>
