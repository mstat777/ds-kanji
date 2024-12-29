import { createSlice } from "@reduxjs/toolkit/react";

type settingsType = {
   showInfoBar: boolean;
   showSettings: boolean;
   showStatusPanel: boolean;
}

const initialState: settingsType = {
   showInfoBar: true,
   showSettings: false,
   showStatusPanel: true,
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
      setShowStatusPanel: (state, action) => {
         state.showStatusPanel = action.payload;
      },

   }
});

export const {
   setShowInfoBar,
   setShowSettings,
   setShowStatusPanel,
} = settingsSlice.actions;

export default settingsSlice.reducer;