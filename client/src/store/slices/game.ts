import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";

type gameType = {
   statusTxt: string;
   isGameOver: boolean;
   round: number;
   totalRounds: number;
   result: number;
   correct: number;
   wrong: number;
   questionNbs: number[];
}

const initialState: gameType = {
   statusTxt: '',
   isGameOver: false,
   round: 0,
   totalRounds: 10,
   result: 0,
   correct: 0,
   wrong: 0,
   questionNbs: []
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
      setRound: (state, action: PayloadAction<number>) => {
         state.round = action.payload;
      },
      setQuestionNbs: (state, action: PayloadAction<number[]>) => {
         state.questionNbs = [...action.payload];
      },
   }
});

export const {
   setStatusTxt,
   setIsGameOver,
   setRound,
   setQuestionNbs
} = gameSlice.actions;

export default gameSlice.reducer;