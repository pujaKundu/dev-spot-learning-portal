import { useState } from "react";
import { useEditMarkMutation } from "../../../features/assignmentMark/assignmentMarkApi";

const SingleAssignmentMark = ({ assignmentMark }) => {
  const [editMark, { isSuccess }] = useEditMarkMutation();
  const [mark, setMark] = useState(null);
  const [status, setStatus] = useState("pending");
  const handleEditMark = () => {
    editMark({ assignmentId: assignmentMark?.id, mark, status });
    setStatus("published");
    if (isSuccess) {
        alert("Mark updated");
    }
  };
  return (
    <tr>
      <td className="table-td">{assignmentMark?.title}</td>
      <td className="table-td"> {assignmentMark?.createdAt}</td>
      <td className="table-td">{assignmentMark?.student_name}</td>
      <td className="table-td">
        <a
          className="text-cyan-400"
          href={assignmentMark?.repo_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {assignmentMark?.repo_link}
        </a>
      </td>
      <td className="table-td input-mark">
        {assignmentMark?.status === "published" ? (
          <p className="text-center text-white font-semibold bg-green-500 py-1 px-2 w-[80px] rounded-lg">
            {assignmentMark?.mark}
          </p>
        ) : (
          <div className="flex justify-center items-center">
            <input
              max="100"
              type="number"
              defaultValue={mark}
              className="px-2"
              onChange={(e) => setMark(e.target.value)}
            />
            <svg
              onClick={handleEditMark}
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        )}
      </td>
    </tr>
  );
};

export default SingleAssignmentMark;
