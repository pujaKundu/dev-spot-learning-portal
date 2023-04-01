import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import assignmentsReducer from "../features/assignments/assignmentsSlice";
import authSliceReducer from "../features/auth/authSlice";
import quizReducer from "../features/quiz/quizSlice";
import videosReducer from "../features/videos/videosSlice";
import assignmentMarkReducer from "../features/assignmentMark/assignmentMarkSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    videos: videosReducer,
    quizzes: quizReducer,
    assignments: assignmentsReducer,
    assignmentMarks:assignmentMarkReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
