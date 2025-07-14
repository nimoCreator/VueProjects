<template>
    <div id="constructionContainer">
        <waveAnimation delay="-10" />

        <div class="codePreview">
            <div class="windowHeader">
                <div class="windowControls">
                    <span class="material-symbols-outlined">code</span>
                    <span>File</span>
                    <span>Edit</span>
                    <span>Raccoons</span>
                </div>
                <div class="windowTitle">{{ title }}.vue</div>
            </div>
<pre class="codeContent">
<span class="tag">&lt;template&gt;</span>
    <span class="tag">&lt;div</span> <span class="property">class</span>=<span class="value">"mysterious-box"</span> <span class="property">@click</span>=<span class="value">"toggleQuantumState"</span><span class="tag">&gt;</span>
        <span class="tag">&lt;span</span> <span class="property">v-if</span>=<span class="value">"isCatAlive"</span><span class="tag">&gt;</span>🐱 The cat is alive.<span class="tag">&lt;/span&gt;</span>
        <span class="tag">&lt;span</span> <span class="property">v-else</span><span class="tag">&gt;</span>💀 The cat is... not.<span class="tag">&lt;/span&gt;</span>
        <span class="tag">&lt;p&gt;</span>Status: <span class="method">{{ quantumState }}</span><span class="tag">&lt;/p&gt;</span>
        <span class="tag">&lt;button&gt;</span>Collapse Reality<span class="tag">&lt;/button&gt;</span>
    <span class="tag">&lt;/div&gt;</span>
<span class="tag">&lt;/template&gt;</span>

<span class="tag">&lt;script&gt;</span>
<span class="method">export default</span> {
    <span class="method">name</span>: <span class="value">'SchrodingerBox'</span>,
    <span class="method">data()</span> {
        <span class="method">return</span> {
            <span class="value">quantumState</span>: <span class="value">'superposition'</span>,
            <span class="value">isCatAlive</span>: <span class="code">Math.random()</span> &gt; <span class="property">0.5</span>,
        }
    },
    <span class="method">methods</span>: {
        <span class="method">toggleQuantumState()</span> {
            <span class="code">this.isCatAlive</span> = !<span class="code">this.isCatAlive</span>
            <span class="code">this.quantumState</span> = <span class="code">this.isCatAlive</span> ? <span class="value">'alive-ish'</span> : <span class="value">'dead-ish'</span>
        }
    },
    <span class="method">mounted()</span> {
    <span class="code">console.log</span>(<span class="value">"Observation collapses the wave function. Good luck."</span>)
    }
}
<span class="tag">&lt;/script&gt;</span>

<span class="tag">&lt;style scoped&gt;</span>
    .mysterious-box {
        <span class="property">padding</span>: <span class="method">2rem</span>;
        <span class="property">border</span>: <span class="method">2px dashed #999</span>;
        <span class="property">text-align</span>: center;
    }
