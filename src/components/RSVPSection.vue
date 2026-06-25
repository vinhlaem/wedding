<template>
  <section
    id="rsvp"
    class="rsvp-section reveal section-anchor"
    :class="`rsvp-section--${variant}`"
  >
    <div class="rsvp-container">
      <TitleSection :title="title" />

      <div class="rsvp-grid">
        <!-- Form Card -->
        <div class="rsvp-card">
          <h2 v-if="variant !== 'invite'">{{ title }}</h2>

          <form class="rsvp-form" @submit.prevent="sendMessage">
            <label class="rsvp-label"
              >Tên
              <input
                class="rsvp-input"
                v-model="name"
                type="text"
                placeholder="Họ và tên"
              />
            </label>

            <label class="rsvp-label"
              >Lời nhắn
              <textarea
                class="rsvp-textarea"
                v-model="message"
                rows="5"
                placeholder="Gửi lời chúc tốt đẹp nhất cho cặp đôi..."
              ></textarea>
            </label>

            <button
              :disabled="submitting || !name || !message"
              aria-busy="${submitting}"
              class="rsvp-button"
              type="submit"
            >
              <span
                v-if="submitting"
                class="btn-spinner"
                aria-hidden="true"
              ></span>
              <span v-if="!submitting">Gửi</span>
            </button>
          </form>
        </div>

        <!-- Side Image -->
        <div class="rsvp-message-wrap">
          <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
          </div>
          <div
            v-else
            class="rsvp-message-item-container"
            ref="messageWrapRef"
            @scroll="handleScroll"
          >
            <div
              class="rsvp-message-item"
              v-for="message in messages"
              :key="message.id"
            >
              <span class="rsvp-message-item-name">{{ message.name }}</span>
              <p class="rsvp-message-item-message">{{ message.message }}</p>
              <p class="rsvp-message-item-time">
                {{ formatDate(message.createdAt) }}
              </p>
            </div>
          </div>
          <div
            v-if="loadingMore && variant !== 'invite'"
            class="loading rsvp-loading-more"
          >
            Đang tải...
          </div>
          <button
            v-if="variant === 'invite' && currentPage < totalPages"
            class="rsvp-load-more-button"
            type="button"
            :disabled="loadingMore"
            @click="fetchMoreMessages"
          >
            {{ loadingMore ? "Đang tải..." : "Xem thêm lời chúc" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import api from "@/api/axios";
import rsvpData from "@/data/rsvp.json";
import TitleSection from "@/components/common/TitleSection.vue";

const props = defineProps({
  title: {
    type: String,
    default: rsvpData.title,
  },
  defaultName: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
  },
});

const title = ref(props.title);
const name = ref(props.defaultName);
const message = ref("");
const messages = ref([]);
const loading = ref(false);
const loadingMore = ref(false);
const submitting = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const limit = ref(3);

const messageWrapRef = ref(null);

watch(
  () => props.defaultName,
  (value) => {
    if (!name.value) name.value = value;
  },
);

const handleScroll = () => {
  const container = messageWrapRef.value;
  if (!container) return;

  if (
    container.scrollTop + container.clientHeight >=
    container.scrollHeight - 20
  ) {
    fetchMoreMessages();
  }
};

async function getMessages(page = 1) {
  if (loading.value) return;

  loading.value = true;
  try {
    const res = await api.get("/messages", {
      params: { page, limit: limit.value },
    });
    messages.value = res.data.data;
    currentPage.value = Number(res.data.currentPage);
    totalPages.value = res.data.totalPages;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function fetchMoreMessages() {
  if (loadingMore.value || currentPage.value >= totalPages.value) return;

  loadingMore.value = true;
  try {
    const nextPage = currentPage.value + 1;
    const res = await api.get("/messages", {
      params: { page: nextPage, limit: limit.value },
    });
    messages.value = [...messages.value, ...res.data.data];
    currentPage.value = Number(res.data.currentPage);
  } catch (err) {
    console.error(err);
  } finally {
    loadingMore.value = false;
  }
}

async function sendMessage() {
  if (!name.value || !message.value) return;
  submitting.value = true;
  try {
    const res = await api.post("/messages", {
      name: name.value,
      message: message.value,
    });
    messages.value = [res.data.data, ...messages.value];
    name.value = "";
    message.value = "";
    clearForm();
  } catch (err) {
    console.error("Failed to send message:", err);
  } finally {
    submitting.value = false;
  }
}

function clearForm() {
  name.value = "";
  message.value = "";
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24h format
  });
}

onMounted(() => {
  getMessages();
});
</script>

<style scoped>
.rsvp-section {
  background: transparent;
  padding: 80px 20px;
}

.rsvp-container {
  max-width: 1200px;
  margin: 0 auto;
}

.rsvp-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 24px;
  align-items: stretch;
  max-height: 426px;
}

