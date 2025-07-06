<template>
    <div id="dmgTypes">
        <div class="label">
            Damage Types
        </div>
        <div class="ornament left top">
            <div class="square" />
            <div class="line" />
        </div>
        <div class="ornament right top">
            <div class="square" />
            <div class="line" />
        </div>
        <div class="ornament center bottom">
            <div class="square" />
            <div class="line" />
            <div class="square" />
        </div>
        <div class="damages">
            <div class="physicalDmg">
                <div class="line"></div>
                <div class="point blunt">
                    <div class="icon">🔨</div>
                    <span>Blunt</span>
                </div>
                <div class="point sharp">
                    <div class="icon">⚔️</div>
                    <span>Sharp</span>
                </div>
            </div>
            <div class="elementalDmg">
                <div class="octagon"></div>
                <div class="point light">
                    <div class="icon">☀️</div>
                    <span>Light</span>
                </div>
                <div class="point heat">
                    <div class="icon">🌡️</div>
                    <span>Heat</span>
                </div>
                <div class="point fire">
                    <div class="icon">🔥</div>
                    <span>Fire</span>
                </div>
                <div class="point poison">
                    <div class="icon">☠️</div>
                    <span>Poison</span>
                </div>
                <div class="point dark">
                    <div class="icon">🌑</div>
                    <span>Dark</span>
                </div>
                <div class="point cold">
                    <div class="icon">❄️</div>
                    <span>Cold</span>
                </div>
                <div class="point water">
                    <div class="icon">💧</div>
                    <span>Water</span>
                </div>
                <div class="point electric">
                    <div class="icon">⚡</div>
                    <span>Electric</span>
                </div>
            </div>
            <div class="magicalDmg">
                <div class="squre"></div>
                <div class="point arcane">
                    <div class="icon">🔮</div>
                    <span>Arcane</span>
                </div>
                <div class="point curse">
                    <div class="icon">☠️</div>
                    <span>Curse</span>
                </div>
                <div class="point zabobon">
                    <div class="icon">🎃</div>
                    <span>Zabobon</span>
                </div>
                <div class="point divine">
                    <div class="icon">✝️</div>
                    <span>Divine</span>
                </div>
            </div>
            <div class="bodyDmg">
                <div class="triangle"></div>
                <div class="point mind">
                    <div class="icon">🧠</div>
                    <span>Mind</span>
                </div>
                <div class="point heart">
                    <div class="icon">❤️</div>
                    <span>Heart</span>
                </div>
                <div class="point soul">
                    <div class="icon">🫀</div>
                    <span>Soul</span>
                </div>
            </div>
        </div>
        <div class="entropyDmg">
            <div class="point">
                <div class="icon">🌀</div>
                <span>Entropy</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

/* color vars for all dmg types */

