import { Link } from "react-router-dom";
import { AdminNavbar, Video } from "../index";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import Loader from "../../Loader";

const Videos = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  let content = null;
  if (isLoading) content = <Loader/>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && videos?.length === 0) {
    content = <p>No video found!</p>;
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos?.map((video) => <Video key={video?.id} video={video} />);
  }

  return (
    <div>
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link to="/admin/videos/add" className="btn ml-auto">
                Add Video
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
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
