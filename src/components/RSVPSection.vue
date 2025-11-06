<template>
  <section id="rsvp" class="rsvp-section reveal section-anchor">
    <div class="rsvp-container">
      <div class="rsvp-grid">
        <!-- Form Card -->
        <div class="rsvp-card">
          <h2 class="rsvp-title">{{ title }}</h2>

          <form class="rsvp-form" @submit.prevent>
            <label class="rsvp-label">Name
              <input class="rsvp-input" type="text" placeholder="Your full name" />
            </label>

            <label class="rsvp-label">Message
              <textarea class="rsvp-textarea" rows="5" placeholder="Leave your best wishes for the couple..."></textarea>
            </label>

            <button class="rsvp-button" type="submit">Send</button>
          </form>
        </div>

        <!-- Side Image -->
        <div class="rsvp-image-wrap">
          <img :src="sideImage" alt="RSVP" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import rsvpData from '@/data/rsvp.json'
const title = rsvpData.title
const assetMap = import.meta.glob('../assets/**/*', { eager: true, as: 'url' })
const sideImage = assetMap[`../${rsvpData.sideImage}`] || rsvpData.sideImage
</script>

<style scoped>
.rsvp-section {
  background: transparent;
  padding: 80px 20px;
}

.rsvp-container {
  max-width: 1200px;
  margin: 0 auto;
}

.rsvp-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 24px;
  align-items: center;
}

/* Card */
.rsvp-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
  padding: 32px 28px;
}

.rsvp-title {
  font-family: var(--font-dancing-script);
  font-size: 2rem;
  color: #d4a5a5;
  margin: 0 0 22px 0;
}

.rsvp-form { display: flex; flex-direction: column; gap: 16px; }

.rsvp-label {
  font-family: var(--font-mulish);
  color: #555;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rsvp-input, .rsvp-select {
  border: none;
  border-bottom: 1px solid #e7e2ea;
  padding: 10px 4px;
  outline: none;
  background: transparent;
  font-family: var(--font-mulish);
}

.rsvp-textarea {
  width: 100%;
  resize: vertical;
  border: 1px solid #e7e2ea;
  border-radius: 12px;
  padding: 12px;
  outline: none;
  font-family: var(--font-mulish);
  background: #fff;
}

/* removed radio group styles from previous version */

.rsvp-button {
  margin-top: 6px;
  background: #d4a5a5;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 12px 22px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(212,165,165,0.35);
}
.rsvp-button:hover { background: #c49595; }

/* Image */
.rsvp-image-wrap {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
}
.rsvp-image-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Responsive */
@media (max-width: 1024px) {
  .rsvp-grid { grid-template-columns: 1fr; }
  .rsvp-image-wrap { order: 2; }
}

@media (max-width: 768px) {
  .rsvp-section { padding: 60px 16px; }
  .rsvp-card { padding: 24px; border-radius: 20px; }
}

@media (max-width: 480px) {
  .rsvp-title { font-size: 1.6rem; }
}
</style>
