<template>
    <div class="screen">
        <Lilnavbar/>
        <div class="frame horizontalFrame">
            <LagoonaEmblem class="backgroundEmblem"/>
            <div class="decorationFrame topDFrame">
                <div class="wing leftWing"/>
                <starSvg/>
                <div class="triangle"/>
                <div class="wing rightWing"/>
            </div>
            <div class="frameContent">
                <div class="titleBar">
                    <h1>Daily Channels Activity</h1>
                    <h2>Channels with most messages sent by users</h2>
                </div>
                <div class="ranking">
                    <template v-if="channels.length > 0">
                        <div 
                            v-for="(channel, index) in channels" 
                            :key="index"
                            class="rankingEntry">
                            <div class="rank">
                                <span class="material-symbols-rounded hashtag">tag</span>
                                <span class="rankNumber">{{ index + 1 }}</span>
                            </div>
                            <div class="icon">
                                <template v-if="getChannelEmoji(channel) !== ''">
                                    <span class="emoji">
                                        {{ getChannelEmoji(channel) }}
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="material-symbols-rounded chatSymbol">chat</span>
                                </template>
                            </div>
                            <div class="Label name">{{ getChannelName(channel) }}</div>
                            <div class="SubLabel category">{{ channel.category }}</div>
                            <div class="score count">
                                <span class="scoreAmount">
                                    {{ channel.messageCount }}
                                </span>
                                <span class="scoreUnit">
                                    messages
                                </span>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="noResults">
                            <span class="line1">There was no activity past Day.</span><br>
                            <span class="line2">The Emperors are dissapointed,</span><br>
                            <span class="line3">but hope remains for tomorrow.</span>
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
            <button @click="channels = []">Clear Channels</button>
            <button @click="randomiseData()">Generate Random Channels</button>
        </div>
    </div>
</template>
<script>
import LagoonaEmblem from '@/views/LagoonaStatsPosts/Components/LagoonaEmblem.vue';
import Lilnavbar from '@/views/LagoonaStatsPosts/Components/Lilnavbar.vue'
import starSvg from '@/views/LagoonaStatsPosts/Components/starSvg.vue'
import ChannelsList from '@/views/LagoonaStatsPosts/Components/ChannelsList.js'
import nimoLogo from '@/views/LagoonaStatsPosts/Components/nimoLogo.vue'

export default {
    name: 'DailyChannels',
    components: {
        LagoonaEmblem,
        Lilnavbar,
        starSvg,
        nimoLogo
    },
    data() {
        return {
            fullChannelsList: ChannelsList,
            channels: [],
            maxValue: 0,
        };
    },
    mounted() {
        this.randomiseData();
    },
    methods: {
        randomiseData() {
            this.channels = [];
            let min = 0, max = 3;
            for(let i = 0; i < Math.random() * (max - min + 1) + min - 1; i++) {
                this.channels.push(
                    {
                        ...this.fullChannelsList[Math.floor(Math.random() * this.fullChannelsList.length)],
                        messageCount: Math.floor(Math.random() * 1000) + 1,
                    }
                );
            }
            this.channels.sort((a, b) => b.messageCount - a.messageCount);
            this.maxValue = this.channels.length > 0 ? this.channels[0].messageCount : 0;
        },
        getChannelName(channel) {
            const separatorIndex = channel.name.indexOf('｜');
            return separatorIndex !== -1 ? channel.name.slice(separatorIndex + 1) : channel.name;
        },
        getChannelEmoji(channel) {
            const separatorIndex = channel.name.indexOf('｜');
            return separatorIndex !== -1 ? channel.name.slice(0, separatorIndex) : '';
        },
        getDateInFormat() {
            const date = new Date();
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const second = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hour}:${minute}`;
        }
    },
}
</script>
<style scoped>

@import url('./Components/LagoonaStatsPostsBaseStyle.css');

</style>