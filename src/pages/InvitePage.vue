<template>
  <div class="invite-page">
    <Transition name="invite-reveal" mode="out-in" @before-enter="resetScroll">
      <InviteOpeningScreen
        v-if="!isOpened"
        key="opening"
        :guest-name="guestName"
        :config="inviteConfig"
        @open="openInvite"
      />
      <InviteMainContent
        v-else
        key="content"
        :config="inviteConfig"
        :guest-name="guestName"
        :place="place"
        :place-info="placeInfo"
      />
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import InviteOpeningScreen from "@/components/invite/InviteOpeningScreen.vue";
import InviteMainContent from "@/components/invite/InviteMainContent.vue";
import { inviteConfig } from "@/data/invite";
import { useSeoMeta } from "@/composables/useSeoMeta";
import { usePreloadImages } from "@/composables/usePreloadImages";
import bannerBg from "@/assets/images/invite/bg.webp";
import photoSrc from "@/assets/images/gallery/image-1.png";

const route = useRoute();
const isOpened = ref(false);

usePreloadImages([
  { href: bannerBg, type: "image/webp" },
  { href: photoSrc, type: "image/png" },
]);

const guestName = computed(() => {
  const rawGuest = route.query.guest || "Quý khách";
  const guest = Array.isArray(rawGuest) ? rawGuest[0] : rawGuest;

  try {
    return decodeURIComponent(String(guest || "Quý khách")).trim() || "Quý khách";
  } catch {
    return String(guest || "Quý khách").trim() || "Quý khách";
  }
});

const place = computed(() => (route.query.place === "bride" ? "bride" : "groom"));
const placeInfo = computed(() => inviteConfig.places[place.value]);
const inviteTitle = computed(
  () => `Thân mời ${guestName.value} dự lễ cưới ${inviteConfig.groomName} & ${inviteConfig.brideName}`,
);
const inviteDescription = computed(() => {
  const side = place.value === "bride" ? "nhà gái" : "nhà trai";
  return `Thiệp cưới ${inviteConfig.groomName} & ${inviteConfig.brideName} trân trọng mời ${guestName.value} đến chung vui vào ${inviteConfig.displayDate}. Thông tin nghi lễ và tiệc cưới bên ${side}.`;
});

watchEffect(() => {
  useSeoMeta({
    title: inviteTitle.value,
    description: inviteDescription.value,
    url: typeof window !== "undefined" ? window.location.href : undefined,
    image: "/og.jpg",
    type: "article",
  });
});

function openInvite() {
  isOpened.value = true;
}

function resetScroll() {
  window.scrollTo({ top: 0, behavior: "auto" });
}
</script>

<style scoped>
.invite-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  overflow-x: hidden;
}

:global(.invite-reveal-leave-active) {
  transition:
    opacity 420ms ease,
    transform 420ms cubic-bezier(0.4, 0, 1, 1),
    filter 420ms ease;
}

:global(.invite-reveal-enter-active) {
  transition:
    opacity 700ms ease,
    transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

:global(.invite-reveal-leave-to) {
  opacity: 0;
  filter: blur(4px);
  transform: scale(1.04);
}

:global(.invite-reveal-enter-from) {
  opacity: 0;
  transform: translateY(28px) scale(0.985);
}

@media (prefers-reduced-motion: reduce) {
  :global(.invite-reveal-enter-active),
  :global(.invite-reveal-leave-active) {
    transition-duration: 1ms;
  }
}

@media (max-width: 374.98px) {
  :global(html:has(.invite-page)) {
    font-size: 14px;
  }
}
</style>
