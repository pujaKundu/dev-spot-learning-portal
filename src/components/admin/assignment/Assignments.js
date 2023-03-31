import { AdminNavbar, Assignment } from "../index";
import { Link } from "react-router-dom";
import { useGetAllAssignmentsQuery } from "../../../features/assignments/assignmentsApi";

const Assignments = () => {
  const {
    data: allAssignments,
    isLoading,
    isError,
  } = useGetAllAssignmentsQuery();
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

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
            <Link to="/admin/assignment/add" className="w-full flex">
              <button className="btn ml-auto">Add Assignment</button>
            </Link>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
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
    </>
  );
};

export default Assignments;
