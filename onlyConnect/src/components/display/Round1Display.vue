<template>
    <div id="round1display" :style="{
        '--teamColor':
            store.currentTeamSide === 'left'
                ? store.teamLeft.color
                : store.currentTeamSide === 'right'
                    ? store.teamRight.color
                    : '#666',
        '--leftTeamColor': store.teamLeft.color,
        '--rightTeamColor': store.teamRight.color,
    }">
        <div id="teamsBar">
            <div class="teamSide left" :class="{ active: store.currentTeamSide === 'left' }"
                :style="{ '--sideColor': store.teamLeft.color }">
                <span class="name">{{ store.teamLeft.name }}</span>

                <div class="score" :class="{ scorePulse: scorePulseLeft }">
                    <span class="value">{{ store.teamLeft.score ?? 0 }}</span>
                    <span v-if="scoreDeltaLeft !== null" class="scoreDelta">
                        {{ scoreDeltaLeft > 0 ? '+' : '' }}{{ scoreDeltaLeft }}
                    </span>
                </div>
            </div>

            <div class="vs">VS</div>

            <div class="teamSide right" :class="{ active: store.currentTeamSide === 'right' }"
                :style="{ '--sideColor': store.teamRight.color }">
                <div class="score" :class="{ scorePulse: scorePulseRight }">
                    <span class="value">{{ store.teamRight.score ?? 0 }}</span>
                    <span v-if="scoreDeltaRight !== null" class="scoreDelta">
                        {{ scoreDeltaRight > 0 ? '+' : '' }}{{ scoreDeltaRight }}
                    </span>
                </div>

                <span class="name">{{ store.teamRight.name }}</span>
            </div>

            <div class="teamMembers left" :class="{ active: store.currentTeamSide === 'left' }">
                <div v-for="member in store.teamLeft.members" :key="member" class="member">
                    <img :src="prepPfp(member.pfp)">
                </div>
            </div>
            <div class="teamMembers right" :class="{ active: store.currentTeamSide === 'right' }">
                <div v-for="member in store.teamRight.members" :key="member" class="member">
                    <img :src="prepPfp(member.pfp)">
                </div>
            </div>
        </div>

        <div id="tiles">
            <div v-for="(t, i) in store.tiles" :key="i" class="tile" :class="{
                selected: i === store.currentTileIndex,
                used: t.used && i !== store.currentTileIndex
            }">
                {{ icons[i % icons.length] }}
            </div>
        </div>


        <div id="answer" :class="{ show: store.showingAnswer }">
            <div class="answerText">
                {{ store.showingAnswer && store.currentTileIndex !== -1 ? (store.tiles[store.currentTileIndex]?.answer
                ) : '???' }}
            </div>
        </div>

        <div id="timer" :class="{ hide: shouldHideTimer, timesUp: shouldTimesUp }">
            <div class="timeBar">
                <div class="timeFill" :style="{ width: timerPercent + '%' }"></div>
            </div>

            <div class="timeNumber">
                {{ timerSeconds }}s
            </div>
        </div>


        <div id="clues">
            <template v-if="store.currentTileIndex !== -1">
                <div class="clue" v-for="(c, j) in store.tiles[store.currentTileIndex].clues" :key="j" :class="{
                    flipped: store.currentClueIndex >= j || store.showingAnswer,
                    active: store.currentClueIndex === j
                }">
                    <div class="clueValue">
                        {{ clueValues[j] }} Points
                    </div>
                    <div class="clueCard">
                        <!-- FRONT -->
                        <div class="face front">
                            <div class="clueLabelFront">Clue {{ j + 1 }}</div>
                        </div>

                        <!-- BACK -->
                        <div class="face back">
                            <div class="clueContent" v-if="store.currentClueIndex>=j || store.showingAnswer">
                                <template v-if="store.tiles[store.currentTileIndex].type === 'text'">
                                    {{ c }}
                                </template>

                                <template v-else-if="store.tiles[store.currentTileIndex].type === 'img'">
                                    <img :src="prepImgSrc(c)" />
                                </template>

                                <template v-else-if="store.tiles[store.currentTileIndex].type === 'sound'">
                                    <audio :src="prepSoundSrc(c)" controls />
                                </template>
                            </div>
                            <div class="clueContent" v-else>
                                ???
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="clue" v-for="j in 4" :key="j">
                    <div class="clueValue">
                        {{ clueValues[j] }} Points
                    </div>
                    <div class="clueCard">
                        <div class="face front">
                            <div class="clueLabelFront">Clue {{ j }}</div>
                        </div>
                    </div>
                </div>
            </template>
        </div>

    </div>
