import React from 'react';

// STYLES
import './tile.less';

// ASSETS
import startTileActive from './../../../../assets/images/pipe-mechanic/start-tile-active.svg';
import startTile from './../../../../assets/images/pipe-mechanic/start-tile.svg';
import endTileActive from './../../../../assets/images/pipe-mechanic/end-tile-active.svg';
import endTile from './../../../../assets/images/pipe-mechanic/end-tile.svg';
import xTileActive from './../../../../assets/images/pipe-mechanic/x-tile-active.svg';
import xTile from './../../../../assets/images/pipe-mechanic/x-tile.svg';
import lTileActive from './../../../../assets/images/pipe-mechanic/l-tile-active.svg';
import lTile from './../../../../assets/images/pipe-mechanic/l-tile.svg';
import iTileActive from './../../../../assets/images/pipe-mechanic/i-tile-active.svg';
import iTile from './../../../../assets/images/pipe-mechanic/i-tile.svg';
import tTileActive from './../../../../assets/images/pipe-mechanic/t-tile-active.svg';
import tTile from './../../../../assets/images/pipe-mechanic/t-tile.svg';

export default function Tile({
  data,
  x,
  y,
  onTileClick,
  type
}) {

  // FUNCTIONS
  function handleClick() {
    onTileClick(x, y);
  }

  function applyRotationClass() {
    switch (data.rotation) {
      case 0:
        return "rotate-0";
      case 1:
        return "rotate-1";
      case 2:
        return "rotate-2";
      case 3:
        return "rotate-3";
    }
  }

  function getImgBasedOnType() {
    let tileSource;

    if (data.isLit) {
      switch (data.type) {
        case '-':
          return null;
        case 'S':
          tileSource = startTileActive;
          break;
        case 'E':
          tileSource = endTileActive;
          break;
        case 'X':
          tileSource = xTileActive;
          break;
        case 'L':
          tileSource = lTileActive;
          break;
        case 'I':
          tileSource = iTileActive;
          break;
        case 'T':
          tileSource = tTileActive;
          break;
      }
    }
    else {
      switch (data.type) {
        case '-':
          return null;
        case 'S':
          tileSource = startTile;
          break;
        case 'E':
          tileSource = endTile;
          break;
        case 'X':
          tileSource = xTile;
          break;
        case 'L':
          tileSource = lTile;
          break;
        case 'I':
          tileSource = iTile;
          break;
        case 'T':
          tileSource = tTile;
          break;
      }
    }

    return <img className={"tile-img " + type + " lit-" + data.isLit} onClick={handleClick} alt="Tile" src={tileSource} />
  }

  return (
    <div className={`tile ${type} tile-${data.type} ${applyRotationClass()}`}>
      {getImgBasedOnType()}
    </div>
  )
}