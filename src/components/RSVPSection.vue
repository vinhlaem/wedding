<template>
  <section id="rsvp" class="rsvp-section reveal section-anchor">
    <div class="rsvp-container">
      <div class="rsvp-grid">
        <!-- Form Card -->
        <div class="rsvp-card">
          <h2 class="rsvp-title">{{ title }}</h2>

          <form class="rsvp-form" @submit.prevent="sendMessage">
            <label class="rsvp-label">Name
              <input class="rsvp-input" v-model="name" type="text" placeholder="Your full name" />
            </label>

            <label class="rsvp-label">Message
              <textarea class="rsvp-textarea" v-model="message" rows="5" placeholder="Leave your best wishes for the couple..."></textarea>
            </label>

            <button class="rsvp-button" type="submit">Send</button>
          </form>
        </div>

        <!-- Side Image -->
        <div class="rsvp-message-wrap">
          <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
          </div>
          <div v-else class="rsvp-message-item-container">
            <div class="rsvp-message-item" v-for="message in messages" :key="message.id">
              <span class="rsvp-message-item-name">{{ message.name }}</span>
              <p class="rsvp-message-item-message">{{ message.message }}</p>
              <p class="rsvp-message-item-time">{{ formatDate(message.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/api/axios'
import rsvpData from '@/data/rsvp.json'
const title = rsvpData.title
export default {
  data() {
    return {
      name: "",
      message: "",
      messages: [],
      loading: false,
    };
  },
  methods: {
    async getMessages() {
      this.loading = true;
      try {
        const res = await api.get("/messages");
        this.messages = res.data.data;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async sendMessage() {
      if (!this.name || !this.message) return;
      try {
        await api.post("/messages", {
          name: this.name,
          message: this.message,
        });
        this.name = "";
        this.message = "";
        this.clearForm();
        this.getMessages(); // refresh list
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    },
    clearForm() {
      this.name = "";
      this.message = "";
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 24h format
      });
    }
  },
  mounted() {
    this.getMessages();
  },
};
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
  max-height: 375px;
}

/* Card */
.rsvp-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
  padding: 32px 28px;
  height: 100%;
}

.rsvp-title {
  font-family: var(--font-dancing-script);
  font-size: 2rem;
  color: #d4a5a5;
  margin: 0 0 22px 0;
}

.rsvp-form { display: flex; flex-direction: column; gap: 16px; }

.rsvp-label {
  font-family: var(--font-mulish);
  color: #555;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rsvp-input, .rsvp-select {
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
  background: #d4a5a5;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 12px 22px;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(212,165,165,0.35);
}
.rsvp-button:hover { background: #c49595; }

.rsvp-message-wrap {
  flex: 1;
  padding: 32px 28px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
  height: 100%;
  max-height: 375px;
}

.rsvp-message-item-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow-y: auto;
  padding-right: 12px
}

.rsvp-message-item-container::-webkit-scrollbar {
  width: 8px; 
}

.rsvp-message-item-container::-webkit-scrollbar-track {
  background: #f0e6e6; 
  border-radius: 12px;
}

.rsvp-message-item-container::-webkit-scrollbar-thumb {
  background-color: #d4a5a5; 
  border-radius: 12px;
  border: 2px solid #f0e6e6; 
}

.rsvp-message-item-container::-webkit-scrollbar-thumb:hover {
  background-color: #c49595; 
}
.rsvp-message-item {
  position: relative;
  background: linear-gradient(135deg, #fff6f9, #ffeaf0);
  border-radius: 20px;
  padding: 24px 20px 16px 24px;
  box-shadow: 0 6px 18px rgba(212,165,165,0.2);
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
  border-top: 10px solid #d4a5a5;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
/* Responsive */
@media (max-width: 1024px) {
  .rsvp-grid { 
    grid-template-columns: 1fr;
    max-height: none;
  }
  .rsvp-message-wrap { order: 2; max-height: 375px; }
  .rsvp-message-item-container {height: 100%; }
}

@media (max-width: 768px) {
  .rsvp-section { padding: 60px 16px; }
  .rsvp-card { padding: 24px; border-radius: 20px; }
}

@media (max-width: 480px) {
  .rsvp-title { font-size: 1.6rem; }
}
</style>