</template>

<script>
import { useGameStore } from '@/js/stores/gameStore.js'

export default {
    name: 'Round1Display',

    data() {
        return {
            store: useGameStore(),
            icons: ['🦝', '🦊', '🦁', '🐶', '🐉', '🐒'],

            prevLeftScore: 0,
            prevRightScore: 0,

            scorePulseLeft: false,
            scorePulseRight: false,

            scoreDeltaLeft: null,
            scoreDeltaRight: null,

            clueValues: [5, 3, 2, 1],

            now: Date.now(),
        }
    },

    watch: {
        'store.teamLeft.score'(val) {
            const diff = val - this.prevLeftScore
            if (diff !== 0) this.triggerScorePulse('left', diff)
            this.prevLeftScore = val
        },

        'store.teamRight.score'(val) {
            const diff = val - this.prevRightScore
            if (diff !== 0) this.triggerScorePulse('right', diff)
            this.prevRightScore = val
        }
    },

    methods: {
        triggerScorePulse(side, diff) {
            const pulse = side === 'left'
                ? 'scorePulseLeft'
                : 'scorePulseRight'

            const delta = side === 'left'
                ? 'scoreDeltaLeft'
                : 'scoreDeltaRight'

            this[pulse] = false
            this[delta] = diff

            requestAnimationFrame(() => {
                this[pulse] = true
            })

            setTimeout(() => {
                this[pulse] = false
                this[delta] = null
            }, 1200)
        },

        prepPfp(pfp) {
            if (!pfp) return `/img/pfp/default.png`

            if (pfp.startsWith('http://') || pfp.startsWith('https://')) {
                return pfp
            }
            return `/img/pfp/${pfp}`
        },

        prepImgSrc(cluePath) {
            return "/img/connections/" + cluePath;
        },
        prepSoundSrc(cluePath) {
            return "/sounds/connections/" + cluePath;
        },
    },

    computed: {
        timerMsLeft() {
            if (!this.store.timesUpTimeStamp) return 0
            return this.store.timesUpTimeStamp - this.now
        },

        timerSeconds() {
            return Math.max(0, Math.ceil(this.timerMsLeft / 1000))
        },

        timerPercent() {
            return Math.max(0, Math.min(100, (this.timerMsLeft / 60_000) * 100))
        },

        timerExpiredAt() {
            if (!this.store.timesUpTimeStamp) return null
            return this.store.timesUpTimeStamp + 3_000
        },

        shouldHideTimer() {
            if (this.store.showingAnswer || this.store.currentTileIndex === -1 || this.store.currentClueIndex === -1) return true
            if (!this.timerExpiredAt) return false
            return this.now > this.timerExpiredAt
        },

        shouldTimesUp() {
            if (!this.store.timesUpTimeStamp) return false
            return this.now >= this.store.timesUpTimeStamp && this.now < this.timerExpiredAt
        }
    },


    mounted() {
        this._timerTick = setInterval(() => {
            this.now = Date.now()
        }, 250)
    },
    beforeUnmount() {
        clearInterval(this._timerTick)
    },


}
</script>

<style scoped>
#round1display {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    background:
        radial-gradient(circle at center, #111 0%, #000 70%);

    box-shadow:
        inset 1rem 0 2rem var(--leftTeamColor),
        inset -1rem 0 2rem var(--rightTeamColor);

    --minUnit: min(1vw, 1vh);
}

