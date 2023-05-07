import { Link } from "react-router-dom";
import { AdminNavbar, Video } from "../index";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import Loader from "../../Loader";

const Videos = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  let content = null;
  if (isLoading) content = <Loader />;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && videos?.length === 0) {
    content = <p>No video found!</p>;
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos?.map((video) => <Video key={video?.id} video={video} />);
  }

  return (
    <div
      style={{
        backgroundColor: "#000000",
        opacity: "1",
        backgroundImage:
          "linear-gradient(#090909 2px, transparent 2px), linear-gradient(90deg, #090909 2px, transparent 2px), linear-gradient(#090909 1px, transparent 1px), linear-gradient(90deg, #090909 1px, #000000 1px)",
        backgroundSize: " 50px 50px, 50px 50px, 10px 10px, 10px 10px",
        backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px",
        height:'100vh'
      }}
    >
      <AdminNavbar />
      <section className="py-6">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            {" "}
            <h1 className="text-3xl font-semibold text-center">
              <span className="text-cyan-300">Manage</span> Videos
            </h1>
            <div className="w-full flex">
              <Link to="/admin/videos/add" className="btn ml-auto">
                Add Video
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th text-cyan-300 ">Video Title</th>
                    <th className="table-th text-cyan-300 ">Description</th>
                    <th className="table-th text-cyan-300 ">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50 py-8">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;
