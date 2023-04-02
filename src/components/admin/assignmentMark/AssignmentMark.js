import { useGetAllAssignmentMarksQuery } from "../../../features/assignmentMark/assignmentMarkApi";
import { AdminNavbar } from "../index";
import AssignmentStatus from "./AssignmentStatus";
import SingleAssignmentMark from "./SingleAssignmentMark";

const AssignmentMark = () => {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAllAssignmentMarksQuery();
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = <p>No video found!</p>;
  }

  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = assignmentMarks?.map((assignmentMark) => (
      <SingleAssignmentMark
        key={assignmentMark?.id}
        assignmentMark={assignmentMark}
      />
    ));
  }
  return (
    <>
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <AssignmentStatus assignmentMarks={assignmentMarks} />
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
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

export default AssignmentMark;
