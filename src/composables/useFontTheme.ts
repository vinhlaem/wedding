import { computed, ref } from "vue";

export type FontTheme = "great-vibes" | "cormorant-luxury" | "korean-romantic";

type FontThemeConfig = {
  id: FontTheme;
  name: string;
  label: string;
  couple: string;
  heading: string;
  body: string;
  form: string;
};

const STORAGE_KEY = "wedding-font-theme";
const DEFAULT_THEME: FontTheme = "great-vibes";

export const fontThemes: Record<FontTheme, FontThemeConfig> = {
  "great-vibes": {
    id: "great-vibes",
    name: "Great Vibes",
    label: "Elegant Premium",
    couple: '"Great Vibes", "Noto Serif", "Dancing Script", cursive',
    heading: '"Bellota Text", "Noto Serif", serif',
    body: '"Bellota Text", "Noto Serif", serif',
    form: '"Mulish", Arial, sans-serif',
  },
  "cormorant-luxury": {
    id: "cormorant-luxury",
    name: "Cormorant Luxury",
    label: "Luxury Editorial",
    couple: '"Cormorant Garamond", "Noto Serif", serif',
    heading: '"Cormorant Garamond", "Noto Serif", "Playfair Display", serif',
    body: '"Lora", "Noto Serif", serif',
    form: '"Mulish", Arial, sans-serif',
  },
  "korean-romantic": {
    id: "korean-romantic",
    name: "Korean Romantic",
    label: "Korean Wedding",
    couple: '"Noto Serif", "Cormorant Garamond", serif',
    heading: '"Playfair Display", "Noto Serif", "Cormorant Garamond", serif',
    body: '"Playfair Display", "Noto Serif", "Lora", serif',
    form: '"Mulish", Arial, sans-serif',
  },
};

const isFontTheme = (value: unknown): value is FontTheme =>
  typeof value === "string" && value in fontThemes;

const getInitialTheme = (): FontTheme => {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  return isFontTheme(savedTheme) ? savedTheme : DEFAULT_THEME;
};

const currentTheme = ref<FontTheme>(getInitialTheme());

const applyTheme = (theme: FontTheme) => {
  if (typeof document === "undefined") return;
  const config = fontThemes[theme];
  const root = document.documentElement.style;

  root.setProperty("--font-couple", config.couple);
  root.setProperty("--font-heading", config.heading);
  root.setProperty("--font-body", config.body);
  root.setProperty("--font-form", config.form);
};

applyTheme(currentTheme.value);

export function useFontTheme() {
  const themeConfig = computed(() => fontThemes[currentTheme.value]);

  const setTheme = (theme: FontTheme) => {
    currentTheme.value = theme;
    applyTheme(theme);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  };

  return {
    currentTheme,
    setTheme,
    themeConfig,
    themes: fontThemes,
  };
}
