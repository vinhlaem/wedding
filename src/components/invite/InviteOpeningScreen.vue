<template>
  <section class="invite-opening">
    <div class="invite-opening__petals" aria-hidden="true">
      <span v-for="item in petals" :key="item" :style="{ '--i': item }"></span>
    </div>

    <article class="invite-opening__card" :style="cardStyle">
      <div class="invite-opening__heart-wrap" :class="{ 'is-bursting': isOpening }">
        <div class="invite-opening__heart">♥</div>
        <div v-if="isOpening" class="invite-opening__heart-burst" aria-hidden="true">
          <span
            v-for="heart in burstHearts"
            :key="heart.id"
            :style="heart.style"
          >♥</span>
        </div>
      </div>
      <h1 class="invite-opening__names">
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

const burstHearts = Array.from({ length: 16 }, (_, index) => {
  const angle = (360 / 16) * index + (index % 2 ? 8 : -5);
  const distance = 72 + (index % 4) * 16;
  const radians = (angle * Math.PI) / 180;

  return {
    id: index,
    style: {
      "--heart-x": `${Math.cos(radians) * distance}px`,
      "--heart-y": `${Math.sin(radians) * distance}px`,
      "--heart-delay": `${(index % 4) * 35}ms`,
      "--heart-scale": 0.7 + (index % 3) * 0.2,
    },
  };
});

function handleOpen() {
  if (isOpening.value) return;

  isOpening.value = true;
  openTimer = window.setTimeout(() => emit("open"), 950);
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
  width: 58px;
  height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #b94a58;
  color: #fff;
  font-size: 28px;
  box-shadow: 0 12px 24px rgba(185, 74, 88, 0.3);
  transition: transform 240ms ease, box-shadow 240ms ease;
}

.invite-opening__heart-wrap.is-bursting .invite-opening__heart {
  animation: invite-heart-pop 720ms cubic-bezier(0.16, 1, 0.3, 1) both;
  box-shadow: 0 0 0 14px rgba(185, 74, 88, 0.12);
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
  font-size: 18px;
  line-height: 1;
  opacity: 0;
  filter: drop-shadow(0 4px 5px rgba(185, 74, 88, 0.22));
  animation: invite-heart-burst 820ms cubic-bezier(0.18, 0.75, 0.25, 1) var(--heart-delay) both;
}

@keyframes invite-heart-pop {
  0% { transform: scale(1); }
  35% { transform: scale(1.28); }
  65% { transform: scale(0.92); }
  100% { transform: scale(1.06); }
}

@keyframes invite-heart-burst {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
  }
  18% { opacity: 1; }
  100% {
    opacity: 0;
    transform: translate(
      calc(-50% + var(--heart-x)),
      calc(-50% + var(--heart-y))
    ) scale(var(--heart-scale)) rotate(28deg);
  }
}

.invite-opening__names {
  margin: 18px 0 12px;
  font-family: var(--font-couple);
  font-size: clamp(2rem, 6vw, 3.5rem);
  line-height: 1.05;
}

.invite-opening__names span,
.invite-opening__names small {
  display: block;
}

.invite-opening__names small {
  font-size: 1.8rem;
  margin: 4px 0;
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
  font-size: clamp(1rem, 3.5vw, 1.35rem);
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
