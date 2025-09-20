<template>
    <div class="sketches">
        <div class="sketch loadingDots1">
            <div class="dotContainer">
                <div v-for="i in 4" :key="i" class="dot" :style="{ '--i': i }"></div>
            </div>
        </div>
        <div v-if="false" class="sketch peakHealthBar">
            <div class="stats">
                <div class="stat" style="--color: var(--healthColor);">
                    <span class="material-symbols-outlined icon">battery_android_frame_full</span>
                    <span class="label">totalEnergy</span>
                    <input type="number" v-model="peakHp" />
                    <input type="range" min="0" max="200" v-model="peakHp" />
                </div>
                <div class="stat" style="--color: var(--fatigueColor);">
                    <span class="material-symbols-outlined icon">battery_android_frame_1</span>
                    <span class="label">energy</span>
                    <input type="number" v-model="peakFatigue" />
                    <input type="range" min="0" :max="peakHp" v-model="peakFatigue" />
                </div>
                <hr style="width: 100%;"/>
                <div v-for="(value, stat) in peakHealthBar" :key="stat" class="stat" :style="{ '--color': value.color }">
                    <span class="material-symbols-outlined icon">{{ value.icon }}</span>
                    <span class="label">{{ stat }}</span>
                    <input type="number" v-model="value.value" />
                    <input type="range" min="0" max="100" v-model="value.value" />
                </div>
            </div>
            <div>
                <div class="lifeBar" :style="{ '--TotalPoints': peakHp }">
                    <div class="bar fatigue" :style="{ '--points': hp }" v-if="hp > 0">
                        <div class="innerBar stamina" :style="{ '--points': peakFatigue }"/>
                    </div>
                    <div v-for="(value, stat) in nonZeroStats" :key="stat" class="bar"
                        :style="{ '--points': value.value, '--color': value.color }">
                        <span class="material-symbols-outlined icon">{{ value.icon }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CssFuns',
    data() {
        return {
            peakHp: 100,
            peakFatigue: 100,
            peakHealthBar: {
                weigtht: {
                    value: 0,
                    icon: "fitness_center",
                    color: "#9f5a1d"
                },
                hunger: {
                    value: 0,
                    icon: "lunch_dining",
                    color: "#ffc800"
                },
                injury: {
                    value: 0,
                    icon: "heart_broken",
                    color: "#f95104"
                },
                poison: {
                    value: 0,
                    icon: "skull",
                    color: "#9f36fb"
                },
                cold: {
                    value: 0,
                    icon: "mode_cool",
                    color: "#06b7ef"
                },
                heat: {
                    value: 0,
                    icon: "mode_heat",
                    color: "#cd0d18"
                },
                thorns: {
                    value: 0,
                    icon: "brightness_empty",
                    color: "#718a00"
                },
                drowsy: {
                    value: 0,
                    icon: "bedtime",
                    color: "#e35aa3"
                },
                curse: {
                    value: 0,
                    icon: "candle",
                    color: "#120832"
                },
            }
        };
    },
    computed: {
        hp() {
            const debuffs = Object.values(this.peakHealthBar)
                .reduce((acc, cur) => acc + Number(cur.value), 0);
            return Math.max(0, this.peakHp - debuffs);
        },

        nonZeroStats() {
            return Object.entries(this.peakHealthBar)
                .filter(([_, v]) => Number(v.value) > 0)
                .reduce((obj, [k, v]) => (obj[k] = v, obj), {});
        }

    }
}
</script>

<style scoped>
.sketches {
    display: flex;
    flex-direction: column;

    justify-content: start;
    align-items: stretch;

    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
}

.sketch {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    scroll-snap-align: center;
}

/* #region loadingDots1 */
.loadingDots1 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.125rem;

    position: relative;
}

.dotContainer {
    width: 2rem;
    height: 2rem;

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
}

.dot {
    --i: 1;

    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: white;
    position: absolute;

    animation: dot 2s infinite ease-in-out;
    animation-delay: calc(-0.5s * var(--i));
}


@keyframes dot {

    0% {
        opacity: 0;
        transform: translateX(-2rem) scale(0.5);
    }
    20% { opacity: 0; }
    40% { opacity: 1; }
    50% {
        opacity: 1;
        transform: translateX(0px) scale(1);
    }
    80% { opacity: 1; }
    90% { opacity: 0; }
    100% {
        opacity: 0;
        transform: translateX(2rem) scale(0.5);
    }
}

/* #endregion loadingDots1 */


/* #region peakHealthBar */

.peakHealthBar {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    gap: 2rem;

    padding: 2rem;

    --healthColor: #aade68;
    --fatigueColor: #1e434d;

    background: #000;
}

.peakHealthBar .material-symbols-outlined {
    font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 100,
        'opsz' 24;
}

.peakHealthBar .stats {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: stretch;

    gap: 0.5rem;
}

.peakHealthBar .stat {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    font-size: 1.5rem;

    padding: 0.25rem;
    border-radius: 0.125rem;
    outline: 0.125rem solid var(--color);

    background: #eee;
    color: #222;

    color-scheme: light;
}

.peakHealthBar .stat .icon {
    color: var(--color);
    font-weight: 900;
}

.peakHealthBar .label {
    flex-grow: 1;
    width: 100%;
}

.peakHealthBar input[type="number"] {
    width: 3rem;
}

.peakHealthBar input[type="range"] {
    accent-color: var(--color);
}


.peakHealthBar .lifeBar {
    box-sizing: content-box;

    --unit: 0.5rem;
    width: calc(var(--TotalPoints) * var(--unit));
    height: 2rem;

    gap: 0.125rem;

    border: 0.125rem white solid;

    padding: 0.25rem;

    border-radius: 0.5rem;

    display: flex;
    flex-direction: row;
    overflow: visible;
}

.peakHealthBar .lifeBar .bar {
    flex-grow: 0;
    flex-shrink: 0;
    width: calc(var(--points) * var(--unit) - 0.125rem);
    border: 0.125rem var(--color) solid;

    color: var(--color);
    background-color: color-mix(in srgb, var(--color), #00000000 80%);

    border-radius: 0.25rem;

    display: flex;
    justify-content: center;
    align-items: center;
}

.peakHealthBar .lifeBar .bar.fatigue {
    background: var(--fatigueColor);
    width: calc(var(--points) * var(--unit));

    display: flex;
    justify-content: start;
    align-items: center;
}
.peakHealthBar .lifeBar .bar .innerBar.stamina {
    background: var(--healthColor);
    width: calc(var(--points) * var(--unit));
    height: 100%;
    border-radius: 0.25rem;
}

/* #endregion peakHealthBar */
</style>