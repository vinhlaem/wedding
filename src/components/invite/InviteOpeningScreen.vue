<template>
  <section class="invite-opening">
    <div class="invite-opening__petals" aria-hidden="true">
      <span v-for="item in petals" :key="item" :style="{ '--i': item }"></span>
    </div>

    <article class="invite-opening__card" :style="cardStyle">
      <div
        class="invite-opening__heart-wrap"
        :class="{ 'is-bursting': isOpening }"
      >
        <div class="invite-opening__heart">
          <MonogramVN />
        </div>
        <div
          v-if="isOpening"
          class="invite-opening__heart-burst"
          aria-hidden="true"
        >
          <span
            v-for="heart in burstHearts"
            :key="heart.id"
            :style="heart.style"
            >♥</span
          >
        </div>
      </div>
      <h1 class="invite-opening__names" :class="{ 'is-opening': isOpening }">
        <span>{{ config.groomName }}</span>
        <small>&</small>
        <span>{{ config.brideName }}</span>
      </h1>
      <div class="invite-opening__divider">❦</div>
      <p class="invite-opening__date">{{ config.displayDate }}</p>
      <p class="invite-opening__label">Thân Mời</p>
      <p class="invite-opening__guest">{{ guestName }}</p>
      <p class="invite-opening__message">
        đến dự buổi tiệc chung vui cùng gia đình
      </p>
      <button
        class="invite-opening__button"
        type="button"
        :disabled="isOpening"
        @click="handleOpen"
      >
        {{ isOpening ? "Đang mở..." : "Mở thiệp" }}
      </button>
    </article>
  </section>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import bgFull from "@/assets/images/invite/bg-full.jpg";
import MonogramVN from "@/components/common/MonogramVN.vue";

