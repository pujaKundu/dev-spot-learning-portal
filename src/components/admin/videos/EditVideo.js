import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useEditVideoMutation,
  useGetVideoQuery,
} from "../../../features/videos/videosApi";
import AdminNavbar from "../dashboard/AdminNavbar";

const EditVideo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: video } = useGetVideoQuery(id);

  const [editVideo, { isSuccess, isError, error }] = useEditVideoMutation();
  // initial values

  //states for input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  //   const [createdAt, setCreatedAt] = useState("");

  //get createdAt time
  const currDate = new Date();
  const time = currDate.toISOString();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: title,
      description: description,
      url: url,
      views: views,
      duration: duration,
      createdAt: time,
    };

    //Edit video
    editVideo({
      videoId: video?.id,
      data: {
        title: title,
        description: description,
        url: url,
        views: views,
        duration: duration,
        createdAt: time,
      },
    });
    // reset input field values
    setTitle("");
    setDescription("");
    setUrl("");
    setViews("");
    setDuration("");
    // success alert and navigate to videos
    alert("Video Edited Successfully");
    navigate("/admin/videos");
    // if (isSuccess) {
    //   alert("Video Edited Successfully");
    // }
  };

  return (
    <>
      <AdminNavbar />
      <div className="w-full max-w-screen-lg mx-auto">
        <h3 className="text-cyan-500 text-3xl py-10  font-bold">
          Edit New Video
        </h3>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-slate-900 shadow-md rounded px-8 pt-6 pb-8 my-4"
        >
          <div class="mb-4">
            <label class="block text-slate-300 font-bold mb-2 " for="title">
              Title
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="title"
              type="text"
              placeholder="Enter title"
              defaultValue={video?.title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-slate-300 font-bold mb-2"
              for="description"
            >
              Description
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="description"
              defaultValue={video?.description}
              placeholder="Enter description"
              required
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-slate-300 font-bold mb-2" for="url">
              URL
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="url"
              type="text"
              required
              placeholder="Enter URL"
              defaultValue={video?.url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div class="mb-4">
            <label class="block text-slate-100 font-bold mb-2" for="views">
              Views
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="views"
              type="text"
              placeholder="Enter views"
              defaultValue={video?.views}
              required
              onChange={(e) => setViews(e.target.value)}
            />
          </div>
          <div class="mb-4">
            <label class="block text-slate-300 font-bold mb-2" for="duration">
              Duration
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="duration"
              type="text"
              placeholder="Enter duration"
              required
              defaultValue={video?.duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          {/* <div class="mb-4">
          <label class="block text-slate-300 font-bold mb-2" for="duration">
            Created At
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
            id="duration"
            type="date"
            placeholder="Enter duration"
            required
            defaultValue={initialCreatedAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </div> */}

          <div class="flex items-center justify-between">
            <button
              class="bg-cyan-500 hover:bg-cyan-700 hover:text-slate-100 text-slate-900 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-transparent"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditVideo;