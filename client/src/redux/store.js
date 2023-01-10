import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { myApi } from "./services/api";
import postsReducer from "./features/postSlice";
import usersReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    [myApi.reducerPath]: myApi.reducer,
    posts: postsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
});
