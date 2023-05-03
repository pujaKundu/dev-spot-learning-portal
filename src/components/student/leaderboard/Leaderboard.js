import React from "react";
import { Link, useParams } from "react-router-dom";
import TopRank from './TopRank'
import OwnRank from "./OwnRank";
import { useGetAllAssignmentMarksQuery } from "../../../features/assignmentMark/assignmentMarkApi";
import { useGetQuizMarksQuery } from "../../../features/quizMark/quizMarkApi";
import logo from '../../../image/code.png'

const Leaderboard = () => {
  const { id:student_id } = useParams();
  const {
    data: assignmentMark,
    isLoading,
    isError,
  } = useGetAllAssignmentMarksQuery();
  const {
    data: quizMark,
    isLoading: loading,
    isError: error,
  } = useGetQuizMarksQuery();

  let quizIterable = [];
  let assignmentIterable = [];

  if (!isLoading && !isError && assignmentMark?.length > 0) {
    assignmentIterable = assignmentMark;
  }

  if (!loading && !error && quizMark?.length > 0) {
    quizIterable = quizMark;
  }

  // combining quizMark and assignmentMark
  const combinedData = [...quizIterable, ...assignmentIterable];
  const students = {};

  // Loop through the combined data and sum the marks for each student
  combinedData.forEach((item) => {
    if (!students[item.student_id]) {
      students[item.student_id] = {
        id: item.student_id,
        name: item.student_name,
        totalQuizMark: 0,
        totalAssignmentMark: 0,
        total: 0,
      };
    }

    if (item.mark !== undefined && item.totalQuiz === undefined) {
      students[item.student_id].totalAssignmentMark += item.mark;
    }

    if (item.totalMark !== undefined && item.totalQuiz !== undefined) {
      const quizMark = item.totalCorrect * 5;
      students[item.student_id].totalQuizMark += quizMark;
    }
  });

  // Convert the object to an array and calculate the total score and rank
  let lastTotal = -1;
  let currentRank = 0;

  const studentArray = Object.values(students)
    .map((student) => ({
      ...student,
      total: student.totalQuizMark + student.totalAssignmentMark,
    }))
    .sort((a, b) => b.total - a.total)
    .map((student, index, arr) => {
      const currentTotal = student.total;

      if (currentTotal === lastTotal) {
        student.rank = currentRank;
      } else {
        currentRank = index + 1;
        student.rank = currentRank;
        lastTotal = currentTotal;
      }

      return student;
    });

  
  let individualRow = null;
  individualRow = studentArray?.map((user) =>
    user.id === parseInt(student_id) ? (
      <OwnRank key={user.id} user={user} />
    ) : null
  );

  const top20Data = studentArray.slice(0, 20);
  let top20Row = null;
  top20Row = top20Data?.map((user) => <TopRank key={user.id} user={user} />);

  return (
    <>
      <Link to="/portal/1">
        <div className="flex items-center pt-3 pl-5">
          <img src={logo} alt="logo" width={30} height={30} />
          <p className="ml-2 text-xl font-semibold ">
            <span className="text-cyan-300">The Dev</span> Spot
          </p>
        </div>
      </Link>
      <h2 className="pt-12 text-center text-3xl font-semibold text-slate-100">
        <span className="text-cyan-300">Leader</span>board
      </h2>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Rank</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center text-cyan-400">Rank</th>
                  <th className="table-th !text-center text-cyan-400">Name</th>
                  <th className="table-th !text-center text-cyan-400">
                    Quiz Mark
                  </th>
                  <th className="table-th !text-center text-cyan-400">
                    Assignment Mark
                  </th>
                  <th className="table-th !text-center text-cyan-400">Total</th>
                </tr>
              </thead>
              {individualRow}
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top Performers</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center text-cyan-400">Rank</th>
                  <th className="table-th !text-center text-cyan-400">Name</th>
                  <th className="table-th !text-center text-cyan-400">
                    Quiz Mark
                  </th>
                  <th className="table-th !text-center text-cyan-400">
                    Assignment Mark
                  </th>
                  <th className="table-th !text-center text-cyan-400">Total</th>
                </tr>
              </thead>
              {top20Row}
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
