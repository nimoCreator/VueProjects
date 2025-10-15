<template>
    <div id="clock">
        <div v-for="(unit, key) in timeDigits" :key="key" class="digits">
            <div v-for="(d, i) in unit" :key="i" class="digit">
                <div v-for="c in range(24)" :key="c" :class="`clock formation-${d}`">
                    <div class="hand hour-hand"></div>
                    <div class="hand min-hand"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Clock',
    data() {
        return {
            time: new Date(),
            timeDigits: {
                hour: [1, 8],
                minute: [3, 5],
                second: [0, 9],
            }
        };
    },
    methods: {
        range(n) {
            return Array.from({ length: n }, (_, i) => i + 1);
        },
        updateTime() {
            this.time = new Date();
            this.timeDigits = {
                hour: this.time.getHours().toString().padStart(2, '0').split('').map(Number),
                minute: this.time.getMinutes().toString().padStart(2, '0').split('').map(Number),
                second: this.time.getSeconds().toString().padStart(2, '0').split('').map(Number),
            };
        }
    },
    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    },
    beforeDestroy() {
        clearInterval(this.updateTime);
        this.updateTime();
    }

}
</script>
<style scoped>
#big {
    --watchSize: 9vw;
    --handWidth: 2rem;

    --unitGap: 1.5rem;
    --digitGap: 0.5rem;
    --clockGap: 0.0625rem;

    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 2rem;
    flex-wrap: wrap;
}
#testing {
    --watchSize: 2vw;
    --handWidth: 0.25rem;

    --unitGap: 1.5rem;
    --digitGap: 0.5rem;
    --clockGap: 0.0625rem;

    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 2rem;
    flex-wrap: wrap;
}

#clock {
    --watchSize: 3.5vw;
    --handWidth: 0.5vw;

    --unitGap: 2vw;
    --digitGap: 0.75vw;
    --clockGap: 0.25vw;

    height: 100vh;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: var(--unitGap);
    padding: 5rem;

    background: rgb(6, 8, 9);
}
.digits {
    display: flex;
    flex-direction: row;
    gap: var(--digitGap);
}
.digit {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--clockGap);
}
.clock {
    width: var(--watchSize);
    height: var(--watchSize);
    outline: 0.125vw solid #494949;
    background: #eee;
    border-radius: 50%;
    position: relative;
}
.hand {
    top: calc(50% - var(--handWidth) / 2);
    left: calc(50% - var(--handWidth) / 2);

    width: calc(var(--watchSize) / 2 + var(--handWidth) / 2);
    height: var(--handWidth);
    border-radius: var(--handWidth);

    background-color: #111;
    position: absolute;

    transform-origin: calc(var(--handWidth) / 2) center;
    transition: transform 0.375s ease-in-out;

    will-change: transform;
}

/* #region CLOCK FORMATIONS */

.clock.formation-0:nth-child(1) .hour-hand  { transform: rotate(0deg);}
.clock.formation-0:nth-child(1) .min-hand   { transform: rotate(90deg);}
.clock.formation-0:nth-child(2) .hour-hand  { transform: rotate(0deg);}
.clock.formation-0:nth-child(2) .min-hand   { transform: rotate(180deg);}
.clock.formation-0:nth-child(3) .hour-hand  { transform: rotate(0deg);}
.clock.formation-0:nth-child(3) .min-hand   { transform: rotate(180deg);}
.clock.formation-0:nth-child(4) .hour-hand  { transform: rotate(90deg);}
.clock.formation-0:nth-child(4) .min-hand   { transform: rotate(180deg);}

.clock.formation-0:nth-child(5) .hour-hand  { transform: rotate(-90deg);}
.clock.formation-0:nth-child(5) .min-hand   { transform: rotate(90deg);}
.clock.formation-0:nth-child(6) .hour-hand  { transform: rotate(0deg);}
.clock.formation-0:nth-child(6) .min-hand   { transform: rotate(90deg);}
.clock.formation-0:nth-child(7) .hour-hand  { transform: rotate(90deg);}
.clock.formation-0:nth-child(7) .min-hand   { transform: rotate(180deg);}
.clock.formation-0:nth-child(8) .hour-hand  { transform: rotate(-90deg);}
.clock.formation-0:nth-child(8) .min-hand   { transform: rotate(90deg);}

.clock.formation-0:nth-child(9) .hour-hand  { transform: rotate(-90deg);}
.clock.formation-0:nth-child(9) .min-hand   { transform: rotate(90deg);}
.clock.formation-0:nth-child(10) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(10) .min-hand  { transform: rotate(90deg);}
.clock.formation-0:nth-child(11) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(11) .min-hand  { transform: rotate(90deg);}
.clock.formation-0:nth-child(12) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(12) .min-hand  { transform: rotate(90deg);}

.clock.formation-0:nth-child(13) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(13) .min-hand  { transform: rotate(90deg);}
.clock.formation-0:nth-child(14) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(14) .min-hand  { transform: rotate(90deg);}
.clock.formation-0:nth-child(15) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(15) .min-hand  { transform: rotate(90deg);}
.clock.formation-0:nth-child(16) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(16) .min-hand  { transform: rotate(90deg);}

