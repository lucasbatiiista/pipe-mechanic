import React, { useRef, useState, useEffect } from 'react'

// CLASSES
import TimerClock from '../../classes/_timerclock';
import Game from '../../classes/_game';

// STYLES
import "./game-ui.less";

// COMPONENTS
import GameOver from './GameOver';
import GameCompleted from './GameCompleted';
import HUD from './HUD';
import TileMap from './TileMap';

export default function GameUI({
  startTime = { min: 1, sec: 0 },
  addTimeOnComplete = { easy: 15, normal: 25, hard: 35 },
  sizesAtDifficulties = { easy: [3, 2], normal: [3, 3], hard: [4, 4] },
  rewardsAtDifficulties = { bronze: [1, 4], silver: [5, 9], gold: [10] }, // bronze (stage 1 until 4) ...
  normalAtStage = 5,
  hardAtStage = 7,
  endAtStage = 10
}) {

  // GENERAL

  // REFS
  const timer = useRef(new TimerClock(startTime.min, startTime.sec)).current;
  let onTimerTickInterval = useRef(null);

  // STATES
  const [game, setGame] = useState(new Game(sizesAtDifficulties.easy[0], sizesAtDifficulties.easy[1]));
  const [turns, setTurns] = useState(0);
  const [stage, setStage] = useState(1);
  const [type, setType] = useState('game-type-easy');
  const [displayTime, setDisplayTime] = useState(timer.getFormattedTime());
  const [gameOver, setGameOver] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentSolved, setCurrentSolved] = useState(false)
  const [earnedSeconds, setEarnedSeconds] = useState(-1);
  const [earnedReward, setEarnedReward] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // FUNCTIONS
  function resetGame() {
    timer.resetTime();
    setGame(new Game(sizesAtDifficulties.easy[0], sizesAtDifficulties.easy[1]));
    setTurns(0);
    setStage(1);
    setType('game-type-easy');
    setGameOver(false);
    setGameCompleted(false);
    setEarnedReward(null);
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
    let currentStage = stage > 1 ? stage - 1 : stage;
    giveAward(currentStage);
    setGameOver(true);
  }

  function giveAward(stage) {
    function matchInterval(awardType) {
      const isStageInterval = rewardsAtDifficulties[awardType].length > 1;
      if (isStageInterval) {
        return stage >= rewardsAtDifficulties[awardType][0] && stage <= rewardsAtDifficulties[awardType][1]
      } else {
        return rewardsAtDifficulties[awardType][0] === stage
      }
    }

    if (matchInterval('bronze')) {
      setEarnedReward({
        title: 'Medalha de Bronze 🥉',
        points: 10
      })
    }

    if (matchInterval('silver')) {
      setEarnedReward({
        title: 'Medalha de Prata 🥈',
        points: 50
      })
    }

    if (matchInterval('gold')) {
      setEarnedReward({
        title: 'Medalha de Ouro 🥇',
        points: 100
      })
    }
  }

  function onStageComplete() {
    if (stage === endAtStage) {
      stopTimer();
      giveAward(stage);
      setGameCompleted(true);
      return;
    }

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
    if (displayTime === '0:00') {
      stopTimer();
      onLose();
    }

    if (displayTime !== '0:00' && !isTimerRunning)
      startTimer();

  }, [displayTime])

  useEffect(() => {
    if (currentSolved) {
      stopTimer();
      setTimeout(onStageComplete, 700);
    }
  }, [currentSolved])

  useEffect(() => {
    if (earnedSeconds >= 0)
      setEarnedSeconds(-1);
  }, [earnedSeconds])

  return (
    <div className='game-ui'>
      <GameCompleted
        earnedReward={earnedReward}
        gameCompleted={gameCompleted}
        resetGame={resetGame}
      />
      <GameOver
        stage={stage}
        gameOver={gameOver}
        earnedReward={earnedReward}
        resetGame={resetGame}
      />
      <HUD
        turns={turns}
        stage={stage}
        displayTime={displayTime}
        earnedSeconds={earnedSeconds}
      />
      <TileMap
        type={type}
        tileMapData={game.tileMapData}
        onTileClick={onTileClick}
      />
    </div>
  )
}