<span class="tag">&lt;/style&gt;</span>
</pre>
        </div>

        <div class="mainContent">
            <div class="header">
                <div class="icon">
                    <div class="rings">
                        <span v-for="(ringColor, i) in ringColors" :key="i" :style="{ '--i': i, 'background': ringColor }" class="ring"></span>
                    </div>
                    <div class="iconCon">
                        <span class="material-symbols-outlined constructionIcon">{{ icon }}</span>
                    </div>
                </div>
                <h1 class="pageTitle">
                    <span class="title">{{ title }}</span>
                    <span class="titleExtension">.vue</span>
                </h1>
            </div>

            <!-- Message section -->
            <div class="messageSection">
                <div class="messageCard">
                    <div class="messageIcon">
                        <span class="material-symbols-outlined">architecture</span>
                    </div>
                    <div class="messageContent">
                        <h3>{{ $t('construction.title') }}</h3>
                        <p>{{ $t('construction.description') }}</p>
                        <div class="messageActions">
                            <router-link to="/blog" class="actionLink primary">
                                <span class="material-symbols-outlined">article</span>
                                {{ $t('navigation.blog') }}
                            </router-link>
                            <router-link to="/contact" class="actionLink secondary">
                                <span class="material-symbols-outlined">contact_page</span>
                                {{ $t('navigation.links') }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="breadCard">
                <h3>{{ $t('construction.bread') }}</h3>
                <img src="@/assets/img/bread.png" alt="Bread" />
            </div>
        </div>
    </div>
</template>

<script>

import WaveAnimation from '@/components/HeroPage/WaveAnimation.vue';

export default {
    name: 'UnderConstruction',
    components: {
        WaveAnimation
    },
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
    data() {
        return {
            ringColors: ['#00AAFF', '#00FFAA', '#55FF00', '#AAFF00', '#FFFF00'],
        };
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped>
/* Base container */
#constructionContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--black) 0%, var(--darkDark) 100%);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

/* Main content */
.mainContent {
    height: 100%;
    position: relative;
    z-index: 10;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
}

/* #region HEADER SECTION */

.header {
    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.icon {
    position: relative;
    width: 4rem;
    height: 4rem;

    display: flex;
    justify-content: center;
    align-items: center;
}

.animationsOn .icon {
    animation: fadeInUp 2s 1s ease-out both;
}

.rings {
    position: absolute;
    width: 4rem;
    height: 4rem;

    display: flex;
    justify-content: center;
    align-items: center;
}

.rings .ring {
    position: absolute;
    width: 4rem;
    height: 4rem;
    border-radius: 42.5% 50% 50% 50%;
    border: 1px solid black;
    border-width: 0px 1px 1px 0px;


    background: -webkit-radial-gradient(bottom right, #00000000, #00000000 70%, #00AAFF 71%, #00AAFF);
    background: -moz-radial-gradient(bottom right, #00000000, #00000000 70%, #00AAFF 71%, #00AAFF);
    background: radial-gradient(to top left, #00000000, #00000000 70%, #00AAFF 71%, #00AAFF);

    will-change: transform;
    transform: rotate(calc(30deg * var(--i) - 80deg) );
}

.animationsOn .rings .ring {
    animation: spin 2s cubic-bezier(.25, 0.01, .75, .99) calc(0.4s - 0.1s * var(--i)) infinite, huespin 4.1s linear calc(0.1s + 0.1s * var(--i)) infinite, appearspan var(--skip, 1.5s) ease-in var(--skip, calc(1.2s - 0.2s * var(--i))) both;
}

.iconCon {
    background: var(--panelBackground);
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.0625rem solid var(--panelBorder);;

    z-index: 10;
}

.constructionIcon {
    font-size: 3rem;
    color: var(--panelTextColor);
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes appearspan {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 0.5;
    }
}

@keyframes huespin {
    0% {
        background: #00aaff;
    }

    10% {
        background: #00ffaa;
    }

    20% {
        background: #00ff55;
    }

    30% {
        background: #55ff00;
    }

    40% {
        background: #aaff00;
    }

    50% {
        background: #ffff00;
    }

    60% {
        background: #ffaa00;
    }

    70% {
        background: #ff5500;
    }

    80% {
        background: #ff0055;
    }

    90% {
        background: #aa00ff;
    }

    100% {
        background: #00aaff;
    }
}


.pageTitle {
    font-size: 3rem;
    font-weight: 300;
    color: var(--lightLight);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.animationsOn .title {
    animation: fadeInUp 2s 1.2s ease-out both;
}

.titleExtension {
    color: var(--lightDark);
    font-size: 2.5rem;
}
.animationsOn .titleExtension {
    animation: fadeInUp 2s 1.5s ease-out both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* #region CODE PREVIEW */

.codePreview {

    position: absolute;
    z-index: -1;

    width: clamp(50vw, 50rem, 75vw);

    background: var(--panelBackground);
    border-radius: 12px;
    border: 1px solid var(--panelBorder);;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    filter: blur(0.5rem);
}
.animationsOn .codePreview {
    animation: blurOut 2s 0.5s ease-out both;
}

@keyframes blurOut {
    from {
        filter: blur(0);
    }

    to {
        filter: blur(0.5rem);
    }
}

.windowHeader {
    background: var(--panelBorder);;
    padding: 1rem 2rem 1rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.windowControls {
    display: flex;
    gap: 1rem;
    color: var(--panelTextColor);
}

.windowControls .material-symbols-outlined {
    color: var(--panelTextColor);
}

.windowTitle {
    color: var(--panelTextColor);
    font-size: 0.9rem;
    font-weight: 500;
}

.codeContent {
    background: var(--black);
    color: var(--lightLight);

    padding: 1.5rem;
    margin: 0;

    max-height: 300px;
    overflow-y: auto;

    font-family: 'Fira Code', monospace;
    font-size: 0.25rem;
    line-height: 0.5rem;
}

pre .tag {
    color: var(--blue);
}

pre .property {
    color: var(--orange);
}

pre .value {
    color: var(--teal);
}

pre .method {
    color: var(--yellow);
}

pre .code {
    color: var(--cyan);
}

/* #endregion CODE PREVIEW */

/* #region MESSAGE SECTION */

.messageSection {
    width: 100%;
    max-width: 600px;
}
.animationsOn .messageSection {
    animation: fadeInUp 1s ease-out 1.6s both;
}

.messageCard {
    background: var(--panelBackground);
    border-radius: 16px;
    border: 1px solid var(--panelBorder);;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    gap: 1.5rem;
}

.messageIcon {
    flex-shrink: 0;
}

.messageIcon span {
    color: var(--panelTextColor);
    font-size: 2rem;
}

.messageContent h3 {
    color: var(--panelTextColor);
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 500;
}

.messageContent p {
    color: var(--panelTextColor);
    margin: 0 0 1.5rem 0;
    line-height: 1.6;
}

.messageActions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.actionLink {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.actionLink.primary {
    background: linear-gradient(135deg, #00aaff, #0080ff);
    color: var(--white);
}

.actionLink.secondary {
    background: transparent;
    color: var(--panelTextColor);
    border: 1px solid var(--panelBorder);;
}

.actionLink:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.actionLink.primary:hover {
    box-shadow: 0 5px 15px rgba(0, 170, 255, 0.4);
}

.actionLink span {
    font-size: 1.1rem;
}

/* #endregion MESSAGE SECTION */

/* #region BREAD CARD */

.breadCard {
    width: 100%;
    max-width: 600px;

    background: var(--panelBackground);
    border-radius: 16px;
    border: 1px solid var(--panelBorder);;
    padding: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;

    color: var(--panelTextColor);
}
.animationsOn .breadCard {
    animation: fadeInUp 1s ease-out 10s both, heightIn 1s ease-out 9s both;
}
.breadCard img {
    max-width: 160px;
}


@keyframes heightIn {
    from {
        height: 0;
    }

    to {
        height: 12rem;
    }
}


/* #endregion BREAD CARD */

/* Disable animations class */
.animationsOff * {
    animation: none !important;
    transition: none !important;
}

</style>