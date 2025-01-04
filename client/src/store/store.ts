import { PayloadAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from './slices/settings';
import gameReducer from './slices/game';

const appReducer = combineReducers({
   settings: settingsReducer,
   game: gameReducer
});

const rootReducer = (state: any, action: PayloadAction) => {
   if (action.type === 'RESET_GAME') {
      // exclude 'settings' slice from being reset
      const { settings } = state;
      state = { settings };
      //console.log(state);
   } else if (action.type === 'RESET_ALL') {
      //console.log("RESET_ALL called!");
      state = {};
   }
   return appReducer(state, action);
}

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         // allow non-serializable data to be stored (ChessPiece class instances)
         serializableCheck: {
            ignoredPaths: ['chessSet.pieces', 'pgnData.tags'],
            //ignoredActions: ['pgnData/setPgnData'],
            ignoredActionPaths: ['payload.tags']
         }
      })
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;