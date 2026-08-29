<template>
    <div class="view teamsView" :style="{
        '--leftTeamColor': store.teamLeft.color,
        '--rightTeamColor': store.teamRight.color
    }">
        <div id="teamLeft" class="team" :style="{ '--teamColor': store.teamLeft.color }">
            <h1 class="teamName">{{ store.teamLeft.name }}</h1>

            <div class="members">
                <div v-for="(member, index) in store.teamLeft.members" :key="index" class="member">
                    <img v-if="member.pfp" :src="prepPfp(member.pfp)">
                    <span>{{ member.name }}</span>
                </div>
            </div>

            <div class="score" :class="{ scorePulse: scorePulseLeft }">
                <span class="label">Score</span>
                <span class="value">{{ store.teamLeft.score ?? 0 }}</span>
                <span v-if="scoreDeltaLeft !== null" class="scoreDelta">
                    {{ scoreDeltaLeft > 0 ? '+' : '' }}{{ scoreDeltaLeft }}
                </span>

            </div>
        </div>

        <div class="divider">
            <WaveAnimationVertical position="left" :delay="-2" />
            <WaveAnimationVertical position="right" :delay="-30" />
            <span class="vs">VS</span>
            <div class="rectangle"></div>
        </div>

        <div id="teamRight" class="team" :style="{ '--teamColor': store.teamRight.color }">
            <h1 class="teamName">{{ store.teamRight.name }}</h1>

            <div class="members">
                <div v-for="(member, index) in store.teamRight.members" :key="index" class="member">
                    <img v-if="member.pfp" :src="prepPfp(member.pfp)">
                    <span>{{ member.name }}</span>
                </div>
            </div>

            <div class="score" :class="{ scorePulse: scorePulseRight }">
                <span class="label">Score</span>
                <span class="value">{{ store.teamRight.score ?? 0 }}</span>
                <span v-if="scoreDeltaRight !== null" class="scoreDelta">
                    {{ scoreDeltaRight > 0 ? '+' : '' }}{{ scoreDeltaRight }}
                </span>


            </div>
        </div>
    </div>
</template>


<script>
import { useGameStore } from '@/js/stores/gameStore.js'
import WaveAnimationVertical from '../WaveAnimationVertical.vue';

export default {
    name: 'TeamsDisplay',

    components: {
        WaveAnimationVertical
    },

    data() {
        return {
            store: useGameStore(),

            prevLeftScore: 0,
            prevRightScore: 0,

            scorePulseLeft: false,
            scorePulseRight: false,

            scoreDeltaLeft: null,
            scoreDeltaRight: null,
        }
    },
    watch: {
        'store.teamLeft.score'(newVal) {
            const diff = newVal - this.prevLeftScore
            if (diff !== 0) {
                this.triggerScorePulse('left', diff)
            }
            this.prevLeftScore = newVal
        },

        'store.teamRight.score'(newVal) {
            const diff = newVal - this.prevRightScore
            if (diff !== 0) {
                this.triggerScorePulse('right', diff)
            }
            this.prevRightScore = newVal
        }
    },
    methods: {
        triggerScorePulse(side, diff) {
            const pulseFlag = side === 'left'
                ? 'scorePulseLeft'
                : 'scorePulseRight'

            const deltaFlag = side === 'left'
                ? 'scoreDeltaLeft'
                : 'scoreDeltaRight'

            // reset to allow retrigger
            this[pulseFlag] = false
            this[deltaFlag] = diff

            requestAnimationFrame(() => {
                this[pulseFlag] = true
            })

            setTimeout(() => {
                this[pulseFlag] = false
                this[deltaFlag] = null
            }, 1250)
        },

        prepPfp(pfp) {
            if (!pfp) return `/img/pfp/default.png`

            if (pfp.startsWith('http://') || pfp.startsWith('https://')) {
                return pfp
            }
            return `/img/pfp/${pfp}`
        },
    },

}
</script>



<style scoped>
.teamsView {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: radial-gradient(circle at center, #111 0%, #000 70%);
}

/* #region TEAM PANELS */

.team {
    position: relative;
    padding: 3rem 4rem;
    display: grid;
    grid-template-rows: 0px 1fr auto;
    gap: 2.5rem;

    background:
        linear-gradient(135deg,
            color-mix(in srgb, var(--teamColor) 5%, transparent),
            transparent),
        radial-gradient(circle at top,
            color-mix(in srgb, var(--teamColor) 15%, transparent),
            transparent 70%);

    box-shadow:
        inset 0 0 120px color-mix(in srgb, var(--teamColor) 40%, transparent);
}

#teamRight {
    text-align: right;
}

/* #endregion TEAM PANELS */

/* #region TEAM NAME */

.teamName {
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;

    display: flex;
    align-items: center;


    color: white;
    text-shadow:
        0 0 20px color-mix(in srgb, var(--teamColor) 50%, white),
        0 0 40px color-mix(in srgb, var(--teamColor) 60%, transparent);
}

#teamRight .teamName {
    justify-content: flex-end;
    background: green;
}

/* #endregion TEAM NAME */

/* #region MEMBERS */

.members {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
}

.member {
    display: flex;
    align-items: center;
    gap: 1rem;

    padding: 0.25rem;
    border-radius: 10rem 0 0 10rem;

    background:
        linear-gradient(to right,
            color-mix(in srgb, var(--teamColor) 25%, transparent),
            transparent);
}



#teamRight .member {
    border-radius: 0 10rem 10rem 0;
    flex-direction: row-reverse;
    background:
        linear-gradient(to left,
            color-mix(in srgb, var(--teamColor) 25%, transparent),
            transparent);
}

