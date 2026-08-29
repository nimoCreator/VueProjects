<template>
    <div id="landing">
        <WaveAnimation position="back" delay="-1"/>

        <div class="onlyConnectLogo">
            <div class="scene">
                <div class="signet">
                    <div class="spinner">
                        <div class="drifter">
                            <onlyConnectFullCircle />
                            <onlyConnectFullCircle />
                            <onlyConnectPartCirlce />
                        </div>
                    </div>
                </div>
            </div>
            <span class="title">
                <span class="line1">Only Connect</span>
                <span class="line3">by <a href="https://nimoweb.ddns.net">nimo</a></span>
            </span>
        </div>

        <div class="options">
            <button class="accentButton" @click="goDisplay">
                <span class="material-symbols-outlined">monitor</span>
                Set this window as Display
            </button>
            <button class="ghostButton" @click="goAdmin">
                <span class="material-symbols-outlined">manage_accounts</span>
                Set this window as Admin Panel
            </button>
        </div>

        <div class="info">
            <span>Created by <a href="https://nimoweb.ddns.net">nimo</a></span>
            <span>|</span>
            <span>Version 1.0.0 ( 2025-12-31 )</span>
        </div>
    </div>
</template>

<script>

import WaveAnimation from '@/components/WaveAnimation.vue'
import onlyConnectLogo from '@/svg/onlyConnectLogo.vue'
import onlyConnectFullCircle from '@/svg/onlyConnectFullCircle.vue';
import onlyConnectPartCirlce from '@/svg/onlyConnectPartCirlce.vue';

export default {
    name: 'LandingView',
    components: {
        WaveAnimation,
        onlyConnectLogo,
        onlyConnectFullCircle,
        onlyConnectPartCirlce
    },
    methods: {
        goDisplay() {
            this.$router.push('/display')
        },
        goAdmin() {
            this.$router.push('/admin')
        }
    }
}
</script>

<style scoped>
    
#landing {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    gap: 5rem;
}

.onlyConnectLogo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 1rem;
}

.onlyConnectLogo .title {
    z-index: 200;

    color: #fff;
    font-family: 'Lato', sans-serif;
    user-select: none;

    display: flex;
    flex-direction: column;
}
.onlyConnectLogo .title .line1 {
    font-size: 5rem;
    font-weight: 900;
    letter-spacing: -0.125rem;
    text-align: start;
    margin-top: 3rem;
}
.onlyConnectLogo .title .line3 {
    font-size: 1.25rem;
    font-weight: 400;
    text-align: end;
    margin-top: -1rem;
}
.onlyConnectLogo .title .line3 a {
    color: #00aaff;
    text-decoration: none;
}
.onlyConnectLogo .title .line3 a:hover {
    text-decoration: underline;
}

/* #region Logo cirlces */
.scene {
    perspective: 1000px;
}

.signet {
    width: 200px;
    height: 200px;
    position: relative;
    transform-style: preserve-3d;

    transform: rotateX(35deg) rotateY(15deg);
}

.spinner {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
}

.drifter {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;

    animation: drift 6s ease-in-out infinite alternate;
}

.drifter svg {
    position: absolute;
    inset: 0;
    width: 200px;
    height: 200px;
    transform-origin: center;

    filter: 
        drop-shadow(0rem 1rem 1rem #f002) 
        drop-shadow(1rem 1rem 1rem #ff02)
        drop-shadow(1rem 0rem 1rem #0f02)
        drop-shadow(1rem -1rem 1rem #0ff2)
        drop-shadow(0rem -1rem 1rem #00f2)
        drop-shadow(-1rem -1rem 1rem #f0f2);

    animation: spin 4s cubic-bezier(.61,0,.51,1) calc( 0.4s - 0.4s * var(--i)) infinite;
}

.drifter svg:nth-child(1) {
    color: #285bac;

    --translateZ: -30px;
    --scale: 1.25;
    --i: 1;
}

.drifter svg:nth-child(2) {
    color: #8aaeec;

    --translateZ: 0px;
    --scale: 1.0;
    --i: 2;}

.drifter svg:nth-child(3) {
    color: #ecf9fe;

    --translateZ: 15px;
    --scale: 0.75;
    --i: 3;
}


@keyframes spin {
    0% {
        transform: translateZ(var(--translateZ)) scale(var(--scale)) rotateZ(0deg);
    }

    100% {
        transform: translateZ(var(--translateZ)) scale(var(--scale)) rotateZ(360deg);
    }
} 

@keyframes drift {
    0% {
        transform: translateX(-6px) translateY(4px) rotateX(0deg);
    }

    50% {
        transform: translateX(6px) translateY(-4px) rotateX(8deg);
    }

    100% {
        transform: translateX(-4px) translateY(6px) rotateX(-6deg);
    }
}
/* #endregion Logo cirlces */


.options {
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
.options button {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}
.options button.accentButton {
    background-color: #00aaff;
    color: #fff;

    transition: 1s;
}
.options button.accentButton:hover {
    background-color: #1abaff;
    transform: translateY(-0.25rem) scale(1.05);

    transition: 0.25s;
}
.options button.accentButton:active {
    background-color: #0288c2;
    transform: translateY(0.125rem) scale(0.95);

    transition: 0.01s;
}
.options button.accentButton .material-symbols-outlined {
    font-size: 3rem;
}


.options button.ghostButton {
    all: unset;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: fit-content;

    gap: 0.5rem;

    color: #fff;

    position: relative;

    transition: 0.25s;
}
.options button.ghostButton:hover {
    transform: translateY(-0.125rem) scale(1.01);

    transition: 0.25s;
}
.options button.ghostButton:active {
    transform: translateY(0.125rem) scale(0.99);

    transition: 0.01s;
}
.options button.ghostButton .material-symbols-outlined {
    font-size: 2rem;
}
.options button.ghostButton::after {
    content: '';
    position: absolute;
    background: #fff;

    top: 100%;
    left: 0;
    height: 0.125rem;
    width: 0;

    transition: 0.25s;
}
.options button.ghostButton:hover:after {
    width: 100%;
}


.info {
    z-index: 300;

    position: absolute;
    bottom: 1rem;
    font-size: 0.875rem;
    color: #fff;

    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}
.info a {
    color: #00aaff;
    text-decoration: none;
}
.info a:hover {
    text-decoration: underline;
}
</style>
