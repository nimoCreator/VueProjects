<template>
    <div class="panel scoreControls">

        <button class="leftTeamTurn" :style="{ '--teamColor': store.teamLeft.color }" @click="store.setCurrentTeamSide('left')">
            {{ store.teamLeft.name }}
        </button>
        <button class="noneTeamTurn" style="--teamColor: gray;" @click="store.setCurrentTeamSide('none')">
            VS
        </button>
        <button class="rightTeamTurn" :style="{ '--teamColor': store.teamRight.color }" @click="store.setCurrentTeamSide('right')">
            {{ store.teamRight.name }}
        </button>
        <div class="scoreManip leftScoreManip" :style="{ '--teamColor': store.teamLeft.color }">
            <input type="number" v-model.number="store.teamLeft.score" @input="store.save()"/>
            <button @click="store.teamLeft.score++; store.save()">+1</button>
            <button @click="store.teamLeft.score += 2; store.save()">+2</button>
            <button @click="store.teamLeft.score += 3; store.save()">+3</button>
            <button @click="store.teamLeft.score += 5; store.save()">+5</button>
        </div>
        <div class="scoreManip rightScoreManip" :style="{ '--teamColor': store.teamRight.color }">
            <input type="number" v-model.number="store.teamRight.score" @input="store.save()"/>
            <button @click="store.teamRight.score++; store.save()">+1</button>
            <button @click="store.teamRight.score += 2; store.save()">+2</button>
            <button @click="store.teamRight.score += 3; store.save()">+3</button>
            <button @click="store.teamRight.score += 5; store.save()">+5</button>
        </div>
    </div>
</template>
<script>
import { useGameStore } from '@/js/stores/gameStore.js'
export default {
    name: 'ScoreControls',

    data() {
        return {
            store: useGameStore()
        }
    }
}
</script>
<style scoped>
.scoreControls {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 8rem 5rem;
    grid-template-areas: "ltt ltt vs vs rtt rtt" "sl sl sl sr sr sr";
    gap: 1rem;
    padding: 1rem;
}
.scoreControls  > button {
    background-color: var(--teamColor);
    color: white;
    font-weight: bold;
    padding: 0.5em;
    border: none;
    border-radius: 0.5em;
}
.leftTeamTurn {
    grid-area: ltt;
}
.rightTeamTurn {
    grid-area: rtt;
}
.noneTeamTurn {
    grid-area: vs;
}
.scoreManip {
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    gap: 0.5em;
    padding: 0.5em;
    height: 5rem;
}
.scoreManip > input {
    flex: 1;
    font-size: 1.2em;
    font-weight: bold;
    border: 2px solid var(--teamColor);
    border-radius: 0.3em;
    padding: 0.2em;
    width: 0;
}
.scoreManip > button {
    flex: 1;
    border: 2px solid var(--teamColor);
}
.leftScoreManip {
    grid-area: sl;
}
.rightScoreManip {
    grid-area: sr;
}

</style>