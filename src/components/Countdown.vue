<template>
  <section class="countdown-section reveal">
    <div class="countdown-container">
        <div class="countdown-item reveal">
          <div class="countdown-number">{{ days }}</div>
          <div class="countdown-label">Days</div>
        </div>
        <div class="countdown-item reveal">
          <div class="countdown-number">{{ hours }}</div>
          <div class="countdown-label">Hours</div>
        </div>
        <div class="countdown-item reveal">
          <div class="countdown-number">{{ minutes }}</div>
          <div class="countdown-label">Minutes</div>
        </div>
        <div class="countdown-item reveal">
          <div class="countdown-number">{{ seconds }}</div>
          <div class="countdown-label">Seconds</div>
        </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const targetDate = new Date('2026-12-21T00:00:00')
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timer = null

function updateCountdown() {
  const now = new Date().getTime()
  const distance = targetDate.getTime() - now

  if (distance < 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    return
  }

  days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>

.countdown-section {
  margin-bottom: 20px;
}
.countdown-container {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px; 
}

.countdown-item {
  border-radius: 15px;
  padding: 10px;
  width: 100px;
  transition: transform 0.3s ease;
}

.countdown-item:hover {
  transform: translateY(-5px);
}

/* Stagger reveal for items */
.countdown-container .countdown-item { transition-delay: 100ms; }
.countdown-container .countdown-item:nth-child(2) { transition-delay: 200ms; }
.countdown-container .countdown-item:nth-child(3) { transition-delay: 300ms; }
.countdown-container .countdown-item:nth-child(4) { transition-delay: 400ms; }

.countdown-number {
  font-family: var(--font-mulish);
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 10px;
}

.countdown-label {
  font-family: var(--font-mulish);
  font-size: 1rem;
  color: #f9eaea;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .countdown-title {
    font-size: 2rem;
  }

  .countdown-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .countdown-number {
    font-size: 2.2rem;
  }

  .countdown-label {
    font-size: 0.9rem;
  }
}

/* Tighter layout on smaller phones */
@media (max-width: 500px) {

  .countdown-container {
    gap: 10px;
  }

  .countdown-item {
    padding: 14px 10px;
    width: max-content;
    border-radius: 12px;
  }
  .countdown-number {
    font-size: 1.8rem;
    margin-bottom: 6px;
  }
  .countdown-label {
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }
}

@media (max-width: 390px) {
 
  .countdown-container{
    gap: 5px;
  }

  .countdown-item {
    padding: 0px;
  }

  .countdown-number {
    font-size: 1.5rem;
  }

  .countdown-label {
    font-size: 0.8rem;
  }
}
</style>

