import React from 'react';

// COMPONENTS
import GameUI from './components/GameUI';

export default function App() {
  return (
    <GameUI
      startTime={{ min: 1, sec: 0 }}
      addTimeOnComplete={{ easy: 15, normal: 25, hard: 35 }}
      sizesAtDifficulties={{ easy: [3, 2], normal: [3, 3], hard: [4, 4] }}
      rewardsAtDifficulties={{ bronze: [1, 4], silver: [5, 9], gold: [10] }}
      normalAtStage={5}
      hardAtStage={7}
      endAtStage={10}
    />
  )
}