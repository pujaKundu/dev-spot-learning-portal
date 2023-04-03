import React from "react";

const TopRank = ({ user }) => {
  const { rank, totalAssignmentMark, totalQuizMark, total, name } =
        user || {};
   
  return (
    <tbody>
      <tr className="border border-slate-700 hover:border-cyan-600 hover:border-2">
        <td className="table-td text-center font-bold border border-slate-700">
          {rank}
        </td>
        <td className="table-td text-left font-bold uppercase border border-slate-700">
          {name}
        </td>
        <td className="table-td text-center font-bold border border-slate-700">
          {totalQuizMark}
        </td>
        <td className="table-td text-center font-bold border border-slate-700">
          {totalAssignmentMark}
        </td>
        <td className="table-td text-center font-bold border border-slate-700">
          {total}
        </td>
      </tr>
    </tbody>
  );
};

export default TopRank;
