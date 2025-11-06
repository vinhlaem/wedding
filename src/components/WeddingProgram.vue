<template>
  <section id="event" class="program-section reveal section-anchor">
    <div class="program-container">
      <TitleSection title="The Schedule" />
      <h2 class="program-title">Our Wedding Programs</h2>
      <p class="program-subtitle">
        The main ceremony starts on 16:00, September 24th at Wedding Paradise Wedding Hall, Royal Ln. Mesa, New Jersey.
      </p>

      <div class="program-grid">
        <div v-for="(p, i) in programs" :key="i" class="program-card">
          <div class="program-media">
            <img :src="p.image" :alt="p.title" />
          </div>
          <h3 class="program-name">{{ p.title }}</h3>
          <div class="program-time">{{ p.time }}</div>
          <p class="program-desc">{{ p.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TitleSection from '@/components/common/TitleSection.vue'
import programData from '@/data/weddingProgram.json'
const assetMap = import.meta.glob('../assets/**/*', { eager: true, as: 'url' })
const programs = programData.programs.map(p => ({
  ...p,
  image: assetMap[`../${p.image}`] || p.image,
}))
</script>

<style scoped>
.program-section {
  background: #fff;
  padding: 80px 20px;
}

.program-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.program-title {
  font-family: var(--font-mulish);
  font-size: 2.2rem;
  color: #000;
  margin: 12px 0 12px 0;
  font-weight: 700;
}

.program-subtitle {
  font-family: var(--font-mulish);
  color: #666;
  line-height: 1.8;
  max-width: 760px;
  margin: 0 auto 40px auto;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.program-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 24px 20px 28px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}

.program-media {
  width: 220px;
  height: 220px;
  margin: 0 auto 16px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
}

.program-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.program-name {
  font-family: var(--font-mulish);
  font-size: 1.25rem;
  color: #222;
  font-weight: 700;
  margin: 12px 0 8px 0;
}

.program-time {
  font-family: var(--font-dancing-script);
  font-size: 1.6rem;
  color: #d4a5a5;
  margin-bottom: 12px;
}

.program-desc {
  font-family: var(--font-mulish);
  color: #555;
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .program-media { width: 200px; height: 200px; }
}

@media (max-width: 768px) {
  .program-section { padding: 60px 16px; }
  .program-grid { grid-template-columns: 1fr; gap: 20px; }
  .program-media { width: 180px; height: 180px; }
  .program-title { font-size: 1.8rem; }
}

@media (max-width: 480px) {
  .program-media { width: 160px; height: 160px; }
  .program-title { font-size: 1.6rem; }
}
</style>
