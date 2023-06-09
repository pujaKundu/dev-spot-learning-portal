import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditQuizMutation,
  useGetQuizQuery,
} from "../../../features/quiz/quizApi";
import { useGetVideosQuery } from "../../../features/videos/videosApi";

const EditQuiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: videos } = useGetVideosQuery();
  const { data: quiz } = useGetQuizQuery(id);
  const [editQuiz] = useEditQuizMutation();

  //states for input values
  const [question, setQuestion] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [isCorrect1, setIsCorrect1] = useState(false);
  const [isCorrect2, setIsCorrect2] = useState(false);
  const [isCorrect3, setIsCorrect3] = useState(false);
  const [isCorrect4, setIsCorrect4] = useState(false);

  //get corresponding video id
  const matchedVideo = videos?.find((video) => video?.title === videoTitle);
  const mathcedVideoId = matchedVideo?.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      question,
      video_id: mathcedVideoId,
      video_title: videoTitle,
      options: [
        {
          id: 1,
          option: option1,
          isCorrect: isCorrect1,
        },
        {
          id: 2,
          option: option2,
          isCorrect: isCorrect2,
        },
        {
          id: 3,
          option: option3,
          isCorrect: isCorrect3,
        },
        {
          id: 4,
          option: option4,
          isCorrect: isCorrect4,
        },
      ],
    };
    //add video
    editQuiz({ quizId: quiz?.id, data: formData });
    // reset input field values
    setQuestion("");
    setVideoTitle("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setIsCorrect1(false);
    setIsCorrect2(false);
    setIsCorrect3(false);
    setIsCorrect4(false);
    alert("Quiz Edited Successfully");
    navigate("/admin/quiz");
  };

  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto">
        <h3 className="text-cyan-500 text-3xl py-10  font-bold">Edit Quiz</h3>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-slate-900 shadow-md rounded px-8 pt-6 pb-8 my-4"
        >
          <div className="mb-4">
            <label
              className="block text-slate-300 font-bold mb-2 "
              htmlFor="title"
            >
              Question
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="title"
              type="text"
              placeholder="Enter question"
              defaultValue={quiz?.question}
              required
              onChange={(e) => setQuestion(e.target.value)}
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
              defaultValue={quiz?.video_title}
              onChange={(e) => setVideoTitle(e.target.value)}
            >
              <option defaultValue="" hidden selected>
                Select Video
              </option>
              {videos?.map((video) => (
                <option className="bg-slate-700" defaultValue={video?.title}>
                  {video?.title}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xl font-semibold">
            Enter options and mark the correct answer
          </p>
          <div className="my-4">
            <label className="block text-slate-400 font-bold mb-2" htmlFor="">
              Option 1
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="duration"
              type="text"
              placeholder="Enter first option"
              required
              defaultValue={quiz?.options[0]?.option}
              onChange={(e) => setOption1(e.target.value)}
            />
            <input
              type="checkbox"
              name="option1"
              id=""
              defaultChecked={quiz?.options[0]?.isCorrect}
              onChange={(e) => setIsCorrect1(e.target.checked)}
              className="bg-transparent mr-2 rounded cursor-pointer"
            />{" "}
            <span>Is the first option correct ?</span>
          </div>
          <div className="my-4">
            <label className="block text-slate-400 font-bold mb-2" htmlFor="">
              Option 2
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id=""
              type="text"
              placeholder="Enter second option"
              required
              defaultValue={quiz?.options[1]?.option}
              onChange={(e) => setOption2(e.target.value)}
            />
            <input
              type="checkbox"
              name="option2"
              id=""
              defaultChecked={quiz?.options[1]?.isCorrect}
              onChange={(e) => setIsCorrect2(e.target.checked)}
              className="bg-transparent mr-2 rounded cursor-pointer"
            />{" "}
            <span>Is the second option correct ?</span>
          </div>
          <div className="my-4">
            <label className="block text-slate-400 font-bold mb-2" htmlFor="">
              Option 3
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="duration"
              type="text"
              placeholder="Enter third option"
              required
              defaultValue={quiz?.options[2]?.option}
              onChange={(e) => setOption3(e.target.value)}
            />
            <input
              type="checkbox"
              name="option3"
              id=""
              defaultChecked={quiz?.options[2]?.isCorrect}
              onChange={(e) => setIsCorrect3(e.target.checked)}
              className="bg-transparent mr-2 rounded cursor-pointer"
            />{" "}
            <span>Is the first option correct ?</span>
          </div>
          <div className="my-4">
            <label className="block text-slate-400 font-bold mb-2" htmlFor="">
              Option 4
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
              id="duration"
              type="text"
              placeholder="Enter fourth option"
              required
              defaultValue={quiz?.options[3]?.option}
              onChange={(e) => setOption4(e.target.value)}
            />
            <input
              type="checkbox"
              name="option4"
              id=""
              defaultChecked={quiz?.options[3]?.isCorrect}
              onChange={(e) => setIsCorrect4(e.target.checked)}
              className="bg-transparent mr-2 rounded cursor-pointer"
            />{" "}
            <span>Is the fourth option correct ?</span>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-cyan-500 hover:bg-cyan-700 hover:text-slate-100 text-slate-900 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-transparent"
              type="submit"
            >
              Update
            </button>
          </div>
          {/* {isSuccess && (
          <p className="text-green-500 border border-green-600 rounded-full text-center w-[250px] my-5 py-2">
            Video Added Successfully
          </p>
        )} */}
        </form>
      </div>
    </>
  );
};

export default EditQuiz;
