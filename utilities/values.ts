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

export const convertTime = (time: string) => {
  const hourString = time.slice(0, 2);
  const minuteString = time.slice(-2);

  const hour = parseInt(hourString);
  const minute = parseInt(minuteString);

  let totalSeconds = 0;

  if (hour !== 0) {
    totalSeconds += hour * 3600;
  }
  if (minute !== 0) {
    totalSeconds += minute * 60;
  }

  return totalSeconds;
};

export const OVEN_SERVER = "http://192.168.4.1";

export const TO_OVEN = "/to_oven";
export const FROM_OVEN = "/to_app";

export const EMAIL = "app.type@gmail.com";
export const PASSWORD = "appPassCodetypep";
