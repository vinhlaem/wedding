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
  width: min(500px, 100%);
  margin: clamp(48px, 7vw, 74px) auto 0;
  position: relative;
}

.invite-schedule__timeline::before {
  content: "";
  position: absolute;
  top: 14px;
  bottom: 14px;
  left: 43.5%;
  width: 1px;
  background: rgba(185, 74, 88, 0.42);
}

.invite-schedule__item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 22px minmax(0, 1.35fr);
  align-items: center;
  gap: 22px;
  min-height: 68px;
  color: #b94a58;
  font-family: var(--font-body);
  text-transform: uppercase;
}

.invite-schedule__item time {
  text-align: right;
  font-weight: 900;
  font-size: 1.45rem;
  line-height: 1;
}

.invite-schedule__item span {
  width: 12px;
  height: 12px;
  margin: 0 auto;
  border-radius: 50%;
  background: #b94a58;
  box-shadow: 0 0 0 4px rgba(185, 74, 88, 0.12);
  z-index: 1;
  font-weight: 900;
}

.invite-schedule__item p {
  margin: 0;
  text-align: left;
  font-weight: 900;
  font-size: 1.18rem;
  line-height: 1.25;
  white-space: nowrap;
}

@media (max-width: 420px) {
  .invite-schedule__timeline {
    width: min(328px, 100%);
  }

  .invite-schedule__timeline::before {
    left: 95px;
  }

  .invite-schedule__item {
    grid-template-columns: 76px 18px minmax(0, 1fr);
    gap: 10px;
    min-height: 58px;
  }

  .invite-schedule__item time {
    font-size: 1.38rem;
  }

  .invite-schedule__item p {
    font-size: 0.98rem;
    line-height: 1.18;
  }
}

@media (max-width: 360px) {
  .invite-schedule__timeline {
    width: min(304px, 100%);
  }

  .invite-schedule__timeline::before {
    left: 86px;
  }

  .invite-schedule__item {
    grid-template-columns: 70px 16px minmax(0, 1fr);
    gap: 8px;
  }

  .invite-schedule__item span {
    width: 11px;
    height: 11px;
  }

  .invite-schedule__item time {
    font-size: 1.28rem;
  }

  .invite-schedule__item p {
    font-size: 0.9rem;
  }
}
</style>
