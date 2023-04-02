import React from "react";

const TopRank = ({ user }) => {
  const { rank, totalassignmentMarks, totalQuizMark, total, name } =
        user || {};
    console.log(user)
  return (
    <tbody>
      <tr className="border-2 border-cyan">
        <td className="table-td text-center font-bold">{rank}</td>
        <td className="table-td text-center font-bold">{name}</td>
        <td className="table-td text-center font-bold">{totalQuizMark}</td>
        <td className="table-td text-center font-bold">
          {totalassignmentMarks}
        </td>
        <td className="table-td text-center font-bold">{total}</td>
      </tr>
    </tbody>
  );
};

export default TopRank;