.clock.formation-0:nth-child(17) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(17) .min-hand  { transform: rotate(90deg);}
.clock.formation-0:nth-child(18) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(18) .min-hand  { transform: rotate(0deg);}
.clock.formation-0:nth-child(19) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(19) .min-hand  { transform: rotate(180deg);}
.clock.formation-0:nth-child(20) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(20) .min-hand  { transform: rotate(90deg);}

.clock.formation-0:nth-child(21) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(21) .min-hand  { transform: rotate(0deg);}
.clock.formation-0:nth-child(22) .hour-hand { transform: rotate(0deg);}
.clock.formation-0:nth-child(22) .min-hand  { transform: rotate(180deg);}
.clock.formation-0:nth-child(23) .hour-hand { transform: rotate(0deg);}
.clock.formation-0:nth-child(23) .min-hand  { transform: rotate(180deg);}
.clock.formation-0:nth-child(24) .hour-hand { transform: rotate(-90deg);}
.clock.formation-0:nth-child(24) .min-hand  { transform: rotate(180deg);}



.clock.formation-1:nth-child(1) .hour-hand  { transform: rotate(135deg);}
.clock.formation-1:nth-child(1) .min-hand   { transform: rotate(135deg);}
.clock.formation-1:nth-child(2) .hour-hand  { transform: rotate(0deg);}
.clock.formation-1:nth-child(2) .min-hand   { transform: rotate(90deg);}
.clock.formation-1:nth-child(3) .hour-hand  { transform: rotate(0deg);}
.clock.formation-1:nth-child(3) .min-hand   { transform: rotate(180deg);}
.clock.formation-1:nth-child(4) .hour-hand  { transform: rotate(90deg);}
.clock.formation-1:nth-child(4) .min-hand   { transform: rotate(180deg);}

.clock.formation-1:nth-child(5) .hour-hand  { transform: rotate(135deg);}
.clock.formation-1:nth-child(5) .min-hand   { transform: rotate(135deg);}
.clock.formation-1:nth-child(6) .hour-hand  { transform: rotate(-90deg);}
.clock.formation-1:nth-child(6) .min-hand   { transform: rotate(0deg);}
.clock.formation-1:nth-child(7) .hour-hand  { transform: rotate(90deg);}
.clock.formation-1:nth-child(7) .min-hand   { transform: rotate(180deg);}
.clock.formation-1:nth-child(8) .hour-hand  { transform: rotate(-90deg);}
.clock.formation-1:nth-child(8) .min-hand   { transform: rotate(90deg);}

.clock.formation-1:nth-child(9) .hour-hand  { transform: rotate(135deg);}
.clock.formation-1:nth-child(9) .min-hand   { transform: rotate(135deg);}
.clock.formation-1:nth-child(10) .hour-hand { transform: rotate(135deg);}
.clock.formation-1:nth-child(10) .min-hand  { transform: rotate(135deg);}
.clock.formation-1:nth-child(11) .hour-hand { transform: rotate(-90deg);}
.clock.formation-1:nth-child(11) .min-hand  { transform: rotate(90deg);}
.clock.formation-1:nth-child(12) .hour-hand { transform: rotate(-90deg);}
.clock.formation-1:nth-child(12) .min-hand  { transform: rotate(90deg);}

.clock.formation-1:nth-child(13) .hour-hand { transform: rotate(135deg);}
.clock.formation-1:nth-child(13) .min-hand  { transform: rotate(135deg);}
.clock.formation-1:nth-child(14) .hour-hand { transform: rotate(135deg);}
.clock.formation-1:nth-child(14) .min-hand  { transform: rotate(135deg);}
.clock.formation-1:nth-child(15) .hour-hand { transform: rotate(-90deg);}
.clock.formation-1:nth-child(15) .min-hand  { transform: rotate(90deg);}
.clock.formation-1:nth-child(16) .hour-hand { transform: rotate(-90deg);}
.clock.formation-1:nth-child(16) .min-hand  { transform: rotate(90deg);}

.clock.formation-1:nth-child(17) .hour-hand { transform: rotate(135deg);}
.clock.formation-1:nth-child(17) .min-hand  { transform: rotate(135deg);}
.clock.formation-1:nth-child(18) .hour-hand { transform: rotate(135deg);}
.clock.formation-1:nth-child(18) .min-hand  { transform: rotate(135deg);}
.clock.formation-1:nth-child(19) .hour-hand { transform: rotate(-90deg);}
.clock.formation-1:nth-child(19) .min-hand  { transform: rotate(90deg);}
.clock.formation-1:nth-child(20) .hour-hand { transform: rotate(-90deg);}
.clock.formation-1:nth-child(20) .min-hand  { transform: rotate(90deg);}

.clock.formation-1:nth-child(21) .hour-hand { transform: rotate(135deg);}
.clock.formation-1:nth-child(21) .min-hand  { transform: rotate(135deg);}
.clock.formation-1:nth-child(22) .hour-hand { transform: rotate(135deg);}
.clock.formation-1:nth-child(22) .min-hand  { transform: rotate(135deg);}
.clock.formation-1:nth-child(23) .hour-hand { transform: rotate(-90deg);}
.clock.formation-1:nth-child(23) .min-hand  { transform: rotate(0deg);}
.clock.formation-1:nth-child(24) .hour-hand { transform: rotate(-90deg);}
.clock.formation-1:nth-child(24) .min-hand  { transform: rotate(180deg);}



