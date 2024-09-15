import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "../../api/user/userApi";
import { contractsApi } from "../../api/contracts/constractsApi";
import { chatApi } from "../../api/chat/chatApi";

const reducers = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [contractsApi.reducerPath]: contractsApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(contractsApi.middleware)
      .concat(chatApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
