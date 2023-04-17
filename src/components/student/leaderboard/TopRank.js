import React from "react";

const TopRank = ({ user }) => {
  const { rank, totalAssignmentMark, totalQuizMark, total, name } =
        user || {};
   
  return (
    <tbody>
      <tr className="border border-slate-700 hover:bg-slate-900">
        <td className="table-td text-center font-bold border border-slate-800">
          {rank}
        </td>
        <td className="table-td text-left font-bold uppercase border border-slate-800">
          {name}
        </td>
        <td className="table-td text-center font-bold border border-slate-800">
          {totalQuizMark}
        </td>
        <td className="table-td text-center font-bold border border-slate-800">
          {totalAssignmentMark}
        </td>
        <td className="table-td text-center font-bold border border-slate-800">
          {total}
        </td>
      </tr>
    </tbody>
  );
};

export default TopRank;
