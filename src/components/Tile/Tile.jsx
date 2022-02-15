import React from 'react';

// STYLES
import './tile.less';

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
          tileSource = "/src/assets/images/start-tile-active.svg";
          break;
        case 'E':
          tileSource = "/src/assets/images/end-tile-active.svg";
          break;
        case 'X':
          tileSource = "/src/assets/images/x-tile-active.svg";
          break;
        case 'L':
          tileSource = "/src/assets/images/l-tile-active.svg";
          break;
        case 'I':
          tileSource = "/src/assets/images/i-tile-active.svg";
          break;
        case 'T':
          tileSource = "/src/assets/images/t-tile-active.svg";
          break;
      }
    }
    else {
      switch (data.type) {
        case '-':
          return null;
        case 'S':
          tileSource = "/src/assets/images/start-tile.svg";
          break;
        case 'E':
          tileSource = "/src/assets/images/end-tile.svg";
          break;
        case 'X':
          tileSource = "/src/assets/images/x-tile.svg";
          break;
        case 'L':
          tileSource = "/src/assets/images/l-tile.svg";
          break;
        case 'I':
          tileSource = "/src/assets/images/i-tile.svg";
          break;
        case 'T':
          tileSource = "/src/assets/images/t-tile.svg";
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