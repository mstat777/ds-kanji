import { createSlice } from "@reduxjs/toolkit/react";

type settingsType = {
   kanjiToMeaning: boolean;
   meaningToKanji: boolean;
   showInfoBar: boolean;
   showSettings: boolean;
}

const initialState: settingsType = {
   kanjiToMeaning: false,
   meaningToKanji: false,
   showInfoBar: true,
   showSettings: false,
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
   }
});

export const {
   setKanjiToMeaning,
   setMeaningToKanji,
   setShowInfoBar,
   setShowSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;