<template>
  <section class="invite-section invite-map">
    <h2 class="invite-heading">{{ placeInfo.mapTitle }}</h2>
    <p class="invite-map__address">{{ placeInfo.mapAddress }}</p>
    <div class="invite-map__frame">
      <iframe
        :src="placeInfo.mapEmbedUrl"
        title="Bản đồ địa điểm tiệc cưới"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      ></iframe>
    </div>
    <a
      v-if="placeInfo.directionsUrl"
      class="invite-button"
      :href="placeInfo.directionsUrl"
      target="_blank"
      rel="noreferrer"
    >
      Chỉ đường
    </a>
  </section>
</template>

<script setup>
defineProps({
  placeInfo: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.invite-map {
  text-align: center;
}

.invite-map__address {
  width: min(620px, 100%);
  margin: 18px auto 42px;
  font-family: var(--invite-serif, "Noto Serif", "Times New Roman", serif);
  line-height: 1.7;
}

.invite-map__frame {
  width: min(620px, 100%);
  margin: 0 auto 26px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(112, 68, 68, 0.16);
}

.invite-map__frame iframe {
  display: block;
  width: 100%;
  height: clamp(300px, 46vw, 420px);
  border: 0;
}
</style>
