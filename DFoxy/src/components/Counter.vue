<template>
    <section class="countdown">
        <header class="header">
            <h1 class="title">Odliczanie do Wielkiego Wydarzenia</h1>
            <p class="date">14 listopada 2025</p>
        </header>

        <div class="tiles" role="timer" aria-live="polite">
            <div class="tile">
                <div class="digit" :class="{ rolling: rollDays }" :key="reelKeyDays"
                    :style="{ '--anim': animMs + 'ms' }">
                    <div class="reel">
                        <span class="slot prev">{{ prev.days }}</span>
                        <span class="slot cur">{{ cur.days }}</span>
                    </div>
                </div>
            </div>
            <div class="tile">
                <div class="digit" :class="{ rolling: rollHours }" :key="reelKeyHours"
                    :style="{ '--anim': animMs + 'ms' }">
                    <div class="reel">
                        <span class="slot prev">{{ prev.hours }}</span>
                        <span class="slot cur">{{ cur.hours }}</span>
                    </div>
                </div>
            </div>
            <div class="tile">
                <div class="digit" :class="{ rolling: rollMinutes }" :key="reelKeyMinutes"
                    :style="{ '--anim': animMs + 'ms' }">
                    <div class="reel">
                        <span class="slot prev">{{ prev.minutes }}</span>
                        <span class="slot cur">{{ cur.minutes }}</span>
                    </div>
                </div>
            </div>
            <div class="tile">
                <div class="digit" :class="{ rolling: rollSeconds }" :key="reelKeySeconds"
                    :style="{ '--anim': animMs + 'ms' }">
                    <div class="reel">
                        <span class="slot prev">{{ prev.seconds }}</span>
                        <span class="slot cur">{{ cur.seconds }}</span>
                    </div>
                </div>
            </div>
            <span class="label">Dni</span>
            <span class="label">Godzin</span>
            <span class="label">Minut</span>
            <span class="label">Sekund</span>
        </div>
        <p v-if="msLeft() === 0" class="muted" style="margin-top:8px">To dzis! Widzimy sie na wydarzeniu 🎉</p>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Countdown',
    data() {
        return {
            target: new Date('2025-11-14T12:00:00'),
            now: new Date(),
            tickId: 0 as number,

            cur: { days: '0', hours: '00', minutes: '00', seconds: '00' },
            prev: { days: '0', hours: '00', minutes: '00', seconds: '00' },

            rollSeconds: false,
            rollMinutes: false,
            rollHours: false,
            rollDays: false,
            reelKeySeconds: 0,
            reelKeyMinutes: 0,
            reelKeyHours: 0,
            reelKeyDays: 0,

            animMs: 420,
        }
    },
    mounted() {
        this.updateParts(true)
        this.tickId = window.setInterval(() => this.updateParts(false), 1000)
    },
    beforeUnmount() {
        if (this.tickId) window.clearInterval(this.tickId)
    },
    methods: {
        msLeft(): number {
            return Math.max(0, this.target.getTime() - this.now.getTime())
        },
        computeParts() {
            let ms = this.msLeft()
            const day = 24 * 60 * 60 * 1000
            const hour = 60 * 60 * 1000
            const minute = 60 * 1000
            const second = 1000

            const days = Math.floor(ms / day); ms -= days * day
            const hours = Math.floor(ms / hour); ms -= hours * hour
            const minutes = Math.floor(ms / minute); ms -= minutes * minute
            const seconds = Math.floor(ms / second)

            return {
                days: String(days),
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0'),
            }
        },
        updateParts(initial = false) {
            this.now = new Date()

            const next = this.computeParts()

            if (this.msLeft() === 0 && this.tickId) {
                window.clearInterval(this.tickId)
                this.tickId = 0
            }

            if (initial) {
                this.cur = { ...next }
                this.prev = { ...next }
                return
            }

            if (next.seconds !== this.cur.seconds) this.roll('seconds', next.seconds)
            if (next.minutes !== this.cur.minutes) this.roll('minutes', next.minutes)
            if (next.hours !== this.cur.hours) this.roll('hours', next.hours)
            if (next.days !== this.cur.days) this.roll('days', next.days)
        },
        roll(unit: 'seconds' | 'minutes' | 'hours' | 'days', newVal: string) {
            this.prev[unit] = this.cur[unit]
            this.cur[unit] = newVal

            const uc = unit.charAt(0).toUpperCase() + unit.slice(1)
            const flag = `roll${uc}` as 'rollSeconds' | 'rollMinutes' | 'rollHours' | 'rollDays'
                ; (this as any)[flag] = true

            window.setTimeout(() => {
                const keyName = `reelKey${uc}` as 'reelKeySeconds' | 'reelKeyMinutes' | 'reelKeyHours' | 'reelKeyDays'
                    ; (this as any)[keyName]++
                    ; (this as any)[flag] = false
                this.prev[unit] = this.cur[unit]
            }, this.animMs)
        }
    },
})
</script>

<style scoped>
.countdown {
    color: var(--fg);
    display: grid;
    gap: clamp(28px, 4vw, 40px);
    place-items: center;

    display: flex;
    flex-direction: column;
    align-items: center;

}

.header {
    text-align: center;
}

.title {
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 800;
    letter-spacing: -0.5px;
    margin-bottom: 12px;
    background: linear-gradient(135deg, var(--fg) 0%, color-mix(in srgb, var(--fg), var(--accentLight) 20%) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.date {
    color: var(--muted);
    font-size: clamp(16px, 2vw, 20px);
    font-weight: 500;
}

.tiles {
    display: grid;
    grid-template-columns: repeat(4, clamp(40px, 20vw, 160px));
    gap: clamp(2px, 1vw, 12px) clamp(8px, 2.5vw, 24px);
    width: min(900px, 100%);

    text-align: center;

    justify-content: center;
    align-items: center;
}

.tile {
    background: var(--tile);
    border: 1px solid var(--accent);
    border-radius: 24px;
    padding: clamp(20px, 3vw, 32px) clamp(16px, 2.5vw, 24px);
    box-shadow: 0 -15px 40px var(--ring), 0 0 0 1px var(--ring) inset;
    display: grid;
    justify-items: center;
    gap: 16px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
}

.tile::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(180deg, rgba(0, 170, 255, 0.05) 0%, transparent 100%);
    pointer-events: none;
}

.digit {
    position: relative;
    width: 100%;
    height: clamp(10px, 8vw, 50px);
    overflow: hidden;
    border-radius: 16px;
    display: grid;
    align-items: center;
    justify-content: center;
}

.reel {
    display: grid;
    grid-auto-rows: 1fr;
    transition: transform var(--anim, 420ms) cubic-bezier(.2, .7, .2, 1);
}

.digit .reel {
    transform: translateY(0%);
}

.digit.rolling .reel {
    transform: translateY(-50%);
}

.digit:not(.rolling) .cur {
    color: transparent;
}

.slot {
    display: grid;
    place-items: center;
    font-variant-numeric: tabular-nums;
    font-size: clamp(20px, 5vw, 40px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: 2px;
    padding: 4px 0;
    text-shadow: 0 2px 20px #04161f80;
}

.label {
    color: var(--muted);
    font-size: clamp(12px, 2.5vw, 24px);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    user-select: none;
}

</style>