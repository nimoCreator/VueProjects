<template>
    <div class="screen">
        <Lilnavbar/>
        <div class="frame verticalFrame">
            <LagoonaEmblem class="backgroundEmblem"/>
            <div class="decorationFrame topDFrame">
                <div class="wing leftWing"/>
                <starSvg/>
                <div class="triangle"/>
                <div class="wing rightWing"/>
            </div>
            <div class="frameContent">
                <div class="titleBar">
                    <h1>Weekly Messages Sent</h1>
                    <h2>Top 10 members with most messages sent this week</h2>
                </div>
                <div class="ranking top10">
                    <template v-if="members.length > 0">
                        <div
                            v-for="(member, index) in members"
                            :key="index"
                            class="rankingEntry">
                            <div class="rank">
                                <span class="material-symbols-rounded hashtag">tag</span>
                                <span class="rankNumber">{{ index + 1 }}</span>
                            </div>
                            <div class="icon">
                                <img :src="getAvatarUrl(member)" :alt="member.username" class="avatarImg">
                            </div>
                            <div class="Label name">{{ member.nickname }}</div>
                            <div class="SubLabel category">@{{ member.username }}</div>
                            <div class="score count">
                                <span class="scoreAmount">
                                    {{ member.messageCount }}
                                </span>
                                <span class="scoreUnit">
                                    messages
                                </span>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="noResults">
                            <span class="line1">There was no activity past week.</span><br>
                            <span class="line2">The Emperors are dissapointed,</span><br>
                            <span class="line3">but hope remains for next week.</span>
                            <span class="shruggie">
                                ¯\_(ツ)_/¯
                            </span>
                        </div>
                    </template>
                </div>
                <div class="contentFooter">
                    Issued at {{ getDateInFormat() }} by the The Lagoona Oasis Emperors Council.
                </div>
            </div>
            <div class="decorationFrame bottomDFrame">
                <div class="wing leftWing"/>
                <starSvg/>
                <div class="wing rightWing"/>
                <div class="triangle"/>
            </div>
            <div class="frameFooter">
                <LagoonaEmblem class="inline"/>
                <span class="Lagoona">
                    Lagoona
                </span>
                <div class="verticalLine"/>
                <nimoLogo/>
            </div>
        </div>
        <div class="TestButtons">
            <button @click="members = []">Clear Members</button>
            <button @click="randomiseData()">Generate Random Members</button>
        </div>
    </div>
</template>
<script>
import LagoonaEmblem from '@/views/LagoonaStatsPosts/Components/LagoonaEmblem.vue';
import Lilnavbar from '@/views/LagoonaStatsPosts/Components/Lilnavbar.vue'
import starSvg from '@/views/LagoonaStatsPosts/Components/starSvg.vue'
import MembersList from '@/views/LagoonaStatsPosts/Components/MembersList.js'
import nimoLogo from '@/views/LagoonaStatsPosts/Components/nimoLogo.vue'

export default {
    name: 'WeeklyMessagesSent',
    components: {
        LagoonaEmblem,
        Lilnavbar,
        starSvg,
        nimoLogo
    },
    data() {
        return {
            fullMembersList: MembersList,
            members: [],
            maxValue: 0,
        };
    },
    mounted() {
        this.randomiseData();
    },
    methods: {
        randomiseData() {
            this.members = [];
            let min = 0, max = 10;
            for(let i = 0; i < Math.random() * (max - min + 1) + min - 1; i++) {
                this.members.push(
                    {
                        ...this.fullMembersList[Math.floor(Math.random() * this.fullMembersList.length)],
                        messageCount: Math.floor(Math.random() * 5000) + 1,
                    }
                );
            }
            this.members.sort((a, b) => b.messageCount - a.messageCount);
            this.maxValue = this.members.length > 0 ? this.members[0].messageCount : 0;
        },
        getAvatarUrl(member) {
            return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(member.username)}`;
        },
        getDateInFormat() {
            const date = new Date();
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hour}:${minute}`;
        }
    },
}
</script>
<style scoped>

@import url('./Components/LagoonaStatsPostsBaseStyle.css');

</style>
