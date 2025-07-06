<template>
    <div class="game">
      <GameScene 
        :player1Name="player1Name" 
        :player2Name="player2Name"
        @game-over="handleGameOver"
      />
      <ScoreBoard 
        :player1Name="player1Name" 
        :player2Name="player2Name"
        :player1Score="player1Score"
        :player2Score="player2Score"
      />
      <div class="game-controls">
        <button @click="exitGame">Powrót do menu</button>
        <button @click="restartGame">Nowa runda</button>
      </div>
    </div>
  </template>
  
  <script>
  import GameScene from '../components/GameScene.vue';
  import ScoreBoard from '../components/ScoreBoard.vue';
  
  export default {
    name: 'GameView',
    components: {
      GameScene,
      ScoreBoard
    },
    data() {
      return {
        player1Score: 0,
        player2Score: 0
      }
    },
    props: {
      player1Name: {
        type: String,
        default: 'Gracz 1'
      },
      player2Name: {
        type: String,
        default: 'Gracz 2'
      }
    },
    methods: {
      handleGameOver(winner) {
        if (winner === 1) {
          this.player1Score++;
        } else if (winner === 2) {
          this.player2Score++;
        }
      },
      exitGame() {
        this.$router.push('/');
      },
      restartGame() {
        // Refreshing the component to restart the game
        this.$forceUpdate();
        // Emit an event that the GameScene component can listen to
        this.$nextTick(() => {
          const gameScene = this.$children.find(c => c.$options.name === 'GameScene');
          if (gameScene) {
            gameScene.resetGame();
          }
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .game {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .game-controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    display: flex;
    gap: 10px;
  }
  </style>
  