import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";

type gameType = {
   statusTxt: string;
   isGameOver: boolean;
}

const initialState: gameType = {
   statusTxt: '',
   isGameOver: false,
}

export const gameSlice = createSlice({
   name: "game",
   initialState,
   reducers: {
      setStatusTxt: (state, action: PayloadAction<string>) => {
         state.statusTxt = action.payload;
      },
      setIsGameOver: (state, action: PayloadAction<boolean>) => {
         state.isGameOver = action.payload;
      },
   }
});

export const {
   setStatusTxt,
   setIsGameOver
} = gameSlice.actions;

export default gameSlice.reducer;