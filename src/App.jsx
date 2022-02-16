import React from 'react';

// COMPONENTS
import GameUI from './components/GameUI';

export default function App() {
  return (
    <GameUI
      startTime={{ min: 1, sec: 5 }}
      addTimeOnComplete={{ easy: 15, normal: 25, hard: 35 }}
      sizesAtDifficulties={{ easy: [3, 2], normal: [3, 3], hard: [3, 4] }}
      normalAtStage={2}
      hardAtStage={3}
      endAtStage={10}
    />
  )
}