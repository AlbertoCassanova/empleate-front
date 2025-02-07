// Redux
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import userReducer from "./feature/user/UserSlice";

const store = configureStore({
  reducer: {
    user: userReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch