<template>
  <section class="invite-section invite-wedding-info">
    <h2 class="invite-heading">THÔNG TIN LỄ CƯỚI</h2>
    <div class="invite-wedding-info__grid">
      <article class="invite-wedding-info__family">
        <p class="invite-wedding-info__label">Nhà trai</p>
        <p class="invite-wedding-info__parents">Ông Bà</p>
        <h3>{{ config.families.groom.father }}</h3>
        <h3>{{ config.families.groom.mother }}</h3>
        <p>{{ config.families.groom.address }}</p>
      </article>

      <article class="invite-wedding-info__family">
        <p class="invite-wedding-info__label">Nhà gái</p>
        <p class="invite-wedding-info__parents">Ông Bà</p>
        <h3>{{ config.families.bride.father }}</h3>
        <h3>{{ config.families.bride.mother }}</h3>
        <p>{{ config.families.bride.address }}</p>
      </article>
    </div>
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
.invite-wedding-info {
  text-align: center;
}

.invite-wedding-info__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(28px, 7vw, 60px);
  margin-top: clamp(56px, 8vw, 86px);
}

.invite-wedding-info__family {
  padding: 10px 12px;
}

.invite-wedding-info__label,
.invite-wedding-info__parents,
.invite-wedding-info__family p {
  margin: 0;
  font-family: var(--font-body);
}

.invite-wedding-info__label {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 1rem;
  font-weight: 900;
}

.invite-wedding-info__parents {
  font-weight: 900;
  font-size: 1.2rem;
}

.invite-wedding-info__parents {
  margin-top: 16px;
}

.invite-wedding-info__family h3 {
  margin: 10px 0 0;
  font-family: var(--font-body);
  font-size: clamp(1.2rem, 2.7vw, 2rem);
  font-weight: 900;
}

.invite-wedding-info__family p:last-child {
  margin-top: 18px;
  line-height: 1.7;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-family: var(--font-body);
  font-weight: 700;
}

@media (max-width: 680px) {
  .invite-wedding-info__grid {
    grid-template-columns: 1fr;
  }
}
</style>
