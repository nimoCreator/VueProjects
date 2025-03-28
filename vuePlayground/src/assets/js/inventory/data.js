import imgStoneSword from '@/assets/img/inventory/items/stoneSword.png';
import imgBottleOfWater from '@/assets/img/inventory/items/bottleOfWater.png';

import imgBroken from '@/assets/img/inventory/qualities/broken.svg';
import imgPoor from '@/assets/img/inventory/qualities/poor.svg';
import imgGood from '@/assets/img/inventory/qualities/good.svg';
import imgCommon from '@/assets/img/inventory/qualities/common.svg';
import imgUncommon from '@/assets/img/inventory/qualities/uncommon.svg';
import imgRare from '@/assets/img/inventory/qualities/rare.svg';
import imgEpic from '@/assets/img/inventory/qualities/epic.svg';
import imgLegendary from '@/assets/img/inventory/qualities/legendary.svg';
import imgMythical from '@/assets/img/inventory/qualities/mythical.svg';


export const items = {
    none: {
        name: "empty",
        description: "well this is awkward",
        price: 10.0,
        img: "",
    },
    stoneSword: {
        name: "Stone Sword",
        description: "Simple stone attached to a stick with some rope",
        price: 10.0,
        img: imgStoneSword,
    },
    bottleOfWater: {
        name: "Water",
        description: "Fresh water, refreshing and clean",
        price: 5.0,
        img: imgBottleOfWater,
    },
};

export const qualities = [
    { 
        name: "Broken", 
        color: "#252220", 
        icon: imgBroken 
    },
    { 
        name: "Poor", 
        color: "#8C8C8C", 
        icon: imgPoor 
    },
    { 
        name: "Good", 
        color: "#00FF00", 
        icon: imgGood 
    },
    { 
        name: "Common", 
        color: "#FFFFFF", 
        icon: imgCommon 
    },
    { 
        name: "Uncommon", 
        color: "#1EFF00", 
        icon: imgUncommon 
    },
    { 
        name: "Rare", 
        color: "#0070DD", 
        icon: imgRare 
    },
    { 
        name: "Epic", 
        color: "#A335EE", 
        icon: imgEpic 
    },
    { 
        name: "Legendary", 
        color: "#FF8000", 
        icon: imgLegendary 
    },
    { 
        name: "Mythical", 
        color: "#2288FF", 
        icon: imgMythical 
    },
];