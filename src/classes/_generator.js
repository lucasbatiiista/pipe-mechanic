import TileData from './_tiledata';
import Random from './_random';

export default class Generator {
  constructor(width, height) {
    if (width < 3 || height < 2) {
      throw Error(`Invalid values for width = ${width} and height = ${height}`);
    }
    if ((width % 2) !== 1) {
      throw Error(`width = ${width} must be odd number!`);
    }

    this.width = width;
    this.height = height + 2;
    this.probabilities = {
      // Probability for X-Tiles
      x: 0.05,
      // Probability for T-Tiles
      t: 0.1,
      // Probability for L-Tiles & I-Tiles
      l_i: 0.85,
      // Probability to go down
      down: 0.4,
      // Probability to go down after going down
      downAfterDown: 0.2
    };
  }

  generate() {
    /* Create a new tile map based on template meaning an array with
     * with right dimensions respecting to this.width and this.height
     * And also filling in Start- and End-tile (and '-' tiles)
     * Other tiles in the array are instantiated with null */
    var tilemap = this.createTemplate();
    /* Makes sure that tilemap has at least one possible solution.
     * Places tiles according to a custom algorithm to form a random solution. */
    this.createRandomSolution(tilemap);
    // Fills up each tile that is still equal to null with a random tile
    this.fillUp(tilemap);
    // Gives every tile a random rotation
    Generator.shuffle(tilemap);
    return tilemap;
  }

  createTemplate() {
    // Generate 2D-Array
    let tilemap = [];
    for (let y = 0; y < this.height; y++) {
      tilemap.push([]);
      for (let x = 0; x < this.width; x++) {
        tilemap[y].push(null);
      }
    }

    // Generate last row and column
    const lastRowIndex = this.height - 1;
    const lastColumnIndex = this.width - 1;

    // Add '-' tiles on first and last row
    for (let i = 0; i < this.width; i++) {
      tilemap[0][i] = new TileData('-', 0);
      tilemap[lastRowIndex][i] = new TileData('-', 0);
    }

    // ********** OS TILES SAO ACESSADOS NAS CORDENADAS Y (index da linha), X (index da coluna) *************

    // Add Start- and End-Pos
    tilemap[0][0] = new TileData('S', 1);
    tilemap[lastRowIndex][lastColumnIndex] = new TileData('E', 3);

    this.startPos = [0, 0]; // [0, 0]
    this.endPos = [lastRowIndex, lastColumnIndex]; // [3, 2]

    return tilemap;
  }

  createRandomSolution(tilemap) {
    if (this.endPos[0] < this.startPos[0]) {
      throw Error(`Start-Pos(${this.startPos}) should be on the top of End-Pos(${this.endPos})`);
    }

    // The position where we want to find a good tile for (start next from startPos)
    let currentPos = [this.startPos[0] + 1, this.startPos[1]]; // [1, 0]

    // The direction we are coming from
    let currentDirection = 'down';

    // The direction we are trying to go (randomized)
    let nextDirection = this.randomDirection(currentDirection);

    // Loop through until we want to figure out the tile before the end pos in the last row
    while (this.endPos[0] - currentPos[0] !== 1) {
      // Check for out of bounds -> just go down
      if (nextDirection === 'left' && currentPos[1] - 1 < 0) {
        nextDirection = 'down';
      }
      else if (nextDirection === 'right' && currentPos[1] + 1 >= this.width) {
        nextDirection = 'down';
      }

      // Set tile
      tilemap[currentPos[0]][currentPos[1]] =
        (currentDirection === nextDirection) ? this.randomStraightTile() : this.randomAngularTile();

      // Prepare next step
      currentDirection = nextDirection;
      nextDirection = this.randomDirection(currentDirection);

      // Goto new position and determine next pos
      if (currentDirection === 'right') {
        currentPos[1]++;
      }
      else if (currentDirection === 'left') {
        currentPos[1]--;
      }
      else if (currentDirection === 'down') {
        currentPos[0]++;
      }
      else {
        throw new Error(`CurrentDirection = ${currentDirection} is not a valid value for direction`);
      }
    }

    // Find way to end pos in last row

    // Go straight if no turning necessary
    if (currentPos[1] === this.endPos[1]) {
      tilemap[currentPos[0]][currentPos[1]] = this.randomStraightTile();
    }
    else {
      // First tile must be angular as we go left or right
      tilemap[currentPos[0]][currentPos[1]] = this.randomAngularTile();
      // Go left / right until we are on the same column as endPos
      while (this.endPos[1] !== currentPos[1]) {
        if (this.endPos[1] > currentPos[1]) {
          currentPos[1]++;
        } else {
          currentPos[1]--;
        }
        tilemap[currentPos[0]][currentPos[1]] = this.randomStraightTile();
      }
      // Last tile is angular as we come from left / right
      tilemap[this.endPos[0] - 1][this.endPos[1]] = this.randomAngularTile();
    }

    return tilemap;
  }

