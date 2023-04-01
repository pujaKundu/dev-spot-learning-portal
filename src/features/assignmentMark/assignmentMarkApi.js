import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignmentMarks: builder.query({
      query: () => `/assignmentMark`,
    }),
    editMark: builder.mutation({
      query: ({ assignmentId, mark, status }) => ({
        url: `/assignmentMark/${assignmentId}`,
        method: "PATCH",
        body: { mark, status },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const assignment = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllAssignmentMarks",
              undefined,
              (draft) => {
                const index = draft.findIndex(
                  (t) => t?.id == assignment?.data?.id
                );
                if (index != -1) {
                  draft[index].mark = assignment.data.mark;
                  draft[index].status = assignment.data.status;
                }
              }
            )
          );
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetAllAssignmentMarksQuery, useEditMarkMutation } =
  assignmentsApi;
