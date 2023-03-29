import React from "react";

const AddVideo = () => {
  // {
  //     "id": 1,
  //     "title": "Debounce Function in JavaScript - JavaScript Job Interview question",
  //     "description": "In this video, I have explained about the debounce function in JavaScript. This is a common question interviewers ask at Job Interviews. If you watch this video carefully, you will understand what is debounce and how to handle it with custom debounce function.",
  //     "url": "https://www.youtube.com/embed/dD9O8DnIBj4",
  //     "views": "51.2K",
  //     "duration": "5:30",
  //     "createdAt": "2023-01-15T15:17:01.727Z"
  //   },
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <h3 className="text-cyan-500 text-2xl py-6 pl-8">Add New Video</h3>
      <form className="w-full bg-primary shadow-md rounded px-8 pt-6 pb-8 my-4">
        <div class="mb-4">
          <label class="block text-slate-300 font-bold mb-2 " for="title">
            Title
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
            id="title"
            type="text"
            placeholder="Enter title"
          />
        </div>
        <div class="mb-4">
          <label class="block text-slate-300 font-bold mb-2" for="description">
            Description
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
            id="description"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-slate-300 font-bold mb-2" for="url">
            URL
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
            id="url"
            type="text"
            placeholder="Enter URL"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="views">
            Views
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
            id="views"
            type="text"
            placeholder="Enter views"
          />
        </div>
        <div class="mb-4">
          <label class="block text-slate-300 font-bold mb-2" for="duration">
            Duration
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
            id="duration"
            type="text"
            placeholder="Enter duration"
          />
        </div>
        <div class="mb-4">
          <label class="block text-slate-300 font-bold mb-2" for="createdAt">
            Created At
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
            id="createdAt"
            type="text"
            placeholder="Enter created at"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-transparent"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVideo;