.blunt { --dmgColor: #ffcc00; bottom: -2rem; }
.sharp { --dmgColor: #ff0000; top: -2rem; }

.light { --dmgColor: #ffff00; top: -2rem; }
.heat { --dmgColor: #ff6600; top: 0rem; right: 0rem;  }
.fire { --dmgColor: #ff3300; right: -2rem; }
.poison { --dmgColor: #00ff00; bottom: 0rem; right: 0rem; }
.dark { --dmgColor: #3300ff; bottom: -2rem; }
.cold { --dmgColor: #00ccff; bottom: 0rem; left: 0rem; }
.water { --dmgColor: #00ffff; left: -2rem; }
.electric { --dmgColor: #ffff00; top: 0rem; left: 0rem; }

.arcane { --dmgColor: #6600ff; top: -2rem; }
.curse { --dmgColor: #9900ff; right: -2rem; }
.zabobon { --dmgColor: #ff00ff; bottom: -2rem; }
.divine { --dmgColor: #ff00cc; left: -2rem; }

.mind { --dmgColor: #ff99cc; top: 0rem; }
.heart { --dmgColor: #ff6699; bottom: 0rem; right: -2rem; }
.soul { --dmgColor: #ff3366; bottom: 0rem; left: -2rem; }




#dmgTypes {
    --dmgColor: #00aaff;

    display: grid;
    max-width: 99vw;
    grid-template-areas: 'ornamentLeftTop label ornamentRightTop'
        'damages damages damages'
        '. entropyDmg .'
        'ornamentBottom ornamentBottom ornamentBottom';
    grid-template-rows: auto 1fr 1fr auto;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem 1rem;
    padding: 0.75rem;
}

#dmgTypes .label {
    grid-area: label;
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    margin: 20px 0;
}

/*  #region Ornaments */

#dmgTypes .ornament {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
}

#dmgTypes .ornament.left {
    justify-content: flex-end;
    flex-direction: row;
}

#dmgTypes .ornament.right {
    justify-content: flex-start;
    flex-direction: row-reverse;
}

#dmgTypes .ornament.left.top {
    grid-area: ornamentLeftTop;
}
#dmgTypes .ornament.right.top {
    grid-area: ornamentRightTop;
}
#dmgTypes .ornament.center.bottom {
    grid-area: ornamentBottom;
}

#dmgTypes .ornament .square {
    width: 3rem;
    height: 3rem;
    border: 0.5rem white solid;
    border-radius: 0.25rem;
    transform: rotate(45deg);
}

#dmgTypes .ornament .line {
    flex-grow: 1;
    height: 0.25rem;
    border: 0.25rem white solid;
    border-radius: 0.25rem;
}

/*  #endregion Ornaments */

#dmgTypes .damages {
    grid-area: damages;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4rem;
    justify-content: space-evenly;
}
#dmgTypes .damages > *,
#dmgTypes .entropyDmg {
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
}
#dmgTypes .damages .point,
#dmgTypes .entropyDmg .point {
    position: absolute;
}
#dmgTypes .damages .point .icon,
#dmgTypes .entropyDmg .point .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    aspect-ratio: 1 / 1;
    height: 2rem;
    width: 2rem;
    font-size: 1.375rem;
    border: 0.25rem solid color-mix(in srgb, var(--dmgColor, white), transparent 30%);
    background: color-mix(in srgb, var(--dmgColor, white), transparent 20%);;
    border-radius: 50%;
}
#dmgTypes .damages .point span {
    position: absolute;
    font-size: 0.75em;
    text-align: center;
}


#dmgTypes .damages .physicalDmg .line {
    height: 100%;
    width: 0.25rem;
    border: 0.25rem gray solid;
}
#dmgTypes .damages .elementalDmg .octagon,
#dmgTypes .damages .magicalDmg .squre,
#dmgTypes .damages .bodyDmg .triangle {
    height: 100%;
    width: 100%;
    background: gray;
} 

#dmgTypes .damages .physicalDmg {

}
#dmgTypes .damages .physicalDmg .line {
    border-radius: 0.25rem;
}

#dmgTypes .damages .elementalDmg {

}
#dmgTypes .damages .elementalDmg .octagon {
    clip-path: polygon(
        12.5% 12.5%, 
        50% 0%, 
        87.5% 12.5%, 
        100% 50%, 
        87.5% 87.5%, 
        50% 100%, 
        12.5% 87.5%, 
        0% 50%
    );
}

#dmgTypes .damages .magicalDmg {

}
#dmgTypes .damages .magicalDmg .squre {
    clip-path: polygon(
        50% 0%, 
        100% 50%, 
        50% 100%, 
        0% 50%
    );
}

#dmgTypes .damages .bodyDmg {

}
#dmgTypes .damages .bodyDmg .triangle {
    clip-path: polygon(
        50% 10%, 
        100% 90%, 
        0% 90%
    );
}

#dmgTypes .entropyDmg {
    grid-area: entropyDmg;
}
</style>