.clock.formation-2:nth-child(1)  .hour-hand { transform: rotate(0deg); }
.clock.formation-2:nth-child(1)  .min-hand  { transform: rotate(90deg); }
.clock.formation-2:nth-child(2)  .hour-hand { transform: rotate(0deg); }
.clock.formation-2:nth-child(2)  .min-hand  { transform: rotate(180deg); }
.clock.formation-2:nth-child(3)  .hour-hand { transform: rotate(0deg); }
.clock.formation-2:nth-child(3)  .min-hand  { transform: rotate(180deg); }
.clock.formation-2:nth-child(4)  .hour-hand { transform: rotate(90deg); }
.clock.formation-2:nth-child(4)  .min-hand  { transform: rotate(180deg); }

.clock.formation-2:nth-child(5)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-2:nth-child(5)  .min-hand  { transform: rotate(0deg); }
.clock.formation-2:nth-child(6)  .hour-hand { transform: rotate(0deg); }
.clock.formation-2:nth-child(6)  .min-hand  { transform: rotate(180deg); }
.clock.formation-2:nth-child(7)  .hour-hand { transform: rotate(-180deg); }
.clock.formation-2:nth-child(7)  .min-hand  { transform: rotate(90deg); }
.clock.formation-2:nth-child(8)  .hour-hand { transform: rotate(-90deg); } 
.clock.formation-2:nth-child(8)  .min-hand  { transform: rotate(90deg); }

.clock.formation-2:nth-child(9)  .hour-hand { transform: rotate(0deg); } 
.clock.formation-2:nth-child(9)  .min-hand  { transform: rotate(90deg); }
.clock.formation-2:nth-child(10) .hour-hand { transform: rotate(0deg); }
.clock.formation-2:nth-child(10) .min-hand  { transform: rotate(180deg); }
.clock.formation-2:nth-child(11) .hour-hand { transform: rotate(-90deg); }
.clock.formation-2:nth-child(11) .min-hand  { transform: rotate(180deg); }
.clock.formation-2:nth-child(12) .hour-hand { transform: rotate(-90deg); } 
.clock.formation-2:nth-child(12) .min-hand  { transform: rotate(90deg); }

.clock.formation-2:nth-child(13) .hour-hand { transform: rotate(-90deg); } 
.clock.formation-2:nth-child(13) .min-hand  { transform: rotate(90deg); }
.clock.formation-2:nth-child(14) .hour-hand { transform: rotate(0deg); }
.clock.formation-2:nth-child(14) .min-hand  { transform: rotate(90deg); }
.clock.formation-2:nth-child(15) .hour-hand { transform: rotate(0deg); }
.clock.formation-2:nth-child(15) .min-hand  { transform: rotate(180deg); }
.clock.formation-2:nth-child(16) .hour-hand { transform: rotate(-90deg); }
.clock.formation-2:nth-child(16) .min-hand  { transform: rotate(180deg); }

.clock.formation-2:nth-child(17) .hour-hand { transform: rotate(-90deg); }
.clock.formation-2:nth-child(17) .min-hand  { transform: rotate(90deg); }
.clock.formation-2:nth-child(18) .hour-hand { transform: rotate(-90deg); }
.clock.formation-2:nth-child(18) .min-hand  { transform: rotate(0deg); }
.clock.formation-2:nth-child(19) .hour-hand { transform: rotate(0deg); }
.clock.formation-2:nth-child(19) .min-hand  { transform: rotate(180deg); }
.clock.formation-2:nth-child(20) .hour-hand { transform: rotate(-180deg); }
.clock.formation-2:nth-child(20) .min-hand  { transform: rotate(90deg); }

.clock.formation-2:nth-child(21) .hour-hand { transform: rotate(-90deg); }  
.clock.formation-2:nth-child(21) .min-hand  { transform: rotate(0deg); }
.clock.formation-2:nth-child(22) .hour-hand { transform: rotate(0deg); }
.clock.formation-2:nth-child(22) .min-hand  { transform: rotate(180deg); }
.clock.formation-2:nth-child(23) .hour-hand { transform: rotate(0deg); }
.clock.formation-2:nth-child(23) .min-hand  { transform: rotate(180deg); }
.clock.formation-2:nth-child(24) .hour-hand { transform: rotate(-90deg); }
.clock.formation-2:nth-child(24) .min-hand  { transform: rotate(180deg); }


.clock.formation-3:nth-child(1)  .hour-hand { transform: rotate(0deg); }
.clock.formation-3:nth-child(1)  .min-hand  { transform: rotate(90deg); }
.clock.formation-3:nth-child(2)  .hour-hand { transform: rotate(0deg); }
.clock.formation-3:nth-child(2)  .min-hand  { transform: rotate(180deg); }
.clock.formation-3:nth-child(3)  .hour-hand { transform: rotate(0deg); }
.clock.formation-3:nth-child(3)  .min-hand  { transform: rotate(180deg); }
.clock.formation-3:nth-child(4)  .hour-hand { transform: rotate(90deg); }
.clock.formation-3:nth-child(4)  .min-hand  { transform: rotate(180deg); }

