<template>

<div>
    <h1>Funny Math Question</h1>
    <div class="formula">
        <span class="digit">{{ a }}</span>
        <span class="fraction">
            <span class="digit">{{ b }}</span>
            <span class="digit">{{ c }}</span>
        </span>
        <span class="operator spacious">+</span>
        <span class="digit">{{ d }}</span>
        <span class="fraction">
            <span class="digit">{{ e }}</span>
            <span class="digit">{{ f }}</span>
        </span>
         <span class="operator spacious">=</span>
        <span class="digit">{{ g }}</span>
        <span class="fraction">
            <span class="digit">{{ h }}</span>
            <span class="digit">{{ i }}</span>
        </span>
    </div>
    <div class="formula">
        <span class="digit">{{ a }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ c }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ f }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ i }}</span>
        <span class="operator spacious">+</span>
        <span class="digit">{{ b }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ f }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ i }}</span>
        <span class="operator spacious">+</span>
        <span class="digit">{{ c }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ d }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ f }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ i }}</span>
        <span class="operator spacious">+</span>
        <span class="digit">{{ c }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ e }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ i }}</span>
        <span class="operator spacious">=</span>
        <span class="digit">{{ c }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ f }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ g }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ i }}</span>
        <span class="operator spacious">+</span>
        <span class="digit">{{ c }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ f }}</span>
        <span class="operator">∙</span>
        <span class="digit">{{ h }}</span>
    </div>
    <div class="foundSolutions">
        <button @click="todo = 362_880; findSolutions()">Find Solutions</button>
        <template v-if="todo > 0">
            <p>Searching for solutions... {{ todo }} left</p>
        </template>
        <div class="tableWrapper">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>a</th>
                        <th>b</th>
                        <th>c</th>
                        <th>d</th>
                        <th>e</th>
                        <th>f</th>
                        <th>g</th>
                        <th>h</th>
                        <th>i</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(solution, i) in solutions" :key="solution.id" @click="selectSolution(solution)" :class="{ proper: solution.proper, improper: !solution.proper }">
                        <td>{{ i }}</td>
                        <td>{{ solution.a }}</td>
                        <td>{{ solution.b }}</td>
                        <td>{{ solution.c }}</td>
                        <td>{{ solution.d }}</td>
                        <td>{{ solution.e }}</td>
                        <td>{{ solution.f }}</td>
                        <td>{{ solution.g }}</td>
                        <td>{{ solution.h }}</td>
                        <td>{{ solution.i }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="formula">
            proper solutions count: {{ solutionsCount.proper }}
        </div>
        <div class="formula">
            improper solutions count: {{ solutionsCount.improper }}
        </div>
        <div class="formula">
            total solutions count: {{ solutionsCount.total }}
        </div>
        <div class="formula">
            out of 362 880 possible combinations of digits 1-9 without repetition
        </div>
    </div>
</div>

</template>
<script>

export default {
    data() {
        return {
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd',
            e: 'e',
            f: 'f',
            g: 'g',
            h: 'h',
            i: 'i',
            solutions: [],
            todo: 0,
            solutionsCount: {
                total: 0,
                proper: 0,
                improper: 0,
            }
        }
    },
    methods: {
        verifySolution(solution) {
            const { a, b, c, d, e, f, g, h, i } = solution
            return (a * c * f * i + b * f * i + c * d * f * i + c * e * i - c * f * g * i - c * f * h === 0)
        },
        findSolutions(solution, digits) {
            this.todo--;

            if (!solution) {
                solution = { a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null, i: null }
            } else if (solution.a && solution.b && solution.c && solution.d && solution.e && solution.f && solution.g && solution.h && solution.i) {
                if (this.verifySolution(solution)) {
                    if(this.isSolutionProper(solution)) {
                        this.solutionsCount.proper++;
                        this.solutionsCount.total++;
                        solution.proper = true;
                    } else {
                        this.solutionsCount.improper++;
                        this.solutionsCount.total++;
                        solution.proper = false;
                    }
                    this.solutions.push(solution)
                }
                return
            }

            if (!digits) {
                digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            }

            for (let d of digits) {
                let newDigits = digits.filter(x => x !== d)
                let nextSolution = { ...solution }
                for (let key in nextSolution) {
                    if (nextSolution[key] === null) {
                        nextSolution[key] = d
                        break
                    }
                }
                this.findSolutions(nextSolution, newDigits)
            }
        },
        selectSolution(solution) {
            this.a = solution.a
            this.b = solution.b
            this.c = solution.c
            this.d = solution.d
            this.e = solution.e
            this.f = solution.f
            this.g = solution.g
            this.h = solution.h
            this.i = solution.i
        },
        isSolutionProper(solution) {
            return solution.b < solution.c && solution.e < solution.f && solution.h < solution.i;
        }
    }
}


</script>

<style scoped>
.tableWrapper {
    max-height: 50vh;
    overflow: auto;
}
table {
    margin-inline: auto;
    border-collapse: collapse;
}
table, th, td {
    border: 1px solid currentColor;
}
th, td {
    padding: 0.5rem;
}
.formula {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
}
.digit {
    display: inline-block;
    text-align: center;
}
.fraction {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 0 0.5rem;

    position: relative;
}
.fraction:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 0.25rem;
    background-color: currentColor;
}

.improper {
    background-color: rgba(255, 0, 0, 0.2);
}
.proper {
    background-color: rgba(0, 255, 0, 0.2);
}
</style>