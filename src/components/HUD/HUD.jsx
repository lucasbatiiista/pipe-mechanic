import React from 'react';

// STYLES
import './hud.less';

// COMPONENTS
import StageCounter from './../../components/StageCounter';
import TurnCounter from './../../components/TurnCounter';
import Timer from './../../components/Timer';

export default function HUD({
  turns,
  stage,
  displayTime,
  earnedSeconds,
  onTimerTick
}) {

  return (
    <div className="hud">
      <div className="row">
        <TurnCounter turns={turns} />
        <Timer
          displayTime={displayTime}
          onTimerTick={onTimerTick}
          earnedSeconds={earnedSeconds}
        />
        <StageCounter stage={stage} />
      </div>
    </div>
  )
}