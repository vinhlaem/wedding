<template>
  <div class="banner" :style="{ backgroundImage: `url(${bannerImage})` }">
    <div class="banner-overlay"></div>
    <div class="banner-content">
      <div class="invitation-card reveal">
        <div class="invitation-card-content">
            <img :src="topDecoration" alt="Top decoration" class="decoration-top">
            <img :src="bottomDecoration" alt="Bottom decoration" class="decoration-bottom">
        
          <div class="invitation-text">
            <p class="invitation-subtitle">
              Please join us to celebrate our love
            </p>
            <h1 class="couple-names">Vinh & Nguyệt</h1>
            <Countdown />
            <button class="rsvp-button">RSVP</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import bannerImage from "@/assets/images/banner/banner.png";
import topDecoration from "@/assets/images/banner/top.svg";
import bottomDecoration from "@/assets/images/banner/bottom.svg";
import Countdown from '@/components/Countdown.vue'
</script>

<style scoped>
.banner {
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.banner-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(6px);
  transform: scale(1.06);
  z-index: 0;
}

.banner-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35));
  z-index: 1;
}

.invitation-card {
  border-radius: 30px;
  width: 90%;
  max-width: 800px;
  text-align: center;
}

.invitation-card-content {
  border-radius: 30px 0px 30px 0px;    
  padding: 20px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* SVG Decorations */
.decoration-top {
  position: absolute;
  top: -6px;
  right: -6px;
  z-index: 3;
}

.decoration-bottom {
  position: absolute;
  bottom: -6px;
  left: -6px;
  z-index: 3;
}

.invitation-text {
  width: 100%;
}

.invitation-subtitle {
  font-family: var(--font-mulish);
  font-size: 22px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: 500;
  letter-spacing: 1px;
}

.couple-names {
  font-family: var(--font-dancing-script);
  font-size: 3.5rem;
  color: #fff;
  margin: 0 0 30px 0;
  font-weight: 400;
  line-height: 1.2;
}

.wedding-details {
  font-family: var(--font-mulish);
  font-size: 20px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.rsvp-button {
  background: #d4a5a5;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 30px;
  font-family: var(--font-mulish);
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 165, 165, 0.3);
}

.rsvp-button:hover {
  background: #c49595;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 165, 165, 0.4);
}

/* Responsive */
@media (max-width: 768px) {

  .couple-names {
    font-size: 2.8rem;
  }

  .invitation-subtitle {
    font-size: 15px;
  }
}

/* Tighten spacing for small screens */
@media (max-width: 680px) {
  .invitation-subtitle {
    margin-bottom: 0px;
  }
  .couple-names {
    margin: 0;
  }
  
  .rsvp-button {
    padding: 12px 28px;
    font-size: 14px;
  }
  .invitation-card-content {
    padding: 50px 24px;
  }

  .decoration-bottom,
  .decoration-top {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 400px) {
  .invitation-subtitle {
    font-size: 12px;
  }

  .couple-names {
    font-size: 2rem;
  }
}
</style>
