<template>
  <section id="gallery" class="gallery-section reveal section-anchor">
    <div class="gallery-container">
      <TitleSection title="Our Gallery" />
      
      <div class="gallery-grid">
        <div 
          v-for="(image, index) in galleryImages" 
          :key="index"
          class="gallery-item"
          :class="`gallery-item-${index + 1}`"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <img 
            :src="image" 
            :alt="`Gallery image ${index + 1}`"
            class="gallery-image"
            @click="openLightbox(index)"
          />
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <button class="lightbox-close" @click="closeLightbox">✕</button>
      <button class="lightbox-prev" @click.stop="prevImage">‹</button>
      <button class="lightbox-next" @click.stop="nextImage">›</button>
      <img :src="galleryImages[currentImageIndex]" alt="Gallery" class="lightbox-image" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TitleSection from '@/components/common/TitleSection.vue'
import galleryData from '@/data/gallery.json'
// Ensure Vite includes assets even when paths come from JSON
const assetMap = import.meta.glob('../assets/**/*', { eager: true, as: 'url' })
const galleryImages = ref(
  galleryData.images.map(p => assetMap[`../${p}`] || p)
)

const lightboxOpen = ref(false)
const currentImageIndex = ref(0)

function openLightbox(index) {
  currentImageIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function nextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % galleryImages.value.length
}

function prevImage() {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? galleryImages.value.length - 1 
    : currentImageIndex.value - 1
}

onMounted(() => {
  // Close lightbox on escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape' && lightboxOpen.value) {
      closeLightbox()
    }
  }
  document.addEventListener('keydown', handleEscape)
  
  return () => {
    document.removeEventListener('keydown', handleEscape)
  }
})
</script>

<style scoped>
.gallery-section {
  background: #fff;
  padding: 80px 20px;
}

.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-grid {
  position: relative;
  margin-top: 60px;
  min-height: 800px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 100px);
  gap: 20px;
}

.gallery-item {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.gallery-item:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Specific positioning for each image to create collage effect */
.gallery-item-1 {
  grid-column: 5 / 9;
  grid-row: 2 / 8;
  z-index: 10;
}

.gallery-item-2 {
  grid-column: 1 / 5;
  grid-row: 1 / 5;
  z-index: 5;
}

.gallery-item-3 {
  grid-column: 1 / 4;
  grid-row: 5 / 9;
  z-index: 4;
}

.gallery-item-4 {
  grid-column: 9 / 13;
  grid-row: 1 / 5;
  z-index: 3;
}

.gallery-item-5 {
  grid-column: 10 / 13;
  grid-row: 5 / 9;
  z-index: 2;
}


@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.lightbox-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
  position: absolute;
  top: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  font-size: 32px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 2001;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  font-size: 48px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 2001;
}

.lightbox-prev {
  left: 30px;
}

.lightbox-next {
  right: 30px;
}

.lightbox-prev:hover,
.lightbox-next:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(6, 120px);
    min-height: 600px;
  }

  .gallery-item-1 {
    grid-column: 3 / 7;
    grid-row: 2 / 6;
    z-index: 10;
  }

  .gallery-item-2 {
    grid-column: 1 / 4;
    grid-row: 1 / 4;
  }

  .gallery-item-3 {
    grid-column: 1 / 3;
    grid-row: 4 / 6;
  }

  .gallery-item-4 {
    grid-column: 6 / 9;
    grid-row: 1 / 4;
  }

  .gallery-item-5 {
    grid-column: 6 / 9;
    grid-row: 4 / 6;
  }
}

@media (max-width: 768px) {
  .gallery-section {
    padding: 60px 16px;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    gap: 20px;
    min-height: auto;
  }

  .gallery-item-1 {
    grid-column: 1 / 3;
    grid-row: auto;
    aspect-ratio: 16 / 9;
    z-index: 10;
  }

  .gallery-item-2 {
    grid-column: 1 / 3;
    grid-row: auto;
    aspect-ratio: 16 / 9;
  }

  .gallery-item-3 {
    grid-column: 1 / 2;
    grid-row: auto;
    aspect-ratio: 1 / 1;
  }

  .gallery-item-4 {
    grid-column: 2 / 3;
    grid-row: auto;
    aspect-ratio: 1 / 1;
  }

  .gallery-item-5 {
    grid-column: 1 / 3;
    grid-row: auto;
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 15px;
    min-height: auto;
  }

  .gallery-item {
    border-radius: 15px;
  }

  .gallery-item-1 {
    grid-column: 1;
    grid-row: auto;
    aspect-ratio: 16 / 9;
    z-index: 10;
  }

  .gallery-item-2 {
    grid-column: 1;
    grid-row: auto;
    aspect-ratio: 16 / 9;
  }

  .gallery-item-3 {
    grid-column: 1;
    grid-row: auto;
    aspect-ratio: 1 / 1;
  }

  .gallery-item-4 {
    grid-column: 1;
    grid-row: auto;
    aspect-ratio: 1 / 1;
  }

  .gallery-item-5 {
    grid-column: 1;
    grid-row: auto;
    aspect-ratio: 16 / 9;
  }

  .lightbox-close {
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    font-size: 24px;
  }

  .lightbox-prev,
  .lightbox-next {
    width: 45px;
    height: 45px;
    font-size: 36px;
  }

  .lightbox-prev {
    left: 15px;
  }

  .lightbox-next {
    right: 15px;
  }
}
</style>

