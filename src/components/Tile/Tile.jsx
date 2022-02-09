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
    if (data.isLit) {
      switch (data.type) {
        case '-':
          return "/src/assets/images/Empty_Tile.png";
        case 'S':
          return "/src/assets/images/Start.png";
        case 'E':
          return "/src/assets/images/End_Lit.png";
        case 'X':
          return "/src/assets/images/X-Tile_Lit.png";
        case 'L':
          return "/src/assets/images/L-Tile_Lit.png";
        case 'I':
          return "/src/assets/images/I-Tile_Lit.png";
        case 'T':
          return "/src/assets/images/T-Tile_Lit.png";
      }
    }
    else {
      switch (data.type) {
        case '-':
          return "/src/assets/images/Empty_Tile.png";
        case 'S':
          return "/src/assets/images/Start.png";
        case 'E':
          return "/src/assets/images/End.png";
        case 'X':
          return "/src/assets/images/X-Tile.png";
        case 'L':
          return "/src/assets/images/L-Tile.png";
        case 'I':
          return "/src/assets/images/I-Tile.png";
        case 'T':
          return "/src/assets/images/T-Tile.png";
      }
    }
  }

  return (
    <div className={"tile " + applyRotationClass()}>
      <img className={"tile-img " + type + " lit-" + data.isLit} onClick={handleClick} alt="Tile" src={getImgBasedOnType()} />
    </div>
  )
}