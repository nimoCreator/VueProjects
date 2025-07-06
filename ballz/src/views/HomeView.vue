<template>
    <div class="home">
      <div class="content">
        <h1>Gra Kulki</h1>
        <p>Zepchnij przeciwnika z platformy i zbieraj punkty!</p>
        <button @click="startGame">Rozpocznij grę</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
    methods: {
      startGame() {
        this.$router.push('/setup');
      }
    }
  }
  </script>
  
  <style scoped>
  .home {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #2c3e50;
    color: white;
  }
  
  .content {
    text-align: center;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  </style>