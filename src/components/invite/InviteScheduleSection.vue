<template>
  <section class="invite-section invite-schedule">
    <h2 class="invite-heading">LỊCH TRÌNH NGÀY CƯỚI</h2>
    <div class="invite-schedule__timeline">
      <article
        v-for="item in schedule"
        :key="`${item.time}-${item.title}`"
        class="invite-schedule__item"
      >
        <time>{{ item.time }}</time>
        <span></span>
        <p>{{ item.title }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
defineProps({
  schedule: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.invite-schedule {
  text-align: center;
}

.invite-schedule__timeline {
  width: min(420px, 100%);
  margin: clamp(48px, 7vw, 74px) auto 0;
  position: relative;
}

.invite-schedule__timeline::before {
  content: "";
  position: absolute;
  top: 14px;
  bottom: 14px;
  left: 50%;
  width: 1px;
  background: rgba(185, 74, 88, 0.42);
}

.invite-schedule__item {
  display: grid;
  grid-template-columns: 1fr 24px 1fr;
  align-items: center;
  gap: 28px;
  min-height: 68px;
  color: #b94a58;
  font-family: var(--invite-serif, "Noto Serif", "Times New Roman", serif);
}

.invite-schedule__item time {
  text-align: right;
}

.invite-schedule__item span {
  width: 12px;
  height: 12px;
  margin: 0 auto;
  border-radius: 50%;
  background: #b94a58;
  box-shadow: 0 0 0 4px rgba(185, 74, 88, 0.12);
  z-index: 1;
}

.invite-schedule__item p {
  margin: 0;
  text-align: left;
}

@media (max-width: 420px) {
  .invite-schedule__item {
    gap: 16px;
    grid-template-columns: 76px 20px 1fr;
  }
}
</style>
