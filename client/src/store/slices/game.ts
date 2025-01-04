import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";

type gameType = {
   db: any[];
   isGameOver: boolean;
   kanjiToMeaning: boolean;
   meaningToKanji: boolean;
   level: number;
   round: number;
   totalRounds: number;
   score: number;
   correct: number;
   wrong: number;
   questionNbs: number[];
}

const initialState: gameType = {
   db: [],
   isGameOver: false,
   kanjiToMeaning: false,
   meaningToKanji: false,
   level: 0,
   round: 0,
   totalRounds: 20,
   score: 0,
   correct: 0,
   wrong: 0,
   questionNbs: []
}

export const gameSlice = createSlice({
   name: "game",
   initialState,
   reducers: {
      setDb: (state, action: PayloadAction<any[]>) => {
         state.db = [...action.payload];
      },
      setIsGameOver: (state, action: PayloadAction<boolean>) => {
         state.isGameOver = action.payload;
      },
      setKanjiToMeaning: (state, action: PayloadAction<boolean>) => {
         state.kanjiToMeaning = action.payload;
      },
      setMeaningToKanji: (state, action: PayloadAction<boolean>) => {
         state.meaningToKanji = action.payload;
      },
      setLevel: (state, action: PayloadAction<number>) => {
         state.level = action.payload;
      },
      setRound: (state, action: PayloadAction<number>) => {
         state.round = action.payload;
      },
      setCorrect: (state, action: PayloadAction<number>) => {
         state.correct = action.payload;
         state.score = Math.floor((state.correct / (state.round + 1)) * 100);
      },
      setWrong: (state, action: PayloadAction<number>) => {
         state.wrong = action.payload;
         state.score = Math.floor((state.correct / (state.round + 1)) * 100);
      },
      setQuestionNbs: (state, action: PayloadAction<number[]>) => {
         state.questionNbs = [...action.payload];
      },
   }
});

export const {
   setDb,
   setIsGameOver,
   setKanjiToMeaning,
   setMeaningToKanji,
   setLevel,
   setRound,
   setCorrect,
   setWrong,
   setQuestionNbs
} = gameSlice.actions;

export default gameSlice.reducer;