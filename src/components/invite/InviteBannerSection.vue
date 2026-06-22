<template>
  <section class="invite-banner" :style="bannerStyle">
    <figure class="invite-banner__photo">
      <img :src="photoSrc" alt="Ảnh cưới cô dâu chú rể" />
    </figure>
  </section>
</template>

<script setup>
import bannerBg from "@/assets/images/invite/bg.webp";
import photoSrc from "@/assets/images/gallery/image-1.png";

const bannerStyle = {
  backgroundImage: `url(${bannerBg})`,
};
</script>

<style scoped>
.invite-banner {
  position: relative;
  min-height: clamp(520px, 80vw, 860px);
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.invite-banner__photo {
  position: absolute;
  right: clamp(24px, 8vw, 90px);
  top: clamp(90px, 14vw, 170px);
  width: clamp(260px, 42vw, 500px);
  margin: 0;
  padding: clamp(12px, 2vw, 22px);
  padding-bottom: clamp(34px, 5vw, 62px);
  background: #fff;
  box-shadow: 0 26px 36px rgba(70, 45, 45, 0.22);
  transform: rotate(7deg);
  z-index: 2;
}

.invite-banner__photo img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

@media (max-width: 768px) {
  .invite-banner {
    min-height: 560px;
  }

  .invite-banner__photo {
    width: min(78vw, 360px);
    right: 50%;
    top: 120px;
    transform: translateX(50%) rotate(4deg);
  }
}

@media (max-width: 480px) {
  .invite-banner {
    min-height: 500px;
  }

  .invite-banner__photo {
    width: 82vw;
    top: 110px;
  }
}
</style>
