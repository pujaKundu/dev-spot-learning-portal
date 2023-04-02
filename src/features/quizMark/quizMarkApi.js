import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => `/quizMark`,
    }),
    getQuizMarkByStudent: builder.query({
      query: (studentId) => `/quizMark?student_id=${studentId}`,
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
  }),
});

export const { useGetQuizMarkByStudentQuery, useGetQuizMarksQuery ,useAddQuizMarkMutation} = quizApi;
