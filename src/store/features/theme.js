import { createTheme } from "@mui/material/styles";

export const themeSettings = (mode, tokensDark, tokensLight) => {
  const tokens = mode === "dark" ? tokensDark : tokensLight;

  return createTheme({
    palette: {
      mode,

      primary: {
        main: tokens.primary,
        secondary: tokens.primaryLight,
        tertiary: tokens.tertiaryLight,
      },

      secondary: {
        main: tokens.secondary,
        secondary: tokens.secondaryLight,
        tertiary: tokens.tertiaryLight,
      },

      background: {
        default: tokens.background,
        white: tokens.bgTwo,
        tableHeader: tokens.tableHeader,
      },

      text: {
        title: tokens.title,
        primary: tokens.text,
        grey: tokens.grey,
      },

      card: {
        main: tokens.card,
        secondary: tokens.card2,
        cardLight: tokens.card3,
      },

      button: {
        contained: tokens.btnContained,
        containedText: tokens.btnText,
        outlined: tokens.btnOutlined,
        outlinedText: tokens.btnOtnText,
      },

      glass: tokens.glass,

      neutral: {
        light: tokens.greyAccent.light,
        medium: tokens.greyAccent.medium,
        lightest: tokens.greyAccent.lightest,
        dark: tokens.greyAccent.dark,
        dim: tokens.greyAccent.dim,
      },

      border: tokens.borderColor,
    },

    typography: {
      fontFamily: `'Poppins', 'sans-serif'`,
    },
  });
};
