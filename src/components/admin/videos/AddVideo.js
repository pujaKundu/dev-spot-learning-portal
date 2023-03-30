import { useState } from "react";
import { useAddVideoMutation } from "../../../features/videos/videosApi";

const AddVideo = () => {
  const [addVideo, { isSuccess }] = useAddVideoMutation();

  //states for input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");

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
    //add video
    addVideo(formData);
    // reset input field values
    setTitle("");
    setDescription("");
    setUrl("");
    setViews("");
    setDuration("");
    alert("Video Added Successfully");
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <h3 className="text-cyan-500 text-3xl py-10  font-bold">Add New Video</h3>
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
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label class="block text-slate-300 font-bold mb-2" for="description">
            Description
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
            id="description"
            value={description}
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
            value={url}
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
            value={views}
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
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-cyan-500 hover:bg-cyan-700 hover:text-slate-100 text-slate-900 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-transparent"
            type="submit"
          >
            Save
          </button>
        </div>
        {/* {isSuccess && (
          <p className="text-green-500 border border-green-600 rounded-full text-center w-[250px] my-5 py-2">
            Video Added Successfully
          </p>
        )} */}
      </form>
    </div>
  );
};

export default AddVideo;
