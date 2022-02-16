import React from 'react';

// STYLES
import './turn-counter.less';

// COMPONENTS

export default function TurnCounter({ turns }) {

  return (
    <div className="hud-turn-counter">
      Jogadas: {turns}
    </div>
  )
}