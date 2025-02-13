// Redux
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import userReducer from "./feature/user/UserSlice";
import negociosReducer from "./feature/negocios/NegocioSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    negocios: negociosReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch