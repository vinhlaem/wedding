<template>
  <section class="invite-section invite-couple">
    <h2 class="invite-couple__name">{{ config.groomName }}</h2>
    <div class="invite-couple__amp">&</div>
    <h2 class="invite-couple__name">{{ config.brideName }}</h2>
    <p class="invite-couple__subtitle">ALBUM ẢNH CƯỚI</p>
  </section>
</template>

<script setup>
defineProps({
  config: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.invite-couple {
  text-align: center;
  padding-bottom: clamp(24px, 5vw, 48px);
}

.invite-couple__name,
.invite-couple__amp {
  margin: 0;
  color: #b94a58;
  font-family: var(--font-dancing-script);
  font-weight: 400;
  line-height: 1.05;
}

.invite-couple__name {
  max-width: 820px;
  margin: 0 auto;
  font-size: clamp(2.8rem, 6.8vw, 5.4rem);
}

.invite-couple__amp {
  font-size: clamp(2.7rem, 6vw, 4.8rem);
  margin: clamp(12px, 2vw, 22px) 0;
}

.invite-couple__subtitle {
  margin: clamp(44px, 8vw, 72px) 0 0;
  font-family: var(--invite-serif, "Noto Serif", "Times New Roman", serif);
  font-size: clamp(1rem, 2vw, 1.25rem);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
@media (max-width: 640px) {
  .invite-couple__name {
    font-size: clamp(2.6rem, 13vw, 4rem);
  }

  .invite-couple__amp {
    font-size: clamp(1.8rem, 8vw, 2.6rem);
  }
}
</style>
