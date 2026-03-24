<template>
  <div class="falling-hearts" aria-hidden="true">
    <span v-for="h in hearts" :key="h.id" class="heart" :style="h.style"
      >♥</span
    >
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const TOTAL = 18;
const hearts = ref([]);
let timer = null;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function makeHeart(id) {
  const size = random(10, 26); // px
  const left = random(0, 100); // vw %
  const delay = random(0, 10); // s
  const dur = random(6, 15); // s fall duration
  const opacity = random(0.25, 0.7);
  const hue = random(340, 360); // pinkish hues
  const drift = random(-60, 60); // horizontal sway in px

  return {
    id,
    style: {
      left: `${left}vw`,
      fontSize: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${dur}s`,
      opacity,
      color: `hsl(${hue}, 80%, 65%)`,
      "--drift": `${drift}px`,
    },
  };
}

onMounted(() => {
  hearts.value = Array.from({ length: TOTAL }, (_, i) => makeHeart(i));

  // Recycle hearts so they keep falling indefinitely without a huge DOM count
  timer = setInterval(() => {
    const idx = Math.floor(Math.random() * TOTAL);
    hearts.value[idx] = makeHeart(idx);
  }, 1800);
});

onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.falling-hearts {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  overflow: hidden;
}

.heart {
  position: absolute;
  top: -40px;
  display: inline-block;
  animation: fall linear infinite;
  user-select: none;
  will-change: transform, opacity;
}

@keyframes fall {
  0% {
    transform: translateY(0) translateX(0) rotate(-15deg) scale(1);
    opacity: inherit;
  }
  25% {
    transform: translateY(25vh) translateX(var(--drift)) rotate(10deg)
      scale(1.05);
  }
  50% {
    transform: translateY(50vh) translateX(0px) rotate(-8deg) scale(0.95);
  }
  75% {
    transform: translateY(75vh) translateX(calc(var(--drift) * -0.6))
      rotate(12deg) scale(1.02);
  }
  100% {
    transform: translateY(110vh) translateX(0) rotate(-5deg) scale(0.9);
    opacity: 0;
  }
}
</style>
