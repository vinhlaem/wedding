<template>
  <section class="invite-section invite-party">
    <h2 class="invite-heading">THÔNG TIN TIỆC CƯỚI</h2>
    <div class="invite-date-block">
      <p>{{ placeInfo.partyTitle }}</p>
      <time>{{ placeInfo.partyTime }}</time>
      <div class="invite-date-block__date">
        <span>{{ config.calendar.weekday }}</span>
        <strong>{{ config.calendar.day }}</strong>
        <span>THÁNG {{ paddedMonth }}</span>
      </div>
      <strong>{{ config.calendar.year }}</strong>
      <small>(TỨC NGÀY {{ config.calendar.lunarDate }})</small>
    </div>

    <div class="invite-party__times">
      <div>
        <span>ĐÓN KHÁCH</span>
        <strong>{{ placeInfo.welcomeTime }}</strong>
      </div>
      <div>
        <span>KHAI TIỆC</span>
        <strong>{{ placeInfo.partyTime }}</strong>
      </div>
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
  placeInfo: {
    type: Object,
    required: true,
  },
});

const paddedMonth = computed(() => String(props.config.calendar.month).padStart(2, "0"));
</script>

<style scoped>
.invite-party {
  text-align: center;
}

.invite-party__times {
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.invite-party__times div {
  font-family: var(--invite-serif, "Noto Serif", "Times New Roman", serif);
}

.invite-party__times span,
.invite-party__times strong {
  display: block;
}

.invite-party__times span {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
}

.invite-party__times strong {
  margin-top: 6px;
  font-size: 1.35rem;
}

@media (max-width: 420px) {
  .invite-party__times {
    grid-template-columns: 1fr;
  }
}
</style>
