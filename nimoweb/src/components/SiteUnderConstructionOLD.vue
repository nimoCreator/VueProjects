<template>
    <div id="container">
        <div class="corner"></div>
        <div class="corner"></div>
        <div class="corner"></div>
        <div class="corner"></div>

        <div class="center">
            <div class="topHalf">

<pre style="font-family: monospace; line-height: 1.4;">
<span style="color: gray;">&lt;template&gt;</span>
  <span style="color: lightgreen;">&lt;div</span> <span style="color: orange;">class</span>=<span style="color: gold;">"mysterious-box"</span> <span style="color: orange;">@click</span>=<span style="color: gold;">"toggleQuantumState"</span><span style="color: lightgreen;">&gt;</span>
    <span style="color: lightgreen;">&lt;span</span> <span style="color: orange;">v-if</span>=<span style="color: gold;">"isCatAlive"</span><span style="color: lightgreen;">&gt;</span>🐱 The cat is alive.<span style="color: lightgreen;">&lt;/span&gt;</span>
    <span style="color: lightgreen;">&lt;span</span> <span style="color: orange;">v-else</span><span style="color: lightgreen;">&gt;</span>💀 The cat is... not.<span style="color: lightgreen;">&lt;/span&gt;</span>
    <span style="color: lightgreen;">&lt;p&gt;</span>Status: <span style="color: lightblue;">{{ quantumState }}</span><span style="color: lightgreen;">&lt;/p&gt;</span>
    <span style="color: lightgreen;">&lt;button&gt;</span>Collapse Reality<span style="color: lightgreen;">&lt;/button&gt;</span>
  <span style="color: lightgreen;">&lt;/div&gt;</span>
<span style="color: gray;">&lt;/template&gt;</span>

<span style="color: gray;">&lt;script&gt;</span>
<span style="color: lightblue;">export default</span> {
  <span style="color: lightblue;">name</span>: <span style="color: gold;">'SchrodingerBox'</span>,
  <span style="color: lightblue;">data()</span> {
    <span style="color: lightblue;">return</span> {
      <span style="color: gold;">quantumState</span>: <span style="color: gold;">'superposition'</span>,
      <span style="color: gold;">isCatAlive</span>: <span style="color: violet;">Math.random()</span> &gt; <span style="color: orange;">0.5</span>,
    }
  },
  <span style="color: lightblue;">methods</span>: {
    <span style="color: lightblue;">toggleQuantumState()</span> {
      <span style="color: violet;">this.isCatAlive</span> = !<span style="color: violet;">this.isCatAlive</span>
      <span style="color: violet;">this.quantumState</span> = <span style="color: violet;">this.isCatAlive</span> ? <span style="color: gold;">'alive-ish'</span> : <span style="color: gold;">'dead-ish'</span>
    }
  },
  <span style="color: lightblue;">mounted()</span> {
    <span style="color: violet;">console.log</span>(<span style="color: gold;">"Observation collapses the wave function. Good luck."</span>)
  }
}
<span style="color: gray;">&lt;/script&gt;</span>

<span style="color: gray;">&lt;style scoped&gt;</span>
.mysterious-box {
  <span style="color: orange;">padding</span>: <span style="color: lightblue;">2rem</span>;
  <span style="color: orange;">border</span>: <span style="color: lightblue;">2px dashed #999</span>;
  <span style="color: orange;">text-align</span>: center;
  <span style="color: orange;">background</span>: repeating-linear-gradient(
    45deg,
    #e0e0e0,
    #e0e0e0 10px,
    #f8f8f8 10px,
    #f8f8f8 20px
  );
  <span style="color: orange;">transition</span>: all 0.42s ease-in-out;
}
.mysterious-box:hover {
  <span style="color: orange;">transform</span>: scale(1.03) rotate(0.5deg);
}
<span style="color: gray;">&lt;/style&gt;</span>
</pre>


            </div>
            <div class="bottomHalf" />
            <div class="icon">
                <span class="material-symbols-outlined">{{ icon }}</span>
            </div>
            <span class="title">{{ title }}.vue</span>
        </div>
        <div class="disclaimer">
            Sorry! <br>
            This page is still under construction. <br>
            Look out for updates in the <router-link to="/blog">blog</router-link> <br>
            or any of my socialmedias, check the links in the <router-link to="/contact">contact page</router-link>.
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            title: {
                type: String,
                default: 'page',
            },
            icon: {
                type: String,
                default: 'construction',
            },
        },
    }
</script>


<style scoped>
    #container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .corner {
        --distance: 2rem;
        --size: 6rem;
        --borderStyle: dashed 0.5rem var(--grayDark);
        position: absolute;
        width: var(--size);
        height: var(--size);
    }

    .corner:nth-child(1) {
        top: var(--distance);
        left: var(--distance);
        border-top: var(--borderStyle);
        border-left: var(--borderStyle);
        border-radius: 0.5rem 0 0 0;
    }

    .corner:nth-child(2) {
        top: var(--distance);
        right: var(--distance);
        border-top: var(--borderStyle);
        border-right: var(--borderStyle);
        border-radius: 0 0.5rem 0 0;
    }

    .corner:nth-child(3) {
        bottom: var(--distance);
        left: var(--distance);
        border-bottom: var(--borderStyle);
        border-left: var(--borderStyle);
        border-radius: 0 0 0 0.5rem;
    }

    .corner:nth-child(4) {
        bottom: var(--distance);
        right: var(--distance);
        border-bottom: var(--borderStyle);
        border-right: var(--borderStyle);
        border-radius: 0 0 0.5rem 0;
    }

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
    }

    .topHalf,
    .bottomHalf {
        width: calc(var(--minUnit) * 20);
    }

    .topHalf {
        position: absolute;
        top: 0;
        border-radius: var(--minUnit) calc(var(--minUnit) * 5) 0 0;
        border: solid 0.5rem var(--grayDark);
        border-bottom: none;
        animation: animateheight 3s ease-in-out infinite alternate;
        background-color: var(--darkDark);

        padding: 1rem;
        word-break: break-all;
        overflow: hidden;
        font-size: calc(var(--minUnit) * 0.25);
    }

    .bottomHalf {
        height: calc(var(--minUnit) * 28);
        border-radius: var(--minUnit) calc(var(--minUnit) * 5) var(--minUnit) var(--minUnit);
        border: dashed 0.5rem var(--grayDark);
        border-top: none;
    }

    @keyframes animateheight {

        0%,
        100% {
            height: calc(var(--minUnit) * 25);
        }

        50% {
            height: calc(var(--minUnit) * 8);
        }
    }

    .center .icon {
        position: absolute;
        color: var(--darkLight);
    }

    .icon span {
        font-size: calc(var(--minUnit) * 15);
    }

    .center .title {
        color: var(--darkLight);
        font-size: calc(var(--minUnit) * 1.5);
        font-weight: 700;
    }
</style>