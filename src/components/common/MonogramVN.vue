<template>
  <svg
    class="monogram-vn"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="ariaLabel"
  >
    <g class="monogram-vn__wreath" aria-hidden="true">
      <path d="M55 26C22 48 14 92 28 129c8 22 26 40 50 49" />
      <path d="M145 26c33 22 41 66 27 103-8 22-26 40-50 49" />
      <g class="monogram-vn__flowers">
        <g
          v-for="flower in flowers"
          :key="flower.transform"
          :transform="flower.transform"
        >
          <ellipse cx="0" cy="-8" rx="5" ry="9" />
          <ellipse cx="8" cy="0" rx="9" ry="5" />
          <ellipse cx="0" cy="8" rx="5" ry="9" />
          <ellipse cx="-8" cy="0" rx="9" ry="5" />
          <circle r="3" />
        </g>
      </g>
      <path
        d="M35 51c8 4 12 11 11 20M27 86c10-2 17 2 22 10M172 150c-7-3-10-9-9-17M176 110c-7 1-12-2-15-7"
      />
      <path
        class="monogram-vn__leaf"
        d="M35 50c-10-1-15-7-15-15 9 0 15 5 15 15ZM27 87c-9 4-16 1-20-6 8-4 15-2 20 6ZM172 151c7 1 11 6 11 12-7 0-11-5-11-12ZM176 109c6-3 11-1 14 4-6 3-11 1-14-4Z"
      />
    </g>
    <g class="monogram-vn__letters">
      <text class="monogram-vn__letter monogram-vn__letter--v" x="63" y="126">
        V
      </text>
      <text class="monogram-vn__letter monogram-vn__letter--n" x="137" y="126">
        N
      </text>
      <text class="monogram-vn__ampersand" x="105" y="110">&amp;</text>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  ariaLabel: {
    type: String,
    default: "Vinh and Nguyệt monogram",
  },
});

const flowers = [
  { transform: "translate(31 34) rotate(-25) scale(0.78)" },
  { transform: "translate(21 67) rotate(18) scale(0.82)" },
  { transform: "translate(178 154) rotate(-16) scale(0.56)" },
  { transform: "translate(181 108) rotate(18) scale(0.58)" },
];
</script>

<style scoped>
.monogram-vn {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  color: var(--wedding-primary);
}

.monogram-vn__wreath {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.65;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.monogram-vn__flowers {
  fill: var(--wedding-primary-soft);
  stroke-width: 1.2;
}

.monogram-vn__flowers circle,
.monogram-vn__leaf {
  fill: var(--wedding-primary-hover);
}

.monogram-vn__letters {
  fill: currentColor;
  paint-order: stroke fill;
  stroke: rgba(255, 255, 255, 0.72);
  stroke-width: 2.2px;
  stroke-linejoin: round;
}

.monogram-vn__letter {
  font-family: "Cormorant Garamond", "Times New Roman", serif;
  font-size: 80px;
  font-style: italic;
  font-weight: 700;
  text-anchor: middle;
}

.monogram-vn__letter--v {
  transform: rotate(-3deg);
  transform-origin: 63px 126px;
}

.monogram-vn__letter--n {
  transform: rotate(3deg);
  transform-origin: 137px 126px;
}

.monogram-vn__ampersand {
  fill: var(--wedding-primary-hover);
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  text-anchor: middle;
}
</style>
