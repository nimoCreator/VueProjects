<template>
<div id="layout">
    <div class="header">
        <h1>Bilety Pociagowe</h1>
        <span>ilosc pociagow w systemie: {{ pociagi.size }}</span>
    </div>
    <div id="formDiv">
        <form @submit.prevent>
            <h2>Dodaj Nowy Pociago</h2>
            <div>
                <label for="nazwa">Nazwa Pociag</label>
                <input id="nazwa" type="text" placeholder="Nazwa Pociagu" v-model="nowyPociag.nazwa" />
            </div>
            <div>
                <label for="przyjazd">Godzina przyjazdu</label>
                <input
                    id="przyjazd"
                    type="time"
                    placeholder="Godzina Przyjazdu"
                    v-model="nowyPociag.przyjazd"
                />
            </div>
            <div>
                <label for="odjazd">Godzina odjazdu</label>
                <input id="odjazd" type="time" placeholder="Godzina Odjazdu" v-model="nowyPociag.odjazd" />
            </div>
            <div>
                <label for="ilosc">Ilość dostepnych Biletów</label>
                <input id="ilosc" type="number" placeholder="Ilość Biletów" v-model="nowyPociag.ilosc" />
            </div>
            <button @click="dodajPociag">Dodaj</button>
        </form>
    </div>
    <div>
    <h2>Dostepne Bilety</h2>
        <div class="dostepnePociagi">
            <span>Dostepne Pociagi {{ dostepnePociagi.length }}</span>
            <div v-for="(p, i) in dostepnePociagi" :key="i"
                :class="{ 'pociag': true, 'sprzedano': p.sprzedano === p.ilosc, 'stoi' : p.przyjazd < nowPlus(0) }">
                <div class="pociagData">
                    <b class="nazwaPociagu">{{ p.name }}</b>
                    <span class="przyjazd">p. {{ p.przyjazd }}</span>
                    <span class="odjazd">o. {{ p.odjazd }}</span>
                </div>
                <div class="buyTicket">
                    <span class="ilosc">Zajete miejsca: {{ p.sprzedano }} / {{ p.ilosc }} </span>
                    <button :disabled="p.sprzedano === p.ilosc" @click="p.sprzedano = Math.min(p.ilosc, p.sprzedano + 1)">Kup Bilet</button>
                </div>
            </div>
        </div>
    </div>

    <div>
        <h2>Pociagi ktore juz odjechaly</h2>
        <div class="pojechalyPociagi">
            <span>Pojechalo juz: {{ pojechalyPociagi.length }}</span>
            <div v-for="(p, i) in pojechalyPociagi" :key="i" class="pociag odjechal">
                <div class="pociagData">
                    <b class="nazwaPociagu">{{ p.name }}</b>
                    <span class="przyjazd">p. {{ p.przyjazd }}</span>
                    <span class="odjazd">o. {{ p.odjazd }}</span>
                </div>
                <div class="ticketStats">
                    <span class="ilosc">Zajete miejsca: {{ p.sprzedano }} / {{ p.ilosc }} </span>
                    <progress :value="p.sprzedano" :max="p.ilosc"></progress>
                </div>        
            </div>
        </div>
    </div>
</div>
<footer>
    Prace wykonał: xxxx.xxxx.xxxx
</footer>
</template>

<script>
export default {
data() {
    return {
    pociagi: [],
    nowyPociag: {
        nazwa: '',
        przyjazd: '',
        odjazd: '',
        ilosc: 0,
    },
    }
},
beforeMount() {
    this.pociagi = new Set()
    this.pociagi.add({
        name: 'Pociag 1',
        przyjazd: this.nowPlus(10),
        odjazd: this.nowPlus(20),
        ilosc: 10,
        sprzedano: 8,
    })

    this.pociagi.add({
        name: 'Pociag 2',
        przyjazd: this.nowMinus(10),
        odjazd: this.nowPlus(5),
        ilosc: 10,
        sprzedano: 9,
    })

    this.pociagi.add( {
        name: 'Pociag 3',
        przyjazd: this.nowMinus(40),
        odjazd: this.nowMinus(30),
        ilosc: 10,
        sprzedano: 3,
    })

    this.nowyPociag = {
        nazwa: 'Pociag 4',
        przyjazd: this.nowPlus(0),
        odjazd: this.nowPlus(0),
        ilosc: 10,
        }
},
computed: {
    dostepnePociagi() {
    return Array.from(this.pociagi).filter((p) => p.odjazd > this.nowPlus(0))
    },
    pojechalyPociagi() {
    return Array.from(this.pociagi).filter((p) => p.odjazd < this.nowPlus(0))
    },
},
methods: {
    nowMinus(minutes) {
    let h = new Date().getHours()
    let m = new Date().getMinutes() - minutes
    if (m < 0) {
        h -= 1
        m = 60 + m
    }
    if (m < 10) {
        m = '0' + m
    }  
    return h + ':' + m
    },
    nowPlus(minutes) {
        let h = new Date().getHours()
        let m = new Date().getMinutes() + minutes
        h += Math.floor(m / 60)
        m = m % 60
        if (m < 10) {
            m = '0' + m
        }   
        return h + ':' + m
    },
    dodajPociag() {
        this.pociagi.add({
            name: this.nowyPociag.nazwa,
            przyjazd: this.nowyPociag.przyjazd,
            odjazd: this.nowyPociag.odjazd,
            ilosc: this.nowyPociag.ilosc,
            sprzedano: 0,
        })
    },
}
}
</script>

<style>
* {
    box-sizing: border-box;
}
#app {
    display: flex;
}
#layout {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem
}
.header {
    grid-area: auto / auto / auto / span 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}
#formDiv {
    grid-area: auto / auto / span 2 / auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 1rem;
}
/* :root {
    --bgColor: lightgoldenrodyellow;
}
body {
    background-color: var(--bgColor);
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem;
    font-family: Lato, Roboto, Arial, sans-serif;
    gap: 1rem;
} */
.dostepnePociagi, .pojechalyPociagi {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 1rem;
}
.pociag {
    background-color: peachpuff;
    padding: 2rem;
    border-radius: 1rem;
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 2rem;
    position: relative;
}
.pociag::after,
.pociag::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 2rem;
    height: 2rem;
    transform: translateY(-50%);
    background-color: var(--bgColor);
    border-radius: 50%;
}
.pociag::before {
    left: -1rem;
}
.pociag::after {
    right: -1rem;
}
.stoi {
    background-color: lightgreen;
}
.sprzedano {
    background-color: lightcoral;
}
.odjechal {
    background-color: tan;
}

.pociagData {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gaP: 1rem;
}
.buyTicket {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.ticketStats {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
}
progress {
    width: 100%;
    accent-color: black;
}

form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 1rem;
    background-color: beige;
    padding: 1rem;
    border-radius: 1rem;
}
form div {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0.5rem;
}

footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    padding: 1rem;
    background-color: gold;
}

</style>