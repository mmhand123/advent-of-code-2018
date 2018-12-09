import { data } from './input.json';

function partOne(arr: ReadonlyArray<string>): number {
  return arr.reduce((acc, item) => {
    console.log(acc, item);

    const { operator, value } = parseItem(item);

    const newValue = getFrequency(operator, acc, value);
    return newValue;
  }, 0);
}

function partTwo(arr: string[]): number {
  let index = 0;
  const end = arr.length - 1;
  let firstDuplicateFrequency: number;
  let currentFrequency: number = 0;
  const frequencyMap = new Map<number, boolean>();

  while (firstDuplicateFrequency === undefined) {
    if (index > end) {
      index = 0;
    }

    if (frequencyMap.has(currentFrequency)) {
      firstDuplicateFrequency = currentFrequency;
    } else {
      frequencyMap.set(currentFrequency, true);

      const { operator, value } = parseItem(arr[index]);
      const newFrequency = getFrequency(operator, currentFrequency, value);

      currentFrequency = newFrequency;

      index++;
    }
  }
  return firstDuplicateFrequency;
}

function getFrequency(
  operator: '+' | '-',
  oldFrequency: number,
  value: number
) {
  return operator === '+' ? oldFrequency + value : oldFrequency - value;
}

function parseItem(item: string): { operator: '+' | '-'; value: number } {
  const operator = item[0] as '+' | '-';
  const value = parseInt(item.substr(1), 10);

  return {
    operator,
    value
  };
}

// console.log(partOne(data));
console.log(partTwo(data));
