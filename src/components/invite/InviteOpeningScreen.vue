<template>
  <section class="invite-opening">
    <div class="invite-opening__petals" aria-hidden="true">
      <span v-for="item in petals" :key="item" :style="{ '--i': item }"></span>
    </div>

    <article class="invite-opening__card" :style="cardStyle">
      <div class="invite-opening__heart">♥</div>
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
      <button class="invite-opening__button" type="button" @click="$emit('open')">
        Mở thiệp
      </button>
    </article>
  </section>
</template>

<script setup>
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

defineEmits(["open"]);

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
}

.invite-opening__names {
  margin: 18px 0 12px;
  font-family: var(--font-dancing-script);
  font-size: clamp(2.4rem, 6vw, 4rem);
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
  font-family: var(--invite-serif, "Noto Serif", "Times New Roman", serif);
  font-size: 1.05rem;
}

.invite-opening__label {
  margin-top: 26px;
}

.invite-opening__guest {
  display: inline-block;
  margin: 12px 0 20px;
  padding: 7px 22px;
  border-radius: 12px;
  background: rgba(185, 74, 88, 0.08);
  font-family: var(--invite-serif, "Noto Serif", "Times New Roman", serif);
  font-size: clamp(1.05rem, 3.5vw, 1.35rem);
  font-weight: 700;
}

.invite-opening__button {
  margin-top: 24px;
  border: 0;
  border-radius: 999px;
  padding: 13px 34px;
  background: #b94a58;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(185, 74, 88, 0.32);
}

.invite-opening__button:hover {
  background: #a83e4b;
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
