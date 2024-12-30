import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";

type gameType = {
   isGameOver: boolean;
   round: number;
   totalRounds: number;
   score: number;
   correct: number;
   wrong: number;
   questionNbs: number[];
}

const initialState: gameType = {
   isGameOver: false,
   round: 0,
   totalRounds: 10,
   score: 0,
   correct: 0,
   wrong: 0,
   questionNbs: []
}

export const gameSlice = createSlice({
   name: "game",
   initialState,
   reducers: {
      setIsGameOver: (state, action: PayloadAction<boolean>) => {
         state.isGameOver = action.payload;
      },
      setRound: (state, action: PayloadAction<number>) => {
         state.round = action.payload;
      },
      setCorrect: (state, action: PayloadAction<number>) => {
         state.correct = action.payload;
         console.log(state.correct + 1);
         console.log(state.round + 1);
         state.score = Math.floor((state.correct / (state.round + 1)) * 100);
      },
      setWrong: (state, action: PayloadAction<number>) => {
         state.wrong = action.payload;
         console.log(state.correct + 1);
         console.log(state.round + 1);
         state.score = Math.floor((state.correct / (state.round + 1)) * 100);
      },
      setQuestionNbs: (state, action: PayloadAction<number[]>) => {
         state.questionNbs = [...action.payload];
      },
   }
});

export const {
   setIsGameOver,
   setRound,
   setCorrect,
   setWrong,
   setQuestionNbs
} = gameSlice.actions;

export default gameSlice.reducer;