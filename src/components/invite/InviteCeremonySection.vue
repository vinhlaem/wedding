<template>
  <section class="invite-section invite-ceremony">
    <p class="invite-ceremony__intro">TRÂN TRỌNG BÁO TIN</p>
    <h2 class="invite-heading">
      {{ placeInfo.ceremonyTitle }} CỦA CON CHÚNG TÔI
    </h2>

    <div class="invite-ceremony__couple">
      <div>
        <h3>{{ config.groomName }}</h3>
        <p>ÚT NAM</p>
      </div>
      <span>&</span>
      <div>
        <h3>{{ config.brideName }}</h3>
        <p>THỨ NỮ</p>
      </div>
    </div>

    <div class="invite-date-block">
      <p>{{ placeInfo.ceremonyTitle }} ĐƯỢC CỬ HÀNH TẠI</p>
      <strong>{{ placeInfo.ceremonyAt }}</strong>
      <p>VÀO LÚC</p>
      <time>{{ placeInfo.ceremonyTime }}</time>
      <div class="invite-date-block__date">
        <span>{{ config.calendar.weekday }}</span>
        <strong>{{ config.calendar.day }}</strong>
        <span>THÁNG {{ paddedMonth }}</span>
      </div>
      <strong>{{ config.calendar.year }}</strong>
      <small>(TỨC NGÀY {{ config.calendar.lunarDate }})</small>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  placeInfo: {
    type: Object,
    required: true,
  },
});

const paddedMonth = computed(() =>
  String(props.config.calendar.month).padStart(2, "0"),
);
</script>

<style scoped>
.invite-ceremony {
  text-align: center;
}

.invite-ceremony__intro {
  margin: 0 0 8px;
  font-family: var(--font-heading);
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  text-transform: uppercase;
  font-weight: 900;
}

.invite-ceremony__couple {
  display: grid;
  gap: clamp(18px, 4vw, 30px);
  justify-items: center;
  margin: clamp(40px, 9vw, 140px) 0;
}

.invite-ceremony__couple h3,
.invite-ceremony__couple span {
  margin: 0;
  font-family: var(--font-couple);
  font-size: clamp(2.7rem, 6.4vw, 4.5rem);
  line-height: 1.05;
  font-weight: 300;
}

.invite-ceremony__couple p {
  font-family: var(--font-body);
  font-size: 1.3rem;
  font-weight: 900;
}
@media (max-width: 640px) {
  .invite-ceremony__couple h3,
  .invite-ceremony__couple span {
    font-size: clamp(2.4rem, 11vw, 3.7rem);
  }
}
</style>
