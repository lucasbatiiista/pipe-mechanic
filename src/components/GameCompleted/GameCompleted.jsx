import React from 'react';

// STYLES
import './game-completed.less';

export default function GameCompleted({
  earnedReward,
  gameCompleted,
  resetGame
}) {

  return (
    gameCompleted && (
      <>
        <div className='game-completed-overlay'></div>
        <div className='game-completed'>
          <p className='game-completed-header'>Você completou o jogo!</p>
          <p>Você ganhou:</p>
          <p className='game-completed-stage-counter'>{earnedReward.title}</p>
          <p className='game-completed-stage-counter'>{earnedReward.points}</p>
          <button className='btn' type='button' onClick={resetGame}>Jogar novamente!</button>
        </div>
      </>
    )
  )
}