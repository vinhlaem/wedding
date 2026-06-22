<template>
  <div class="invite-page">
    <InviteOpeningScreen
      v-if="!isOpened"
      :guest-name="guestName"
      :config="inviteConfig"
      @open="openInvite"
    />
    <InviteMainContent
      v-show="isOpened"
      :config="inviteConfig"
      :guest-name="guestName"
      :place="place"
      :place-info="placeInfo"
    />
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import InviteOpeningScreen from "@/components/invite/InviteOpeningScreen.vue";
import InviteMainContent from "@/components/invite/InviteMainContent.vue";
import { inviteConfig } from "@/data/invite";
import { useSeoMeta } from "@/composables/useSeoMeta";

const route = useRoute();
const isOpened = ref(false);

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
  () => `${guestName.value}, thân mời dự lễ cưới ${inviteConfig.groomName} & ${inviteConfig.brideName}`,
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

async function openInvite() {
  isOpened.value = true;
  await nextTick();
  document.getElementById("invite-main")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
</script>

<style scoped>
.invite-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  overflow-x: hidden;
}
</style>