/* #region TEAMS BAR */

#teamsBar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    padding: 1rem 3rem;
    gap: 2rem;
}

.teamSide {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;

    opacity: 0.35;
    transform: scale(0.95);
    transition: all 0.4s ease;
}

.teamSide.active {
    opacity: 1;
    transform: scale(1);
    filter:
        drop-shadow(0 0 2rem var(--sideColor));
}

.teamSide .name {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: white;
}

.vs {
    font-size: 3rem;
    font-weight: 900;
    color: white;
    opacity: 0.8;
}

/* #endregion TEAMS BAR */

/* #region TEAM MEMBERS */

.teamMembers {
    position: absolute;
    top: 6rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    opacity: 0.2;
    transition: all 0.4s ease;
}

.teamMembers.left {
    left: 0;
}

.teamMembers.right {
    right: 0;
}

.teamMembers.active {
    opacity: 1;
}

.member {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;

    transform: scale(1);

    transition: all 1s;
}

.right .member {
    padding-right: 3rem;
    border-radius: 10rem 0 0 10rem;
    transform-origin: right;
    background:
        linear-gradient(to left,
            color-mix(in srgb, var(--rightTeamColor) 25%, transparent),
            transparent);
}

.left .member {
    padding-left: 3rem;
    border-radius: 0 10rem 10rem 0;
    transform-origin: left;
    background:
        linear-gradient(-90deg,
            color-mix(in srgb, var(--leftTeamColor) 25%, transparent),
            transparent);
}

.teamMembers .member img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;

    border: 2px solid white;
}

.right .member img {
    border-color: var(--rightTeamColor);
    box-shadow: 0 0 1rem var(--rightTeamColor);
}

.left .member img {
    border-color: var(--leftTeamColor);
    box-shadow: 0 0 1rem var(--leftTeamColor),
        0 0 5rem var(--leftTeamColor);
}


/* .member img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;

    border: 2px solid color-mix(in srgb, var(--teamColor) 70%, white);

    box-shadow:
        0 0 15px color-mix(in srgb, var(--teamColor) 70%, transparent);
} */

/* #endregion TEAM MEMBERS */


/* #region SCORE */

.score {
    position: relative;
}

.score .value {
    font-size: 3rem;
    font-weight: 700;
    color: white;
}

.scorePulse .value {
    animation: scorePop 1.2s ease-out forwards;
}

@keyframes scorePop {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.4);
        text-shadow: 0 0 2rem var(--sideColor);
    }

    100% {
        transform: scale(1);
    }
}

.scoreDelta {
    z-index: 400;
    position: absolute;
    left: 50%;
    top: -1rem;
    transform: translateX(-50%);

    font-size: 4rem;
    font-weight: 700;
    color: white;

    animation: floatUp 1s ease-out forwards;
}

@keyframes floatUp {
    0% {
        opacity: 0;
        transform: translate(-50%, 0) scale(0.6);
    }

    20% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: translate(-50%, 6rem) scale(1.4);
    }
}

/* #endregion SCORE */

/* #region TILES */

#tiles {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: center;
    align-content: center;
    gap: calc(1 * var(--minUnit));
}

