<template>
    <div id="Snake">
        <div id="playArea" 
        :style="`
            --playAreaWidth: ${playAreaWidth}; 
            --playAreaHeight: ${playAreaHeight}`">

            <!--<div v-for="(cell, cellIndex) in playAreaLinear" 
                :key="cellIndex" 
                class="cell" 
                :style="`--bgColor: #444};   
                    --x: ${cellIndex%playAreaWidth}; 
                    --y: ${Math.floor(cellIndex/playAreaWidth )}; `"> -->
                <!-- {{ cell ? cell.tetrominoIndex+`-`+cell.blockIndex  : cellIndex }} -->
            <!-- </div> --> 

            <div v-for="(f, i) in food" 
                :key="i" 
                class="food" 
                :style="`
                    --x: ${f.x}; 
                    --y: ${f.y};`">
                    <span>🍎</span>
            </div>
            
            <div v-for="(segment, i) in snake.body" 
                :key="i" 
                class="segment"
                :class="{head: i === 0}"
                :style="`
                    --borderRadius: ${segment.borderRadius};
                    --x: ${segment.x}; 
                    --y: ${segment.y};`">
            </div>
        </div>
        <div id="score">
            Score: {{ score }}
        </div>
        <div id="controls">
            <button style="grid-area: u" @click="moveUp">^</button>
            <button style="grid-area: l" @click="moveLeft">&lt;</button>
            <button style="grid-area: d" @click="moveDown">v</button>
            <button style="grid-area: r" @click="moveRight">&gt;</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            snakeBorderRadious: "1rem",
            playAreaWidth: 20,
            playAreaHeight: 20,
            playArea: [],
            snake: {
                body: [{x: 10, y: 10, borderRadius: `1rem 1rem 1rem 1rem`}],
                direction: {x: 1, y: 0},
            },
            food: [{x: 5, y: 5}],
            score: 0,
        };
    },
    computed: {
        
    },
    mounted() {
        this.initPlayArea();
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
                    this.moveDown();
                    break;
                case 'a':
                case 'ArrowLeft':
                    this.moveLeft();
                    break;
                case 'd':
                case 'ArrowRight':
                    this.moveRight();
                    break;
                case 'w':
                case 'e':
                case 'ArrowUp':
                    this.moveUp();
                    break;
                case 'q':
                case 'Control':
                    this.rotate();
                    break;
                case 'r':
                case 'tab':
                    this.hold();
                    break;
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
        moveLeft() {
            this.snake.body.unshift({
                x: this.snake.body[0].x - 1,
                y: this.snake.body[0].y,
                borderRadius: this.snake.body[0].borderRadius
            });
            this.snake.body.pop();
            this.snake.direction = {x: -1, y: 0};
            this.afterMove();
        },
        moveRight() {
            this.snake.body.unshift({
                x: this.snake.body[0].x + 1,
                y: this.snake.body[0].y,
                borderRadius: this.snake.body[0].borderRadius
            });
            this.snake.body.pop();
            this.snake.direction = {x: 1, y: 0};
            this.afterMove();
        },
        moveUp() {
            this.snake.body.unshift({
                x: this.snake.body[0].x,
                y: this.snake.body[0].y - 1,
                borderRadius: this.snake.body[0].borderRadius
            });
            this.snake.body.pop();
            this.snake.direction = {x: 0, y: -1};
            this.afterMove();
        },
        moveDown() {
            this.snake.body.unshift({
                x: this.snake.body[0].x,
                y: this.snake.body[0].y + 1,
                borderRadius: this.snake.body[0].borderRadius
            });
            this.snake.body.pop();
            this.snake.direction = {x: 0, y: 1};
            this.afterMove();
        },
        addFood() {
            let newFood = {};
            do {
                newFood = {
                    x: Math.floor(Math.random() * this.playAreaWidth),
                    y: Math.floor(Math.random() * this.playAreaHeight),
                };
            } while (
                this.snake.body.some(segment => segment.x === newFood.x && segment.y === newFood.y) &&
                this.food.some(food => food.x === newFood.x && food.y === newFood.y)
            );
        },

        afterMove() {
            // food
            if (this.snake.body[0].x === this.food[0].x && this.snake.body[0].y === this.food[0].y) {
                //delete the eaten food 

                this.snake.body.push({ ...this.snake.body[this.snake.body.length - 1] });
                this.score++;

                this.addFood();
            }
            // loose
            if (this.snake.body[0].x < 0 || this.snake.body[0].x >= this.playAreaWidth || this.snake.body[0].y < 0 || this.snake.body[0].y >= this.playAreaHeight) {
                this.score = 0;
                this.snake.body = [{x: 10, y: 10, borderRadius: `1rem 1rem 1rem 1rem`}];
                return
            }

            // head
            if(this.snake.body.length > 1)
            if(this.snake.direction.x == 1)
            {
                this.snake.body[0].borderRadius = `0 1rem 1rem 0`;
            }
            else if(this.snake.direction.x == -1)
            {
                this.snake.body[0].borderRadius = `1rem 0 0 1rem`;
            }
            else if(this.snake.direction.y == 1)
            {
                this.snake.body[0].borderRadius = `0 0 1rem 1rem`;
            }
            else if(this.snake.direction.y == -1)
            {
                this.snake.body[0].borderRadius = `1rem 1rem 0 0`;
            }

            // body


            // tail
            if(this.snake.body.length > 1)
            switch( this.snake.body[this.snake.body.length-1].x - this.snake.body[this.snake.body.length-2].x )
            {
                case 1:
                    this.snake.body[this.snake.body.length-1].borderRadius = `0 1rem 1rem 0`;
                    break;
                case -1:
                    this.snake.body[this.snake.body.length-1].borderRadius = `1rem 0 0 1rem`;
                    break;
            }
            switch( this.snake.body[this.snake.body.length-1].y - this.snake.body[this.snake.body.length-2].y )
            {
                case 1:
                    this.snake.body[this.snake.body.length-1].borderRadius = `0 0 1rem 1rem`;
                    break;
                case -1:
                    this.snake.body[this.snake.body.length-1].borderRadius = `1rem 1rem 0 0`;
                    break;
            }
        }
    },
    computed: {
        playAreaLinear() {
            return this.playArea.flat();
        }
    },
};
</script>
<style scoped>

#Snake {
    --cellSize: 2.5rem;
    --gapSize: 0.0625rem;

    display: grid;
    grid-template-columns: auto 10rem;
    grid-template-areas: "tetris score" "tetris controls";
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
.cell, .food, .segment {
    background-color: var(--bgColor, #444);
    background: 
        radial-gradient(ellipse at top right, 
                color-mix(in srgb, var(--bgColor, #444), white 10%),
                transparent ),

        radial-gradient(ellipse at bottom left, 
                color-mix(in srgb, var(--bgColor, #444), black 5%),
                var(--bgColor, #444) 50%);

    border: 0.125rem solid #222;
    border-radius: 0.125rem;
    border-color: 
        color-mix(in srgb, var(--bgColor, #444), white 4%)
        color-mix(in srgb, var(--bgColor, #444), white 1%)
        color-mix(in srgb, var(--bgColor, #444), black 4%)
        color-mix(in srgb, var(--bgColor, #444), black 1%);
    padding: 0.25rem;

    display: flex;
    align-items: center;
    justify-content: center;

    aspect-ratio: 1;

    width: var(--cellSize);
    height: var(--cellSize);

    overflow: visible;
}
.cell {
    --bgColor: #444;

    box-shadow: 0.0625rem 0.0625rem 0.25rem var(--bgColor, #444);

    position: absolute;
    top: calc(var(--y) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));
    left: calc(var(--x) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));

    transition: all 0.125s;
}
.segment {
    --bgColor: #00d26a;

    position: absolute;
    top: calc(var(--y) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));
    left: calc(var(--x) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));

    transition: top 0.125s, left 0.125s;

    box-shadow: 0.0625rem 0.0625rem 0.25rem var(--bgColor, #444);

    border-radius: var(--borderRadius, 0);
}
.segment.head {
    --bgColor: #9cd44f;
}
.food {
    --bgColor: #f8312f00;
    position: absolute;
    top: calc(var(--y) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));
    left: calc(var(--x) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));

    transition: top 0.125s, left 0.125s;

    box-shadow: 0.0625rem 0.0625rem 0.25rem var(--bgColor, #444);

    border-radius: 50%;
}
.food span {
    position: absolute;
    font-size: 3rem;
}




#controls {
    grid-area: controls;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: ". u ." "l d r" ;
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
#score {
    grid-area: score;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
}

</style>