/* Card */
.rsvp-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  padding: 32px 28px;
  height: 100%;
}

.rsvp-title {
  font-family: var(--font-dancing-script);
  font-size: 2rem;
  color: var(--wedding-primary);
  margin: 0 0 22px 0;
}

.rsvp-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rsvp-label {
  font-family: var(--font-mulish);
  color: var(--wedding-text);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rsvp-input,
.rsvp-select {
  border: none;
  border-bottom: 1px solid #e7e2ea;
  padding: 10px 4px;
  outline: none;
  background: transparent;
  font-family: var(--font-mulish);
}

.rsvp-textarea {
  width: 100%;
  resize: vertical;
  border: 1px solid #e7e2ea;
  border-radius: 12px;
  padding: 12px;
  outline: none;
  font-family: var(--font-mulish);
  background: #fff;
}

/* removed radio group styles from previous version */

.rsvp-button {
  margin-top: 6px;
  background: var(--wedding-primary);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 12px 22px;
  font-weight: 700;
  font-size: clamp(0.8rem, 2vw, 1.3rem);
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(212, 165, 165, 0.35);
}

.rsvp-button:hover {
  background: var(--wedding-primary-hover);
}

.btn-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  vertical-align: middle;
  margin-right: 8px;
}

.rsvp-message-wrap {
  flex: 1;
  padding: 32px 28px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  height: 100%;
  max-height: 426px;
}

.rsvp-message-item-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow-y: auto;
  padding-right: 12px;
}

.rsvp-message-item-container::-webkit-scrollbar {
  width: 8px;
}

.rsvp-message-item-container::-webkit-scrollbar-track {
  background: #f0e6e6;
  border-radius: 12px;
}

.rsvp-message-item-container::-webkit-scrollbar-thumb {
  background-color: var(--wedding-primary);
  border-radius: 12px;
  border: 2px solid #f0e6e6;
}

.rsvp-message-item-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--wedding-primary-hover);
}

