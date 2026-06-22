<template>
  <div class="home-page">
    <Banner />
    <QuoteSection />
    <Profile />
    <VideoSection />
    <Timeline />
    <Gallery />
    <WeddingProgram />
    <RSVPSection />
    <GiftWedding />
    <FixAction />
  </div>
</template>

<script setup>
import Banner from "@/components/Banner.vue";
import QuoteSection from "@/components/QuoteSection.vue";
import Profile from "@/components/Profile.vue";
import VideoSection from "@/components/VideoSection.vue";
import Timeline from "@/components/Timeline.vue";
import Gallery from "@/components/Gallery.vue";
import WeddingProgram from "@/components/WeddingProgram.vue";
import RSVPSection from "@/components/RSVPSection.vue";
import { onMounted, onUnmounted } from "vue";
import { useSeoMeta } from "@/composables/useSeoMeta";
import GiftWedding from "@/components/GiftWedding.vue";
import FixAction from "@/components/FixAction.vue";

let observer;

useSeoMeta({
  title: "Đám cưới Vinh & Nguyệt | 30 tháng 5, 2027",
  description: "Website cưới của Trương Đình Vinh & Võ Thị Minh Nguyệt: câu chuyện, album ảnh, lịch trình, lời chúc và thông tin tiệc cưới ngày 30 tháng 5, 2027.",
  url: typeof window !== "undefined" ? window.location.origin + "/" : undefined,
  image: "/og.jpg",
});

onMounted(() => {
  const options = { threshold: 0.15 };
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }, options);

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.home-page {
  position: relative;
}
</style>
