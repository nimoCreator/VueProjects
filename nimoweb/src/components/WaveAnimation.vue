<template>
  <div class="waveAnimation">
    <div v-for="(wave, index) in waves" :key="index" class="wave">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 4001 355.84" 
        width="200vw" 
        :height="wave.height" 
        preserveAspectRatio="none">

        <linearGradient :id="`gradient-${index}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#00AAFF66" />
          <stop offset="100%" stop-color="#00AAFF00" />
        </linearGradient>

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
      default: 'back', // 'back' or 'front'
      validator: value => ['back', 'front'].includes(value)
    }
  },
  data() {
    return {
      waves: [
        { height: this.position === 'front' ? '70vh' : '180vh', moveDelay: 0, scaleDelay: 0, hueDelay: 0 },
        { height: this.position === 'front' ? '60vh' : '140vh', moveDelay: -3, scaleDelay: 0.2, hueDelay: 0.2 },
        { height: this.position === 'front' ? '50vh' : '120vh', moveDelay: -7, scaleDelay: 0.5, hueDelay: 0.5 },
        { height: this.position === 'front' ? '40vh' : '100vh', moveDelay: -3, scaleDelay: 0.6, hueDelay: 0.6 }
      ]
    };
  }
};
</script>

<style scoped>

.wave {
  position: absolute;
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

.wave:nth-child(1) svg {
  animation: scale_wave 13s ease-in-out infinite, hue_wave 4.1s linear 0.0s infinite;
}

.wave:nth-child(2) svg {
  animation: scale_wave 8s ease-in-out infinite, hue_wave 4.1s linear 0.2s infinite;
}

.wave:nth-child(3) svg {
  animation: scale_wave 6.5s ease-in-out infinite, hue_wave 4.1s linear 0.5s infinite;
}

.wave:nth-child(4) svg {
  animation: scale_wave 9s ease-in-out infinite, hue_wave 4.1s linear 0.6s infinite;
}

.wave svg {
  transform-origin: bottom center;
}

@keyframes move_wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100vw);
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

@keyframes hue_wave {
  0% {
    filter: hue-rotate(0);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

@keyframes appearspan {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>