.rsvp-message-item {
  position: relative;
  background: linear-gradient(135deg, #fff6f9, #ffeaf0);
  border-radius: 20px;
  padding: 24px 20px 16px 24px;
  box-shadow: 0 6px 18px rgba(212, 165, 165, 0.2);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.rsvp-message-item:hover {
  transform: translateY(-5px);
}

.rsvp-message-item-name {
  font-family: var(--font-mulish);
  font-size: 1.3rem;
  font-weight: 600;
}

.rsvp-message-item-message {
  font-family: var(--font-mulish);
  font-size: 1rem;
}

.rsvp-message-item-time {
  font-family: var(--font-mulish);
  font-size: 0.8rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 375px;
}

.loading-spinner {
  border: 10px solid #f3f3f3;
  border-top: 10px solid var(--wedding-primary);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .rsvp-grid {
    grid-template-columns: 1fr;
    max-height: none;
  }

  .rsvp-message-wrap {
    order: 2;
    max-height: 375px;
  }

  .rsvp-message-item-container {
    height: 100%;
  }
}

@media (max-width: 768px) {
  .rsvp-section {
    padding: 60px 16px;
  }

  .rsvp-card {
    padding: 24px;
    border-radius: 20px;
  }
}

@media (max-width: 480px) {
  .rsvp-title {
    font-size: 1.6rem;
  }
}
.rsvp-section--invite {
  padding: clamp(56px, 8vw, 112px) clamp(20px, 5vw, 72px);
  color: #b94a58;
}

.rsvp-section--invite .rsvp-container {
  max-width: 640px;
}

.rsvp-section--invite :deep(.quote-header) {
  display: none;
}

.rsvp-section--invite::before {
  content: "SỔ LƯU BÚT";
  display: block;
  margin-bottom: 34px;
  text-align: center;
  font-family: var(--font-heading);
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  letter-spacing: 0.1em;
  font-weight: 900;
}

.rsvp-section--invite .rsvp-grid {
  display: flex;
  flex-direction: column;
  max-height: none;
}

.rsvp-section--invite .rsvp-card,
.rsvp-section--invite .rsvp-message-wrap {
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(185, 74, 88, 0.28);
  border-radius: 8px;
  box-shadow: 0 18px 38px rgba(117, 65, 65, 0.1);
}

.rsvp-section--invite .rsvp-title,
.rsvp-section--invite .rsvp-label,
.rsvp-section--invite .rsvp-message-item-name,
.rsvp-section--invite .rsvp-message-item-message,
.rsvp-section--invite .rsvp-message-item-time {
  color: #b94a58;
}

.rsvp-section--invite .rsvp-message-item-name {
  font-size: clamp(1.5rem, 2.2vw, 1.7rem) !important;
  font-weight: 900 !important;
  font-family: var(--font-couple) !important;
  letter-spacing: 0.1em;
}

.rsvp-section--invite .rsvp-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
}

.rsvp-section--invite .rsvp-label,
.rsvp-section--invite .rsvp-message-item-name,
.rsvp-section--invite .rsvp-message-item-message,
.rsvp-section--invite .rsvp-message-item-time {
  font-family: var(--font-body);
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 500;
}

.rsvp-section--invite .rsvp-message-item-message,
.rsvp-section--invite .rsvp-message-item-time {
  color: rgba(19, 15, 15, 0.8);
}

.rsvp-section--invite .rsvp-input,
.rsvp-section--invite .rsvp-textarea {
  border: 1px solid rgba(185, 74, 88, 0.65);
  border-radius: 6px;
  padding: 13px 16px;
  color: #b94a58;
  background: rgba(255, 255, 255, 0.36);
  font-family: var(--font-form);
}

.rsvp-section--invite .rsvp-button {
  align-self: flex-end;
  background: #b94a58;
  font-family: var(--font-form);
  text-transform: uppercase;
}

.rsvp-section--invite .rsvp-button span:not(.btn-spinner)::after {
  content: " lời chúc";
}

.rsvp-section--invite .rsvp-message-wrap {
  max-height: 520px;
}

.rsvp-section--invite .rsvp-message-item {
  background: rgba(255, 255, 255, 0.46);
  border: 1px solid rgba(185, 74, 88, 0.24);
  border-radius: 8px;
  box-shadow: none;
}

.rsvp-load-more-button {
  display: none;
}

.rsvp-section--invite .rsvp-message-wrap {
  display: flex;
  flex-direction: column;
  height: min(520px, 75vh);
  max-height: 520px;
}

.rsvp-section--invite .rsvp-message-item-container {
  flex: 1;
  min-height: 0;
}

.rsvp-section--invite .rsvp-loading-more {
  height: auto;
  padding: 10px 0 0;
  font-family: var(--font-body);
}

.rsvp-section--invite .rsvp-load-more-button {
  display: inline-flex;
  align-self: center;
  justify-content: center;
  margin-top: 18px;
  border: 1px solid rgba(185, 74, 88, 0.36);
  border-radius: 999px;
  padding: 10px 22px;
  background: rgba(255, 255, 255, 0.56);
  color: #b94a58;
  font-family: var(--font-body);
  font-weight: 700;
  cursor: pointer;
  font-size: clamp(1rem, 2vw, 1.2rem);
}

.rsvp-section--invite .rsvp-load-more-button:disabled {
  cursor: wait;
  opacity: 0.68;
}

@media (max-width: 480px) {
  .rsvp-section--invite {
    padding: 48px 18px;
  }
}
</style>
