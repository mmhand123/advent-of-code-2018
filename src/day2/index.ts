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

// const fakeValues = [
//   'abcdef',
//   'bababc',
//   'abbcde',
//   'abcccd',
//   'aabcdd',
//   'abcdee',
//   'ababab'
// ];

// console.log(partOne(fakeValues));

console.log(partOne(values));