.clock.formation-3:nth-child(5)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-3:nth-child(5)  .min-hand  { transform: rotate(0deg); }
.clock.formation-3:nth-child(6)  .hour-hand { transform: rotate(0deg); }
.clock.formation-3:nth-child(6)  .min-hand  { transform: rotate(180deg); }
.clock.formation-3:nth-child(7)  .hour-hand { transform: rotate(-180deg); }
.clock.formation-3:nth-child(7)  .min-hand  { transform: rotate(90deg); }
.clock.formation-3:nth-child(8)  .hour-hand { transform: rotate(-90deg); } 
.clock.formation-3:nth-child(8)  .min-hand  { transform: rotate(90deg); }

.clock.formation-3:nth-child(9)  .hour-hand { transform: rotate(0deg); } 
.clock.formation-3:nth-child(9)  .min-hand  { transform: rotate(90deg); }
.clock.formation-3:nth-child(10) .hour-hand { transform: rotate(0deg); }
.clock.formation-3:nth-child(10) .min-hand  { transform: rotate(180deg); }
.clock.formation-3:nth-child(11) .hour-hand { transform: rotate(-90deg); }
.clock.formation-3:nth-child(11) .min-hand  { transform: rotate(180deg); }
.clock.formation-3:nth-child(12) .hour-hand { transform: rotate(-90deg); } 
.clock.formation-3:nth-child(12) .min-hand  { transform: rotate(90deg); }

.clock.formation-3:nth-child(13) .hour-hand { transform: rotate(-90deg); } 
.clock.formation-3:nth-child(13) .min-hand  { transform: rotate(0deg); }
.clock.formation-3:nth-child(14) .hour-hand { transform: rotate(0deg); }
.clock.formation-3:nth-child(14) .min-hand  { transform: rotate(180deg); }
.clock.formation-3:nth-child(15) .hour-hand { transform: rotate(-180deg); }
.clock.formation-3:nth-child(15) .min-hand  { transform: rotate(90deg); }
.clock.formation-3:nth-child(16) .hour-hand { transform: rotate(-90deg); }
.clock.formation-3:nth-child(16) .min-hand  { transform: rotate(90deg); }

.clock.formation-3:nth-child(17) .hour-hand { transform: rotate(0deg); }
.clock.formation-3:nth-child(17) .min-hand  { transform: rotate(90deg); }
.clock.formation-3:nth-child(18) .hour-hand { transform: rotate(0deg); }
.clock.formation-3:nth-child(18) .min-hand  { transform: rotate(180deg); }
.clock.formation-3:nth-child(19) .hour-hand { transform: rotate(-90deg); }
.clock.formation-3:nth-child(19) .min-hand  { transform: rotate(180deg); }
.clock.formation-3:nth-child(20) .hour-hand { transform: rotate(-90deg); }
.clock.formation-3:nth-child(20) .min-hand  { transform: rotate(90deg); }

.clock.formation-3:nth-child(21) .hour-hand { transform: rotate(-90deg); }  
.clock.formation-3:nth-child(21) .min-hand  { transform: rotate(0deg); }
.clock.formation-3:nth-child(22) .hour-hand { transform: rotate(0deg); }
.clock.formation-3:nth-child(22) .min-hand  { transform: rotate(180deg); }
.clock.formation-3:nth-child(23) .hour-hand { transform: rotate(0deg); }
.clock.formation-3:nth-child(23) .min-hand  { transform: rotate(180deg); }
.clock.formation-3:nth-child(24) .hour-hand { transform: rotate(-90deg); }
.clock.formation-3:nth-child(24) .min-hand  { transform: rotate(180deg); }



.clock.formation-4:nth-child(1)  .hour-hand { transform: rotate(0deg); }
.clock.formation-4:nth-child(1)  .min-hand  { transform: rotate(90deg); }
.clock.formation-4:nth-child(2)  .hour-hand { transform: rotate(-180deg); }
.clock.formation-4:nth-child(2)  .min-hand  { transform: rotate(90deg); }
.clock.formation-4:nth-child(3)  .hour-hand { transform: rotate(135deg); }
.clock.formation-4:nth-child(3)  .min-hand  { transform: rotate(135deg); }
.clock.formation-4:nth-child(4)  .hour-hand { transform: rotate(135deg); }
.clock.formation-4:nth-child(4)  .min-hand  { transform: rotate(135deg); }

.clock.formation-4:nth-child(5)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-4:nth-child(5)  .min-hand  { transform: rotate(90deg); }
.clock.formation-4:nth-child(6)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-4:nth-child(6)  .min-hand  { transform: rotate(90deg); }
.clock.formation-4:nth-child(7)  .hour-hand { transform: rotate(0deg); }
.clock.formation-4:nth-child(7)  .min-hand  { transform: rotate(90deg); }
.clock.formation-4:nth-child(8)  .hour-hand { transform: rotate(-180deg); } 
.clock.formation-4:nth-child(8)  .min-hand  { transform: rotate(90deg); }