defineProps({
  guestName: {
    type: String,
    required: true,
  },
  config: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["open"]);
const isOpening = ref(false);
let openTimer;

const burstHearts = Array.from({ length: 24 }, (_, index) => {
  const angle = (360 / 24) * index + (index % 2 ? 7 : -6);
  const distance = 82 + (index % 5) * 14;
  const radians = (angle * Math.PI) / 180;

  return {
    id: index,
    style: {
      "--heart-x": `${Math.cos(radians) * distance}px`,
      "--heart-y": `${Math.sin(radians) * distance}px`,
      "--heart-delay": `${(index % 6) * 28}ms`,
      "--heart-scale": 0.62 + (index % 4) * 0.16,
      "--heart-rotate": `${index % 2 ? 42 : -36}deg`,
      "--heart-size": `${14 + (index % 4) * 3}px`,
    },
  };
});

function handleOpen() {
  if (isOpening.value) return;

  isOpening.value = true;
  openTimer = window.setTimeout(() => emit("open"), 1100);
}

onBeforeUnmount(() => window.clearTimeout(openTimer));

const petals = Array.from({ length: 12 }, (_, index) => index + 1);
const cardStyle = {
  backgroundImage: `linear-gradient(rgba(255, 248, 248, 0.88), rgba(255, 248, 248, 0.9)), url(${bgFull})`,
};
</script>

<style scoped>
.invite-opening {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  overflow: hidden;
  background: #b94a58;
  color: #b94a58;
  font-family: var(--font-body);
}

.invite-opening__card {
  position: relative;
  width: min(600px, calc(100% - 32px));
  min-height: 500px;
  padding: clamp(28px, 5vw, 44px);
  border-radius: 8px;
  box-shadow: 0 26px 70px rgba(85, 23, 32, 0.34);
  background-size: cover;
  background-position: center;
  text-align: center;
  z-index: 1;
}

.invite-opening__heart-wrap {
  position: relative;
  display: inline-grid;
  place-items: center;
  z-index: 2;
}

.invite-opening__heart {
  width: 122px;
  height: 122px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 50%;
  background:
    radial-gradient(
      circle at 35% 28%,
      rgba(255, 255, 255, 0.16),
      transparent 34%
    ),
    linear-gradient(145deg, #c95566 0%, #b74050 100%);
  color: #fff7f2;
  font-size: 28px;
  box-shadow:
    0 16px 34px rgba(185, 74, 88, 0.34),
    0 0 0 5px rgba(255, 255, 255, 0.72),
    0 0 0 7px rgba(185, 74, 88, 0.1);
  filter: drop-shadow(0 12px 18px rgba(185, 74, 88, 0.2));
  transition:
    transform 240ms ease,
    filter 240ms ease;
}


.invite-opening__heart::before {
  content: "";
  position: absolute;
  inset: -9px;
  border-radius: inherit;
  border: 2px solid rgba(185, 74, 88, 0.3);
  opacity: 0;
  pointer-events: none;
}
.invite-opening__heart :deep(.monogram-vn) {
  width: 94px;
  color: #fff7f2;
  filter: drop-shadow(0 2px 3px rgba(92, 22, 32, 0.24));
}

.invite-opening__heart :deep(.monogram-vn__wreath) {
  stroke-width: 2.1;
  opacity: 0.95;
}

.invite-opening__heart :deep(.monogram-vn__letters) {
  fill: #fffaf7;
  stroke: rgba(116, 28, 42, 0.48);
  stroke-width: 1.35px;
}

.invite-opening__heart :deep(.monogram-vn__ampersand) {
  fill: #ffe4df;
  stroke: rgba(116, 28, 42, 0.28);
  stroke-width: 0.65px;
}

.invite-opening__heart :deep(.monogram-vn__flowers) {
  fill: #ffe0dc;
  stroke: #fff7f2;
  stroke-width: 1.45;
}

.invite-opening__heart :deep(.monogram-vn__flowers circle),
.invite-opening__heart :deep(.monogram-vn__leaf) {
  fill: #fffaf7;
}

.invite-opening__heart-wrap.is-bursting .invite-opening__heart {
  animation: invite-heart-pop-shake 920ms cubic-bezier(0.16, 1, 0.3, 1) both;
  filter: drop-shadow(0 0 22px rgba(185, 74, 88, 0.48));
}

.invite-opening__heart-wrap.is-bursting .invite-opening__heart::before {
  animation: invite-heart-ring 900ms ease-out both;
}

.invite-opening__heart-wrap.is-bursting :deep(.monogram-vn) {
  animation: invite-monogram-wiggle 860ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.invite-opening__heart-burst {
  position: absolute;
  inset: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
}

.invite-opening__heart-burst span {
  position: absolute;
  color: #d95569;
  font-size: var(--heart-size);
  line-height: 1;
  opacity: 0;
  filter: drop-shadow(0 4px 6px rgba(185, 74, 88, 0.28));
  animation: invite-heart-burst 1040ms cubic-bezier(0.18, 0.75, 0.25, 1)
    var(--heart-delay) both;
}

@keyframes invite-heart-pop-shake {
  0% {
    transform: scale(1) rotate(0deg);
  }
  16% {
    transform: scale(1.18) rotate(-9deg);
  }
  30% {
    transform: scale(1.28) rotate(8deg);
  }
  44% {
    transform: scale(1.18) rotate(-6deg);
  }
  58% {
    transform: scale(1.1) rotate(5deg);
  }
  74% {
    transform: scale(1.08) rotate(-2deg);
  }
  100% {
    transform: scale(1.06) rotate(0deg);
  }
}

@keyframes invite-monogram-wiggle {
  0% {
    transform: rotate(0deg) scale(1);
  }
  22% {
    transform: rotate(7deg) scale(1.05);
  }
  42% {
    transform: rotate(-6deg) scale(1.03);
  }
  62% {
    transform: rotate(4deg) scale(1.02);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

@keyframes invite-heart-ring {
  0% {
    opacity: 0.72;
    transform: scale(0.86);
  }
  100% {
    opacity: 0;
    transform: scale(1.34);
  }
}
@keyframes invite-heart-burst {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
  }
  18% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(
        calc(-50% + var(--heart-x)),
        calc(-50% + var(--heart-y))
      )
      scale(var(--heart-scale)) rotate(var(--heart-rotate));
  }
}

.invite-opening__names {
  margin: 18px 0 12px;
  font-family: var(--font-couple);
  font-size: clamp(2rem, 6vw, 3.5rem);
  line-height: 1.22;
}

.invite-opening__names span,
.invite-opening__names small {
  display: block;
}

.invite-opening__names span {
  display: block;
  padding: 0.1em 0.22em 0.18em;
  margin: -0.08em auto;
  overflow: visible;
  color: transparent;
  background:
    linear-gradient(
      105deg,
      #9f3443 0%,
      #c85a69 28%,
      #f0a0aa 44%,
      #b94a58 60%,
      #7f2432 100%
    );
  background-size: 240% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 3px 5px rgba(185, 74, 88, 0.16));
  animation: invite-name-color-flow 3.8s ease-in-out infinite;
}

.invite-opening__names span:last-child {
  animation-delay: -1.9s;
}

.invite-opening__names.is-opening span {
  animation:
    invite-name-color-flow 1.1s ease-in-out infinite,
    invite-name-open-glow 900ms ease-out both;
}

.invite-opening__names small {
  font-size: 1.8rem;
  margin: 0.1em 0 0.16em;
  line-height: 1.2;
  color: #b94a58;
  text-shadow: 0 2px 5px rgba(185, 74, 88, 0.12);
}

@keyframes invite-name-color-flow {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes invite-name-open-glow {
  0% {
    transform: translateY(0) scale(1);
    filter: drop-shadow(0 3px 5px rgba(185, 74, 88, 0.16));
  }
  42% {
    transform: translateY(-2px) scale(1.04);
    filter: drop-shadow(0 7px 12px rgba(185, 74, 88, 0.32));
  }
  100% {
    transform: translateY(0) scale(1.01);
    filter: drop-shadow(0 4px 7px rgba(185, 74, 88, 0.2));
  }
}

.invite-opening__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 8px auto 16px;
  color: #cf7380;
}

.invite-opening__divider::before,
.invite-opening__divider::after {
  content: "";
  width: 36px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.invite-opening__date,
.invite-opening__label,
.invite-opening__message {
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 3.5vw, 1.35rem);
  font-weight: 900;
}

.invite-opening__date {
  font-size: 1.7rem;
}

.invite-opening__guest {
  display: inline-block;
  margin: 12px 0 20px;
  padding: 7px 22px;
  border-radius: 12px;
  background: rgba(185, 74, 88, 0.08);
  font-family: var(--font-body);
  font-size: clamp(1.4rem, 3.7vw, 1.7rem);
  font-weight: 900;
}

.invite-opening__button {
  margin-top: 24px;
  border: 0;
  border-radius: 999px;
  padding: 13px 34px;
  background: #b94a58;
  color: #fff;
  font-family: var(--font-form);
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(185, 74, 88, 0.32);
}

.invite-opening__button:hover {
  background: #a83e4b;
}

.invite-opening__button:disabled {
  cursor: wait;
  opacity: 0.78;
}

.invite-opening__petals span {
  position: absolute;
  top: -30px;
  left: calc((var(--i) * 8%) - 5%);
  width: 12px;
  height: 12px;
  border-radius: 70% 30% 70% 30%;
  background: #f2a0ae;
  opacity: 0.78;
  animation: invite-petal 9s linear infinite;
  animation-delay: calc(var(--i) * -0.75s);
}

@keyframes invite-petal {
  to {
    transform: translate3d(70px, 105vh, 0) rotate(360deg);
  }
}

@media (max-width: 480px) {
  .invite-opening__card {
    min-height: 470px;
    padding: 28px 20px;
  }
}
</style>
