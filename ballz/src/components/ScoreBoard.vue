
<template>
    <div class="scoreboard">
      <div class="player-score">
        <span class="player-name">{{ player1Name }}</span>
        <span class="score">{{ player1Score }}</span>
      </div>
      <div class="vs">VS</div>
      <div class="player-score">
        <span class="player-name">{{ player2Name }}</span>
        <span class="score">{{ player2Score }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ScoreBoard',
    props: {
      player1Name: String,
      player2Name: String,
      player1Score: Number,
      player2Score: Number
    }
  }
  </script>
  
  <style scoped>
  .scoreboard {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    z-index: 100;
  }
  
  .player-score {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
  }
  
  .player-name {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .score {
    font-size: 24px;
    font-weight: bold;
  }
  
  .vs {
    font-size: 20px;
    font-weight: bold;
  }
  </style>