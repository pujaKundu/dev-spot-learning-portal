import React from "react";

const OwnRank = ({ user }) => {
  const { rank, totalAssignmentMark, totalQuizMark, total, name } = user;
  return (
    <tbody>
      <tr className="border-2 border-cyan ">
        <td className="table-td text-center font-bold border border-slate-800">
          {rank}
        </td>
        <td className="table-td font-bold uppercase text-left border border-slate-800">
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

export default OwnRank;