  randomStraightTile() {
    const random = Random.randomInt(this.probabilities.x, this.probabilities.t, this.probabilities.l_i);
    switch (random) {
      case 0: return new TileData('X', 0);
      case 1: return new TileData('T', 0);
      case 2: return new TileData('I', 0);
    }
  }

  randomAngularTile() {
    const random = Random.randomInt(this.probabilities.x, this.probabilities.t, this.probabilities.l_i);
    switch (random) {
      case 0: return new TileData('X', 0);
      case 1: return new TileData('T', 0);
      case 2: return new TileData('L', 0);
    }
  }

  randomTile() {
    const random = Random.randomInt(
      this.probabilities.x,
      this.probabilities.t,
      (this.probabilities.l_i / 2),
      (this.probabilities.l_i / 2)
    );
    switch (random) {
      case 0: return new TileData('X', 0);
      case 1: return new TileData('T', 0);
      case 2: return new TileData('I', 0);
      case 3: return new TileData('L', 0);
    }
  }

  getProbabilityDownForDirection(direction) {
    return direction === 'down' ? this.probabilities.downAfterDown : this.probabilities.down;
  }

  getProbabilityRightForDirection(direction) {
    switch (direction) {
      case 'down':
        return (1 - this.probabilities.downAfterDown) / 2;
      case 'right':
        return 1 - this.probabilities.down;
      case 'left':
        return 0;
    }
    throw Error(`Invalid direction given (direction = ${direction})`);
  }

  getProbabilityLeftForDirection(direction) {
    switch (direction) {
      case 'down': return (1 - this.probabilities.downAfterDown) / 2;
      case 'right': return 0;
      case 'left': return 1 - this.probabilities.down;
    }
    throw Error(`Invalid direction given (direction = ${direction})`);
  }

  randomDirection(currentDirection) {
    let random = Random.randomInt(
      this.getProbabilityDownForDirection(currentDirection),
      this.getProbabilityRightForDirection(currentDirection),
      this.getProbabilityLeftForDirection(currentDirection)
    );
    switch (random) {
      case 0: return 'down';
      case 1: return 'right';
      case 2: return 'left';
    }
  }

  fillUp(tilemap) {
    for (var y = 0; y < tilemap.length; y++) {
      for (var x = 0; x < tilemap[y].length; x++) {
        if (tilemap[y][x] === null)
          tilemap[y][x] = this.randomTile();
      }
    }
    return tilemap;
  }

  static shuffle(tilemap) {
    for (var y = 0; y < tilemap.length; y++) {
      for (var x = 0; x < tilemap[y].length; x++) {
        if (tilemap[y][x].type !== 'S' && tilemap[y][x].type !== 'E' && tilemap[y][x].type !== '-') {
          tilemap[y][x].rotation = Generator.randomRotation();
        }
      }
    }
  }

  static randomRotation() {
    return Math.floor(Math.random() * 4);
  }
}