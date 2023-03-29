import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: (videoId) => `/assignments?video_id=${videoId}`,
    }),
    getAssignmentMark: builder.query({
      query: (videoId) => `/assignmentMark?video_id=${videoId}`,
    }),
   
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const assignment = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                draft.push(assignment?.data);
              }
            )
          );
        } catch (err) {}
      },
    }),
  }),
});

export const { useGetAssignmentsQuery,useGetAssignmentMarkQuery, useAddAssignmentMutation } =
  assignmentsApi;
