<template>
  <section class="quote-section reveal">
    <div class="quote-container">
      <!-- Header with decorative lines -->
      <TitleSection title="Lời Chúc" />
      <!-- Main quote with inline images -->
      <div class="quote-content">
        <p class="quote-text">
          "Khi hai trái tim cùng chung nhịp
          <span class="text-with-image">
            yêu thương,
            <img :src="quoteImage1" alt="Couple hands" class="inline-image" />
          </span>
          hạnh phúc sẽ nở hoa trong từng khoảnh khắc. Mong rằng hành trình phía
          trước của hai ta sẽ luôn tràn đầy
          <span class="text-with-image">
            <img
              :src="quoteImage2"
              alt="Bride with bouquet"
              class="inline-image"
            />
            bình yên, thấu hiểu và yêu thương vẹn tròn."
          </span>
        </p>
      </div>

      <!-- Bottom signature -->
      <div class="quote-signature">
        <p class="signature-text">Vinh 💕 Nguyệt</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import localQuoteImage1 from "@/assets/images/quote/image1.png";
import localQuoteImage2 from "@/assets/images/quote/image2.png";
import TitleSection from "@/components/common/TitleSection.vue";
import { fetchMedia } from "@/api/media";

const quoteImage1 = ref(localQuoteImage1);
const quoteImage2 = ref(localQuoteImage2);

onMounted(async () => {
  try {
    const [img1Items, img2Items] = await Promise.all([
      fetchMedia("quote", "image1"),
      fetchMedia("quote", "image2"),
    ]);
    if (img1Items?.length > 0) quoteImage1.value = img1Items[0].imageUrl;
    if (img2Items?.length > 0) quoteImage2.value = img2Items[0].imageUrl;
  } catch (err) {
    console.warn(
      "Could not load quote images from API, using local assets.",
      err,
    );
  }
});
</script>

<style scoped>
.quote-section {
  background: #fff;
  padding: 80px 0px;
}

.quote-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.decorative-line {
  flex: 1;
  height: 1px;
  background: #d4a5a5;
  max-width: 150px;
}

/* Quote content */
.quote-content {
  margin: 40px 0px;
}

.quote-text {
  font-family: var(--font-dancing-script);
  font-size: 2.5rem;
  line-height: 1.8;
  color: #333;
  text-align: center;
}

.inline-image {
  display: inline-block;
  width: 120px;
  height: 45px;
  object-fit: cover;
  border-radius: 100px;
  vertical-align: middle;
  flex-shrink: 0;
}

/* Signature */
.quote-signature {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.signature-text {
  font-family: var(--font-dancing-script);
  font-size: 1.5rem;
  color: #d4a5a5;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 1199px) {
  .quote-section {
    padding: 80px 16px;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .quote-section {
    padding: 60px 16px;
  }

  .quote-title {
    font-size: 2.2rem;
  }

  .quote-text {
    font-size: 1.5rem;
    line-height: 1.6;
  }

  .inline-image {
    width: 60px;
    height: 30px;
  }

  .quote-header {
    gap: 10px;
  }

  .decorative-line {
    max-width: 80px;
  }

  .profile-text {
    text-align: center;
  }

  .profile-subtitle {
    font-size: 2rem;
  }

  .profile-description {
    font-size: 1rem;
  }
}

@media (max-width: 580px) {
  .quote-title {
    font-size: 1.8rem;
  }

  .quote-text {
    font-size: 1.2rem;
    line-height: 2;
  }

  .signature-line {
    display: none;
  }
  .signature-text {
    font-size: 0.9rem;
  }
}
</style>
