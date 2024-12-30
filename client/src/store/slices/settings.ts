import { createSlice } from "@reduxjs/toolkit/react";

type settingsType = {
   kanjiToMeaning: boolean;
   meaningToKanji: boolean;
   showInfoBar: boolean;
   showSettings: boolean;
   showStatusPanel: boolean;
}

const initialState: settingsType = {
   kanjiToMeaning: false,
   meaningToKanji: false,
   showInfoBar: true,
   showSettings: false,
   showStatusPanel: true,
}

export const settingsSlice = createSlice({
   name: "settings",
   initialState,
   reducers: {
      setKanjiToMeaning: (state, action) => {
         state.kanjiToMeaning = action.payload;
      },
      setMeaningToKanji: (state, action) => {
         state.meaningToKanji = action.payload;
      },
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
   setKanjiToMeaning,
   setMeaningToKanji,
   setShowInfoBar,
   setShowSettings,
   setShowStatusPanel,
} = settingsSlice.actions;

export default settingsSlice.reducer;