import React, { useState, useEffect, useRef } from 'react';

// STYLES
import './timer.less';

// COMPONENTS

export default function Timer({
  displayTime,
  onTimerTick,
  earnedSeconds
}) {

  // GENERAL

  // REFS
  let onTimerTickInterval = useRef(null);

  // USE STATE
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [displayEarnedSeconds, setDisplayEarnedSeconds] = useState();

  // FUNCTIONS
  function startTimer() {
    setIsTimerRunning(true);
    onTimerTickInterval.current = setInterval(
      () => onTimerTick(),
      1000
    )
  }

  function stopTimer() {
    setIsTimerRunning(false);
    clearInterval(onTimerTickInterval.current);
  }

  // USE EFFECTS
  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [])

  useEffect(() => {
    if (earnedSeconds >= 0) {
      setIsPopupVisible(true);
      setDisplayEarnedSeconds(earnedSeconds);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 1000)
    }
  }, [earnedSeconds])

  useEffect(() => {
    if (displayTime === '0:00')
      stopTimer();

    if (displayTime !== '0:00' && !isTimerRunning)
      startTimer();

  }, [displayTime])

  return (
    <div className="hud-timer">
      Tempo restante: {displayTime}

      <div className={`popup ${isPopupVisible ? 'active' : ''}`}>
        <p className="popup-text">Você ganhou {displayEarnedSeconds} sec.</p>
      </div>
    </div>
  )
}