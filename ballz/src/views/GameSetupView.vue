<template>
    <div class="setup">
      <div class="setup-form">
        <h1>Konfiguracja gry</h1>
        
        <div class="player-setup">
          <h2>Gracz 1 (WSAD)</h2>
          <input v-model="player1Name" placeholder="Wprowadź nazwę gracza 1" />
        </div>
        
        <div class="player-setup">
          <h2>Gracz 2 (Strzałki)</h2>
          <input v-model="player2Name" placeholder="Wprowadź nazwę gracza 2" />
        </div>
        
        <button @click="startGame" :disabled="!isFormValid">Rozpocznij grę</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GameSetupView',
    data() {
      return {
        player1Name: '',
        player2Name: ''
      }
    },
    computed: {
      isFormValid() {
        return this.player1Name.trim() && this.player2Name.trim();
      }
    },
    methods: {
      startGame() {
        if (this.isFormValid) {
          this.$router.push({
            name: 'game',
            params: {
              player1Name: this.player1Name,
              player2Name: this.player2Name
            }
          });
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .setup {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #2c3e50;
    color: white;
  }
  
  .setup-form {
    width: 400px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
  
  .player-setup {
    margin-bottom: 20px;
  }
  
  h2 {
    margin: 10px 0;
  }
  </style>