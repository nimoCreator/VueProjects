<template>
    <div class="displayControls">
        <button @click="store.setRoundTo('preparationScreen')">Preparation Screen</button>
        <button @click="store.setRoundTo('intro')">Intro</button>
        <button @click="store.setRoundTo('teamsView')">Teams View</button>
    </div>
    <div class="panel teamControls">
        <!-- LEFT TEAM -->
        <div class="team teamLeft">
            <h1>Team Left</h1>
            <div class="teamInfo">
                <input type="text" :value="store.teamLeft.name" placeholder="Left Team Name"
                    @input="store.setTeamName('left', $event.target.value)" />

                <input type="color" :value="store.teamLeft.color"
                    @input="store.setTeamColor('left', $event.target.value)" />

            </div>

            <h2>Members</h2>
            <div class="members">
                <div v-for="(member, index) in store.teamLeft.members" :key="index" class="member">
                    <input type="text" :value="member.name" placeholder="Member Name"
                        @input="store.setMemberName('left', index, $event.target.value)" />

                    <input type="text" :value="member.pfp" list="pfpSuggestions" placeholder="PFP URL or choose"
                        @input="store.setMemberPfp('left', index, $event.target.value)" />

                    <button @click="store.removeTeamMember('left', index)">X</button>
                </div>

                <button class="addMemberButton" @click="store.addTeamMember('left')">+</button>
            </div>
        </div>

        <!-- RIGHT TEAM -->
        <div class="team teamRight">
            <h1>Team Right</h1>

            <div class="teamInfo">
                <input type="text" :value="store.teamRight.name" placeholder="Right Team Name"
                    @input="store.setTeamName('right', $event.target.value)" />

                <input type="color" :value="store.teamRight.color"
                    @input="store.setTeamColor('right', $event.target.value)" />
            </div>

            <h2>Members</h2>
            <div class="members">
                <div v-for="(member, index) in store.teamRight.members" :key="index" class="member">
                    <input type="text" :value="member.name" placeholder="Member Name"
                        @input="store.setMemberName('right', index, $event.target.value)" />

                    <input type="text" :value="member.pfp" list="pfpSuggestions" placeholder="PFP URL or choose"
                        @input="store.setMemberPfp('right', index, $event.target.value)" />

                    <button @click="store.removeTeamMember('right', index)">X</button>
                </div>

                <button class="addMemberButton" @click="store.addTeamMember('right')">+</button>
            </div>
        </div>

        <datalist id="pfpSuggestions">
            <option v-for="(pfp, index) in pfps" :key="index" :value="pfp" />
        </datalist>
    </div>
</template>

<script>
import { useGameStore } from '@/js/stores/gameStore.js'
import pfpDB from '@/js/stores/pfpDB'

export default {
    name: 'TeamsAdminView',

    data() {
        return {
            store: useGameStore(),
            pfps: pfpDB
        }
    }
}
</script>

<style scoped>
.teamControls {
    display: flex;
    gap: 2rem;
    padding: 2rem;
}

.team {
    flex: 1;
}

.teamInfo {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.members {
    margin-top: 1rem;
}

.member {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

input[type="text"] {
    flex: 1;
    padding: 0.2rem 0.5rem;
    font-size: 2rem;
    width: 0;
}

input[type="color"] {
    width: 3rem;
    height: 3rem;
    padding: 0;
    border: none;
    cursor: pointer;
}

.member button {
    background-color: red;
    color: white;
    border: none;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
}

.member button:hover {
    background-color: darkred;
}

.addMemberButton {
    font-size: 2rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    width: 100%;
}
</style>
