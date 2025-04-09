<template>
    <div id="inventory">
        <h1>Inventory</h1>
        <div id="inventoryGrid" class="inventoryGrid">
            <div 
                v-for="i in inventory" 
                :key="i" 
                class="slot" 
                >
                <Item :item="i"/>
            </div>
        </div>
        <h1>All Rarities</h1>
        <div class="inventoryGrid">
            <div 
                v-for="i in qualities.length" 
                :key="i-1" 
                class="slot" 
                >
                <Item :item="
                {
                    id: 'stoneSword',
                    amount: 1,
                    durability: 32,
                    uses: 26,
                    quality: i-1
                }"/>
            </div>
            <div 
                v-for="i in qualities.length" 
                :key="i-1" 
                class="slot" 
                >
                <Item :item="{
                    id: 'bottleOfWater',
                    amount: Math.floor(randomPercent()),
                    quality: i-1
                }"/>
            </div>
            <div 
                v-for="i in qualities.length" 
                :key="i-1" 
                class="slot" 
                >
                <Item :item="{
                    id: 'none',
                    quality: i-1
                }"/>
            </div>
        </div>
        <div class="inventoryGrid">
            <div 
                v-for="i in qualities.length" 
                :key="i"  
                :style="{'--rarity-color': qualities[i-1].color, 'color': qualities[i-1].color }">
                <div 
                    class="rarityIcon" 
                    v-if="qualities[i-1]"
                    :style="{'--rarity-color': qualities[i-1].color, 'color': qualities[i-1].color }">
                    <component :is="qualities[i-1].icon" />
                </div>

                {{ qualities[i-1] ? qualities[i-1].name : "lol"}} 
            </div>
        </div>
    </div>
</template>

<script>

import { items, qualities } from "@/assets/js/inventory/data.js";
import Item from "@/assets/components/inventory/Item.vue";

export default {
    name: "Inventory",
    components: {
        Item
    },
    data() {
        return {
            unit: 'Δ',
            inventory: [
                null,
                null,
                { id: "stoneSword", amount: 1, durability: 32, uses: 26, quality: 3 },
                { id: "stoneSword", amount: 1, durability: 128, uses: 32, quality: 7 },
                { id: "stoneSword", amount: 1, durability: 0, uses: 0, quality: 0 },
                null,
                { id: "bottleOfWater", amount: 204, quality: 2 },
                { id: "bottleOfWater", amount: 2, quality: 5 },
                null,
                null,
                { id: "none" }
            ],
            items,
            qualities
        };
    },
    methods: {
        randomPercent() {
            return Math.random() * 100;
        },
    }
}
</script>

<style scoped>

#inventory {
    background-color: #151515;
    color: white;

    padding: 1rem;
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.inventoryGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6rem, 10vw));
    grid-template-columns: repeat(5, 6rem);
    gap: 4rem;

    outline: 0.5rem solid #333;
    background-color: #111;
    padding: 0.5rem;

    justify-content: center;

    border-radius: 0.5rem;
}
.inventoryGrid .slot {
    background-color: #000;
    border-radius: 0.5rem;
}

</style>