.clock.formation-4:nth-child(9)  .hour-hand { transform: rotate(-90deg); } 
.clock.formation-4:nth-child(9)  .min-hand  { transform: rotate(90deg); }
.clock.formation-4:nth-child(10) .hour-hand { transform: rotate(-90deg); }
.clock.formation-4:nth-child(10) .min-hand  { transform: rotate(0deg); }
.clock.formation-4:nth-child(11) .hour-hand { transform: rotate(-90deg); }
.clock.formation-4:nth-child(11) .min-hand  { transform: rotate(180deg); }
.clock.formation-4:nth-child(12) .hour-hand { transform: rotate(-90deg); } 
.clock.formation-4:nth-child(12) .min-hand  { transform: rotate(90deg); }

.clock.formation-4:nth-child(13) .hour-hand { transform: rotate(-90deg); } 
.clock.formation-4:nth-child(13) .min-hand  { transform: rotate(0deg); }
.clock.formation-4:nth-child(14) .hour-hand { transform: rotate(0deg); }
.clock.formation-4:nth-child(14) .min-hand  { transform: rotate(180deg); }
.clock.formation-4:nth-child(15) .hour-hand { transform: rotate(-180deg); }
.clock.formation-4:nth-child(15) .min-hand  { transform: rotate(90deg); }
.clock.formation-4:nth-child(16) .hour-hand { transform: rotate(-90deg); }
.clock.formation-4:nth-child(16) .min-hand  { transform: rotate(90deg); }

.clock.formation-4:nth-child(17) .hour-hand { transform: rotate(135deg); }
.clock.formation-4:nth-child(17) .min-hand  { transform: rotate(135deg); }
.clock.formation-4:nth-child(18) .hour-hand { transform: rotate(135deg); }
.clock.formation-4:nth-child(18) .min-hand  { transform: rotate(135deg); }
.clock.formation-4:nth-child(19) .hour-hand { transform: rotate(-90deg); }
.clock.formation-4:nth-child(19) .min-hand  { transform: rotate(90deg); }
.clock.formation-4:nth-child(20) .hour-hand { transform: rotate(-90deg); }
.clock.formation-4:nth-child(20) .min-hand  { transform: rotate(90deg); }

.clock.formation-4:nth-child(21) .hour-hand { transform: rotate(135deg); }  
.clock.formation-4:nth-child(21) .min-hand  { transform: rotate(135deg); }
.clock.formation-4:nth-child(22) .hour-hand { transform: rotate(135deg); }
.clock.formation-4:nth-child(22) .min-hand  { transform: rotate(135deg); }
.clock.formation-4:nth-child(23) .hour-hand { transform: rotate(-90deg); }
.clock.formation-4:nth-child(23) .min-hand  { transform: rotate(0deg); }
.clock.formation-4:nth-child(24) .hour-hand { transform: rotate(-90deg); }
.clock.formation-4:nth-child(24) .min-hand  { transform: rotate(180deg); }



.clock.formation-5:nth-child(1)  .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(1)  .min-hand  { transform: rotate(90deg); }
.clock.formation-5:nth-child(2)  .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(2)  .min-hand  { transform: rotate(180deg); }
.clock.formation-5:nth-child(3)  .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(3)  .min-hand  { transform: rotate(180deg); }
.clock.formation-5:nth-child(4)  .hour-hand { transform: rotate(90deg); }
.clock.formation-5:nth-child(4)  .min-hand  { transform: rotate(180deg); }

.clock.formation-5:nth-child(5)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-5:nth-child(5)  .min-hand  { transform: rotate(90deg); }
.clock.formation-5:nth-child(6)  .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(6)  .min-hand  { transform: rotate(90deg); }
.clock.formation-5:nth-child(7)  .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(7)  .min-hand  { transform: rotate(180deg); }
.clock.formation-5:nth-child(8)  .hour-hand { transform: rotate(-90deg); } 
.clock.formation-5:nth-child(8)  .min-hand  { transform: rotate(180deg); }

.clock.formation-5:nth-child(9)  .hour-hand { transform: rotate(-90deg); } 
.clock.formation-5:nth-child(9)  .min-hand  { transform: rotate(90deg); }
.clock.formation-5:nth-child(10) .hour-hand { transform: rotate(-90deg); }
.clock.formation-5:nth-child(10) .min-hand  { transform: rotate(0deg); }
.clock.formation-5:nth-child(11) .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(11) .min-hand  { transform: rotate(180deg); }
.clock.formation-5:nth-child(12) .hour-hand { transform: rotate(-180deg); } 
.clock.formation-5:nth-child(12) .min-hand  { transform: rotate(90deg); }

.clock.formation-5:nth-child(13) .hour-hand { transform: rotate(-90deg); } 
.clock.formation-5:nth-child(13) .min-hand  { transform: rotate(0deg); }
.clock.formation-5:nth-child(14) .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(14) .min-hand  { transform: rotate(180deg); }
.clock.formation-5:nth-child(15) .hour-hand { transform: rotate(-180deg); }
.clock.formation-5:nth-child(15) .min-hand  { transform: rotate(90deg); }
.clock.formation-5:nth-child(16) .hour-hand { transform: rotate(-90deg); }
.clock.formation-5:nth-child(16) .min-hand  { transform: rotate(90deg); }

