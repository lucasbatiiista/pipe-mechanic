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

  // USE STATE
  const [popup, setPopup] = useState();

  // REFS
  let onTimerTickInterval = useRef(null);

  // USE STATE
  const [isTimerRunning, setIsTimerRunning] = useState(true);

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
    if (displayTime === '0:00')
      stopTimer();

    if (displayTime !== '0:00' && !isTimerRunning)
      startTimer();

  }, [displayTime])

  useEffect(() => {
    // console.debug('earnedSeconds: ', earnedSeconds);

    if (earnedSeconds >= 0) {
      setPopup(
        <div id="popup" className="container-fluid popup">
          <p className="popup-text">Você ganhou {earnedSeconds} sec.</p>
        </div>
      )
    }
  }, [earnedSeconds])

  return (
    <div className="hud-timer col-4" id="timer">
      Tempo restante: {displayTime}
      {popup}
    </div>
  )
}