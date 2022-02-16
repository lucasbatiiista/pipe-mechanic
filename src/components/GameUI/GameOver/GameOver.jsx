import React from 'react';

// STYLES
import './game-over.less';

export default function GameOver({
  stage,
  earnedReward,
  gameOver,
  resetGame
}) {

  return (
    gameOver && (
      <>
        <div className='game-over-overlay'></div>
        <div className='game-over'>
          <div className='game-over-header'>Seu tempo acabou!</div>

          <div className='game-over-content'>
            <p>Você chegou até a <strong>fase {stage}</strong></p>

            <div className='game-over-content-rewards'>
              <p className='game-over-content-rewards__title'>Você ganhou: </p>

              <p className='game-over-stage-counter'>{earnedReward.title}</p>
              <p className='game-over-stage-counter'>({earnedReward.points} pontos)</p>
            </div>
          </div>

          <div className='game-over-footer'>
            <button className='btn' type='button' onClick={resetGame}>Tentar novamente!</button>
          </div>
        </div>
      </>
    )
  )
}