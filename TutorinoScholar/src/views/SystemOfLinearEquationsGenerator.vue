    <template>
        <div>
            <h1>Generator Liniowych Układów Równań</h1>
        </div>
        <div>
            <select @v-model="diff">
                <option value="easy">Łatwy</option>
                <option value="medium">Średni</option>
                <option value="hard">Trudny</option>
            </select>
            <br>
            <button @click="generateEquations">Generuj nowy</button>
            <pre>
                {{ a1 }}x + {{ b1 }}y = {{ c1 }}
                {{ a2 }}x + {{ b2 }}y = {{ c2 }}
            </pre>
            <button @click="showSolution">Sprawdź</button>
            <pre>
                x = {{ show ? x : '?' }}
                y = {{ show ? y : '?' }}
            </pre>
            <canvas v-if="show" ref="canvas" width="400" height="400"></canvas>
        </div>
    </template>

    <script>
    export default {
    name: 'System Of Linear Equations Generator',
    data() {
        return {
            a1: 0, b1: 0, c1: 0,
            a2: 0, b2: 0, c2: 0,
            x: null, y: null,
            show: false,
            diff: 'easy',
        };
    },
    methods: {
        randomNumberDifficulty() {
            switch (this.diff) {
                case 'easy': return this.randomNumber(1, 10);
                case 'medium': return this.randomNumber(-10, 10);
                case 'hard': return this.randomNumber(-20, 20);
            }
        },
        randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        generateEquations() {
            this.show = false;

            this.a1 = this.randomNumberDifficulty();
            this.b1 = this.randomNumberDifficulty();
            this.a2 = this.randomNumberDifficulty();
            this.b2 = this.randomNumberDifficulty();
            this.x = this.randomNumberDifficulty();
            this.y = this.randomNumberDifficulty();

            this.c1 = this.a1 * this.x + this.b1 * this.y;
            this.c2 = this.a2 * this.x + this.b2 * this.y;

        },
        showSolution() {
            this.show = true;

            this.drawGraph();
        },
        drawGraph() {
            
            this.show = true;
            
            const ctx = this.$refs.canvas.getContext('2d');

            // Czyścić stary wykres
            ctx.clearRect(0, 0, 400, 400);

            // Rysuj osie
            ctx.beginPath();
            ctx.moveTo(0, 200);
            ctx.lineTo(400, 200);
            ctx.moveTo(200, 0);
            ctx.lineTo(200, 400);
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // Rysowanie pierwszego równania
            const y1 = (this.c1 - this.a1 * 0) / this.b1; // Przesunięcie na osi y
            const y2 = (this.c1 - this.a1 * 400) / this.b1; // Inny punkt na wykresie

            ctx.beginPath();
            ctx.moveTo(200, 200 - y1);
            ctx.lineTo(400, 200 - y2);
            ctx.strokeStyle = 'red';
            ctx.stroke();

            // Rysowanie drugiego równania
            const y3 = (this.c2 - this.a2 * 0) / this.b2; 
            const y4 = (this.c2 - this.a2 * 400) / this.b2;

            ctx.beginPath();
            ctx.moveTo(200, 200 - y3);
            ctx.lineTo(400, 200 - y4);
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            
            // Rysowanie punktu przecięcia, jeśli istnieje
            if (this.x && this.y) {
                ctx.beginPath();
                ctx.arc(200 + this.x * 20, 200 - this.y * 20, 5, 0, 2 * Math.PI);
                ctx.fillStyle = 'green';
                ctx.fill();
            }
        },
    },
    };
    </script>

    <style scoped>
    </style>
