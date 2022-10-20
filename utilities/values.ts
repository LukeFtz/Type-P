import { valuesNumbers } from "./types";

export const getValues = () => {
  const numbers: number[] = [];
  for (let i = 0; i <= 9; i++) {
    numbers.push(i);
  }
  return numbers;
};

export const setValueNumbers = ({ cen, dec, uni }: valuesNumbers) => {
  return Number.parseInt(cen + dec + uni);
};

export const OVEN_SERVER = "http://192.168.4.1";

export const TO_OVEN = "/to_oven";
export const FROM_OVEN = "/to_app";
