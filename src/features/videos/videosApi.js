import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => `/videos`,
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const task = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(task.data);
            })
          );
        } catch (err) {}
      },
    }),
    editVideo: builder.mutation({
      query: ({ videoId, data }) => ({
        url: `/videos/${videoId}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const task = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getvideos", undefined, (draft) => {
              const index = draft.findIndex((t) => t?.id == task?.data?.id);
              if (index != -1) {
                draft[index] = task.data;
              }
            })
          );
        } catch (error) {}
      },
    }),
    editVideoStatus: builder.mutation({
      query: ({ taskId, status }) => ({
        url: `/videos/${taskId}`,
        method: "PATCH",
        body: { status },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const task = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getvideos", undefined, (draft) => {
              const index = draft.findIndex((t) => t?.id == task?.data?.id);
              if (index != -1) {
                draft[index].status = task.data.status;
              }
            })
          );
        } catch (error) {}
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const taskId = arg;
        try {
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              const index = draft.findIndex((t) => t?.id === taskId);
              if (index !== -1) {
                draft.splice(index, 1);
              }
            })
          );
        } catch (error) {}
      },
      onQueryReturned(arg, { error, dispatch }) {
        if (error) {
          const videoId = arg;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              const task = { id: videoId };
              draft.push(task);
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useEditVideostatusMutation,
  useDeleteVideoMutation,
} = videosApi;