.member img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;

    border: 2px solid color-mix(in srgb, var(--teamColor) 70%, white);

    box-shadow:
        0 0 15px color-mix(in srgb, var(--teamColor) 70%, transparent);
}

.member span {
    font-size: 1.2rem;
    font-weight: 500;
    color: white;
}

/* #endregion MEMBERS */

/* #region SCORE */

.score {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 6rem;
}

#teamRight .score {
    justify-self: end;
}

.score .label {
    font-size: 1rem;
    font-weight: 500;

    color: white;
    text-shadow:
        0 0 10px color-mix(in srgb, var(--teamColor) 50%, white),
        0 0 20px color-mix(in srgb, var(--teamColor) 30%, transparent);
}

.score .value {
    margin-top: auto;

    font-size: 5rem;
    font-weight: 600;

    color: white;
    text-shadow:
        0 0 10px color-mix(in srgb, var(--teamColor) 70%, white),
        0 0 20px color-mix(in srgb, var(--teamColor) 50%, transparent);
}

.score .value {
    position: relative;
    transition: transform 0.2s ease;
}

.scorePulse .value {
    animation: scorePop 1.25s ease-in-out forwards;
}

@keyframes scorePop {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.35);
            text-shadow:
        0 0 20px color-mix(in srgb, var(--teamColor) 70%, white),
        0 0 40px color-mix(in srgb, var(--teamColor) 80%, transparent);
    }

    100% {
        transform: scale(1);
    }
}

.scoreDelta {
    position: absolute;

    font-size: 3rem;
    font-weight: 700;
    color: white;

    animation: floatUp 0.9s ease-out forwards;
}

@keyframes floatUp {
    0% {
        opacity: 0;
        transform: translate(0, 0) scale(0.5);
    }
    10% {
        opacity: 1;
        transform: translateY(-4rem) scale(1.5);
                    text-shadow:
        0 0 20px color-mix(in srgb, var(--teamColor) 70%, white),
        0 0 40px color-mix(in srgb, var(--teamColor) 80%, transparent);
    }
    
    100% {
        opacity: 0;
        transform: translateY(-10rem) scale(1.5);
    }
}


/* #endregion SCORE */

/* #region VS CENTER */

.divider {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
}

.divider .vs {
    z-index: 100;

    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 5rem;
    font-weight: 900;
    letter-spacing: -0.3rem;

    color: white;
    text-shadow:
        1rem 0 1rem var(--rightTeamColor),
        -1rem 0 1rem var(--leftTeamColor);

    --floatyScale: 0.5rem;
    animation: shadowPulse 3s ease-in-out 0s infinite, floaty 11s ease-in-out 0s infinite;
}

@keyframes shadowPulse {

    0%,
    100% {
        text-shadow:
            1rem 0 1rem var(--rightTeamColor),
            -1rem 0 1rem var(--leftTeamColor);
    }

    50% {
        text-shadow:
            1.5rem 0 2rem var(--rightTeamColor),
            -1.5rem 0 2rem var(--leftTeamColor);
    }
}

@keyframes floaty {
    0% {
        transform: translate(0, 0);
    }

    5% {
        transform: translate(calc(var(--floatyScale) * 1),
                calc(var(--floatyScale) * -1));
    }

    10% {
        transform: translate(calc(var(--floatyScale) * -0.8),
                calc(var(--floatyScale) * 0.9));
    }

    15% {
        transform: translate(calc(var(--floatyScale) * 0.4),
                calc(var(--floatyScale) * 0.2));
    }

    22% {
        transform: translate(calc(var(--floatyScale) * -0.3),
                calc(var(--floatyScale) * -0.7));
    }

    30% {
        transform: translate(calc(var(--floatyScale) * 0.9),
                calc(var(--floatyScale) * -0.2));
    }

    38% {
        transform: translate(calc(var(--floatyScale) * -1),
                calc(var(--floatyScale) * 0.4));
    }

    47% {
        transform: translate(calc(var(--floatyScale) * 0.2),
                calc(var(--floatyScale) * 1));
    }

    55% {
        transform: translate(calc(var(--floatyScale) * -0.6),
                calc(var(--floatyScale) * -0.4));
    }

    65% {
        transform: translate(calc(var(--floatyScale) * 0.7),
                calc(var(--floatyScale) * 0.8));
    }

    75% {
        transform: translate(calc(var(--floatyScale) * -0.9),
                calc(var(--floatyScale) * 0.1));
    }

    85% {
        transform: translate(calc(var(--floatyScale) * 0.3),
                calc(var(--floatyScale) * -1));
    }

    92% {
        transform: translate(calc(var(--floatyScale) * -0.2),
                calc(var(--floatyScale) * 0.2));
    }

    100% {
        transform: translate(0, 0);
    }
}



.divider .rectangle {
    position: absolute;

    z-index: 50;

    width: 0.125rem;
    height: 200vh;
    background: #fff;
    box-shadow:
        2rem 0 3rem 0.5rem var(--rightTeamColor),
        -2rem 0 3rem 0.5rem var(--leftTeamColor),
        0 0 2rem 0.5rem #fff;


    --floatyScale: 0.25rem;
    animation: floaty 10s ease-in-out -10s infinite, focus 3s ease-in-out 0s infinite;
}

@keyframes focus {

    0%,
    100% {
        box-shadow:
            2rem 0 3rem 0.5rem var(--rightTeamColor),
            -2rem 0 3rem 0.5rem var(--leftTeamColor),
            0 0 2rem 0.5rem #fff;
    }

    50% {
        box-shadow:
            3rem 0 4rem 1rem var(--rightTeamColor),
            -3rem 0 4rem 1rem var(--leftTeamColor),
            0 0 3rem 1rem #fff;
    }
}

/* #endregion VS CENTER */
</style>