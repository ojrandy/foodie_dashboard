import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "dark" | "light" | "system";
type ThemeVariant = "indigo" | "orange" | "emerald" | "crimson";

interface ThemeState {
  theme: Theme;
  variant: ThemeVariant;
}

const initialState: ThemeState = {
  theme: "system",
  variant: "indigo",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setVariant: (state, action: PayloadAction<ThemeVariant>) => {
      state.variant = action.payload;
    },
  },
});

export const { setTheme, setVariant } = themeSlice.actions;
export default themeSlice.reducer;
export type { ThemeVariant };
