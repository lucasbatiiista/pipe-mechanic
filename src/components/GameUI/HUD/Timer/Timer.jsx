import React, { useState, useEffect } from 'react';

// STYLES
import './timer.less';

// COMPONENTS

export default function Timer({
  displayTime,
  earnedSeconds,
  popupDisplayTime
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
      }, popupDisplayTime)
    }
  }, [earnedSeconds])


  return (
    <div className="hud-timer">
      Tempo restante: {displayTime}

      <div className={`popup-timer ${isPopupVisible ? 'active' : ''}`}>
        <p className="popup-timer-text">Você ganhou {displayEarnedSeconds ? displayEarnedSeconds : '0'} segundos</p>
      </div>
    </div>
  )
}