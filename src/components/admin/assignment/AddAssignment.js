import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddVideoAssignmentMutation } from "../../../features/assignments/assignmentsApi";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import AdminNavbar from "../dashboard/AdminNavbar";

const AddAssignment = () => {
  const navigate = useNavigate();
  const { data: videos } = useGetVideosQuery();
  const [addVideoAssignment, { isSuccess }] = useAddVideoAssignmentMutation();

  //states for input values
  const [title, setTitle] = useState("");
  const [totalMark, setTotalMark] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  //get corresponding video id
  const matchedVideo = videos?.find((video) => video?.title === videoTitle);
  const mathcedVideoId = matchedVideo?.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      totalMark,
      video_id: mathcedVideoId,
      video_title: videoTitle,
    };
    //add Assignment
    addVideoAssignment(formData);
    // reset input field values
    setTitle("");
    setTotalMark("");
    setVideoTitle("");

    alert("Assignment Added Successfully");
    navigate("/admin/assignment");
  };

  return (
    <>
      <AdminNavbar />
      <div className="w-full max-w-screen-lg mx-auto">
        <h3 className="text-cyan-500 text-3xl py-10  font-bold">
          Add New Assignment
        </h3>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-slate-900 shadow-md rounded px-8 pt-6 pb-8 my-4"
        >
          <div className="mb-4">
            <label
              className="block text-slate-300 font-bold mb-2 "
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-300 font-bold mb-2 "
              htmlFor="title"
            >
              Video Title
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              name="video-title"
              id=""
              required
              onChange={(e) => setVideoTitle(e.target.value)}
            >
              <option value="" hidden selected>
                Select Video
              </option>
              {videos?.map((video) => (
                <option className="bg-slate-700" value={video?.title}>
                  {video?.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-slate-300 font-bold mb-2"
              htmlFor="duration"
            >
              Total Mark
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="duration"
              type="text"
              placeholder="Enter duration"
              required
              value={totalMark}
              onChange={(e) => setTotalMark(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-cyan-500 hover:bg-cyan-700 hover:text-slate-100 text-slate-900 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-transparent"
              type="submit"
            >
              Save
            </button>
          </div>
          {/* {isSuccess && (
          <p className="text-green-500 border border-green-600 rounded-full text-center w-[250px] my-5 py-2">
            Assignment Added Successfully
          </p>
        )} */}
        </form>
      </div>
    </>
  );
};

export default AddAssignment;
