import { data } from './input.json';

function parseData(arr: ReadonlyArray<string>): number {
  return arr.reduce((acc, item) => {
    console.log(acc, item);

    const operator = item[0];
    const value = parseInt(item.substr(1), 10);

    const newValue = operator === '+' ? acc + value : acc - value;
    return newValue;
  }, 0);
}

console.log(parseData(data));
