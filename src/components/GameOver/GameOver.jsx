import React from 'react';

// STYLES
import './game-over.less';

export default function GameOver({
  stage,
  gameOver,
  resetGame
}) {

  return (
    gameOver && (
      <>
        <div className='game-over-overlay'></div>
        <div className='game-over'>
          <p className='game-over-header'>Fim do Jogo!</p>
          <p>Você chegou na fase:</p>
          <p className='game-over-stage-counter'>{stage}</p>
          <button className='btn' type='button' onClick={resetGame}>Tentar novamente!</button>
        </div>
      </>
    )
  )
}