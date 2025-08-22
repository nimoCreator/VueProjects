<template>
    <div class="sketches">
        <div class="sketch loadingDots1">
            <div class="dot" style="--i: 1;"></div>
            <div class="dot" style="--i: 2;"></div>
            <div class="dot" style="--i: 3;"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CssFuns',
    data() {
        return {};
    },
}
</script>

<style scoped>
    .sketches {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .sketch {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loadingDots1 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.125rem;

        position: relative;
    }

    .dot {
        --i: 1;

        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: white;
        position: absolute;

        animation: dot 0.8s infinite;
        animation-delay: calc(0.15s * var(--i));

        left: calc(1rem * var(--i));
    }


    @keyframes dot {
        0%,
        100%,
        75% {
            top: 0;
        }
        50% {
            top: 1rem;
        }
    }
</style>