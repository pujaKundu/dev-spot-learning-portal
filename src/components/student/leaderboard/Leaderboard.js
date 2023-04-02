import React from "react";
import Navbar from "../../shared/Navbar";
import OwnRank from "./OwnRank";
import TopRank from "./TopRank";
import { useParams } from "react-router-dom";
import { useGetAllAssignmentMarksQuery } from "../../../features/assignmentMark/assignmentMarkApi";
import { useGetQuizMarksQuery } from "../../../features/quizMark/quizMarkApi";

const Leaderboard = () => {
  const { id } = useParams();
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAllAssignmentMarksQuery();
  const {
    data: quizMarks,
    isLoading: loading,
    isError: error,
  } = useGetQuizMarksQuery();

  let quizIterable = [];
  let assignmentIterable = [];

  console.log(assignmentMarks);
  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    assignmentIterable = assignmentMarks;
  }

  if (!loading && !error && quizMarks?.length > 0) {
    quizIterable = quizMarks;
  }

  // combining quizMark and assignmentMarks
  const combinedData = [...quizIterable, ...assignmentIterable];
  const students = {};

  // Loop through the combined data and sum the marks for each student
  combinedData.forEach((item) => {
    if (!students[item.id]) {
      students[item.id] = {
        id: item.id,
        name: item.student_name,
        totalQuizMark: 0,
        totalassignmentMarks: 0,
        total: 0,
      };
    }

    if (item.mark !== undefined && item.totalQuiz === undefined) {
      students[item.id].totalassignmentMarks += item.mark;
    }

    if (item.totalMark !== undefined && item.totalQuiz !== undefined) {
      const quizMark = item.totalCorrect * 5;
      students[item.id].totalQuizMark += quizMark;
    }
  });

  const uniqueStudents = combinedData.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        id: item.id,
        name: item.student_name,
        totalQuizMark: 0,
        totalassignmentMarks: 0,
        total: 0,
      };
    }

    if (item.mark !== undefined && item.totalQuiz === undefined) {
      acc[item.id].totalassignmentMarks += item.mark;
    }

    if (item.totalMark !== undefined && item.totalQuiz !== undefined) {
      const quizMark = item.totalCorrect * 5;
      acc[item.id].totalQuizMark += quizMark;
    }

    return acc;
  }, {});
  // Convert the object to an array and calculate the total score and rank
  let lastTotal = -1;
  let currentRank = 0;

  const studentArray = Object.values(uniqueStudents)
    .map((student) => ({
      ...student,
      total: student.totalQuizMark + student.totalassignmentMarks,
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

  console.log("qmar", studentArray);
  let individualRow = null;
  individualRow = studentArray?.map((user) =>
    user.id === parseInt(id) ? <OwnRank key={user.id} user={user} /> : null
  );

  const top20Data = studentArray.slice(0, 20);
  let top20Row = null;
  top20Row = top20Data?.map((user) => <TopRank key={user.id} user={user} />);

  return (
    <section className="py-6 bg-primary">
      <h1 className="text-3xl text-center font-semibold my-5">
        <span className="text-cyan-300">লিডার</span>বোর্ড
      </h1>
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div>
          <h3 className="text-lg font-bold text-slate-300">
            লিডারবোর্ড এ আপনার অবস্থান
          </h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr className="bg-slate-800">
                <th className="table-th !text-center">র‍্যাঙ্ক</th>
                <th className="table-th !text-center">নাম</th>
                <th className="table-th !text-center">
                  কুইজ থেকে প্রাপ্ত নাম্বার
                </th>
                <th className="table-th !text-center">
                  এসাইনমেন্ট থেকে প্রাপ্ত নাম্বার
                </th>
                <th className="table-th !text-center">মোট নাম্বার</th>
              </tr>
            </thead>
            {individualRow}
          </table>
        </div>

        <div className="my-8">
          <h3 className="text-lg font-bold text-slate-300">টপ পারফরমারস</h3>
          <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
            <thead>
              <tr className="bg-slate-800">
                <th className="table-th !text-center">র‍্যাঙ্ক</th>
                <th className="table-th !text-center">নাম</th>
                <th className="table-th !text-center">
                  কুইজ থেকে প্রাপ্ত নাম্বার
                </th>
                <th className="table-th !text-center">
                  এসাইনমেন্ট থেকে প্রাপ্ত নাম্বার
                </th>
                <th className="table-th !text-center">মোট নাম্বার</th>
              </tr>
            </thead>
            {top20Row}
          </table>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
