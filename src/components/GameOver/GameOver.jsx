import React, { useState, useEffect } from 'react';

// STYLES
import './game-over.less';

export default function GameOver({
  stage,
  gameOver,
  resetGame
}) {
  const [modal, setModal] = useState(null);

  // USE EFFECT
  useEffect(() => {
    if (gameOver) {
      setModal(
        <>
          <div className='game-over-overlay'></div>
          <div className='game-over shadow-lg'>
            <p className='game-over-header'>Fim do Jogo!</p>
            <p>Você chegou na fase:</p>
            <p className='game-over-stage-counter'>{stage}</p>
            <button className='btn' type='button' onClick={resetGame}>Tentar novamente!</button>
          </div>
        </>
      );
    } else {
      setModal(null);
    }
  }, [gameOver])

  return (
    modal
  )
}