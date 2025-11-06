<template>
  <div>
    <Banner />
    <QuoteSection />
    <Profile />
    <VideoSection />
    <Timeline />
    <Gallery />
    <WeddingProgram />
    <RSVPSection />
  </div>
</template>

<script setup>
import Banner from '@/components/Banner.vue'
import QuoteSection from '@/components/QuoteSection.vue'
import Profile from '@/components/Profile.vue'
import VideoSection from '@/components/VideoSection.vue'
import Timeline from '@/components/Timeline.vue'
import Gallery from '@/components/Gallery.vue'
import WeddingProgram from '@/components/WeddingProgram.vue'
import RSVPSection from '@/components/RSVPSection.vue'
import { onMounted, onUnmounted } from 'vue'

let observer

onMounted(() => {
  const options = { threshold: 0.15 }
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
      } else {
        entry.target.classList.remove('in-view')
      }
    })
  }, options)

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>

</style>