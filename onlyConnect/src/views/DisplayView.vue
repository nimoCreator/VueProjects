<template>
    <div id="display">
        <div class="panel" id="preparationScreenView" v-if="round === 'preparationScreen'">
            [ wait for admin to start the game ]
        </div>
        <div id="introView" v-else-if="round === 'intro'">
            <video autoplay @ended="onIntroFinished">
                <source src="@/videos/OnlyConnectIntro.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>

        <div id="teamsView" v-else-if="round === 'teamsView'">
            <TeamsDisplay />
        </div>
        <div id="round1View" v-else-if="round === 'round1'">
            <Round1Display />
        </div>
        <div id="round2View" v-else-if="round === 'round2'">
            round 2
        </div>
        <div id="round3View" v-else-if="round === 'round3'">
            round 3
        </div>
        <div id="round4View" v-else-if="round === 'round4'">
            round 4
        </div>
        <div id="victoryView" v-else-if="round === 'victory'">
            <VictoryDisplay />
        </div>
        <div id="illegalView" v-else>
            404
        </div>
    </div>
</template>

<script>
import TeamsDisplay from '@/components/display/TeamsDisplay.vue';
import Round1Display from '@/components/display/Round1Display.vue';
import VictoryDisplay from '@/components/display/VictoryDisplay.vue';
import { useGameStore } from '@/js/stores/gameStore.js'

export default {
    name: 'DisplayView',

    components: {
        TeamsDisplay,
        Round1Display,
        VictoryDisplay,
    },

    data() {
        return {
            store: useGameStore()
        }
    },

    created() {
        this.store.initSync()
    },

    computed: {
        tiles() {
            return this.store.tiles
        },
        round() {
            return this.store.round
        }
    },

    methods: {
        onIntroFinished() {
            this.store.setRoundTo('teamsView')
        }
    }

}
</script>

<style scoped>
#display {
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
}

.panel {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 3rem;
    text-align: center;
}
#introView {
    width: 100%;
    height: 100%;
}
#introView video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