.tile {
    width: calc(30 * var(--minUnit));
    height: calc(20 * var(--minUnit));

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 5rem;
    border-radius: 1.5rem;

    background:
        linear-gradient(180deg,
            color-mix(in srgb, var(--teamColor) 35%, #000),
            color-mix(in srgb, var(--teamColor) 15%, #000));

    border: 0.25rem solid white;
    transition: all 0.35s ease;
}

.tile.selected {
    transform: scale(1.15);
    filter: brightness(1.3);
}

.tile.used {
    filter: grayscale(1) brightness(0.7);
    transform: scale(0.95);
}

/* #endregion TILES */

/* #region CLUES */

#clues {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: calc(2 * var(--minUnit));

    perspective: 1600px;

    padding-bottom: 5vh;
}

.clue {
    width: 20vw;
    height: 30vh;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
}

.clueValue {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    text-align: center;

    transform: rotateX(90deg);
    transform-origin: bottom;

    transition: transform 1s ease, text-shadow 1s ease;
}

.active .clueValue {
    transform: none;
    text-shadow: 0 0 2rem var(--teamColor);
}

.clueCard {
    width: 100%;
    height: 100%;
    position: relative;

    transform-style: preserve-3d;
    transform: scale(0.95);
    transition: transform 0.9s cubic-bezier(.2, .8, .2, 1);

    border-radius: 1.75rem;
}

.clue.flipped .clueCard {
    transform: rotateY(180deg) scale(1.025);
}

.face {
    position: absolute;
    inset: 0;

    border-radius: 1.75rem;
    backface-visibility: hidden;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow: hidden;
}

.face.front {
    background:
        radial-gradient(circle at top,
            color-mix(in srgb, var(--teamColor) 15%, #111),
            #000);

    border: 0.2rem solid color-mix(in srgb, var(--teamColor) 10%, #888);

    box-shadow:
        0 0 2rem color-mix(in srgb, var(--teamColor) 40%, transparent),
        inset 0 0 2rem color-mix(in srgb, var(--teamColor) 20%, transparent);
}

.clueLabelFront {
    font-size: 1.6rem;
    font-weight: 900;
    letter-spacing: 0.2em;
    text-transform: uppercase;

    color: #888;
    text-shadow: 0 0 2rem var(--teamColor);
}

.face.back {
    transform: rotateY(180deg);

    background:
        linear-gradient(180deg,
            color-mix(in srgb, var(--teamColor) 30%, #111),
            #000);

    border: 0.125rem solid white;

    padding: 1.5rem;
    justify-content: center;
    align-items: center;

    box-shadow:
        0 0 2.5rem color-mix(in srgb, var(--teamColor) 55%, transparent),
        inset 0 0 2rem color-mix(in srgb, var(--teamColor) 25%, transparent);
}

.clueContent {
    width: 100%;
    height: 100%;

    font-size: 1.55rem;
    font-weight: 600;
    color: white;
    line-height: 1.25;

    display: flex;
    justify-content: center;
    align-items: center;
}

.clueContent img {
    justify-self: stretch;
    align-self: stretch;
    object-fit: fill;
    border-radius: 1rem;
}

.clue.active.flipped .clueCard {
    transform: translateY(-0.25rem) scale(1.05) rotateY(180deg);
}

/* #endregion CLUES */

/* #region ANSWER */

#answer {
    display: flex;
    justify-content: center;
    align-items: center;
}

#answer .answerText {
    font-size: 3rem;
    font-weight: 800;
    color: white;
    text-shadow: 0 0 2rem var(--teamColor);

    opacity: 0;
    transform: scale(0.8);
    transition: all 0.5s ease;
}

#answer.show .answerText {
    opacity: 1;
    transform: scale(1);
    transition: all 1.5s ease;
}

/* #endregion ANSWER */

/* #region TIMER */

#timer {
    transition: 0.6s ease;
    pointer-events: none;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 85vw;
    margin: 0 auto;

    z-index: 500;
}

#timer.hide {
    opacity: 0;
}

.timeBar {
    height: 0.75rem;
    width: 100%;
    border-radius: 999px;
    border: #888 solid 0.125rem;

    display: flex;
    justify-content: center;
    align-items: center;
}

.timeFill {
    height: 100%;
    border-inline: 0.125rem solid white;
    background:
        radial-gradient(circle at center, #0000, var(--teamColor));
    transition: width 0.5s linear;
}

.timeNumber {
    position: absolute;

    font-size: 2rem;
    font-weight: 700;

    color: white;
}

#timer.timesUp {
    box-shadow:
        0 -2rem 5rem 100vh #000,
        0 -1rem 4rem 100vh #000,
        0 0 3rem 100vh #000,
        0 1rem 4rem 100vh #000,
        0 2rem 5rem 100vh #000;
}

/* #endregion TIMER */
</style>
