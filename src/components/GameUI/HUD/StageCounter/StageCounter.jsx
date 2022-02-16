import React from 'react';

// STYLES
import './stage-counter.less';

// COMPONENTS

export default function StageCounter({ stage }) {

  return (
    <div className="hud-stage-counter">
      Fase: {stage}
    </div>
  )
}