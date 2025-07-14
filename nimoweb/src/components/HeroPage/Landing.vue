<template>
    <div id="landing">

        <WaveAnimation position="back" />
        <div class="logo">
            <span v-for="(ringColor, i) in ringColors" :key="i" :style="{ '--i' : i, 'background': ringColor }"></span>
            <nimoLogo style="color: var(--white, #fafafa);" />
        </div>
        <div id="slogan">
            <span>{{ $t('slogan.welcome') }}</span>
            <span>{{ $t('slogan.to') }}</span>
            <nimowebLogo style="color: var(--white, #fafafa);" />
        </div>
        <!-- <a id="scrolldown">
            <span>{{ $t('slogan.scroll') }}</span>
            <arrowDownIcon />
        </a> -->
        <div class="animationSwitch" @click="toggleAnimations">
            <span class="icon material-symbols-outlined">animation</span>
            <span class="cross material-symbols-outlined">pen_size_2</span>
        </div>
    </div>
</template>

<script>

import nimowebLogo from '@/assets/svg/nimowebLogo.vue';
import nimoLogo from '@/assets/svg/nimoLogo.vue';
import arrowDownIcon from '@/assets/svg/arrowDownIcon.vue';
import WaveAnimation from '@/components/HeroPage/WaveAnimation.vue';

import { useAppSettingsStore } from '@/assets/js/stores/appSettingsStore.js'
import { mapStores } from 'pinia'

export default {
    name: 'Landing',
    components: {
        nimowebLogo,
        nimoLogo,
        arrowDownIcon,
        WaveAnimation
    },
    data() {
        return {
            ringColors: [
                '#00aaff',
                '#00bbee',
                '#00ccdd',
                '#00ddcc',
                '#00eebb',
            ]
        };
    },
    computed: {
        ...mapStores(useAppSettingsStore),
        animationsEnabled() {
            return this.appSettingsStore.animations
        }
    },
    methods: {
        toggleAnimations() {
            this.appSettingsStore.animations = !this.appSettingsStore.animations
        }
    }
};
</script>

<style scoped>
/* #region LANDING */

#landing {
    --blurMultiplayer: 0;

    height: 100vh;
    height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;

    background-color: var(--black, #000);
    background: linear-gradient(135deg, var(--black) 0%, var(--darkDark) 100%);
}

/* #region scrollDown */

#scrolldown {
    animation: appear 2s cubic-bezier(.5, .75, .50, .99) var(--skip, 10s) both;

    position: absolute;
    padding: 0.5rem 2rem;
    bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;

    background: var(--darkDark);
    border-radius: 2rem;
    box-shadow: 0 4px 30px var(--black, #000000);
    outline: 0.0625rem solid var(--darkLight);

    color: var(--lightLight);
    font-weight: 700;

    transition: 0.4s 0.2s;
}

#scrolldown:hover {
    transform: scale(1.1);
    transition: 0.2s;
}

#scrolldown:active {
    transform: scale(0.9);
    transition: 0.05s;
}

#scrolldown svg {
    top: 100%;
    position: absolute;
    width: 3rem;
    height: 2rem;
    animation: scrolldown 1.4s ease-in-out infinite;
    color: var(--lightLight);
}

.animationsOff #scrolldown {
    animation: none !important;
}

.animationsOff #scrolldown svg {
    animation: none !important;
}

@keyframes scrolldown {

    0%,
    100% {
        transform: translateY(0rem);
    }

    50% {
        transform: translateY(-0.5rem);
    }
}

/* #endregion scrollDown */

/* #region animationSwitch */

.animationSwitch {
    animation: appear 0.5s cubic-bezier(.5, .75, .50, .99) 1s backwards;

    position: absolute;
    padding: 0.5rem;
    bottom: 2.5rem;
    right: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;

    background: var(--panelBackground);
    border-radius: 2rem;
    box-shadow: 0 4px 30px var(--black, #000000);
    outline: 0.0625rem solid var(--darkLight);

    color: var(--lightLight);
    font-weight: 700;

    transition: transform 0.4s 0.2s;
}
.animationSwitch:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
}
.animationSwitch:active {
    transform: scale(0.9);
    transition: transform 0.05s;
}
.animationSwitch .icon {
    color: var(--lightDark);
    transition: 0.2s;
}
.animationsOff .animationSwitch .icon {
    color: var(--grayDark);
}

.animationSwitch .cross {
    position: absolute;
    transform: rotate(90deg);
    font-size: 0rem;
    color: var(--panelTextColor);
    transition: 0.2s;
}
.animationsOff .animationSwitch .cross {
    font-size: 2rem;
}

/* #endregion animationSwitch */

/* #region logo */

.logo {
    position: relative;
    display: flex;
    width: min-content;
    margin-inline: auto;

    animation: appearlogo 1.8s cubic-bezier(.5, .75, .50, .99) forwards;
}

@keyframes appearlogo {
    0% {
        opacity: 0;
    }

    1% {
        transform: scale(2);
    }

    100% {
        opacity: 1;
    }
}

