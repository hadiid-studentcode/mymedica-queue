import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestampToWIB(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  };

  const formatter = new Intl.DateTimeFormat("id-ID", options);

  const formattedString = formatter.format(date);

  const finalResult = formattedString.replace(" ", "  ").replace(".", ":");

  return finalResult;
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
export function generateQueueNumber(prefix = "A", max = 1000): string {
  const number = getRandomInt(max);
  return `${prefix}-${number}`;
}
