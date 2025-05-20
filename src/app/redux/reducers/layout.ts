import { createSlice } from "@reduxjs/toolkit";

const isDarkMode = () => {
  const darkMode: any = window.localStorage.getItem("darkmode");
  return darkMode ? JSON.parse(darkMode) : false;
};

const BaseColor = () => {
  const penalColor: any = window.localStorage.getItem("basecolor");
  return penalColor ? JSON.parse(penalColor) : "#d66001";
};

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    isSidebar: false,
    isDark: isDarkMode(),
    currentScreenWidth: window.innerWidth,
    isLoader: false,
    baseColor: BaseColor(),
  },

  reducers: {
    handleScreenWidth: (state, action) => {
      state.currentScreenWidth = action.payload;
    },
    handleSidebar: (state, action) => {
      state.isSidebar = action.payload;
    },
    handleDark: (state, action) => {
      state.isDark = action.payload;
      window.localStorage.setItem("darkmode", JSON.stringify(state.isDark));
    },
    handleLoader: (state, action) => {
      state.isLoader = action.payload;
    },
    handleBaseColor: (state, action) => {
      state.baseColor = action.payload;
      window.localStorage.setItem(
        "basecolor",
        state.baseColor !== undefined ? JSON.stringify(state.baseColor) : ""
      );
    },
  },
});

export const {
  handleSidebar,
  handleScreenWidth,
  handleDark,
  handleLoader,
  handleBaseColor,
} = layoutSlice.actions;

export default layoutSlice.reducer;
