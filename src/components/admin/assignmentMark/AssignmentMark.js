import { useGetAllAssignmentMarksQuery } from '../../../features/assignmentMark/assignmentMarkApi';
import {AdminNavbar} from '../index'
import AssignmentStatus from './AssignmentStatus';
import SingleAssignmentMark from './SingleAssignmentMark';

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
        <section class="py-6 bg-primary">
          <div class="mx-auto max-w-full px-5 lg:px-20">
            <div class="px-3 py-20 bg-opacity-10">
              <AssignmentStatus assignmentMarks={assignmentMarks} />
              <div class="overflow-x-auto mt-4">
                <table class="divide-y-1 text-base divide-gray-600 w-full">
                  <thead>
                    <tr>
                      <th class="table-th">Assignment</th>
                      <th class="table-th">Date</th>
                      <th class="table-th">Student Name</th>
                      <th class="table-th">Repo Link</th>
                      <th class="table-th">Mark</th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-slate-600/50">{content}</tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </>
    );
};

export default AssignmentMark;