.clock.formation-5:nth-child(17) .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(17) .min-hand  { transform: rotate(90deg); }
.clock.formation-5:nth-child(18) .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(18) .min-hand  { transform: rotate(180deg); }
.clock.formation-5:nth-child(19) .hour-hand { transform: rotate(-90deg); }
.clock.formation-5:nth-child(19) .min-hand  { transform: rotate(180deg); }
.clock.formation-5:nth-child(20) .hour-hand { transform: rotate(-90deg); }
.clock.formation-5:nth-child(20) .min-hand  { transform: rotate(90deg); }

.clock.formation-5:nth-child(21) .hour-hand { transform: rotate(-90deg); }  
.clock.formation-5:nth-child(21) .min-hand  { transform: rotate(0deg); }
.clock.formation-5:nth-child(22) .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(22) .min-hand  { transform: rotate(180deg); }
.clock.formation-5:nth-child(23) .hour-hand { transform: rotate(0deg); }
.clock.formation-5:nth-child(23) .min-hand  { transform: rotate(180deg); }
.clock.formation-5:nth-child(24) .hour-hand { transform: rotate(-90deg); }
.clock.formation-5:nth-child(24) .min-hand  { transform: rotate(180deg); }



.clock.formation-6:nth-child(1)  .hour-hand { transform: rotate(0deg); }
.clock.formation-6:nth-child(1)  .min-hand  { transform: rotate(90deg); }
.clock.formation-6:nth-child(2)  .hour-hand { transform: rotate(0deg); }
.clock.formation-6:nth-child(2)  .min-hand  { transform: rotate(180deg); }
.clock.formation-6:nth-child(3)  .hour-hand { transform: rotate(0deg); }
.clock.formation-6:nth-child(3)  .min-hand  { transform: rotate(180deg); }
.clock.formation-6:nth-child(4)  .hour-hand { transform: rotate(-180deg); }
.clock.formation-6:nth-child(4)  .min-hand  { transform: rotate(90deg); }

.clock.formation-6:nth-child(5)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(5)  .min-hand  { transform: rotate(90deg); }
.clock.formation-6:nth-child(6)  .hour-hand { transform: rotate(0deg); }
.clock.formation-6:nth-child(6)  .min-hand  { transform: rotate(90deg); }
.clock.formation-6:nth-child(7)  .hour-hand { transform: rotate(0deg); }
.clock.formation-6:nth-child(7)  .min-hand  { transform: rotate(180deg); }
.clock.formation-6:nth-child(8)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(8)  .min-hand  { transform: rotate(180deg); }

.clock.formation-6:nth-child(9)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(9)  .min-hand  { transform: rotate(90deg); }
.clock.formation-6:nth-child(10) .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(10) .min-hand  { transform: rotate(0deg); }
.clock.formation-6:nth-child(11) .hour-hand { transform: rotate(0deg); }
.clock.formation-6:nth-child(11) .min-hand  { transform: rotate(180deg); }
.clock.formation-6:nth-child(12) .hour-hand { transform: rotate(90deg); }
.clock.formation-6:nth-child(12) .min-hand  { transform: rotate(180deg); }

.clock.formation-6:nth-child(13) .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(13) .min-hand  { transform: rotate(90deg); }
.clock.formation-6:nth-child(14) .hour-hand { transform: rotate(0deg); }
.clock.formation-6:nth-child(14) .min-hand  { transform: rotate(90deg); }
.clock.formation-6:nth-child(15) .hour-hand { transform: rotate(-180deg); }
.clock.formation-6:nth-child(15) .min-hand  { transform: rotate(90deg); }
.clock.formation-6:nth-child(16) .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(16) .min-hand  { transform: rotate(90deg); }

.clock.formation-6:nth-child(17) .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(17) .min-hand  { transform: rotate(90deg); }
.clock.formation-6:nth-child(18) .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(18) .min-hand  { transform: rotate(0deg); }
.clock.formation-6:nth-child(19) .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(19) .min-hand  { transform: rotate(180deg); }
.clock.formation-6:nth-child(20) .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(20) .min-hand  { transform: rotate(90deg); }

.clock.formation-6:nth-child(21) .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(21) .min-hand  { transform: rotate(0deg); }
.clock.formation-6:nth-child(22) .hour-hand { transform: rotate(0deg); }
.clock.formation-6:nth-child(22) .min-hand  { transform: rotate(180deg); }
.clock.formation-6:nth-child(23) .hour-hand { transform: rotate(0deg); }
.clock.formation-6:nth-child(23) .min-hand  { transform: rotate(180deg); }
.clock.formation-6:nth-child(24) .hour-hand { transform: rotate(-90deg); }
.clock.formation-6:nth-child(24) .min-hand  { transform: rotate(180deg); }


.clock.formation-7:nth-child(1)  .hour-hand { transform: rotate(0deg); }
.clock.formation-7:nth-child(1)  .min-hand  { transform: rotate(90deg); }
.clock.formation-7:nth-child(2)  .hour-hand { transform: rotate(0deg); }
.clock.formation-7:nth-child(2)  .min-hand  { transform: rotate(180deg); }
.clock.formation-7:nth-child(3)  .hour-hand { transform: rotate(0deg); }
.clock.formation-7:nth-child(3)  .min-hand  { transform: rotate(180deg); }
.clock.formation-7:nth-child(4)  .hour-hand { transform: rotate(90deg); }
.clock.formation-7:nth-child(4)  .min-hand  { transform: rotate(180deg); }

