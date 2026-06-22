<template>
  <footer class="footer" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="footer-overlay"></div>
    <div class="footer-content">
      <div class="thankyou-box">
        <h2 class="thankyou-title">Lời cảm ơn!</h2>
        <p class="thankyou-text">
          Sự hiện diện và những lời chúc phúc của gia đình, người thân và bạn bè
          chính là món quà quý giá nhất đối với hai đứa mình. Hai đứa mình chân
          thành cảm ơn và rất mong được cùng mọi người chia sẻ khoảnh khắc hạnh
          phúc trong ngày trọng đại này.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import bgSrc from "@/assets/images/gallery/image-5.png";
import { fetchMedia } from "@/api/media";

const bgImage = ref(bgSrc);

// Resolve local assets as fallback (same pattern used in other components)
const assetMap = import.meta.glob("../assets/**/*", { eager: true, as: "url" });

onMounted(async () => {
  try {
    const items = await fetchMedia("footer");
    if (items && items.length > 0) {
      bgImage.value = items[0].imageUrl || bgSrc;
    }
  } catch (err) {
    console.warn(
      "Could not load footer image from API, using local asset.",
      err,
    );
    bgImage.value = bgSrc;
  }
});
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
  background: rgba(255, 255, 255, 0.85);
  border: 2px solid rgba(255, 255, 255, 0.9);
  outline: 2px solid rgba(255, 255, 255, 0.6);
  outline-offset: 14px;
  padding: 28px 32px;
  max-width: 760px;
  text-align: center;
  border-radius: 6px;
}

.thankyou-title {
  font-family: var(--font-dancing-script);
  font-size: 2rem;
  color: var(--wedding-primary);
  font-weight: 600;
  margin: 0 0 12px 0;
}

.thankyou-text {
  font-family: var(--font-mulish);
  color: var(--wedding-text);
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0;
}
</style>
