import React from "react";

const QuizModal = ({ open, control }) => {
  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-slate-900 shadow-lg border-cyan-300 border p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-2xl font-bold text-cyan-500">
            Quiz
          </h2>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  Quiz
                </label>
                <input
                  id="to"
                  name="repository"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-slate-100 bg-slate-900 text-slate-100 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Enter GitHub Repository Link"
                />
              </div>
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
