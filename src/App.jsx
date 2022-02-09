import React from 'react';

// COMPONENTS
import GameUI from './components/GameUI';

export default function App() {
  return (
    <GameUI
      startTime={{ min: 1, sec: 0 }}
      addTimeOnComplete={{ easy: 15, normal: 25, hard: 35 }}
      normalAtStage={4}
      hardAtStage={8}
    />
  )
}