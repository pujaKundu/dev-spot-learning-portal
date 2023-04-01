import React from "react";

const AssignmentStatus = ({ assignmentMarks = [] }) => {
  const nof_marks = assignmentMarks.length;
  const pending_marks = assignmentMarks.filter(
    (mark) => mark?.status === "pending"
  );
  const nof_pending_marks = pending_marks.length;
  const published_marks = assignmentMarks.filter(
    (mark) => mark?.status === "published"
  );
  const nof_published_marks = published_marks.length;
  return (
    <ul className="assignment-status">
      <li>
        Total <span>{nof_marks}</span>
      </li>
      <li>
        Pending <span>{nof_pending_marks}</span>
      </li>
      <li>
        Mark Sent <span>{nof_published_marks}</span>
      </li>
    </ul>
  );
};

export default AssignmentStatus;
