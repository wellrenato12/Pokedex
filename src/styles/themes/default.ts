import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  white: "#FFF",
  reset: "#000",

  normal: "#d9d9d9",
  grass: "#47ab57",
  fire: "#fd7d24",
  water: "#4592c4",
  bug: "#719f3f",
  electric: "#eed535",
  rock: "#a38c21",
  ghost: "#7b62a3",
  poison: "#b97fc9",
  psychic: "#f366b9",
  fighting: "#d56723",
  ground: "#ab9842",
  dragon: "#f06d56",
  flying: "#bbb988",
  steel: "#4682B4",
  ice: "#A5F2F3",
  dark: "#111184",
  fairy: "#ffcbdb",
  stellar: "#46647e",
  unknown: "#a3a3a3",
} as const;

export const lightTheme: DefaultTheme = {
  background: "#F9FAFB",
  text: "#111827",
};

export const darkTheme: DefaultTheme = {
  background: "#1F2937",
  text: "#F9FAFB",
};

export type ThemeType = typeof lightTheme;
