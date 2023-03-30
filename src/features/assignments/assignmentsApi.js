import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignments: builder.query({
      query: () => `/assignments`,
    }),
    getAssignments: builder.query({
      query: (videoId) => `/assignments?video_id=${videoId}`,
    }),
    getAssignmentMark: builder.query({
      query: (videoId) => `/assignmentMark?video_id=${videoId}`,
    }),

    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
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

export const {
  useGetAllAssignmentsQuery,
  useGetAssignmentsQuery,
  useGetAssignmentMarkQuery,
  useAddAssignmentMutation,
} = assignmentsApi;
