import React, { useState, useEffect } from 'react'

// CLASSES
import TimerClock from '../../classes/_timerclock';
import Game from '../../classes/_game';

// STYLES
import "./game-ui.less";

// COMPONENTS
import GameOver from '../GameOver';
import HUD from '../HUD';
import TileMap from '../TileMap';

export default function GameUI({
  startTime,
  addTimeOnComplete,
  normalAtStage,
  hardAtStage
}) {

  // GENERAL
  const timer = new TimerClock(startTime.min, startTime.sec);

  // STATES
  const [game, setGame] = useState(new Game(6, 3));
  const [turns, setTurns] = useState(0);
  const [stage, setStage] = useState(1);
  const [type, setType] = useState('game-6by3');
  const [displayTime, setDisplayTime] = useState(timer.getFormattedTime());
  const [gameOver, setGameOver] = useState(false);
  const [currentSolved, setCurrentSolved] = useState(false)
  const [earnedSeconds, setEarnedSeconds] = useState();

  // FUNCTIONS
  function resetGame() {
    timer.resetTime();
    setGame(new Game(6, 3));
    setTurns(0);
    setStage(1);
    setType('game-6by3');
    setGameOver(false);
    setDisplayTime(timer.getFormattedTime());
    setCurrentSolved(false);
    setEarnedSeconds(-1);
  }

  function onTileClick(x, y) {
    const tile = game.getTileAtPos(x, y);
    tile.rotateClockWise();
    game.evaluateTileMap();
    setTurns(oldTurns => ++oldTurns);

    if (game.isSolved && !currentSolved) {
      setCurrentSolved(true);
      setTimeout(() => onStageComplete(), 500);
    }
  }

  function onLose() {
    setGameOver(true);
  }

  function onStageComplete() {
    let nextGame;
    let type;
    let addTime;

    if (stage + 1 > hardAtStage) {
      nextGame = new Game(12, 7);
      type = 'game-type-1';
      addTime = addTimeOnComplete.hard - turns;
    }
    else if (stage + 1 > normalAtStage) {
      nextGame = new Game(9, 5);
      type = 'game-type-2';
      addTime = addTimeOnComplete.normal - turns;
    }
    else {
      nextGame = new Game(6, 3);
      type = 'game-type-3';
      addTime = addTimeOnComplete.easy - turns;
    }

    if (addTime < 0) {
      addTime = 0;
    }

    setType(type);
    timer.addSeconds(addTime);
    setEarnedSeconds(addTime);
    setDisplayTime(timer.getFormattedTime());
    setTurns(0);
    setStage(oldStage => ++oldStage);
    setGame(nextGame);
    setCurrentSolved(false);

    forceAnimationToResetAndPlay();
  }

  // Workaround to trigger animation of timer and popup
  function forceAnimationToResetAndPlay() {
    // Timer
    const timer = document.getElementById('timer');
    timer.classList.remove('flash');
    setTimeout(() => timer.classList.remove('flash'), 100);

    // Popup
    const popup = document.getElementById('popup');
    popup.classList.remove('popup');
    popup.style.display = 'none';
    setTimeout(() => {
      popup.classList.add('popup');
      popup.style.display = 'block';
    }, 100)
  }

  function onTimerTick() {
    timer.subSeconds(1);
    setDisplayTime(timer.getFormattedTime());
  }

  // USE EFFECTS
  useEffect(() => {
    console.debug('displayTime: ', displayTime)
    if (displayTime === '0:00')
      onLose();
  }, [displayTime])

  return (
    <div className='game-ui'>
      <GameOver
        stage={stage}
        gameOver={gameOver}
        resetGame={resetGame}
      />
      <HUD
        turns={turns}
        stage={stage}
        displayTime={displayTime}
        earnedSeconds={earnedSeconds}
        onTimerTick={onTimerTick}
      />
      <TileMap
        type={type}
        tileMapData={game.tileMapData}
        onStageComplete={onStageComplete}
        onTileClick={onTileClick}
      />
    </div>
  )
}