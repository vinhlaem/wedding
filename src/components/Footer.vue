<template>
  <footer class="footer" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="footer-overlay"></div>
    <div class="footer-content">
      <div class="thankyou-box">
        <h2 class="thankyou-title">Thank You!</h2>
        <p class="thankyou-text">
          A wedding is a celebration of love—made even more meaningful by the presence of cherished friends and family.
          Come celebrate love, laughter, and happily ever after with us.
        </p>
      </div>
    </div>
  </footer>
  
</template>

<script setup>
import bgSrc from '@/assets/images/gallery/image-5.png'
const bgImage = bgSrc
</script>

<style scoped>
.footer {
  position: relative;
  min-height: 42vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.footer-overlay {
  position: absolute;
  inset: 0;
}

.footer-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 42vh;
  padding: 40px 16px;
}

.thankyou-box {
  background: rgba(255,255,255,0.85);
  border: 2px solid rgba(255,255,255,0.9);
  outline: 2px solid rgba(255,255,255,0.6);
  outline-offset: 14px;
  padding: 28px 32px;
  max-width: 760px;
  text-align: center;
  border-radius: 6px;
}

.thankyou-title {
  font-family: var(--font-dancing-script);
  font-size: 2rem;
  color: #d4a5a5;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.thankyou-text {
  font-family: var(--font-mulish);
  color: #333;
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0;
}
</style>
