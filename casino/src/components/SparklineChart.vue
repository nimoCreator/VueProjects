<template>
  <div class="spark" :class="{ empty: values.length < 2 }">
    <svg
      class="svg"
      :viewBox="`0 0 ${width} ${height}`"
      preserveAspectRatio="none"
      role="img"
      :aria-label="label"
    >
      <defs>
        <linearGradient :id="lineGradId" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="rgba(255, 0, 76, 0.95)" />
          <stop offset="1" stop-color="rgba(255, 212, 106, 0.95)" />
        </linearGradient>
        <linearGradient :id="areaGradId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgba(255, 0, 76, 0.20)" />
          <stop offset="1" stop-color="rgba(255, 212, 106, 0.06)" />
        </linearGradient>
        <filter :id="glowId" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.9 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path v-if="values.length >= 2" class="area" :d="areaD" :fill="`url(#${areaGradId})`" />
      <path
        v-if="values.length >= 2"
        class="line"
        :d="lineD"
        :stroke="`url(#${lineGradId})`"
        :filter="`url(#${glowId})`"
      />
      <circle
        v-if="values.length >= 2"
        class="dot"
        :cx="lastPoint.x"
        :cy="lastPoint.y"
        r="3.2"
      />
    </svg>

    <div v-if="values.length < 2" class="emptyText muted">Brak danych do wykresu</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { randomId } from '../utils/crypto.js'

const props = defineProps({
  values: { type: Array, default: () => [] },
  label: { type: String, default: 'Wykres' },
  width: { type: Number, default: 320 },
  height: { type: Number, default: 92 },
  padding: { type: Number, default: 10 },
})

const uid = randomId()
const lineGradId = `spark-line-${uid}`
const areaGradId = `spark-area-${uid}`
const glowId = `spark-glow-${uid}`

const stats = computed(() => {
  const v = props.values.map((x) => Number(x)).filter((x) => Number.isFinite(x))
  if (v.length < 2) return null
  let min = v[0]
  let max = v[0]
  for (const n of v) {
    if (n < min) min = n
    if (n > max) max = n
  }
  if (min === max) {
    const bump = Math.max(1, Math.abs(min) * 0.05)
    min -= bump
    max += bump
  }
  return { min, max, values: v }
})

const points = computed(() => {
  if (!stats.value) return []
  const { min, max, values } = stats.value
  const n = values.length
  const pad = props.padding
  const w = props.width
  const h = props.height
  const iw = w - pad * 2
  const ih = h - pad * 2
  const denom = Math.max(1e-9, max - min)
  return values.map((val, i) => {
    const x = pad + (n === 1 ? 0 : (i * iw) / (n - 1))
    const t = (val - min) / denom
    const y = pad + (1 - t) * ih
    return { x, y }
  })
})

const lineD = computed(() => {
  const pts = points.value
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i += 1) d += ` L ${pts[i].x} ${pts[i].y}`
  return d
})

const areaD = computed(() => {
  const pts = points.value
  if (pts.length < 2) return ''
  const pad = props.padding
  const h = props.height
  let d = `M ${pts[0].x} ${h - pad} L ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i += 1) d += ` L ${pts[i].x} ${pts[i].y}`
  d += ` L ${pts[pts.length - 1].x} ${h - pad} Z`
  return d
})

const lastPoint = computed(() => points.value[points.value.length - 1] ?? { x: props.padding, y: props.height - props.padding })
</script>

<style scoped>
.spark {
  position: relative;
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(255, 183, 3, 0.14);
  background:
    radial-gradient(420px 240px at 25% 10%, rgba(255, 0, 76, 0.20), transparent 55%),
    radial-gradient(420px 240px at 80% 90%, rgba(255, 212, 106, 0.14), transparent 55%),
    linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.18));
  overflow: hidden;
}

.svg {
  width: 100%;
  height: 110px;
  display: block;
}

.line {
  fill: none;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.area {
  opacity: 0.95;
}

.dot {
  fill: rgba(255, 212, 106, 0.95);
  stroke: rgba(0,0,0,0.35);
  stroke-width: 1;
}

.emptyText {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 12px;
}
</style>

