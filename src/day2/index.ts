import { values } from './input.json';

interface ExtractedValues {
  doubles: number;
  triples: number;
}

export function partOne(arr: string[]): number {
  const { triples, doubles }: ExtractedValues = arr.reduce(
    (map, val) => {
      let dbl = 0;
      let trpl = 0;
      const letterCounts: { [key: string]: number } = {};

      val.split('').forEach(letter => {
        if (!letterCounts[letter]) {
          letterCounts[letter] = 1;
        } else {
          letterCounts[letter] += 1;
        }
      });

      Object.keys(letterCounts).forEach(letter => {
        const count = letterCounts[letter];

        if (count === 2 && !dbl) {
          dbl += 1;
        } else if (count === 3 && !trpl) {
          trpl += 1;
        }
      });

      // console.log(`${val} - doubles: ${dbl}, triples: ${trpl}`);

      map.doubles += dbl;
      map.triples += trpl;
      return map;
    },
    { doubles: 0, triples: 0 }
  );
  return doubles * triples;
}

function partTwo(arr: string[]): string {
  for (let i = 0; i < arr.length; i++) {
    const str1 = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const str2 = arr[j];
      if (str1.length === str2.length) {
        const distanceData = hammingDistance(zip(str1, str2));
        if (distanceData.distance === 1) {
          const [differingIndex] = distanceData.differingIndecies;

          return `${str1.substr(0, differingIndex)}${str1.substr(
            differingIndex + 1
          )}`;
        }
      }
    }
  }
  return '';
}

interface HammingData {
  distance: number;
  differingIndecies: number[];
}

function hammingDistance(zipped: string[][]): HammingData {
  return zipped.reduce(
    (data, tuple, i) => {
      const [a, b] = tuple;
      const distance = a === b ? 0 : 1;

      data.distance += distance;

      if (distance) {
        data.differingIndecies.push(i);
      }

      return data;
    },
    { distance: 0, differingIndecies: [] }
  );
}

function zip(str1: string, str2: string): string[][] {
  return str1.split('').map((item1, i) => [item1, str2[i]]);
}

// const fakeValues = [
//   'abcde',
//   'fghij',
//   'klmno',
//   'pqrst',
//   'fguij',
//   'axcye',
//   'wvxyz'
// ];

console.log(partTwo(values));
