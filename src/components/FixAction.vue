<template>
  <div class="fix-action">
    <button @click="toggleAudio" class="action">
      <IconMuted v-if="isPlaying" />
      <IconUnmute v-else />
    </button>
    <button v-if="!musicOnly" @click="scrollTo('gift')" class="action"><IconGift /></button>
    <button v-if="!musicOnly" @click="scrollTo('rsvp')" class="action"><IconMail /></button>
    <audio ref="audioRef" :src="musicSrc" loop preload="auto"></audio>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import IconGift from "./icons/IconGift.vue";
import IconMuted from "./icons/IconMuted.vue";
import IconUnmute from "./icons/IconUnmute.vue";
import IconMail from "./icons/IconMail.vue";
import musicSrc from "@/assets/music/wedding-music.mp3";

defineProps({
  musicOnly: {
    type: Boolean,
    default: false,
  },
});

const audioRef = ref(null);
const isPlaying = ref(false);
let startAudioHandler;

function toggleAudio() {
  const a = audioRef.value;

  if (!a) return;
  if (isPlaying.value) {
    a.pause();

    isPlaying.value = false;
  } else {
    a.play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch(() => {
        isPlaying.value = false;
      });
  }
}

onMounted(() => {
  startAudioHandler = () => {
    const a = audioRef.value;
    if (a) {
      a.play()
        .then(() => {
          isPlaying.value = true;
        })
        .catch(() => {
          isPlaying.value = false;
        });
    }

    window.removeEventListener("click", startAudioHandler);
  };

  window.addEventListener("click", startAudioHandler);
});

onUnmounted(() => {
  if (startAudioHandler) window.removeEventListener("click", startAudioHandler);
});

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped>
.fix-action {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #d4a5a5;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
