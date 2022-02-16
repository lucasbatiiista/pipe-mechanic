import React from 'react';

// STYLES
import './hud.less';

// COMPONENTS
import StageCounter from './StageCounter';
import TurnCounter from './TurnCounter';
import Timer from './Timer';

export default function HUD({
  turns,
  stage,
  displayTime,
  earnedSeconds
}) {

  return (
    <div className="hud">
      <h1 className='hud__title'>Pipe Mechanic</h1>
      <StageCounter stage={stage} />
      <TurnCounter turns={turns} />
      <Timer
        displayTime={displayTime}
        earnedSeconds={earnedSeconds}
        popupDisplayTime={1500}
      />
    </div>
  )
}