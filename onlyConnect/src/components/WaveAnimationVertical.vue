<template>
  <div class="waveAnimation" :style="delay ? { '--skip': delay + 's' } : {}" :class="position">
    <div v-for="(wave, index) in waves" :key="index" class="wave" :style="{ '--i': index }">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 4001 355.84" 
        :height="wave.height" 
        width="200vh" 
        preserveAspectRatio="none">

        <defs>
          <linearGradient :id="`gradient-${index}`" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" :class="`stop-color stop-color-${index}`" />
            <stop offset="100%" stop-color="transparent" />
          </linearGradient>
        </defs>

        <path 
          :fill="`url(#gradient-${index})`" 
          class="cls-1" 
          d="M4000.5,355.84V.77c-488.88,0-474.76,160.6-1000,160.6C2527.62,161.37,2524.79.5,2000.5.5V.77c-488.88,0-474.76,160.6-1000,160.6C527.62,161.37,524.79.5.5.5V355.84"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaveAnimation',
  props: {
    position: {
      type: String,
      default: 'left', // 'left' or 'right'
      validator: value => ['left', 'right'].includes(value)
    },
    delay: {
      type: Number,
      default: null 
    }
  },
  data() {
    return {
      waves: [
        { height: '90vw', moveDelay: 0, scaleDelay: 0, hueDelay: 0 },
        { height: '70vw', moveDelay: -3, scaleDelay: 0.2, hueDelay: 0.2 },
        { height: '60vw', moveDelay: -7, scaleDelay: 0.5, hueDelay: 0.5 },
        { height: '50vw', moveDelay: -3, scaleDelay: 0.6, hueDelay: 0.6 }
      ]
    };
  }
};
</script>

<style scoped>
.waveAnimation.left {
  transform: rotate(90deg);
}
.waveAnimation.right {
  transform: rotate(-90deg);
}
.wave {
  position: absolute;
  will-change: transform;
  contain: layout paint style;
  bottom: 0;
  left: 0;
}

.wave:nth-child(1) {
  animation: move_wave 4.75s linear infinite, appearspan 8s ease-out var(--skip, 4s) both;
}

.wave:nth-child(2) {
  animation: move_wave 6.5s -3s linear infinite, appearspan 8s ease-out var(--skip, 5s) both;
}

.wave:nth-child(3) {
  animation: move_wave 10s -7s linear infinite, appearspan 8s ease-out var(--skip, 6s) both;
}

.wave:nth-child(4) {
  animation: move_wave 13.5s -3s linear infinite, appearspan 8s ease-out var(--skip, 7s) both;
}

.animationsOff .wave {
  animation: none !important;
}

.wave:nth-child(1) svg {
  animation: scale_wave 13s ease-in-out infinite;
}
.wave:nth-child(2) svg {
  animation: scale_wave 8s ease-in-out infinite;
}
.wave:nth-child(3) svg {
  animation: scale_wave 6.5s ease-in-out infinite;
}
.wave:nth-child(4) svg {
  animation: scale_wave 9s ease-in-out infinite;
}
.animationsOff .wave svg {
  animation: none !important;
}

.wave svg {
  transform-origin: bottom center;
}

@keyframes move_wave {
  0% {
    transform: translateX(-150vh);
  }
  100% {
    transform: translateX(-50vh);
  }
}

@keyframes scale_wave {
  0%, 100% {
    transform: scaleY(0.2);
  }
  50% {
    transform: scaleY(0.1);
  }
}

/*  #region ANIMATION OFF */

.stop-color-0 {
  animation: color_wave 4.1s linear -4.1s infinite;
}

.stop-color-1 {
  animation: color_wave 4.1s linear -4s infinite;
}

.stop-color-2 {
  animation: color_wave 4.1s linear -3.9s infinite;
}

.stop-color-3 {
  animation: color_wave 4.1s linear -3.8s infinite;
}

.animationsOff .stop-color {
  animation: none !important;
}

@keyframes color_wave {
  0%   { stop-color: #00aaff66; }
  10%  { stop-color: #00ffaa66; }
  20%  { stop-color: #00ff5566; }
  30%  { stop-color: #55ff0066; }
  40%  { stop-color: #aaff0066; }
  50%  { stop-color: #ffff0066; }
  60%  { stop-color: #ffaa0066; }
  70%  { stop-color: #ff550066; }
  80%  { stop-color: #ff005566; }
  90%  { stop-color: #aa00ff66; }
  100% { stop-color: #00aaff66; }
}

@keyframes appearspan {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


.animationsOff .wave {
  transform: translateX(calc( -25vw * var(--i))); 
  opacity: 1; 
}

.animationsOff .wave svg {
  transform: scaleY(0.1);
}

.animationsOff .stop-color-0 {
  stop-color: #0066ff44; 
}
.animationsOff .stop-color-1 {
  stop-color: #00aaff88; 
}
.animationsOff .stop-color-2 {
  stop-color: #00c8ff44; 
}
.animationsOff .stop-color-3 {
  stop-color: #00ddff22; 
}

/* #endregion ANIMATION OFF */

</style>