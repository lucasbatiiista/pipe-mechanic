import React from 'react';

// STYLES
import './stage-counter.less';

// COMPONENTS

export default function StageCounter({ stage }) {

  return (
    <div className="hud-stage-counter col-4">
      Fase: {stage}
    </div>
  )
}