<template>
    <div class="quote-header">
        <img :src="quoteHeader" alt="Quote header" class="quote-header-image" />
        <h2 class="quote-title">{{ title }}</h2>
        <img :src="quoteHeader2" alt="Quote header" class="quote-header-image" />
    </div>
</template>

<script setup>
import quoteHeader from '@/assets/images/quote/1.svg'
import quoteHeader2 from '@/assets/images/quote/2.svg'
defineProps({
    title: {
        type: String,
        required: true,
    },
})
</script>

<style scoped>
.quote-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.quote-header-image {
    width: 100px;
    height: auto;
}

.quote-title {
    font-family: var(--font-dancing-script);
    font-size: 3rem;
    color: #d4a5a5;
    font-weight: 600;
    margin: 0;

}

@media (max-width: 768px) {
    .quote-title {
        font-size: 2.2rem;
    }
}

@media (max-width: 580px) {
    .quote-title {
        font-size: 1.5rem;
    }
    .quote-header-image {
        width: 80px;
    }
}
</style>