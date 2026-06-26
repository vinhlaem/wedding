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
            <g class="heart-vine" aria-hidden="true">
              <path
                class="heart-vine__trail heart-vine__trail--left"
                d="M123 77C83 70 49 102 46 149c-3 46 18 91 51 132 29 36 64 66 90 96"
              />
              <path
                class="heart-vine__trail heart-vine__trail--right"
                d="M389 77c40-7 74 25 77 72 3 46-18 91-51 132-29 36-64 66-90 96"
              />
              <path
                class="heart-vine__trail heart-vine__trail--bottom"
                d="M190 382c19 18 35 35 52 47 9 6 19 6 28 0 17-12 33-29 52-47"
              />
              <path
                class="heart-vine__leaf"
                d="M72 133c-16-2-26-12-26-27 16 0 25 11 26 27ZM82 260c-17 5-30-1-38-15 16-5 29 0 38 15ZM154 352c-17 6-31 1-39-13 16-6 30-2 39 13ZM440 133c16-2 26-12 26-27-16 0-25 11-26 27ZM430 260c17 5 30-1 38-15-16-5-29 0-38 15ZM358 352c17 6 31 1 39-13-16-6-30-2-39 13Z"
              />
              <g class="heart-vine__flower" transform="translate(104 83) rotate(-20) scale(0.58)">
                <ellipse cx="0" cy="-8" rx="6" ry="10" />
                <ellipse cx="8" cy="0" rx="10" ry="6" />
                <ellipse cx="0" cy="8" rx="6" ry="10" />
                <ellipse cx="-8" cy="0" rx="10" ry="6" />
                <circle r="3.5" />
              </g>
              <g class="heart-vine__flower" transform="translate(47 178) rotate(-70) scale(0.52)">
                <ellipse cx="0" cy="-8" rx="6" ry="10" />
                <ellipse cx="8" cy="0" rx="10" ry="6" />
                <ellipse cx="0" cy="8" rx="6" ry="10" />
                <ellipse cx="-8" cy="0" rx="10" ry="6" />
                <circle r="3.5" />
              </g>
              <g class="heart-vine__flower" transform="translate(97 286) rotate(-52) scale(0.5)">
                <ellipse cx="0" cy="-8" rx="6" ry="10" />
                <ellipse cx="8" cy="0" rx="10" ry="6" />
                <ellipse cx="0" cy="8" rx="6" ry="10" />
                <ellipse cx="-8" cy="0" rx="10" ry="6" />
                <circle r="3.5" />
              </g>
              <g class="heart-vine__flower" transform="translate(176 374) rotate(-32) scale(0.52)">
                <ellipse cx="0" cy="-8" rx="6" ry="10" />
                <ellipse cx="8" cy="0" rx="10" ry="6" />
                <ellipse cx="0" cy="8" rx="6" ry="10" />
                <ellipse cx="-8" cy="0" rx="10" ry="6" />
                <circle r="3.5" />
              </g>
              <g class="heart-vine__flower" transform="translate(408 83) rotate(20) scale(0.58)">
                <ellipse cx="0" cy="-8" rx="6" ry="10" />
                <ellipse cx="8" cy="0" rx="10" ry="6" />
                <ellipse cx="0" cy="8" rx="6" ry="10" />
                <ellipse cx="-8" cy="0" rx="10" ry="6" />
                <circle r="3.5" />
              </g>
              <g class="heart-vine__flower" transform="translate(465 178) rotate(70) scale(0.52)">
                <ellipse cx="0" cy="-8" rx="6" ry="10" />
                <ellipse cx="8" cy="0" rx="10" ry="6" />
                <ellipse cx="0" cy="8" rx="6" ry="10" />
                <ellipse cx="-8" cy="0" rx="10" ry="6" />
                <circle r="3.5" />
              </g>
              <g class="heart-vine__flower" transform="translate(415 286) rotate(52) scale(0.5)">
                <ellipse cx="0" cy="-8" rx="6" ry="10" />
                <ellipse cx="8" cy="0" rx="10" ry="6" />
                <ellipse cx="0" cy="8" rx="6" ry="10" />
                <ellipse cx="-8" cy="0" rx="10" ry="6" />
                <circle r="3.5" />
              </g>
              <g class="heart-vine__flower" transform="translate(336 374) rotate(32) scale(0.52)">
                <ellipse cx="0" cy="-8" rx="6" ry="10" />
                <ellipse cx="8" cy="0" rx="10" ry="6" />
                <ellipse cx="0" cy="8" rx="6" ry="10" />
                <ellipse cx="-8" cy="0" rx="10" ry="6" />
                <circle r="3.5" />
              </g>
              <g class="heart-vine__flower" transform="translate(256 426) rotate(0) scale(0.5)">
                <ellipse cx="0" cy="-8" rx="6" ry="10" />
                <ellipse cx="8" cy="0" rx="10" ry="6" />
                <ellipse cx="0" cy="8" rx="6" ry="10" />
                <ellipse cx="-8" cy="0" rx="10" ry="6" />
                <circle r="3.5" />
              </g>
            </g>
          </g>
        </svg>
        <MonogramVN class="loading-monogram" />
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
import MonogramVN from "@/components/common/MonogramVN.vue";

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
.heart-vine {
  fill: none;
  stroke: var(--wedding-primary);
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 3px 4px rgba(185, 74, 88, 0.16));
  pointer-events: none;
}

.heart-vine__trail {
  stroke-width: 1.45;
  opacity: 0.42;
}

.heart-vine__trail--bottom {
  stroke-width: 1.15;
  opacity: 0.34;
}

.heart-vine__leaf {
  fill: var(--wedding-primary-hover);
  stroke-width: 0.9;
  opacity: 0.58;
}

.heart-vine__flower {
  fill: var(--wedding-primary-soft);
  stroke: var(--wedding-primary);
  stroke-width: 0.9;
  opacity: 0.64;
  transform-box: fill-box;
  transform-origin: center;
}

.heart-vine__flower circle {
  fill: var(--wedding-primary-hover);
  stroke-width: 0.75;
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.loading-monogram {
  width: 145px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
