<template>
  <section class="invite-section invite-calendar">
    <article class="invite-calendar__card">
      <h2>Tháng {{ config.calendar.month }} / {{ config.calendar.year }}</h2>
      <div class="invite-calendar__weekdays">
        <span v-for="weekday in weekdays" :key="weekday">{{ weekday }}</span>
      </div>
      <div class="invite-calendar__days">
        <span v-for="blank in leadingBlanks" :key="`blank-${blank}`"></span>
        <span
          v-for="day in daysInMonth"
          :key="day"
          :class="{ 'is-wedding-day': day === config.calendar.day }"
        >
          {{ day }}
        </span>
      </div>
    </article>

    <a
      class="invite-calendar__link"
      :href="googleCalendarUrl"
      target="_blank"
      rel="noreferrer"
    >
      Thêm vào lịch
    </a>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
});

const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const daysInMonth = computed(() =>
  new Date(
    props.config.calendar.year,
    props.config.calendar.month,
    0,
  ).getDate(),
);
const leadingBlanks = computed(() => {
  const day = new Date(
    props.config.calendar.year,
    props.config.calendar.month - 1,
    1,
  ).getDay();
  return day === 0 ? 6 : day - 1;
});
const googleCalendarUrl = computed(() => {
  const details = new URLSearchParams({
    action: "TEMPLATE",
    text: `Tiệc cưới ${props.config.groomName} & ${props.config.brideName}`,
    dates: "20260531T110000Z/20260531T150000Z",
    details: "Trân trọng kính mời quý khách đến chung vui cùng gia đình.",
  });
  return `https://calendar.google.com/calendar/render?${details.toString()}`;
});
</script>

<style scoped>
.invite-calendar {
  text-align: center;
  padding-top: clamp(32px, 6vw, 72px);
}

.invite-calendar__card {
  width: min(310px, 100%);
  margin: 0 auto;
  border: 1px solid rgba(185, 74, 88, 0.32);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.34);
}

.invite-calendar__card h2 {
  margin: 0;
  padding: 12px;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 900;
}

.invite-calendar__weekdays,
.invite-calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
}

.invite-calendar__weekdays {
  border-top: 1px solid rgba(185, 74, 88, 0.22);
  border-bottom: 1px solid rgba(185, 74, 88, 0.45);
}

.invite-calendar__weekdays span,
.invite-calendar__days span {
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
}

.invite-calendar__weekdays span {
  font-size: 1.2rem;
  font-weight: 900;
}

.invite-calendar__days {
  padding: 14px 8px 12px;
}

.invite-calendar__days span {
  position: relative;
  font-size: 1.5rem;
  font-weight: 900;
}

.invite-calendar__days .is-wedding-day {
  color: #fff;
  font-weight: 700;
  isolation: isolate;
  z-index: 1;
}

.invite-calendar__days .is-wedding-day::before {
  content: "♥";
  position: absolute;
  left: 50%;
  top: 52%;
  width: auto;
  height: auto;
  background: transparent;
  color: #b94a58;
  font-size: 80px;
  line-height: 1;
  transform: translate(-50%, -47%);
  z-index: -1;
}

.invite-calendar__link {
  display: inline-block;
  margin-top: 34px;
  color: #b94a58;
  font-family: var(--font-body);
  text-underline-offset: 4px;
  font-weight: 900;
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  text-decoration: underline;
}
</style>
