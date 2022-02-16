import React, { useRef, useState, useEffect } from 'react'

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
  sizesAtDifficulties,
  normalAtStage,
  hardAtStage,
  endAtStage
}) {

  // GENERAL

  // REFS
  const timer = useRef(new TimerClock(startTime.min, startTime.sec)).current;

  // STATES
  const [game, setGame] = useState(new Game(sizesAtDifficulties.easy[0], sizesAtDifficulties.easy[1]));
  const [turns, setTurns] = useState(0);
  const [stage, setStage] = useState(1);
  const [type, setType] = useState('game-type-easy');
  const [displayTime, setDisplayTime] = useState(timer.getFormattedTime());
  const [gameOver, setGameOver] = useState(false);
  const [currentSolved, setCurrentSolved] = useState(false)
  const [earnedSeconds, setEarnedSeconds] = useState(-1);

  // FUNCTIONS
  function resetGame() {
    timer.resetTime();
    setGame(new Game(sizesAtDifficulties.easy[0], sizesAtDifficulties.easy[1]));
    setTurns(0);
    setStage(1);
    setType('game-type-easy');
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
    }
  }

  function onLose() {
    setGameOver(true);
  }

  function onStageComplete() {
    let nextGame;
    let type;
    let addTime;

    // HARD
    if (stage + 1 >= hardAtStage) {
      nextGame = new Game(sizesAtDifficulties.hard[0], sizesAtDifficulties.hard[1]);
      type = 'game-type-hard';
      addTime = addTimeOnComplete.hard;
    }
    // NORMAL
    else if (stage + 1 >= normalAtStage) {
      nextGame = new Game(sizesAtDifficulties.normal[0], sizesAtDifficulties.normal[1]);
      type = 'game-type-normal';
      addTime = addTimeOnComplete.normal;
    }
    // EASY
    else {
      nextGame = new Game(sizesAtDifficulties.easy[0], sizesAtDifficulties.easy[1]);
      type = 'game-type-easy';
      addTime = addTimeOnComplete.easy;
    }

    timer.addSeconds(addTime);
    setEarnedSeconds(addTime);
    setType(type);
    setDisplayTime(timer.getFormattedTime());
    setTurns(0);
    setStage(stage + 1);
    setGame(nextGame);

    setCurrentSolved(false);
  }

  function onTimerTick() {
    timer.subSeconds(1);
    setDisplayTime(timer.getFormattedTime());
  }

  // USE EFFECTS
  useEffect(() => {
    if (displayTime === '0:00')
      onLose();

    if (currentSolved)
      onStageComplete();

  }, [displayTime, currentSolved])

  useEffect(() => {
    if (earnedSeconds >= 0)
      setEarnedSeconds(-1);
  }, [earnedSeconds])

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
        onTileClick={onTileClick}
      />
    </div>
  )
}