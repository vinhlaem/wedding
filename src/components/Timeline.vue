<template>
  <section id="story" class="timeline-section reveal section-anchor">
    <div class="timeline-container">
      <TitleSection title="Our Story" />
      <h3 class="timeline-subtitle">A Brief History Of Our Love</h3>

      <div class="timeline-wrapper">
        <div 
          v-for="(event, index) in timelineEvents" 
          :key="index"
          class="timeline-event"
        >
          <!-- Timeline line and marker -->
          <div class="timeline-marker-wrapper">
            <div class="timeline-line" :class="{ 'last': index === timelineEvents.length - 1 }"></div>
            <div class="timeline-marker"></div>
          </div>

          <!-- Event Content -->
          <div class="event-content">
            <div class="event-text">
              <div class="event-date">{{ event.date }}</div>
              <h4 class="event-title">{{ event.title }}</h4>
              <p class="event-description">{{ event.description }}</p>
            </div>
            <div class="event-image-wrapper">
              <img :src="event.image" :alt="event.title" class="event-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TitleSection from '@/components/common/TitleSection.vue'
import timelineData from '@/data/timeline.json'
const assetMap = import.meta.glob('../assets/**/*', { eager: true, as: 'url' })
const timelineEvents = timelineData.events.map(e => ({
  ...e,
  image: assetMap[`../${e.image}`] || e.image,
}))
</script>

<style scoped>
.timeline-section {
  background: #fff;
  padding: 80px 20px;
}

.timeline-container {
  max-width: 1200px;
  margin: 0 auto;
}

.timeline-subtitle {
  font-family: var(--font-mulish);
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin: 20px 0 60px 0;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.timeline-wrapper {
  position: relative;
  padding-left: 100px;
}

.timeline-event {
  display: flex;
  gap: 60px;
  margin-bottom: 80px;
  position: relative;
}

.timeline-event:last-child {
  margin-bottom: 0;
}

/* Timeline Marker and Line */
.timeline-marker-wrapper {
  position: relative;
  flex-shrink: 0;
  width: 40px;
  margin-left: -100px;
}

.timeline-line {
  position: absolute;
  left: 19px;
  top: 40px;
  width: 2px;
  background: #d4a5a5;
  height: calc(100% + 40px);
}

.timeline-line.last {
  display: none;
}

.timeline-marker {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #d4a5a5;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

/* Event Content */
.event-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  flex: 1;
  padding-top: 10px;
}

.event-text {
  display: flex;
  flex-direction: column;
}

.event-date {
  font-family: var(--font-mulish);
  font-size: 0.9rem;
  color: #d4a5a5;
  font-weight: 500;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.event-title {
  font-family: var(--font-mulish);
  font-size: 2.5rem;
  color: #333;
  font-weight: 700;
  margin: 0 0 20px 0;
  line-height: 1.2;
}

.event-description {
  font-family: var(--font-mulish);
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  margin: 0;
}

.event-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive */
@media (max-width: 968px) {
  .timeline-wrapper {
    padding-left: 60px;
  }

  .timeline-marker-wrapper {
    margin-left: -60px;
    width: 30px;
  }

  .timeline-marker {
    width: 30px;
    height: 30px;
  }

  .timeline-line {
    left: 14px;
    top: 30px;
  }

  .event-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .event-image-wrapper {
    order: -1;
  }
}

@media (max-width: 768px) {
  .timeline-section {
    padding: 60px 16px;
  }

  .timeline-subtitle {
    font-size: 1rem;
    margin: 15px 0 40px 0;
  }

  .timeline-wrapper {
    padding-left: 40px;
  }

  .timeline-marker-wrapper {
    margin-left: -40px;
    width: 24px;
  }

  .timeline-marker {
    width: 24px;
    height: 24px;
    border-width: 2px;
  }

  .timeline-line {
    left: 11px;
    top: 24px;
    width: 2px;
  }

  .timeline-event {
    gap: 30px;
    margin-bottom: 60px;
  }

  .event-title {
    font-size: 2rem;
  }

  .event-description {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .timeline-section {
    padding: 40px 12px;
  }

  .timeline-subtitle {
    font-size: 0.9rem;
  }

  .event-title {
    font-size: 1.6rem;
  }

  .event-description {
    font-size: 0.85rem;
    line-height: 1.6;
  }
}
</style>

