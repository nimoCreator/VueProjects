<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: Lato, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background: #000;
    color: #fff;

    color-scheme: dark;
  }



  .displayControls {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    background-color: #111;
    border-bottom: 2px solid #222;
  }
  .displayControls button {
    background-color: #222;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
  }
  .displayControls button:hover {
    background-color: #333;
  }
</style>

