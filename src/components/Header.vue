<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <nav class="header-nav">
        
        <div class="header-link-container">
          <RouterLink class="header-link" v-for="item in FIRST_HEADER" :key="item.href" :to="item.href">{{ item.label }}</RouterLink>
        </div>
        <div class="header-separator">V<span class="header-separator-icon">💞</span>N</div>
        <div class="header-link-container">
          <RouterLink class="header-link" v-for="item in SECOND_HEADER" :key="item.href" :to="item.href">{{ item.label }}</RouterLink>
        </div>
        <button class="hamburger" @click="isMenuOpen = true" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </nav>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="mobile-menu-backdrop" @click.self="isMenuOpen = false">
      <div class="mobile-menu">
        <div class="mobile-menu-header">
          <div class="mobile-title">Menu</div>
          <button class="close-btn" @click="isMenuOpen = false" aria-label="Close menu">✕</button>
        </div>
        <div class="mobile-links">
          <RouterLink class="mobile-link" v-for="item in header" :key="item.href" :to="item.href" @click="isMenuOpen = false">{{ item.label }}</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { header } from '@/data/header.js'

const FIRST_HEADER = header.slice(0, 3);
const SECOND_HEADER = header.slice(3);

const isScrolled = ref(false)
const isMenuOpen = ref(false)

function handleScroll() {
  const homeContainer = document.querySelector('.home')
  if (homeContainer) {
    isScrolled.value = homeContainer.scrollTop > 10
  } else {
    // Fallback to window scroll if .home not found
    isScrolled.value = window.scrollY > 10
  }
}

onMounted(() => {
  const homeContainer = document.querySelector('.home')
  if (homeContainer) {
    homeContainer.addEventListener('scroll', handleScroll)
  } else {
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  const homeContainer = document.querySelector('.home')
  if (homeContainer) {
    homeContainer.removeEventListener('scroll', handleScroll)
  } else {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.header {
  width: 100%;
  height: 90px;
  background-color: transparent;
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: box-shadow 0.3s ease;
}

.header-scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: #fff;
}

/* When header is scrolled, use dark links */
.header-scrolled .header-link {
  color: #000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}

.header-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  height: 100%;
}

.header-link-container {
  display: flex;
  gap: 36px;
}

.header-link {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
}

.header-separator {
  color: #d4a5a5;
  font-size: 40px;
  font-weight: 600;
  text-decoration: none;
  font-family: var(--font-dancing-script);
}

.header-separator-icon {
  font-size: 30px;
  font-weight: 600;
  font-family: var(--font-dancing-script);
}

/* Hamburger (hidden on desktop) */
.hamburger {
  display: none;
  background: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #000;
  margin: 5px 0;
  transition: background 0.2s ease;
}

/* Mobile menu overlay */
.mobile-menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1500;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.mobile-menu {
  width: 80vw;
  max-width: 360px;
  background: #fff;
  height: 100vh;
  box-shadow: -10px 0 25px rgba(0,0,0,0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}
.mobile-title {
  font-family: var(--font-dancing-script);
  font-size: 2rem;
  color: #d4a5a5;
  font-weight: 700;
}
.close-btn {
  background: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;
}
.mobile-links {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}
.mobile-link {
  padding: 12px 4px;
  text-decoration: none;
  color: #000;
  font-weight: 600;
  text-transform: uppercase;
}

/* Responsive - show hamburger, hide desktop links at <= 765px */
@media (max-width: 765px) {
  .header {
    height: 70px;
  }
  .header-nav {
    justify-content: space-between;
    padding: 0 16px;
  }
  .hamburger { display: inline-block; }
  .header-link-container { display: none; }
  /* keep the center separator visible on mobile */
  .header-separator { display: block; }
}
</style>
