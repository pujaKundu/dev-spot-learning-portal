import React from "react";
import { useGetQuizzesQuery } from "../../../../features/quiz/quizApi";

const QuizModal = ({ open, control, videoId }) => {
  const { data: quizzes, isLoading, isError } = useGetQuizzesQuery(videoId);

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed  inset-0 z-10 bg-black/50 cursor-pointer" style={{width:'800px'}}
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-slate-900 shadow-lg border-cyan-300 border p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-xl font-bold text-cyan-600">Quiz</h2>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              {quizzes.map((quiz) => (
                <div className="mb-3">
                  <p className="text-cyan-400 text-xl my-2">
                    <span>Q{quiz?.id}. </span>
                    {quiz?.question}
                  </p>
                  {quiz?.options.map((option) => (
                    <div
                      key={option?.id}
                      className="p-2 my-2 border border-slate-500 rounded "
                    >
                      <label>
                        <input
                          type="checkbox"
                          name="option"
                          value={option.id}
                          required
                          className="mr-2 my-2 p-2  rounded bg-transparent"
                        />
                        {option.option}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 "
              >
                Submit
              </button>
            </div>

            {/* <Error message="There was an error" /> */}
          </form>
        </div>
      </>
    )
  );
};

export default QuizModal;