.clock.formation-7:nth-child(5)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-7:nth-child(5)  .min-hand  { transform: rotate(0deg); }
.clock.formation-7:nth-child(6)  .hour-hand { transform: rotate(0deg); }
.clock.formation-7:nth-child(6)  .min-hand  { transform: rotate(180deg); }
.clock.formation-7:nth-child(7)  .hour-hand { transform: rotate(-180deg); }
.clock.formation-7:nth-child(7)  .min-hand  { transform: rotate(90deg); }
.clock.formation-7:nth-child(8)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-7:nth-child(8)  .min-hand  { transform: rotate(90deg); }

.clock.formation-7:nth-child(9)  .hour-hand { transform: rotate(135deg); }
.clock.formation-7:nth-child(9)  .min-hand  { transform: rotate(135deg); }
.clock.formation-7:nth-child(10) .hour-hand { transform: rotate(0deg); }
.clock.formation-7:nth-child(10) .min-hand  { transform: rotate(90deg); }
.clock.formation-7:nth-child(11) .hour-hand { transform: rotate(-90deg); }
.clock.formation-7:nth-child(11) .min-hand  { transform: rotate(180deg); }
.clock.formation-7:nth-child(12) .hour-hand { transform: rotate(-90deg); }
.clock.formation-7:nth-child(12) .min-hand  { transform: rotate(90deg); }

.clock.formation-7:nth-child(13) .hour-hand { transform: rotate(135deg); }
.clock.formation-7:nth-child(13) .min-hand  { transform: rotate(135deg); }
.clock.formation-7:nth-child(14) .hour-hand { transform: rotate(-90deg); }
.clock.formation-7:nth-child(14) .min-hand  { transform: rotate(0deg); }
.clock.formation-7:nth-child(15) .hour-hand { transform: rotate(-180deg); }
.clock.formation-7:nth-child(15) .min-hand  { transform: rotate(90deg); }
.clock.formation-7:nth-child(16) .hour-hand { transform: rotate(-90deg); }
.clock.formation-7:nth-child(16) .min-hand  { transform: rotate(90deg); }

.clock.formation-7:nth-child(17) .hour-hand { transform: rotate(135deg); }
.clock.formation-7:nth-child(17) .min-hand  { transform: rotate(135deg); }
.clock.formation-7:nth-child(18) .hour-hand { transform: rotate(135deg); }
.clock.formation-7:nth-child(18) .min-hand  { transform: rotate(135deg); }
.clock.formation-7:nth-child(19) .hour-hand { transform: rotate(-90deg); }
.clock.formation-7:nth-child(19) .min-hand  { transform: rotate(90deg); }
.clock.formation-7:nth-child(20) .hour-hand { transform: rotate(-90deg); }
.clock.formation-7:nth-child(20) .min-hand  { transform: rotate(90deg); }

.clock.formation-7:nth-child(21) .hour-hand { transform: rotate(135deg); }
.clock.formation-7:nth-child(21) .min-hand  { transform: rotate(135deg); }
.clock.formation-7:nth-child(22) .hour-hand { transform: rotate(135deg); }
.clock.formation-7:nth-child(22) .min-hand  { transform: rotate(135deg); }
.clock.formation-7:nth-child(23) .hour-hand { transform: rotate(-90deg); }
.clock.formation-7:nth-child(23) .min-hand  { transform: rotate(0deg); }
.clock.formation-7:nth-child(24) .hour-hand { transform: rotate(-90deg); }
.clock.formation-7:nth-child(24) .min-hand  { transform: rotate(180deg); }



.clock.formation-8:nth-child(1)  .hour-hand { transform: rotate(0deg); }
.clock.formation-8:nth-child(1)  .min-hand  { transform: rotate(90deg); }
.clock.formation-8:nth-child(2)  .hour-hand { transform: rotate(0deg); }
.clock.formation-8:nth-child(2)  .min-hand  { transform: rotate(180deg); }
.clock.formation-8:nth-child(3)  .hour-hand { transform: rotate(0deg); }
.clock.formation-8:nth-child(3)  .min-hand  { transform: rotate(180deg); }
.clock.formation-8:nth-child(4)  .hour-hand { transform: rotate(90deg); }
.clock.formation-8:nth-child(4)  .min-hand  { transform: rotate(180deg); }

.clock.formation-8:nth-child(5)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(5)  .min-hand  { transform: rotate(90deg); }
.clock.formation-8:nth-child(6)  .hour-hand { transform: rotate(0deg); }
.clock.formation-8:nth-child(6)  .min-hand  { transform: rotate(90deg); }
.clock.formation-8:nth-child(7)  .hour-hand { transform: rotate(-180deg); }
.clock.formation-8:nth-child(7)  .min-hand  { transform: rotate(90deg); }
.clock.formation-8:nth-child(8)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(8)  .min-hand  { transform: rotate(90deg); }

.clock.formation-8:nth-child(9)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(9)  .min-hand  { transform: rotate(90deg); }
.clock.formation-8:nth-child(10) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(10) .min-hand  { transform: rotate(0deg); }
.clock.formation-8:nth-child(11) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(11) .min-hand  { transform: rotate(180deg); }
.clock.formation-8:nth-child(12) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(12) .min-hand  { transform: rotate(90deg); }

