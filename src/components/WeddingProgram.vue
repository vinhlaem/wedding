<template>
  <section id="event" class="program-section reveal section-anchor">
    <div class="program-container">
      <TitleSection title="Sự kiện cưới" />

      <div class="program-grid">
        <div v-for="(p, i) in programs" :key="i" class="program-card">
          <div class="program-card-inner">
            <div class="program-media">
              <img :src="p.image" :alt="p.title" />
            </div>
            <div class="program-content">
              <h3 class="program-name">{{ p.title }}</h3>
              <div class="program-meta">
                <span class="meta-text">
                  <svg
                    class="meta-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                    <path
                      d="M12 7v5l4 2"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ p.time }}
                </span>
                <span class="meta-text meta-text--check">
                  <svg
                    class="meta-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                      fill="currentColor"
                    />
                  </svg>
                  <a
                    :href="mapUrl(p)"
                    class="meta-map-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="`Open location in Google Maps: ${p.description}`"
                  >
                    <span class="meta-text-content">{{ p.description }}</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import TitleSection from "@/components/common/TitleSection.vue";
import programData from "@/data/weddingProgram.json";
import { fetchMedia } from "@/api/media";

// Resolve local assets as fallback
const assetMap = import.meta.glob("../assets/**/*", { eager: true, as: "url" });
const fallbackPrograms = programData.programs.map((p) => ({
  ...p,
  image: assetMap[`../${p.image}`] || p.image,
}));

const programs = ref(fallbackPrograms);

// store image cleanup handlers so we can remove listeners on unmount
const imgCleanup = [];

onMounted(async () => {
  try {
    const items = await fetchMedia("program");
    if (items && items.length > 0) {
      // Merge API images by index with existing program metadata
      programs.value = fallbackPrograms.map((p, i) => ({
        ...p,
        image: items[i]?.imageUrl ?? p.image,
      }));
    }
  } catch (err) {
    console.warn(
      "Could not load program images from API, using local assets.",
      err,
    );
  }

  // ensure DOM is updated first
  await nextTick();

  // initial alignment pass
  await adjustMetaAlignment();

  // Also wait for images to load (they can change layout) and re-run alignment.
  const root = document.querySelector(".program-container");
  const imgs = root
    ? Array.from(root.querySelectorAll(".program-media img"))
    : [];

  const pending = imgs
    .filter((img) => !img.complete)
    .map(
      (img) =>
        new Promise((resolve) => {
          const handler = () => {
            resolve();
            img.removeEventListener("load", handler);
          };
          img.addEventListener("load", handler);
          // add a cleanup function in case component unmounts before load
          imgCleanup.push(() => img.removeEventListener("load", handler));
        }),
    );

  if (pending.length) {
    await Promise.all(pending);
    // give one more tick for layout
    await nextTick();
    adjustMetaAlignment();
  }

  window.addEventListener("resize", adjustMetaAlignment);
});

onUnmounted(() => {
  window.removeEventListener("resize", adjustMetaAlignment);
  // run any stored cleanup handlers for image listeners
  imgCleanup.splice(0).forEach((fn) => fn());
});

async function adjustMetaAlignment() {
  // wait a tick to ensure any pending layout changes are applied
  await nextTick();

  document.querySelectorAll(".meta-text--check").forEach((el) => {
    const content = el.querySelector(".meta-text-content");
    if (!content) return;

    try {
      // Use a Range to count line rects — more reliable to detect wrapping
      const range = document.createRange();
      range.selectNodeContents(content);
      const rects = range.getClientRects();
      const wraps = rects.length > 1;
      range.detach?.();

      if (wraps) el.classList.add("multi-line");
      else el.classList.remove("multi-line");
    } catch (e) {
      // fallback: use height comparison if Range fails
      const wrapsFallback =
        Math.round(content.scrollHeight) > Math.round(content.clientHeight) + 1;
      if (wrapsFallback) el.classList.add("multi-line");
      else el.classList.remove("multi-line");
    }
  });
}

// return a Google Maps URL for a program item or description
function mapUrl(itemOrDesc) {
  if (!itemOrDesc) return "#";
  // if an object with explicit mapUrl, use it
  if (typeof itemOrDesc === "object") {
    if (itemOrDesc.mapUrl) return itemOrDesc.mapUrl;
    const desc = itemOrDesc.description || itemOrDesc.title || "";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(desc)}`;
  }
  // if string, treat as description or full url
  if (typeof itemOrDesc === "string") {
    if (itemOrDesc.startsWith("http://") || itemOrDesc.startsWith("https://"))
      return itemOrDesc;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(itemOrDesc)}`;
  }
  return "#";
}
</script>

<style scoped>
.program-section {
  background: #fff;
  padding: 80px 20px;
}

.program-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.program-title {
  font-family: var(--font-mulish);
  font-size: 2.2rem;
  color: var(--wedding-text);
  margin: 12px 0 12px 0;
  font-weight: 700;
}

.program-subtitle {
  font-family: var(--font-mulish);
  color: var(--wedding-text);
  line-height: 1.8;
  max-width: 760px;
  margin: 0 auto 40px auto;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.program-card {
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
  border: 8px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.program-card::before {
  content: "";
  position: absolute;
  inset: 8px;
  border: 1px solid #f4e8e8;
  pointer-events: none;
}

.program-card-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
}

.program-media {
  width: 160px;
  aspect-ratio: 1 / 1;
  flex: 0 0 160px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.1);
  background: #fff;
  display: inline-block;
}

.program-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.program-content {
  flex: 1;
}

.program-name {
  font-family: var(--font-mulish);
  font-size: 1.4rem;
  color: var(--wedding-primary);
  font-weight: 700;
  margin: 0 0 8px 0;
}

.program-meta {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.meta-row {
  display: grid;
  grid-template-columns: 24px 1fr;
  align-items: center;
  gap: 8px;
}

.meta-row.multi-line {
  align-items: start;
}

.meta-icon {
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  color: var(--wedding-primary);
  display: block;
}
.meta-icon svg {
  display: block;
}

.meta-text {
  font-family: var(--font-mulish);
  color: var(--wedding-text);
  font-size: 0.95rem;
  line-height: 1.6;
  display: flex;
  align-items: center;
}

/* Special handling for the checked description span so wrapped lines align under text, not the icon */
.meta-text--check {
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
}
.meta-text--check.multi-line {
  align-items: start;
}
.meta-text-content {
  display: block;
}

.meta-map-link {
  color: inherit;
  text-decoration: none;
  display: inline-block;
}
.meta-map-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 1024px) {
  .program-media {
    width: 100px;
    flex: 0 0 100px;
  }
  .program-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .program-section {
    padding: 60px 16px;
  }

  .program-media {
    width: 84px;
    flex: 0 0 84px;
  }
  .program-title {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .program-media {
    width: 72px;
    flex: 0 0 72px;
  }
  .program-title {
    font-size: 1.6rem;
  }
}
</style>
