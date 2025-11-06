<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view /> <!-- nơi render các component con -->
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.main-content {
  min-height: 80vh;
}
</style>
