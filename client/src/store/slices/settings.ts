import { createSlice } from "@reduxjs/toolkit/react";

type settingsType = {
   showInfoBar: boolean;
   showSettings: boolean;
}

const initialState: settingsType = {
   showInfoBar: true,
   showSettings: false,
}

export const settingsSlice = createSlice({
   name: "settings",
   initialState,
   reducers: {
      setShowInfoBar: (state, action) => {
         state.showInfoBar = action.payload;
      },
      setShowSettings: (state, action) => {
         state.showSettings = action.payload;
      },
   }
});

export const {
   setShowInfoBar,
   setShowSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;