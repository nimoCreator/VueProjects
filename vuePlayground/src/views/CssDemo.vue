<template>
    <div id="css-demo">
        <h1>Flex</h1>
        <pre>

        </pre>
        <div class="resizable" :style="flex1">
            <div class="box">Box 1</div>
            <div class="box">Box 2</div>
            <div class="box">Box 3</div>
            <div class="box">Box 4</div>
            <div class="box">Box 5</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    #css-demo {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .resizable {
        width: 25rem;
        border: 0.25rem #00aaff solid;
        padding: 1rem;
        border-radius: 0.25rem;
        overflow: hidden;
        resize: both;
        justify-content: space-between;
    }
    .box {
        width: 3rem;
        height: 3rem;
        background-color: #fff;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>