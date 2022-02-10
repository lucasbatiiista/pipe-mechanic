import React from 'react';

// STYLES
import './tile-map.less';

// COMPONENTS
import Tile from './../../components/Tile';

export default function TileMap({
  type,
  tileMapData,
  onTileClick
}) {

  // FUNCTIONS
  function createTiles() {
    const rows = [];

    for (let y = 0; y < tileMapData.length; y++) {
      let tiles = [];

      for (let x = 0; x < tileMapData[y].length; x++) {
        tiles.push(
          <Tile
            data={tileMapData[y][x]}
            x={x}
            y={y}
            onTileClick={onTileClick}
            type={type}
            key={x + y}
          />
        )
      }

      rows.push(
        <div className="row" key={y}>
          {tiles}
        </div>
      )
    }

    return rows;
  }

  return (
    <div className={"tilemap " + type}>
      {createTiles()}
    </div>
  )
}