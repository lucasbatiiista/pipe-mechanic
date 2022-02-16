import React, { useState, useEffect } from 'react';

// STYLES
import './timer.less';

// COMPONENTS

export default function Timer({
  displayTime,
  earnedSeconds
}) {

  // GENERAL

  // REFS

  // USE STATE
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [displayEarnedSeconds, setDisplayEarnedSeconds] = useState();

  // FUNCTIONS

  // USE EFFECTS
  useEffect(() => {
    if (earnedSeconds >= 0) {
      setIsPopupVisible(true);
      setDisplayEarnedSeconds(earnedSeconds);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 1000)
    }
  }, [earnedSeconds])


  return (
    <div className="hud-timer">
      Tempo restante: {displayTime}

      <div className={`popup ${isPopupVisible ? 'active' : ''}`}>
        <p className="popup-text">Você ganhou {displayEarnedSeconds} sec.</p>
      </div>
    </div>
  )
}