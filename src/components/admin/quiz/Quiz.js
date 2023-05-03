import { Link } from "react-router-dom";
import { useGetAllQuizzesQuery } from "../../../features/quiz/quizApi";
import { AdminNavbar, SingleQuiz } from "../index";
import Loader from "../../Loader";

const Quiz = () => {
  const { data: quizzes, isLoading, isError } = useGetAllQuizzesQuery();
  let content = null;
  if (isLoading) content = <Loader/>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && quizzes?.length === 0) {
    content = <p>No quiz found!</p>;
  }

  if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes?.map((quiz) => <SingleQuiz key={quiz?.id} quiz={quiz} />);
  }
  return (
    <>
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <h1 className="text-3xl font-semibold text-center">
              <span className="text-cyan-300">Manage</span> Quizzes
            </h1>
            <Link to="/admin/quiz/add" className="w-full flex">
              <button className="btn ml-auto">Add Quiz</button>
            </Link>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th text-cyan-400">Question</th>
                    <th className="table-th text-cyan-400">Video</th>
                    <th className="table-th justify-center text-cyan-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Quiz;
