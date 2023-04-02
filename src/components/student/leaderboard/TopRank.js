import React from "react";

const TopRank = ({ user }) => {
  const { rank, totalassignmentMarks, totalQuizMark, total, name } =
        user || {};
   
  return (
    <tbody>
      <tr className="border border-slate-700 hover:border-cyan-600 hover:border-2">
        <td className="table-td text-center font-bold">{rank}</td>
        <td className="table-td text-center font-bold uppercase ">{name}</td>
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
