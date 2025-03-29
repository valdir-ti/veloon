export const areSiameseNumbers = (num1: number, num2: number): boolean => {
  const sortedNum1 = num1.toString().split("").sort().join("");
  const sortedNum2 = num2.toString().split("").sort().join("");

  return sortedNum1 === sortedNum2;
};
