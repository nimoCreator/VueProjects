<template>
    <div 
        v-if="item"
        class="item"
        :class="{ [item.quality]: item && item.quality }"
        :style="{'--rarity-color': item.quality && qualities[item.quality] ? qualities[item.quality].color : 'red' }"
        >

        <div class="frame"/>
        <div class="back"/>

        <img class="itemImg" v-if="items[item.id].name && items[item.id].img" :src="items[item.id].img" :alt="items[item.id].name" />

        <span v-if="items[item.id].name" class="itemName"> 
            
            <div class="rarityIcon" 
                v-if="item.quality && qualities[item.quality]" 
                v-html="decodeSVG(qualities[item.quality].icon)">
                
            </div>

            {{items[item.id].name}} 
        </span>

        <div v-if="item && item.durability !== undefined" class="durability">
            <div class="bar" :style="{ width: (item.uses / item.durability * 100) + '%' }"></div>
        </div>

        <span v-if="item.amount && item.amount != 1" class="amount"> {{item.amount}} </span>
    </div>
</template>

<script>

import { items, qualities } from "@/assets/js/inventory/data.js";

export default {
    props: {
        item: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            items,
            qualities
        }
    },
    methods: {
        decodeSVG(data) {
            const svgStart = data.indexOf(',') + 1; // Find the data start
            return decodeURIComponent(data.slice(svgStart)); // Decode the SVG content
        },
    },
}
</script>

<style scoped>

.item {
    position: relative;
    background-color: #333;

    border-radius: 0.5rem;
    padding: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    aspect-ratio: 1 / 1;
}
.item .back {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    right: 0.25rem;
    bottom: 0.25rem;
    border-radius: 0.25rem;
    background-color: var(--rarity-color);
    
    background-color: #050505;
    background-image: 

        linear-gradient(-45deg, 
            #050505 10%,
            color-mix(in hsl, var(--rarity-color), #050505 40%) 45%,
            color-mix(in hsl, var(--rarity-color), #050505 40%) 55%,
            #050505 90%),

        radial-gradient(ellipse at center,
            color-mix(in hsl, var(--rarity-color), #050505 20%),
            #050505 70%)
            ;

    z-index: 3;
}
.item .frame {
    position: absolute;

    overflow: hidden;


    top: -0.125rem;
    left: -0.125rem;
    right: -0.125rem;
    bottom: -0.125rem;
    border-radius: 0.5rem;

    background-color: #111;

    z-index: 2;
}
.item::before {
    content: "";
    position: absolute;
    inset: -2rem;
    border-radius: 100%;
    background-image: 
    radial-gradient(ellipse at center,
            color-mix(in hsl, var(--rarity-color), transparent 0%) 40%,
            transparent 70%);

    opacity: 0.1;

    z-index: 2;
}
.item .itemImg {
    max-width: calc( 112.5% );
    max-height: calc( 112.5% );

    position: absolute;

    z-index: 5;
}
.item .itemName {
    position: absolute;

    white-space: nowrap;
    
    padding: 0.125rem 0.5rem;
    border-radius: 0.375rem;
    text-align: center;
    font-size: 1.125rem;

    background-color: #111;
    color: #fff;

    z-index: 16;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.item .itemName img,
.item .itemName svg {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.25rem;

    fill: var(--rarity-color);
}
.item .amount {
    position: absolute;
    bottom: -0.5rem;
    right: -0.5rem;
    font-size: 1.25rem;
    padding: 0.5rem;

    border-radius: 2rem;
    background-color: #111;
    color: #fff;
    outline: 
        color-mix(in hsl, var(--rarity-color), #050505 40%)
        0.125rem solid;

    height: 2rem;
    min-width: 2rem;

    border-radius: 200rem;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 7;
}
.item .durability {
    position: absolute;
    top: calc( 100%  + 0.5rem);
    left: 0;
    right: 0;
    height: 0.25rem;
    border-radius: 0.125rem;
    background-color: #111;

    z-index: 4;
}
.item .durability .bar {
    height: 100%;
    border-radius: 0.125rem;
    background-color: color-mix(in hsl, var(--rarity-color), #050505 40%);
}

.item {
    perspective: 10rem;
}
.item .itemImg {
    transition: transform 0.5s 0.25s ease-out;
}
.item:hover .itemImg {
    transform-style: preserve-3d;
    transform: rotateX(5deg) rotateY(-10deg) rotateZ(15deg);
    transition: transform 0.125s 0.125s ease-out;
}

.item .frame:before {
    content: "";
    position: absolute;
    top: -100%;
    left: -100%;
    right: -100%;
    bottom: -100%;

    border-radius: 0.5rem;
    
    transform: rotate(0deg);

    background-image: 
        linear-gradient(35deg, 
            #050505 35%,
            var(--rarity-color) 50%,
            #050505 65%);


    transition: all 0.75s 0.25s ease-out;

    opacity: 0.25;

    z-index: 3;
}
.item:hover .frame:before {
    opacity: 1;
    transform: rotate(30deg);
    transition: all 0.5s 0.125s ease-out;
}

.item .itemName {
    opacity: 0;
    top: calc( 100% - 1rem);
    transition: all 0.5s 0.25s ease-out;
}
.item:hover .itemName {
    opacity: 1;
    top: calc( 100%  + 1rem);
    transition: all 0.25s 0.125s ease-out;
}

</style>