.clock.formation-8:nth-child(13) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(13) .min-hand  { transform: rotate(90deg); }
.clock.formation-8:nth-child(14) .hour-hand { transform: rotate(0deg); }
.clock.formation-8:nth-child(14) .min-hand  { transform: rotate(90deg); }
.clock.formation-8:nth-child(15) .hour-hand { transform: rotate(-180deg); }
.clock.formation-8:nth-child(15) .min-hand  { transform: rotate(90deg); }
.clock.formation-8:nth-child(16) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(16) .min-hand  { transform: rotate(90deg); }

.clock.formation-8:nth-child(17) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(17) .min-hand  { transform: rotate(90deg); }
.clock.formation-8:nth-child(18) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(18) .min-hand  { transform: rotate(0deg); }
.clock.formation-8:nth-child(19) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(19) .min-hand  { transform: rotate(180deg); }
.clock.formation-8:nth-child(20) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(20) .min-hand  { transform: rotate(90deg); }

.clock.formation-8:nth-child(21) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(21) .min-hand  { transform: rotate(0deg); }
.clock.formation-8:nth-child(22) .hour-hand { transform: rotate(0deg); }
.clock.formation-8:nth-child(22) .min-hand  { transform: rotate(180deg); }
.clock.formation-8:nth-child(23) .hour-hand { transform: rotate(0deg); }
.clock.formation-8:nth-child(23) .min-hand  { transform: rotate(180deg); }
.clock.formation-8:nth-child(24) .hour-hand { transform: rotate(-90deg); }
.clock.formation-8:nth-child(24) .min-hand  { transform: rotate(180deg); }


.clock.formation-9:nth-child(1)  .hour-hand { transform: rotate(0deg); }
.clock.formation-9:nth-child(1)  .min-hand  { transform: rotate(90deg); }
.clock.formation-9:nth-child(2)  .hour-hand { transform: rotate(0deg); }
.clock.formation-9:nth-child(2)  .min-hand  { transform: rotate(180deg); }
.clock.formation-9:nth-child(3)  .hour-hand { transform: rotate(0deg); }
.clock.formation-9:nth-child(3)  .min-hand  { transform: rotate(180deg); }
.clock.formation-9:nth-child(4)  .hour-hand { transform: rotate(90deg); }
.clock.formation-9:nth-child(4)  .min-hand  { transform: rotate(180deg); }

.clock.formation-9:nth-child(5)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(5)  .min-hand  { transform: rotate(90deg); }
.clock.formation-9:nth-child(6)  .hour-hand { transform: rotate(0deg); }
.clock.formation-9:nth-child(6)  .min-hand  { transform: rotate(90deg); }
.clock.formation-9:nth-child(7)  .hour-hand { transform: rotate(-180deg); }
.clock.formation-9:nth-child(7)  .min-hand  { transform: rotate(90deg); }
.clock.formation-9:nth-child(8)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(8)  .min-hand  { transform: rotate(90deg); }

.clock.formation-9:nth-child(9)  .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(9)  .min-hand  { transform: rotate(90deg); }
.clock.formation-9:nth-child(10) .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(10) .min-hand  { transform: rotate(0deg); }
.clock.formation-9:nth-child(11) .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(11) .min-hand  { transform: rotate(180deg); }
.clock.formation-9:nth-child(12) .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(12) .min-hand  { transform: rotate(90deg); }

.clock.formation-9:nth-child(13) .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(13) .min-hand  { transform: rotate(0deg); }
.clock.formation-9:nth-child(14) .hour-hand { transform: rotate(0deg); }
.clock.formation-9:nth-child(14) .min-hand  { transform: rotate(-180deg); }
.clock.formation-9:nth-child(15) .hour-hand { transform: rotate(-180deg); }
.clock.formation-9:nth-child(15) .min-hand  { transform: rotate(90deg); }
.clock.formation-9:nth-child(16) .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(16) .min-hand  { transform: rotate(90deg); }

.clock.formation-9:nth-child(17) .hour-hand { transform: rotate(0deg); }
.clock.formation-9:nth-child(17) .min-hand  { transform: rotate(90deg); }
.clock.formation-9:nth-child(18) .hour-hand { transform: rotate(0deg); }
.clock.formation-9:nth-child(18) .min-hand  { transform: rotate(180deg); }
.clock.formation-9:nth-child(19) .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(19) .min-hand  { transform: rotate(180deg); }
.clock.formation-9:nth-child(20) .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(20) .min-hand  { transform: rotate(90deg); }

.clock.formation-9:nth-child(21) .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(21) .min-hand  { transform: rotate(0deg); }
.clock.formation-9:nth-child(22) .hour-hand { transform: rotate(0deg); }
.clock.formation-9:nth-child(22) .min-hand  { transform: rotate(180deg); }
.clock.formation-9:nth-child(23) .hour-hand { transform: rotate(0deg); }
.clock.formation-9:nth-child(23) .min-hand  { transform: rotate(180deg); }
.clock.formation-9:nth-child(24) .hour-hand { transform: rotate(-90deg); }
.clock.formation-9:nth-child(24) .min-hand  { transform: rotate(180deg); }

/* #endregion CLOCK FORMATIONS */

</style>