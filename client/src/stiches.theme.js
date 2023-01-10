import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, keyframes, theme, createTheme } =
  createStitches({
    theme: {
      colors: {
        charcoal: "#36454F",
        gray100: "#bcc3c8",
        gray700: "#161619",
        gray800: "#09090a",
        gray500: "#404149",
        purple500: "#6949e9",
        green500: "#5BD795",
        red500: "#FF3D57",
        darkWater: "#112222",
        white: "#fff",
      },
      space: {
        1: "0.5rem",
        2: "1rem",
        3: "1.5rem",
        4: "2rem",
        5: "2.5rem",
        6: "3rem",
      },
      fontSizes: {
        1: "1.2rem",
        2: "1.3rem",
        3: "1.5rem",
        4: "1.8rem",
        5: "2rem",
        6: "2.2rem",
      },
      fonts: {
        untitled: "Untitled Sans, apple-system, sans-serif",
        mono: "Söhne Mono, menlo, monospace",
      },
    },
    media: {
      bp1: "(max-width: 600px)",
      bp2: "(max-width: 1200px)",
      bp3: "(min-width: 1200px)",
      bp4: "(max-width: 425px)",
      bp5: "(max-width: 700px)",
      bp6: "(max-width: 525px)",
      bp7: "(min-width: 600px)",
      bp7: "(min-width: 600px)",
      bp8: "(max-width: 1000px)",
    },
  });
export const darkTheme = createTheme("dark-theme", {
  colors: {
    charcoal: "#fff",
    gray100: "#161619",
    gray700: "$charcoal",
    gray800: "#bcc3c8",
    gray500: "$charcoal",
    purple500: "#6949e9",
    green500: "#5BD795",
    red500: "#FF3D57",
    darkWater: "$charcoal",
    white: "#09090a",
  },
  space: {
    1: "0.5rem",
    2: "1rem",
    3: "1.5rem",
    4: "2rem",
    5: "2.5rem",
    6: "3rem",
  },
  fontSizes: {
    1: "1.2rem",
    2: "1.3rem",
    3: "1.5rem",
    4: "1.8rem",
    5: "2rem",
    6: "2.2rem",
  },
  fonts: {
    untitled: "Untitled Sans, apple-system, sans-serif",
    mono: "Söhne Mono, menlo, monospace",
  },
  media: {
    bp1: "(max-width: 600px)",
    bp2: "(max-width: 1200px)",
    bp3: "(min-width: 1200px)",
    bp4: "(max-width: 425px)",
    bp5: "(max-width: 730px)",
    bp6: "(max-width: 525px)",
    bp7: "(min-width: 600px)",
  },
});
