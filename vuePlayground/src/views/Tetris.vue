<template>
    <div id="Tetris">
        <div id="playArea" 
        :style="`
            --playAreaWidth: ${playAreaWidth}; 
            --playAreaHeight: ${playAreaHeight}`">

            <div v-for="(cell, cellIndex) in playAreaLinear" 
                :key="cell ? 
                cell.tetrominoIndex+`-`+cell.blockIndex 
                : cellIndex" 
                class="cell" 
                :class="tetromino.type"
                :style="`--tetrominoColor: ${cell ? tetrominoTypes[cell.type].color : '#444'};   
                    --x: ${cellIndex%playAreaWidth}; 
                    --y: ${Math.floor(cellIndex/playAreaWidth )}; `">
                <!-- {{ cell ? cell.tetrominoIndex+`-`+cell.blockIndex  : cellIndex }} -->
            </div>
            
            <div id="tetromino" 
                :key="tetromino.tetrominoIndex"
                :style="`
                --x: ${tetromino.x}; 
                --y: ${tetromino.y};
                --r: ${tetromino.r};
                `">
                <div v-for="(block, i) in tetromino.blocks" 
                    :key="tetromino.tetrominoIndex+`-`+i" 
                    class="block" :class="tetromino.type"
                    :style="`
                        --x: ${tetrominoTypes[tetromino.type].offsets[i].x}; 
                        --y: ${tetrominoTypes[tetromino.type].offsets[i].y}; 
                        --tetrominoColor: ${tetrominoTypes[tetromino.type].color};`">
                </div>
            </div>
        </div>
        <div id="nextTetrominoDiv">
            Next:
            <div id="nextTetromino">
                <div 
                    v-for="(block, i) in nextTetromino.blocks" 
                    :key="i" 
                    class="nextTetrominoBlock" 
                    :class="tetromino.type"
                    :style="`
                        --playAreaHeight: ${block.y}; 
                        --playAreaWidth: ${block.x}; 
                        --x: ${tetrominoTypes[nextTetromino.type].offsets[i].x}; 
                        --y: ${tetrominoTypes[nextTetromino.type].offsets[i].y}; 
                        --tetrominoColor: ${tetrominoTypes[nextTetromino.type].color};`">
                </div>
            </div>
        </div>
        <div>
            <div id="controls">
                <button style="grid-area: l" @click="left">&lt;</button>
                <button style="grid-area: d" @click="down">v</button>
                <button style="grid-area: r" @click="right">&gt;</button>
                <button style="grid-area: c" @click="clockwise">
                    &#8635;
                </button>
                <button style="grid-area: cc" @click="counterclock">
                    &#8634;
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            playAreaWidth: 10,
            playAreaHeight: 20,
            playArea: [],
            tetrominoTypes: {
                'I': {
                    color: 'cyan',
                    offsets: [
                        { x: 0, y: -1 },
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 0, y: 2 },
                    ]
                },
                'J': {
                    color: 'blue',
                    offsets: [
                        { x: 0, y: -1 },
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: -1, y: 1 },
                    ]
                },
                'L': {
                    color: 'orange',
                    offsets: [
                        { x: 0, y: 0 },
                        { x: 0, y: -1 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                    ]
                },
                'O': {
                    color: 'yellow',
                    offsets: [
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                    ]
                },
                'S': {
                    color: 'green',
                    offsets: [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 },
                        { x: 0, y: 1 },
                        { x: -1, y: 1 },
                    ]
                },
                'T': {
                    color: 'purple',
                    offsets: [
                        { x: 0, y: 0 },
                        { x: -1, y: 0 },
                        { x: 1, y: 0 },
                        { x: 0, y: 1 },
                    ]
                },
                'Z': {
                    color: 'red',
                    offsets: [
                        { x: 0, y: 0 },
                        { x: -1, y: 0 },
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                    ]
                },
            },
            tetromino: {
                tetrominoIndex: 0,
            },
            nextTetromino: {
                tetrominoIndex: 1,
            }
        };
    },
    computed: {
        playAreaLinear() {
            return this.playArea.flat();
        }
    },
    mounted() {
        this.initPlayArea();
        this.tetromino = this.newTetromino();
        this.nextTetromino = this.newTetromino();

        window.addEventListener('keydown', this.handleKeydown);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    },
    methods: {
        handleKeydown(event) {
            switch (event.key) {
                case 's':
                case 'ArrowDown':
                    this.down();
                    break;
                case 'a':
                case 'ArrowLeft':
                    this.left();
                    break;
                case 'd':
                case 'ArrowRight':
                    this.right();
                    break;
                case 'w':
                case 'e':
                case 'ArrowUp':
                    this.clockwise();
                    break;
                case 'q':
                case 'Control':
                    this.counterclock();
                    break;
                case 'r':
                case 'tab':
                    this.swapTetrominos();
                    break;
            }
        },
        calculateRotationClockwise(block, center) {
            return {
                x: center.x - (block.y - center.y),
                y: center.y + (block.x - center.x),
            };
        },
        calculateRotationCouterclock(block, center) {
            return {
                x: center.x + (block.y - center.y),
                y: center.y - (block.x - center.x),
            };
        },
        down() {
            let collision = false;
            for (let block of this.tetromino.blocks) {
                if (block.y < 0) continue;
                if (this.playAreaHeight <= block.y + 1 || this.playArea[block.y + 1][block.x] !== undefined) {
                    collision = true;
                    break;
                }
            }
            if (collision) {
                this.place();
            }
            else {
                for (let block of this.tetromino.blocks) {
                    block.y++;
                }
                this.tetromino.y++;
            }
        },
        left() {
            let collision = false;
            for (let block of this.tetromino.blocks) {
                if (block.y < 0 && block.x > 0) continue;
                if (block.x <= 0 || this.playArea[block.y][block.x - 1] !== undefined) {
                    collision = true;
                    break;
                }
            }
            if (!collision) {
                for (let block of this.tetromino.blocks) {
                    block.x--;
                }
                this.tetromino.x--;
            }
        },
        right() {
            let collision = false;
            for (let block of this.tetromino.blocks) {
                if (block.y < 0 && block.x < this.playAreaWidth - 1 ) continue;
                if (block.x >= this.playAreaWidth - 1 || this.playArea[block.y][block.x + 1] !== undefined) {
                    collision = true;
                    break;
                }
            }
            if (!collision) {
                for (let block of this.tetromino.blocks) {
                    block.x++;
                }
                this.tetromino.x++;
            }
        },
        clockwise() {
            if (this.tetromino.type === 'O') return;
            let potential = [];
            for (let i = 0; i < 4; i++) {
                potential.push(this.calculateRotationClockwise(this.tetromino.blocks[i], { x: this.tetromino.x, y: this.tetromino.y }));
                if(potential[i].x < 0 || potential[i].x >= this.playAreaWidth || potential[i].y >= this.playAreaHeight) {
                    return;
                }
                if(potential[i].y>=0 && this.playArea[potential[i].y][potential[i].x] !== undefined) {
                    return;
                }
            }
            for (let i = 0; i < 4; i++) {
                this.tetromino.blocks[i].x = potential[i].x;
                this.tetromino.blocks[i].y = potential[i].y;
            }
            this.tetromino.r++;
        },
        counterclock() {
            if (this.tetromino.type === 'O') return;
            let potential = [];
            for (let i = 0; i < 4; i++) {
                potential.push(this.calculateRotationCouterclock(this.tetromino.blocks[i], {x: this.tetromino.x, y: this.tetromino.y}));
                if(potential[i].x < 0 || potential[i].x >= this.playAreaWidth || potential[i].y >= this.playAreaHeight) {
                    return;
                }
                if(potential[i].y>=0 && this.playArea[potential[i].y][potential[i].x] !== undefined) {
                    return;
                }
            }
            for (let i = 0; i < 4; i++) {
                this.tetromino.blocks[i].x = potential[i].x;
                this.tetromino.blocks[i].y = potential[i].y;
            }
            this.tetromino.r--;
        },
        swapTetrominos() {
            let tempX = this.tetromino.x;
            let tempY = this.tetromino.y;
            let tempR = this.tetromino.r;

            let tempTetromino = this.tetromino;
            this.tetromino = this.nextTetromino;
            this.nextTetromino = tempTetromino;

            this.tetromino.x = tempX;
            this.tetromino.y = tempY;
            this.tetromino.r = tempR;

            this.tetromino.blocks = this.tetrominoTypes[this.tetromino.type].offsets.map(offset => {
                return {
                    x: this.tetromino.x + offset.x,
                    y: this.tetromino.y + offset.y,
                };
            });

            if (this.checkCollision(this.tetromino.blocks)) {
                this.tetromino.x = Math.max(0, Math.min(this.playAreaWidth - 1, this.tetromino.x));
                this.tetromino.y = Math.max(0, this.tetromino.y - 1); 
            }
        },
        checkCollision(blocks) {
            return blocks.some(block =>
                block.x < 0 || block.x >= this.playAreaWidth || block.y >= this.playAreaHeight ||
                (block.y >= 0 && this.playArea[block.y][block.x] !== undefined)
            );
        },
        place() {
            console.log("t: "+this.tetromino.type);
            console.log("n: "+this.nextTetromino.type);
            for (let block of this.tetromino.blocks) {
                if (block.y < 0) {
                    alert('Game Over');
                    this.restart();
                    return;
                }
                this.playArea[block.y][block.x] = 
                { tetrominoIndex: this.tetromino.tetrominoIndex, type: this.tetromino.type, blockIndex: block.blockIndex };
            }
            this.tetromino = this.nextTetromino;
            this.nextTetromino = this.newTetromino();

            for(let i = this.playAreaHeight - 1; i >= 0; i--) {
                if (this.playArea[i].every(cell => cell !== undefined)) {
                    this.playArea.splice(i, 1);
                    this.playArea.unshift(Array(this.playAreaWidth).fill(undefined));
                    i++;
                }
            }
        },
        initPlayArea() {
            for (let i = 0; i < this.playAreaHeight; i++) {
                this.playArea.push([]);
                for (let j = 0; j < this.playAreaWidth; j++) {
                    this.playArea[i].push(undefined);
                }
            }
        },
        newTetromino() {
            let tetrominoTypes = Object.keys(this.tetrominoTypes);
            let randomType = tetrominoTypes[Math.floor(Math.random() * tetrominoTypes.length)];
            let preparingTetromino = {}
                preparingTetromino.tetrominoIndex = this.tetromino.tetrominoIndex + 1;
                preparingTetromino.type = randomType;
                preparingTetromino.x = Math.floor(this.playAreaWidth / 2);
                preparingTetromino.y = -4;
                preparingTetromino.r = 0;
                preparingTetromino.blocks = this.tetrominoTypes[randomType].offsets.map(offset => {
                    return {
                        x: preparingTetromino.x + offset.x,
                        y: preparingTetromino.y + offset.y,
                    };
                });
                for(let i = 0; i < preparingTetromino.blocks.length; i++) {
                    preparingTetromino.blocks[i].blockIndex = i;
                }
            return preparingTetromino;
        },
        restart() {
            this.playArea = [];
            this.initPlayArea();
            this.tetromino = this.newTetromino();
            this.nextTetromino = this.newTetromino();
        }
    },
};
</script>
<style scoped>

#Tetris {
    --cellSize: 2.5rem;
    --gapSize: 0.0625rem;

    display: grid;
    grid-template-columns: auto 10rem;
    grid-template-areas: "tetris nextTetromino" "tetris controls";
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
}
#playArea {
    grid-area: tetris;

    position: relative;

    width: calc(var(--playAreaWidth) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));
    height: calc(var(--playAreaHeight) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));

    padding: var(--gapSize);
    background-color: #333;

    max-width: 80vh;
    max-width: 80vh;
}
.cell, .block, .nextTetrominoBlock {
    background-color: var(--tetrominoColor, #444);
    background: 
        radial-gradient(ellipse at top right, 
                color-mix(in srgb, var(--tetrominoColor, #444), white 10%),
                transparent ),

        radial-gradient(ellipse at bottom left, 
                color-mix(in srgb, var(--tetrominoColor, #444), black 5%),
                var(--tetrominoColor, #444) 50%);

    border: 0.125rem solid #222;
    border-radius: 0.125rem;
    border-color: 
        color-mix(in srgb, var(--tetrominoColor, #444), white 4%)
        color-mix(in srgb, var(--tetrominoColor, #444), white 1%)
        color-mix(in srgb, var(--tetrominoColor, #444), black 4%)
        color-mix(in srgb, var(--tetrominoColor, #444), black 1%);
    padding: 0.25rem;

    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    aspect-ratio: 1;

    width: var(--cellSize);
    height: var(--cellSize);

    overflow: hidden;
    text-overflow: clip;
}
.cell {
    box-shadow: 0.0625rem 0.0625rem 0.25rem var(--tetrominoColor, #444);

    position: absolute;
    top: calc(var(--y) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));
    left: calc(var(--x) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));

    transition: all 0.125s;
}
#tetromino {
    position: absolute;
    top: calc(var(--y) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));
    left: calc(var(--x) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));
    transform: rotateZ(calc(var(--r) * 90deg));
    transform-origin: calc( var(--cellSize) / 2 ) calc( var(--cellSize) / 2 );

    transition: 0.125s;
}
.block {
    position: absolute;
    top: calc(var(--y) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));
    left: calc(var(--x) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));

    transition: top 0.125s, left 0.125s;

    box-shadow: 0.0625rem 0.0625rem 0.25rem var(--tetrominoColor, #444);
}
.nextTetrominoBlock {
    position: absolute;
    top: calc(var(--y) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));
    left: calc(var(--x) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));

    transition: top 0.125s, left 0.125s;

    box-shadow: 0.0625rem 0.0625rem 0.25rem var(--tetrominoColor, #444);
}
#controls {
    grid-area: controls;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "cc . c" "l d r" ;
    gap: 0.25rem;
    justify-content: center;
}
#controls button {
    background-color: #333;
    color: #fff;
    border: 0.125rem solid #222;
    border-radius: 0.25rem;
    padding: 0.5rem;
    font-size: 1.5rem;
    cursor: pointer;
}
#nextTetrominoDiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
}
#nextTetromino {
    position: relative;
    padding: 1rem;
    background-color: #333;
}

</style>
