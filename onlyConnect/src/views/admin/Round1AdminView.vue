<template>
    <AdminNavbar />
    <div class="displayControls">
        <button @click="store.setRoundTo('preparationScreen')">Preparation Screen</button>
        <button @click="store.setRoundTo('teamsView')">Teams View</button>
        <button @click="store.setRoundTo('round1')">Round 1 View</button>
    </div>
    <div class="round1controls">

        <div class="questions">
            <h1>Questions (  {{ store.tiles.length }} ) {{ store.questionsDB.connections.length - store.usedTiles.connections.length }} / {{ store.questionsDB.connections.length }}</h1>
        </div>

        <h2>Round 1 Controls</h2>

        <div class="someContorls">
            <h1>Round Controls</h1>
            <button @click="store.pick6Connections">Pick 6 Connections</button>
            <div class="pickTiles">
                <button v-for="i in 6" :key="i" @click="store.pickTile(i-1)"
                    :class="{'active': store.currentTileIndex === i-1,
                        'used': store.tiles[i-1]?.used && store.currentTileIndex !== i-1
                    }">
                    Pick {{ tileIcons[i-1] }}
                </button>
            </div>
            <button @click="store.pickTile(-1)" class="unpickButton">Unpick</button>
        </div> 

        <div class="currentQuestion">
            <h1>Current Question</h1>
            <div v-if="store.currentTileIndex === -1">
                No tile selected
            </div>
            <template v-else>
                <div class="clues">
                    <div class="clue" v-for="(c, j) in store.tiles[store.currentTileIndex].clues" :key="j" :class="{'active' : store.currentClueIndex == j}">
                        <div v-if="store.tiles[store.currentTileIndex].type === 'text'">{{ c }}</div>
                        <div v-else-if="store.tiles[store.currentTileIndex].type === 'img'">
                            <img :src="prepImgSrc(c)" alt="clue image" />
                        </div>
                        <div v-else-if="store.tiles[store.currentTileIndex].type === 'sound'">
                            <audio :src="prepSoundSrc(c)" controls></audio>
                        </div>
                    </div>
                    <span class="answer">
                        {{ store.tiles[store.currentTileIndex].answer }}
                    </span>
                </div>
            </template>
            <div class="controls">
                <button @click="store.round1FirstClue()">First Clue</button>
                <button @click="store.nextClue()">Next Clue</button>
                <button @click="store.showAnswer()">Show Answer</button>
                <button @click="store.disableTimer()">Disable Timer</button>
            </div>
        </div>

        <ScoreControls />

        <hr/>
        <h1>Current Tiles</h1>
        <div class="allCurrentTiles">
            <div class="tile" v-for="(t, i) in store.tiles" :key="i" :class="{'active': store.currentTileIndex === i, 'used': t.used && store.currentTileIndex !== i}">
                <span class="id">{{ t.id }}</span>
                <span class="answer">{{ t.answer }}</span>
                <div class="clue" v-for="(c, j) in t.clues" :key="j">
                    <div v-if="t.type === 'text'">{{ c }}</div>
                    <div v-else-if="t.type === 'img'">
                        <img :src="prepImgSrc(c)" alt="clue image" />
                    </div>
                    <div v-else-if="t.type === 'sound'">
                        <audio :src="prepSoundSrc(c)" controls></audio>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import ScoreControls from '@/components/admin/ScoreControls.vue';
import { useGameStore } from '@/js/stores/gameStore.js'
export default {
    name: 'Round1AdminView',
    components: {
        AdminNavbar,    
        ScoreControls,
    },
    data() {
        return {
            store: useGameStore(),
            tileIcons: ['🦝', '🦊', '🦁', '🐶', '🐉', '🐒'],
        }
    },  
    methods: {
        prepImgSrc(cluePath) {
            return "/img/connections/" + cluePath;
        },
        prepSoundSrc(cluePath) {
            return "/sounds/connections/" + cluePath;
        },
    }
}
</script>

<style scoped>

.pickTiles {
    display: grid;
    gap: 1rem;
    padding: 2rem;
    grid-template-columns: repeat(3, 1fr);
}
.pickTiles > button {
    padding: 1rem;
    font-size: 1.5rem;
}
.pickTiles > button.active {
    outline: 2px solid white;
}
.pickTiles > button.used {
    opacity: 0.5;
}
.unpickButton {
    margin: 0.5rem 2rem;
    padding: 1rem;
    width: calc(100% - 4rem);
}



.controls {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 1rem;
    height: 8rem;
}




.currentQuestion .clues {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    grid-template-columns: repeat(4, 1fr);
}
.currentQuestion .clue {
    padding: 1rem;
    border: 1px solid var(--teamColor);
    border-radius: 0.5rem;
    height: 6rem;
    overflow: auto;
}
.currentQuestion .clue.active {
    outline: 2px solid white;
}
.currentQuestion .answer {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    filter: blur(5px);
}
.currentQuestion .answer:hover {
    filter: none;
}

/* #region ALL CURRENT TILES */

.allCurrentTiles {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
.allCurrentTiles .tile {
    padding: 1rem;
    border-radius: 0.5rem;
}
.allCurrentTiles .tile.used {
    opacity: 0.5;
}
.allCurrentTiles .tile.active {
    outline: 1px solid white;
}
.allCurrentTiles .tile .id {
    font-weight: bold;
    font-size: 1.2em;
}
.allCurrentTiles .tile .answer {
    font-style: italic;
    margin-bottom: 0.5rem;
    display: block;
    filter: blur(2px);
}
.allCurrentTiles .tile:hover  .answer{
    filter: none;
}
.allCurrentTiles .tile .clue {
    margin-bottom: 0.5rem;
}
.allCurrentTiles .tile .clue img {
    width: 2rem;
    height: 2rem;
    object-fit: cover;
}

/* #endregion ALL CURRENT TILES */
</style>