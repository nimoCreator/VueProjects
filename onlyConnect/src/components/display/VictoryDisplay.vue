<template>
    <div
        id="victoryScreen"
        :style="{
            '--winnerColor': winner.color,
            '--loserColor': loser.color
        }"
    >
        <!-- 🔥 FIREWORKS BACKGROUND -->
        <canvas ref="fireworks" class="fireworksCanvas"></canvas>

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

        <div class="winner">
            <div class="crown">👑</div>

            <h1 class="winnerName">
                {{ winner.name }}
            </h1>

            <div class="winnerMembers">
                <div
                    v-for="(member, i) in winner.members"
                    :key="i"
                    class="member"
                >
                    <img :src="prepPfp(member.pfp)" />
                    <span>{{ member.name }}</span>
                </div>
            </div>

            <div class="winnerScore">
                {{ winner.score }}
            </div>
        </div>

        <div class="loser">
            <h2 class="loserName">
                {{ loser.name }}
            </h2>

            <div class="loserMembers">
                <div
                    v-for="(member, i) in loser.members"
                    :key="i"
                    class="member"
                >
                    <img :src="prepPfp(member.pfp)" />
                </div>
            </div>

            <div class="loserScore">
                {{ loser.score }}
            </div>
        </div>
    </div>
</template>

<script>
import { useGameStore } from '@/js/stores/gameStore.js'
import onlyConnectFullCircle from '@/svg/onlyConnectFullCircle.vue'
import onlyConnectPartCirlce from '@/svg/onlyConnectPartCirlce.vue'

export default {
    name: 'VictoryScreen',

    components: {
        onlyConnectFullCircle,
        onlyConnectPartCirlce
    },

    data() {
        return {
            store: useGameStore(),
            ctx: null,
            particles: [],
            raf: null
        }
    },

    computed: {
        winner() {
            return this.store.teamLeft.score >= this.store.teamRight.score
                ? this.store.teamLeft
                : this.store.teamRight
        },
        loser() {
            return this.store.teamLeft.score < this.store.teamRight.score
                ? this.store.teamLeft
                : this.store.teamRight
        }
    },

    mounted() {
        this.initFireworks()
    },

    beforeUnmount() {
        cancelAnimationFrame(this.raf)
        window.removeEventListener('resize', this.resizeCanvas)
    },

    methods: {
        prepPfp(pfp) {
            if (!pfp) return `/img/pfp/default.png`
            if (pfp.startsWith('http')) return pfp
            return `/img/pfp/${pfp}`
        },

        /* ================= FIREWORKS ================= */

        initFireworks() {
            const canvas = this.$refs.fireworks
            this.ctx = canvas.getContext('2d')

            this.resizeCanvas()
            window.addEventListener('resize', this.resizeCanvas)

            setInterval(this.spawnFirework, 900)
            this.animate()
        },

        resizeCanvas() {
            const canvas = this.$refs.fireworks
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        },

        spawnFirework() {
            const x = Math.random() * window.innerWidth
            const y = Math.random() * window.innerHeight * 0.4 + 80
            const count = 60

            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2
                const speed = Math.random() * 4 + 2

                this.particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 100,
                    alpha: 1
                })
            }
        },

        animate() {
            const ctx = this.ctx
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

            const [r, g, b] = this.hexToRgb(this.winner.color)

            this.particles.forEach(p => {
                p.x += p.vx
                p.y += p.vy
                p.vy += 0.04
                p.life--
                p.alpha -= 0.01

                ctx.beginPath()
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`
                ctx.fill()
            })

            this.particles = this.particles.filter(p => p.life > 0)
            this.raf = requestAnimationFrame(this.animate)
        },

        hexToRgb(hex) {
            const n = parseInt(hex.replace('#', ''), 16)
            return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
        }
    }
}
</script>

<style scoped>

.fireworksCanvas {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
}

#victoryScreen {
    height: 100vh;
    width: 100vw;

    display: grid;
    grid-template-columns: 1fr 0.6fr;

    background:
        radial-gradient(circle at center,
            color-mix(in srgb, var(--winnerColor) 25%, #000),
            #000 70%);

    overflow: hidden;
}

/* #region WINNER */

.winner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 2rem;

    text-align: center;

    animation: winnerEnter 20s cubic-bezier(.2,.8,.2,1);
}

@keyframes winnerEnter {
    from {
        opacity: 0;
        transform: scale(0.8) translateY(10rem);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.crown {
    font-size: 6rem;
    filter: drop-shadow(0 0 2rem var(--winnerColor));
}

.winnerName {
    font-size: 4rem;
    font-weight: 900;
    letter-spacing: 0.25em;
    text-transform: uppercase;

    color: white;

    text-shadow:
        0 0 2rem var(--winnerColor),
        0 0 4rem var(--winnerColor);
}

.winnerMembers {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
}

.winnerMembers .member {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.winnerMembers img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    object-fit: cover;

    border: 3px solid white;

    box-shadow:
        0 0 2rem var(--winnerColor),
        inset 0 0 1rem var(--winnerColor);
}

.winnerMembers span {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
}

.winnerScore {
    font-size: 2.5rem;
    font-weight: 800;

    color: white;
    text-shadow: 0 0 2rem var(--winnerColor);
}

/* #endregion WINNER */

/* #region LOSER */

.loser {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 1.5rem;

    opacity: 0.35;
    filter: grayscale(1);

    animation: loserEnter 20s ease;
}

@keyframes loserEnter {
    from {
        opacity: 0;
        transform: translateX(-5rem);
    }
    to {
        opacity: 0.35;
        transform: translateX(0);
    }
}

.loserName {
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;

    color: white;
}

.loserMembers {
    display: flex;
    gap: 0.75rem;
}

.loserMembers img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;

    border: 2px solid var(--loserColor);
}

.loserScore {
    font-size: 1.4rem;
    font-weight: 600;
    color: white;
}

/* #endregion LOSER */

/* #region ONLY CONNECT LOGO */

.onlyConnectLogo {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 1rem;

    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
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
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: -0.125rem;
    text-align: start;
    margin-top: 3rem;
}
.onlyConnectLogo .title .line3 {
    font-size: 1.25rem;
    font-weight: 400;
    text-align: end;
    margin-top: -0.5rem;
}
.onlyConnectLogo .title .line3 a {
    color: #00aaff;
    text-decoration: none;
}
.onlyConnectLogo .title .line3 a:hover {
    text-decoration: underline;
}

/* #endregion ONLY CONNECT LOGO */


/* #region Logo cirlces */
.scene {
    perspective: 1000px;
}

.signet {
    width: 100px;
    height: 100px;
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
    width: 100px;
    height: 100px;
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

    --translateZ: -10px;
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

    --translateZ: 5px;
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

</style>
