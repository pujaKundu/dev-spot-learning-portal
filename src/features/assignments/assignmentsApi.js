import { apiSlice } from "../api/apiSlice";

export const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignments: builder.query({
      query: () => `/assignments`,
    }),
    getAssignments: builder.query({
      query: (videoId) => `/assignments?video_id=${videoId}`,
    }),
    getAssignment: builder.query({
      query: (assignmentId) => `/assignments/${assignmentId}`,
    }),
    getAssignmentMark: builder.query({
      query: (videoId) => `/assignmentMark?video_id=${videoId}`,
    }),
    getAssignmentMarkByStudent: builder.query({
      query: (studentId) => `/assignmentMark?student_id=${studentId}`,
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
    addVideoAssignment: builder.mutation({
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
    editAssignment: builder.mutation({
      query: ({ assignmentId, data }) => ({
        url: `/assignments/${assignmentId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const assignment = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllAssignments",
              undefined,
              (draft) => {
                const index = draft.findIndex(
                  (t) => t?.id == assignment?.data?.id
                );
                if (index != -1) {
                  draft[index] = assignment.data;
                }
              }
            )
          );
        } catch (error) {}
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const assignmentId = arg;
        try {
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllAssignments",
              undefined,
              (draft) => {
                const index = draft.findIndex((t) => t?.id === assignmentId);
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
          const assignmentId = arg;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              const assignment = { id: assignmentId };
              draft.push(assignment);
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetAllAssignmentsQuery,
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useGetAssignmentMarkQuery,
  useGetAssignmentMarkByStudentQuery,
  useAddAssignmentMutation,
  useAddVideoAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;
