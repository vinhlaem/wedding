<template>
  <section class="video-section reveal">
    <div class="video-container">
      <div class="video-wrapper" @click="togglePlay">
        <video 
          ref="videoRef"
          :src="videoSrc" 
          :poster="videoPoster"
          class="main-video"
          @play="onVideoPlay"
          @pause="onVideoPause"
          @ended="onVideoEnd"
        ></video>
        
        <!-- Play Button Overlay -->
        <div v-if="!isPlaying" class="play-button-overlay">
          <div class="play-button">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="40" fill="rgba(255, 255, 255, 0.9)"/>
              <path d="M32 24L32 56L56 40L32 24Z" fill="#d4a5a5"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const videoRef = ref(null)
const isPlaying = ref(false)

// Replace with your actual video source and poster
const videoSrc = ref('')
const videoPoster = ref('')

function togglePlay() {
  if (!videoRef.value) return
  
  if (isPlaying.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play()
  }
}

function onVideoPlay() {
  isPlaying.value = true
}

function onVideoPause() {
  isPlaying.value = false
}

function onVideoEnd() {
  isPlaying.value = false
}
</script>

<style scoped>
.video-section {
  background: #fff;
  padding: 80px 20px;
}

.video-container {
  max-width: 1200px;
  margin: 0 auto;
}

.video-wrapper {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background: #000;
  aspect-ratio: 16 / 9;
}

.main-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.play-button-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease, background 0.3s ease;
  z-index: 2;
}

.play-button-overlay:hover {
  background: rgba(0, 0, 0, 0.2);
}

.play-button {
  transition: transform 0.3s ease;
}

.play-button-overlay:hover .play-button {
  transform: scale(1.1);
}

.play-button svg {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
}

/* Hide play button when video is playing */
.video-wrapper:has(video:playing) .play-button-overlay {
  opacity: 0;
  pointer-events: none;
}

/* Responsive */
@media (max-width: 768px) {
  .video-section {
    padding: 60px 16px;
  }

  .video-wrapper {
    border-radius: 15px;
  }

  .play-button svg {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .video-section {
    padding: 40px 12px;
  }

  .play-button svg {
    width: 50px;
    height: 50px;
  }
}
</style>

