<template>
    <div id="landing">

        <WaveAnimation position="back" />
        <div class="logo">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <nimoLogo style="color: var(--white, #fafafa);" />
        </div>
        <div id="slogan">
            <span>Welcome</span> <span>to</span>
            <nimowebLogo style="color: var(--white, #fafafa);" />
        </div>
        <a href="#korepetycje" id="scrolldown">
            <span>
                Scroll down
            </span>
            <arrowDownIcon />
        </a>
    </div>
</template>

<script>

import nimowebLogo from '@/assets/svg/nimowebLogo.vue';
import nimoLogo from '@/assets/svg/nimoLogo.vue';
import arrowDownIcon from '@/assets/svg/arrowDownIcon.vue';
import WaveAnimation from '@/components/WaveAnimation.vue';
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
        };
    },
    methods: {
    }
};
</script>

<style scoped>
/* #region LANDING */

#landing {
    height: 100vh;
    height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;

    background-color: var(--dark, #181818);
}

#scrolldown {
    animation: appear 2s cubic-bezier(.5, .75, .50, .99) 10s backwards;

    position: absolute;
    padding: 0.5rem 2rem 2rem 2rem;
    bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;

    background: var(--white, #fafafa);
    border-radius: 0.5rem;
    box-shadow: 0 4px 30px var(--black, #000000);
    outline: 0.1rem solid #FFFa;

    color: var(--black);

    transition: transform 0.4s 0.2s;
}

#scrolldown:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
}

#scrolldown svg {
    bottom: 0;
    position: absolute;
    width: 3rem;
    height: 2rem;
    animation: scrolldown 1.4s ease-in-out infinite;
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
    height: min(45vh, 45vw);
}

.logo span {
    position: absolute;
    height: min(45vh, 45vw);
    width: min(45vh, 45vw);
    border-radius: 50%;
    background: -webkit-radial-gradient(bottom right, #00000000, #00000000 70%, #00AAFF 71%, #00AAFF);
    background: -moz-radial-gradient(bottom right, #00000000, #00000000 70%, #00AAFF 71%, #00AAFF);
    background: radial-gradient(to top left, #00000000, #00000000 70%, #00AAFF 71%, #00AAFF);
}

.logo span:nth-child(1) {
    animation: spin 2s cubic-bezier(.5, 0.01, .5, .99) 0.3s infinite, huespin1 4.1s linear 0.1s infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, 1.2s) both;
}

.logo span:nth-child(2) {
    animation: spin 2s cubic-bezier(.5, 0.01, .5, .99) 0.2s infinite, huespin2 4.1s linear 0.2s infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, 1.0s) both;
}

.logo span:nth-child(3) {
    animation: spin 2s cubic-bezier(.5, 0.01, .5, .99) 0.1s infinite, huespin3 4.1s linear 0.3s infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, 0.8s) both;
}

.logo span:nth-child(4) {
    animation: spin 2s cubic-bezier(.5, 0.01, .5, .99) 0.05s infinite, huespin4 4.1s linear 0.4s infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, 0.7s) both;
}

.logo span:nth-child(5) {
    animation: spin 2s cubic-bezier(.5, 0.01, .5, .99) 0.0s infinite, huespin5 4.1s linear 0.5s infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, 0.6s) both;
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
        opacity: 1;
    }
}

@keyframes huespin1 {
    0% {
        filter: hue-rotate(0) blur(4rem);
    }

    100% {
        filter: hue-rotate(360deg) blur(4rem);
    }
}

@keyframes huespin2 {
    0% {
        filter: hue-rotate(0) blur(3rem);
    }

    100% {
        filter: hue-rotate(360deg) blur(3rem);
    }
}

@keyframes huespin3 {
    0% {
        filter: hue-rotate(0) blur(2rem);
    }

    100% {
        filter: hue-rotate(360deg) blur(2rem);
    }
}

@keyframes huespin4 {
    0% {
        filter: hue-rotate(0) blur(1rem);
    }

    100% {
        filter: hue-rotate(360deg) blur(1rem);
    }
}

@keyframes huespin5 {
    0% {
        filter: hue-rotate(0) blur(0.5rem);
    }

    100% {
        filter: hue-rotate(360deg) blur(0.5rem);
    }
}

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

/* #endregion LANDING */
</style>