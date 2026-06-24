<template>
  <main id="invite-main" class="invite-main" :style="mainStyle">
    <InviteBannerSection />
    <InviteCoupleNameSection :config="config" />
    <Gallery title="ALBUM ẢNH CƯỚI" variant="invite" />
    <InviteWeddingInfoSection :config="config" />
    <InviteCeremonySection
      :config="config"
      :place="place"
      :place-info="placeInfo"
    />
    <InvitePartySection :config="config" :place-info="placeInfo" />
    <InviteCalendarSection :config="config" />
    <InviteMapSection :place-info="placeInfo" />
    <InviteScheduleSection :schedule="config.schedule" />
    <RSVPSection
      title="Sổ lưu bút"
      :default-name="guestName"
      variant="invite"
    />
    <GiftWedding variant="invite" />
    <p class="invite-main__thanks">
      Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!
    </p>
    <RouterLink class="invite-main__home-link" to="/">
      Xem thêm thông tin
    </RouterLink>
    <FixAction music-only />
  </main>
</template>

<script setup>
import Gallery from "@/components/Gallery.vue";
import RSVPSection from "@/components/RSVPSection.vue";
import GiftWedding from "@/components/GiftWedding.vue";
import FixAction from "@/components/FixAction.vue";
import InviteBannerSection from "@/components/invite/InviteBannerSection.vue";
import InviteCoupleNameSection from "@/components/invite/InviteCoupleNameSection.vue";
import InviteWeddingInfoSection from "@/components/invite/InviteWeddingInfoSection.vue";
import InviteCeremonySection from "@/components/invite/InviteCeremonySection.vue";
import InvitePartySection from "@/components/invite/InvitePartySection.vue";
import InviteCalendarSection from "@/components/invite/InviteCalendarSection.vue";
import InviteMapSection from "@/components/invite/InviteMapSection.vue";
import InviteScheduleSection from "@/components/invite/InviteScheduleSection.vue";
import bgFull from "@/assets/images/invite/bg-full.jpg";
import bgSoft from "@/assets/images/invite/bg.webp";

defineProps({
  config: {
    type: Object,
    required: true,
  },
  guestName: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  placeInfo: {
    type: Object,
    required: true,
  },
});

const mainStyle = {
  "--invite-bg-full": "url(" + bgFull + ")",
  "--invite-bg-soft": "url(" + bgSoft + ")",
};
</script>

<style>
.invite-main {
  position: relative;
  width: 100%;
  max-width: 960px;
  min-height: 100vh;
  margin: 0 auto;
  background-image: var(--invite-bg-full);
  background-size: 100% auto;
  background-position: top center;
  background-repeat: repeat-y;
  color: #b94a58;
  overflow: hidden;
  font-family: var(--font-body);
  font-kerning: normal;
  text-rendering: optimizeLegibility;
}

.invite-main::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: var(--invite-bg-soft);
  background-size: 100% auto;
  background-position: top center;
  background-repeat: repeat-y;
  opacity: 0.28;
}

.invite-main > * {
  position: relative;
  z-index: 1;
}
.invite-main .reveal {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

.invite-main
  :is(
    .invite-date-block,
    .invite-main__thanks,
    .invite-wedding-info,
    .invite-calendar,
    .invite-map,
    .invite-schedule,
    .invite-party,
    .rsvp-section--invite,
    .gift-section--invite
  ) {
  font-family: var(--font-body);
}

.invite-main
  :is(.invite-heading, .rsvp-section--invite::before, .gift-invite__title) {
  font-family: var(--font-heading);
}
.invite-main :is(input, textarea, button) {
  font-family: var(--font-form);
}
.invite-section {
  position: relative;
  z-index: 1;
  padding: clamp(40px, 5.5vw, 76px) clamp(20px, 5vw, 72px);
}

.invite-heading {
  margin: 0;
  color: #b94a58;
  font-family: var(--font-heading);
  font-size: clamp(1.35rem, 3vw, 2rem);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.invite-date-block {
  display: grid;
  gap: 6px;
  justify-items: center;
  font-family: var(--font-body);
}

.invite-date-block p,
.invite-date-block small {
  margin: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 900;
  font-size: clamp(1.2rem, 2vw, 1.3rem);
}

.invite-date-block strong {
  font-size: clamp(1.2rem, 2.7vw, 1.8rem);
  font-weight: 900;
}

.invite-date-block time {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  font-weight: 500;
}

.invite-date-block__date {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  gap: 20px;
}

.invite-date-block__date span {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 900;
}

.invite-date-block__date strong {
  padding: 0 18px;
  border-left: 1px solid rgba(185, 74, 88, 0.48);
  border-right: 1px solid rgba(185, 74, 88, 0.48);
  font-size: clamp(2.4rem, 6vw, 4rem);
}

.invite-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 12px 30px;
  background: #b94a58;
  color: #fff;
  font-family: var(--font-form);
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 12px 24px rgba(185, 74, 88, 0.22);
}

.invite-main__home-link {
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  margin: 0 auto 72px;
  border-radius: 999px;
  padding: 13px 30px;
  background: #b94a58;
  color: #fff;
  font-family: var(--font-form);
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 14px 28px rgba(185, 74, 88, 0.24);
}

.invite-main__home-link:hover {
  background: #a83e4b;
}
.invite-main__thanks {
  margin: 0;
  padding: 0 20px 64px;
  text-align: center;
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.4vw, 1.25rem);
  font-weight: 900;
}

.invite-main .gallery-section,
.invite-main .rsvp-section,
.invite-main .gift-section {
  background: transparent;
}

@media (max-width: 768px) {
  .invite-main {
    max-width: 100%;
    background-size: cover;
    background-repeat: repeat-y;
  }
}

@media (max-width: 480px) {
  .invite-section {
    padding: 20px 18px;
  }

  .invite-date-block__date {
    gap: 10px;
  }
}
@media (max-width: 375px) {
  .invite-section {
    padding: 20px 10px;
  }
}
</style>
