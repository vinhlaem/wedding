<template>
  <div id="app">
    <div v-if="loading" class="global-loading" :class="{ closing }">
      <div class="spinner">
        <svg viewBox="0 0 512 512" width="250">
          <g transform="scale(0.92) translate(22 22)">
            <path
              class="heart-fill"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            />
            <path
              class="heart-stroke"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            />
          </g>
        </svg>
        <div class="text-separator">
          V<span class="text-separator-icon">💞</span>N
        </div>
      </div>
    </div>

    <Header v-if="!hideChrome" />
    <FallingHearts v-if="!loading" />
    <main class="main-content" v-show="closing || !loading">
      <router-view />
    </main>
    <Footer v-if="!hideChrome" v-show="closing || !loading" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FallingHearts from "@/components/FallingHearts.vue";

const loading = ref(true);
const closing = ref(false);
const route = useRoute();
const hideChrome = computed(() => Boolean(route.meta.hideChrome));

onMounted(() => {
  setTimeout(() => {
    closing.value = true; // start curtain-open animation — content becomes visible now
    setTimeout(() => {
      loading.value = false; // remove overlay from DOM after animation
      window.dispatchEvent(new CustomEvent("app-ready")); // signal components to start
    }, 1200); // must be >= CSS transition duration
  }, 3000);
});
</script>

<style scoped>
.main-content {
  min-height: 80vh;
}

.global-loading {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  z-index: 2000;
  overflow: hidden;
}

.global-loading::before,
.global-loading::after {
  content: "";
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(to bottom, #fdf0f0, #fce4e4 60%, #f9d0d0);
  border-right: 2px solid rgba(212, 165, 165, 0.5);
  transition: transform 1.2s cubic-bezier(0.76, 0, 0.24, 1);
  z-index: 1;
  box-shadow: inset 0 0 40px rgba(212, 165, 165, 0.15);
}

.global-loading::before {
  left: 0;
  border-right: 2px solid rgba(212, 165, 165, 0.5);
  border-left: none;
  transform-origin: left center;
}

.global-loading::after {
  right: 0;
  border-left: 2px solid rgba(212, 165, 165, 0.5);
  border-right: none;
  transform-origin: right center;
}

.global-loading.closing::before {
  transform: translateX(-100%);
}

.global-loading.closing::after {
  transform: translateX(100%);
}

.spinner {
  position: relative;
  z-index: 2;
}

.global-loading.closing .spinner {
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.global-loading svg {
  display: block;
}

.heart-fill {
  fill: white;
}

.heart-stroke {
  fill: none;
  stroke: var(--wedding-primary);
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
  stroke-dasharray: 1600;
  stroke-dashoffset: 1600;
  animation: draw 2s linear infinite;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.text-separator {
  color: var(--wedding-primary);
  font-size: 40px;
  font-weight: 600;
  text-decoration: none;
  font-family: var(--font-dancing-script);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.text-separator-icon {
  font-size: 30px;
  font-weight: 600;
  font-family: var(--font-dancing-script);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
