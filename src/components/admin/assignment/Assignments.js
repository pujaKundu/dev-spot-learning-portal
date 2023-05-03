import { AdminNavbar, Assignment } from "../index";
import { Link } from "react-router-dom";
import { useGetAllAssignmentsQuery } from "../../../features/assignments/assignmentsApi";
import Loader from "../../Loader";

const Assignments = () => {
  const {
    data: allAssignments,
    isLoading,
    isError,
  } = useGetAllAssignmentsQuery();
  let content = null;
  if (isLoading) content = <Loader/>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && allAssignments?.length === 0) {
    content = <p>No assignment found!</p>;
  }

  if (!isLoading && !isError && allAssignments?.length > 0) {
    content = allAssignments?.map((assignment) => (
      <Assignment key={assignment?.id} assignment={assignment} />
    ));
  }
  return (
    <>
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            {" "}
            <h1 className="text-3xl font-semibold text-center">
              <span className="text-cyan-300">Manage</span> Assignments
            </h1>
            <Link to="/admin/assignment/add" className="w-full flex">
              <button className="btn ml-auto">Add Assignment</button>
            </Link>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th text-cyan-300">Title</th>
                    <th className="table-th text-cyan-300">Video Title</th>
                    <th className="table-th text-cyan-300">Mark</th>
                    <th className="table-th text-cyan-300">Action</th>
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
    </>
  );
};

export default Assignments;
