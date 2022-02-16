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
          <div className='game-completed-header'>Parabéns, você venceu!</div>

          <div className='game-completed-content'>
            <div className='game-completed-content-rewards'>
              <p className='game-completed-content-rewards__title'>Você ganhou: </p>

              <p className='game-completed-stage-counter'>{earnedReward.title}</p>
              <p className='game-completed-stage-counter'>({earnedReward.points} pontos)</p>
            </div>
          </div>

          <div className='game-completed-footer'>
            <button className='btn' type='button' onClick={resetGame}>Jogar novamente!</button>
          </div>
        </div>
      </>
    )
  )
}