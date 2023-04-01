import React from "react";

const SingleAssignmentMark = ({ assignmentMark }) => {
  return (
    <tr>
      <td className="table-td">{assignmentMark?.title}</td>
      <td className="table-td"> {assignmentMark?.createdAt}</td>
      <td className="table-td">{assignmentMark?.student_name}</td>
      <td className="table-td">{assignmentMark?.repo_link}</td>
      <td className="table-td input-mark">
        <input max="100" value="" />
        <svg
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
      </td>
    </tr>
  );
};

export default SingleAssignmentMark;
