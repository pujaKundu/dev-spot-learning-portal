import React from "react";

const OwnRank = ({ user }) => {
  const { rank, totalassignmentMarks, totalQuizMark, total, name } = user ;
  return (
    <tbody>
      <tr className="border-1 border-cyan-500 ">
        <td className="table-td text-center font-semibold text-cyan-400 border border-slate-700">
          {rank}
        </td>
        <td className="table-td text-left font-semibold text-cyan-400 border border-slate-700">
          {name}
        </td>
        <td className="table-td text-center font-semibold text-cyan-400 border border-slate-700">
          {totalQuizMark}
        </td>
        <td className="table-td text-center font-semibold text-cyan-400 border border-slate-700">
          {totalassignmentMarks}
        </td>
        <td className="table-td text-center font-semibold">{total}</td>
      </tr>
    </tbody>
  );
};

export default OwnRank;