.logo svg {
    position: relative;
    height: calc(45 * var(--minUnit));
}

.logo span {
    position: absolute;
    height: calc(45 * var(--minUnit));
    width: calc(45 * var(--minUnit));
    border-radius: 42.5% 50% 50% 50%;
    border: 1px solid black;
    border-width: 0px 1px 1px 0px;
    opacity: 0.5;

    background: #00aaff;
    will-change: transform;

    animation: spin 2s cubic-bezier(.25, 0.01, .75, .99) calc( 0.4s - 0.1s * var(--i)) infinite, huespin 4.1s linear calc( 0.1s + 0.1s * var(--i)) infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, calc( 1.2s - 0.2s * var(--i))) both;
}

/* .logo span:nth-child(1) {
    animation: spin 2s cubic-bezier(.25, 0.01, .75, .99) 0.4s infinite, huespin 4.1s linear 0.1s infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, 1.2s) both;
}

.logo span:nth-child(2) {
    animation: spin 2s cubic-bezier(.25, 0.01, .75, .99) 0.3s infinite, huespin 4.1s linear 0.2s infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, 1.0s) both;
}

.logo span:nth-child(3) {
    animation: spin 2s cubic-bezier(.25, 0.01, .75, .99) 0.2s infinite, huespin 4.1s linear 0.3s infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, 0.8s) both;
}

.logo span:nth-child(4) {
    animation: spin 2s cubic-bezier(.25, 0.01, .75, .99) 0.1s infinite, huespin 4.1s linear 0.4s infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, 0.7s) both;
}

.logo span:nth-child(5) {
    animation: spin 2s cubic-bezier(.25, 0.01, .75, .99) 0.0s infinite, huespin 4.1s linear 0.5s infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, 0.6s) both;
} */

.animationsOff .logo span {
    animation: none !important;

    transform: rotate(calc( 20deg * var(--i) - 40deg));
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes appearspan {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 0.5;
    }
}

@keyframes huespin {
    0%   { background: #00aaff; }
    10%  { background: #00ffaa; }
    20%  { background: #00ff55; }
    30%  { background: #55ff00; }
    40%  { background: #aaff00; }
    50%  { background: #ffff00; }
    60%  { background: #ffaa00; }
    70%  { background: #ff5500; }
    80%  { background: #ff0055; }
    90%  { background: #aa00ff; }
    100% { background: #00aaff; }
}


/* @keyframes huespin1 {
    0% {
        filter: hue-rotate(0) blur(calc(var(--blurMultiplayer) * 4rem));
    }

    100% {
        filter: hue-rotate(360deg) blur(calc(var(--blurMultiplayer) * 4rem));
    }
}
@keyframes huespin2 {
    0% {
        filter: hue-rotate(0) blur(calc(var(--blurMultiplayer) * 3rem));
    }

    100% {
        filter: hue-rotate(360deg) blur(calc(var(--blurMultiplayer) * 3rem));
    }
}
@keyframes huespin3 {
    0% {
        filter: hue-rotate(0) blur(calc(var(--blurMultiplayer) * 2rem));
    }

    100% {
        filter: hue-rotate(360deg) blur(calc(var(--blurMultiplayer) * 2rem));
    }
}
@keyframes huespin4 {
    0% {
        filter: hue-rotate(0) blur(calc(var(--blurMultiplayer) * 1rem));
    }

    100% {
        filter: hue-rotate(360deg) blur(calc(var(--blurMultiplayer) * 1rem));
    }
}
@keyframes huespin5 {
    0% {
        filter: hue-rotate(0) blur(calc(var(--blurMultiplayer) * 0.5rem));
    }

    100% {
        filter: hue-rotate(360deg) blur(calc(var(--blurMultiplayer) * 0.5rem));
    }
} */

#slogan {
    color: #FFFFFF;
    padding-top: calc(4 * var(--minUnit));
    font-weight: 300;

    display: flex;
    justify-content: center;
    gap: 0.75rem
}

#slogan * {
    font-size: calc(9 * var(--minUnit));
    line-height: calc(10 * var(--minUnit));
}

#slogan *:nth-child(1) {
    animation: appear 2s cubic-bezier(.5, .75, .50, .99) var(--skip, 1.5s) both;
}

#slogan *:nth-child(2) {
    animation: appear 1.8s cubic-bezier(.5, .75, .50, .99) var(--skip, 2s) both;
}

#slogan *:nth-child(3) {
    animation: appear 2.4s cubic-bezier(.5, .75, .50, .99) var(--skip, 2.5s) both;
}

.animationsOff #slogan * {
    animation: none !important;
}

#slogan svg {
    height: calc(11.2 * var(--minUnit));
    width: 100%;
}

@keyframes appear {
    0% {
        opacity: 0;
        transform: scale(1.2);
    }

    100% {
        opacity: 1;
    }
}

/* #endregion logo */



/* #endregion LANDING */
</style>