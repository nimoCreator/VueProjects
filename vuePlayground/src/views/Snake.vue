<template>
    <div id="Snake">
        <div id="playArea" 
        :style="`
            --playAreaWidth: ${playAreaWidth}; 
            --playAreaHeight: ${playAreaHeight}`">

            <div v-for="(f) in food" 
                :key="f.x + f.y" 
                class="food" 
                :style="`
                    --x: ${f.x}; 
                    --y: ${f.y};`">
                    <span>🍎</span>
            </div>
            
            <div v-for="(segment, i) in snake.body" 
                :key="i" 
                class="segment"
                :class="{head: i === 0, tail: i === snake.body.length - 1, even: i % 2 === 0, odd: i % 2 !== 0}"
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
            playAreaWidth: 3,
            playAreaHeight: 3,
            playArea: [],
            snake: {},
            food: [{x: 5, y: 5}, {x:6, y:6}, {x:7, y:7}, {x:8, y:8}],
            score: 0,
            gameLoop: null,
        };
    },
    computed: {
        
    },
    mounted() {
        this.initGame();
        window.addEventListener('keydown', this.handleKeydown);
        this.scheduleNextMove();
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
        clearInterval(this.gameLoop);
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
        initGame() {
            this.score = 0;
            this.snake = {
                body: [{x: Math.floor(this.playAreaWidth/2), y: Math.floor(this.playAreaHeight/2), borderRadius: `1rem 1rem 1rem 1rem`}],
                direction: {x: 0, y: 0},
            };
            this.food = []; 
            this.addFood();
        },
        scheduleNextMove() {
            clearTimeout(this.gameLoop);
            this.gameLoop = setTimeout(() => {
                this.afterMove();
                this.scheduleNextMove();
            }, 500);
        },
        moveLeft() {
            if (this.snake.direction.x !== 1) 
            { 
                this.snake.direction = {x: -1, y: 0};
                this.afterMove();
            }
        },
        moveRight() {
            if (this.snake.direction.x !== -1) 
            {
                this.snake.direction = {x: 1, y: 0};
                this.afterMove();
            }
        },
        moveUp() {
            if (this.snake.direction.y !== 1) 
            {
                this.snake.direction = {x: 0, y: -1};
                this.afterMove();
            }
        },
        moveDown() {
            if (this.snake.direction.y !== -1) 
            {
                this.snake.direction = {x: 0, y: 1};
                this.afterMove();
            }
        },
        addFood() {
            let newFood = {};
            do {
                newFood = {
                    x: Math.floor(Math.random() * this.playAreaWidth),
                    y: Math.floor(Math.random() * this.playAreaHeight),
                };
                console.log("newFood", newFood.x, newFood.y);
                // check if food is on snake body
                if(this.snake.body.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
                    console.log("food on snake body", newFood.x, newFood.y);
                    continue;
                }
                // check if food is on other food
                if(this.food.some(f => f.x === newFood.x && f.y === newFood.y)) {
                    console.log("food on other food", newFood.x, newFood.y);
                    continue;
                }
                break;
            } while (
                true
            );
            this.food.push(newFood);   
            // change for extra food
            if( Math.random()*this.food.length < 0.1 ) // chance of extra food = 10%
            {
                this.addFood();
            }
        },

        afterMove() {
            const tailPos = {x: this.snake.body[this.snake.body.length-1].x, y: this.snake.body[this.snake.body.length-1].y};

            // move body
            for(let i = this.snake.body.length - 1; 
                i > 0; i--) {
                this.snake.body[i].x = this.snake.body[i-1].x;
                this.snake.body[i].y = this.snake.body[i-1].y;
                this.snake.body[i].borderRadius = this.snake.body[i-1].borderRadius;
            }

            // move head
            this.snake.body[0].x += this.snake.direction.x;
            this.snake.body[0].y += this.snake.direction.y;

            // food
            for (let i = 0; i < this.food.length; i++) {
                if (this.snake.body[0].x === this.food[i].x && this.snake.body[0].y === this.food[i].y) {
                    this.score += 1;
                    this.snake.body.push({
                        x: tailPos.x,
                        y: tailPos.y, 
                        borderRadius: `1rem 1rem 1rem 1rem`});
                    this.food.splice(i, 1);
                    this.addFood();
                    break;
                }
            }
            
            // loose
            if (this.snake.body[0].x < 0 || this.snake.body[0].x >= this.playAreaWidth || this.snake.body[0].y < 0 || this.snake.body[0].y >= this.playAreaHeight) {
                this.gameOver();
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
            if(this.snake.body.length > 2)
            {
                // the second segment of a snake should have border radious on corner if turning
                let dx1 = this.snake.body[1].x - this.snake.body[0].x;
                let dy1 = this.snake.body[1].y - this.snake.body[0].y;
                let dx2 = this.snake.body[2].x - this.snake.body[1].x;
                let dy2 = this.snake.body[2].y - this.snake.body[1].y;

                if (dy1 == 0 && dy2 == 0 || dx1 == 0 && dx2 == 0) {
                    this.snake.body[1].borderRadius = `0`;

                } else if (dx1 == 1 && dy2 == 1 || dy1 == -1 && dx2 == -1) {
                    this.snake.body[1].borderRadius = `0 1rem 0 0`;
                } else if (dx1 == 1 && dy2 == -1 || dy1 == 1 && dx2 == -1) {
                    this.snake.body[1].borderRadius = `0 0 1rem 0`;
                } else if (dx1 == -1 && dy2 == -1 || dy1 == 1 && dx2 == 1) {
                    this.snake.body[1].borderRadius = `0 0 0 1rem`;
                } else if (dx1 == -1 && dy2 == 1 || dy1 == -1 && dx2 == 1) {
                    this.snake.body[1].borderRadius = `1rem 0 0 0`;

                } else {
                    this.snamek.body[1].borderRadius = `100%`;
                }
                
            }


            // tail
            if(this.snake.body.length > 1)
            {
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

            this.scheduleNextMove();
        },
        gameOver() {
            this.score = 0;
            this.snake.body = [{x: Math.floor(this.playAreaWidth/2), y: Math.floor(this.playAreaHeight/2), borderRadius: `1rem 1rem 1rem 1rem`}],
            this.snake.direction = {x: 0, y: 0};
            this.food = [];
            this.addFood();
        }
    },
    computed: {
    },
};
</script>
<style scoped>

#Snake {
    --cellSize: 2.5rem;
    --gapSize: 0px;

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
.food, .segment {
    background-color: var(--bgColor, #444);

    display: flex;
    align-items: center;
    justify-content: center;

    aspect-ratio: 1;

    width: var(--cellSize);
    height: var(--cellSize);

    overflow: visible;
}
.segment {
    --bgColor: #0cc167;

    position: absolute;
    top: calc(var(--y) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));
    left: calc(var(--x) * (var(--cellSize) + var(--gapSize)) + var(--gapSize));

    transition: top 0.125s, left 0.125s, border-radius 0.25s;

    border-radius: var(--borderRadius, 0);
}

.segment.even {
    --bgColor: #0cc167;
}
.segment.odd {
    --bgColor: #00d26a;
}
.segment.tail {
    --bgColor: #0abd72 !important;
}
.segment.head {
    --bgColor: #d8d520 !important;
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
