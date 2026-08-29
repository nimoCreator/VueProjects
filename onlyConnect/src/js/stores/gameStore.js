import { defineStore } from 'pinia'

import questionsDB from '@/js/stores/questionsDB.js'

const STORAGE_KEY = 'only-connect-state'


export const useGameStore = defineStore('game', {
    state: () => ({
        round: 'preparationScreen',

        teamLeft: {
            name: 'Team Left',
            score: 0,
            color: '#ff5555',
            members: []
        },

        teamRight: {
            name: 'Team Right',
            score: 0,
            color: '#5555ff',
            members: []
        },

        // GAME DATA
        tiles: [],
        currentTileIndex: -1,
        currentClueIndex: -1,
        showingAnswer: false,

        usedTiles: {
            connections: [],
            sequences: [],
        },

        timesUpTimeStamp: 0,

        currentTeamSide: 'none',

        questionsDB: questionsDB,
    }),

    actions: {
        /* ---------- SYNC ---------- */
        initSync() {
            const saved = localStorage.getItem(STORAGE_KEY)
            if (saved) this.$patch(JSON.parse(saved))

            window.addEventListener('storage', (e) => {
                if (e.key === STORAGE_KEY && e.newValue) {
                    this.$patch(JSON.parse(e.newValue))
                }
            })

            // 🔥 THIS IS THE FIX
            this.$subscribe((_, state) => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
            })
        },

        save() {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(this.$state)
            )
        },

        /* ---------- ROUND CONTROL ---------- */
        setRoundTo(roundName) {
            this.round = roundName
            this.save()
        },

        /* ---------- TEAM CONTROL ---------- */
        addTeamMember(side) {
            this[side === 'left' ? 'teamLeft' : 'teamRight']
                .members.push({ name: 'New member', pfp: 'default.png' })
            this.save()
        },

        removeTeamMember(side, index) {
            this[side === 'left' ? 'teamLeft' : 'teamRight']
                .members.splice(index, 1)
            this.save()
        },

        setTeamName(side, name) {
            const team = side === 'left' ? this.teamLeft : this.teamRight
            team.name = name
            this.save()
        },

        setTeamColor(side, color) {
            const team = side === 'left' ? this.teamLeft : this.teamRight
            team.color = color
            this.save()
        },

        setMemberName(side, index, name) {
            const team = side === 'left' ? this.teamLeft : this.teamRight
            team.members[index] = {
                ...team.members[index],
                name
            }
            this.save()
        },

        setMemberPfp(side, index, pfp) {
            const team = side === 'left' ? this.teamLeft : this.teamRight
            team.members[index] = {
                ...team.members[index],
                pfp
            }
            this.save()
        },

        setCurrentTeamSide(side) {
            this.currentTeamSide = side
            this.save()
        },


    // ROUND 1

    pick6Connections() {
            if (this.questionsDB.connections.length - this.usedTiles.connections.length < 6) {
                window.alert("Not enough unused connection tiles left in the database to pick 6 new ones. Please reset the game to continue.")
                return
            }

            let tiles = []

            while (tiles.length < 6) {
                const randomIndex = Math.floor(Math.random() * questionsDB.connections.length)
                const tile = questionsDB.connections[randomIndex]

                if (!this.usedTiles.connections.includes(tile.id)) {
                    tile.used = false
                    tiles.push(tile)
                    this.usedTiles.connections.push(tile.id)
                }
            }
            this.tiles = tiles
            this.currentTileIndex = -1
            this.currentClueIndex = -1
            this.showingAnswer = false
            this.save()
        },

        pickTile(id) {
            this.currentTileIndex = id;
            this.currentClueIndex = -1;
            if (id >= 0) this.tiles[id].used = true;
            this.showingAnswer = false
            this.save()
        },

        round1FirstClue() {
            this.currentClueIndex = 0
            this.showingAnswer = false

            // 60 seconds from now
            this.timesUpTimeStamp = Date.now() + 60_000 // <------------------------------------------------------ QUESTION TIMER

            this.save()
        },

        nextClue() {
            this.currentClueIndex++;
            this.save()
        },

        showAnswer() {
            this.showingAnswer = true
            this.save()
        },
        disableTimer() {
            this.timesUpTimeStamp = Date.now() - 10_000
            this.save()
        },


        pick6Sequences() {

        },
        pick4Connections() {

        },

        restartGame() {
            this.usedTiles = {
                connections: [],
                sequences: [],
            }
            this.tiles = []
            this.currentClueIndex = -1,
            this.currentTileIndex = -1
            this.round = 'preparationScreen',
            this.teamLeft.score = 0
            this.teamRight.score = 0
            this.teamLeft.members = []
            this.teamRight.members = []
            this.teamLeft.name = 'Team Left'
            this.teamRight.name = 'Team Right'
            this.teamLeft.color = '#ff5555'
            this.teamRight.color = '#5555ff'
            this.currentTeamSide = 'none'
            this.showingAnswer = false
            this.timesUpTimeStamp = 0

            this.pick6Connections();
            this.pick6Sequences();

            this.save()
        }
    }
})
