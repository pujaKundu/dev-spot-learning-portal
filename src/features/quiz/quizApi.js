import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizzes: builder.query({
      query: () => `/quizzes`,
    }),
    getQuizzes: builder.query({
      query: (videoId) => `/quizzes?video_id=${videoId}`,
    }),
    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
    getQuizMarks: builder.query({
      query: () => `/quizMark`,
    }),
    getQuizMarkByStudent: builder.query({
      query: (studentId) => `/quizMark?student_id=${studentId}`,
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const quiz = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              draft.push(quiz.data);
            })
          );
        } catch (err) {}
      },
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const quiz = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getQuizMarks",
              undefined,
              (draft) => {
                draft.push(quiz.data);
              }
            )
          );
        } catch (err) {}
      },
    }),
    editQuiz: builder.mutation({
      query: ({ quizId, data }) => ({
        url: `/quizzes/${quizId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const quiz = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              const index = draft.findIndex((t) => t?.id == quiz?.data?.id);
              if (index != -1) {
                draft[index] = quiz.data;
              }
            })
          );
        } catch (error) {}
      },
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const quizId = arg;
        try {
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllQuizzes",
              undefined,
              (draft) => {
                const index = draft.findIndex((t) => t?.id === quizId);
                if (index !== -1) {
                  draft.splice(index, 1);
                }
              }
            )
          );
        } catch (error) {}
      },
      onQueryReturned(arg, { error, dispatch }) {
        if (error) {
          const quizIdId = arg;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllQuizzes",
              undefined,
              (draft) => {
                const quizId = { id: quizIdId };
                draft.push(quizId);
              }
            )
          );
        }
      },
    }),
  }),
});

export const {
  useGetAllQuizzesQuery,
  useGetQuizMarksQuery,
  useGetQuizzesQuery,
  useGetQuizQuery,
  useGetQuizMarkByStudentQuery,
  useAddQuizMutation,
  useAddQuizMarkMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
} = quizApi;
