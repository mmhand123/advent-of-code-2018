import { values } from './input.json';

interface FabrircClaim {
  id: string;
  rectangle: Rectangle;
}

interface Rectangle {
  x: number;
  y: number;
  height: number;
  width: number;
}

/**
 * {
 *  1,2: 1
 *
 * }
 */

// const fakeClaimString = '#123 @ 3,2: 5x4';

function parseClaimString(claimString: string): FabrircClaim {
  const idStart = claimString.indexOf('#');
  const idEnd = claimString.indexOf('@');
  const coordinateStart = idEnd;
  const coordinateEnd = claimString.indexOf(':');
  const dimensionStart = coordinateEnd;
  const dimensionEnd = claimString.length;

  const id = claimString.substring(idStart + 1, idEnd);
  const coordinates = claimString.substring(coordinateStart + 1, coordinateEnd);
  const dimensions = claimString.substring(dimensionStart + 1, dimensionEnd);

  const [x, y] = coordinates.split(',');
  const [width, height] = dimensions.split('x');

  return {
    id,
    rectangle: {
      height: parseInt(height, 10),
      width: parseInt(width, 10),
      x: parseInt(x, 10),
      y: parseInt(y, 10)
    }
  };
}

function partOne(claims: string[]): number {
  const parsedClaims = claims.map(claim => parseClaimString(claim));
  const claimBoard = {};

  return parsedClaims.reduce((overlaps, claim) => {
    const { x: startX, y: startY, width, height } = claim.rectangle;

    for (let x = startX; x < startX + width; x++) {
      for (let y = startY; y < startY + height; y++) {
        const square = `${x},${y}`;

        if (!claimBoard.hasOwnProperty(square)) {
          // first time, just claim
          claimBoard[square] = false;
        } else if (
          claimBoard.hasOwnProperty(square) &&
          claimBoard[square] === false
        ) {
          // we have an overlap
          claimBoard[square] = true;
          overlaps++;
        }
        // otherwise it's already been claimed and we've already counted the overlap, do nothing
      }
    }

    return overlaps;
  }, 0);
}

// const fakeClaims = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];

console.log(partOne(values));
