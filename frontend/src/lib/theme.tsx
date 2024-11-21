import { createTheme } from "@mui/material";

export const HIGHLIGHTS_COLOR = "#edba32";
export const BACKGROUND_COLOR = "#f4f1e8";

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: BACKGROUND_COLOR,
    },
  },
  typography: {
    fontFamily: "Playfair Display Variable",
  },
});
