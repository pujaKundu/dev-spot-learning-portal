import {Link} from 'react-router-dom'
import Navbar from '../../shared/Navbar';

const Dashboard = () => {
    const storedData = JSON.parse(localStorage.getItem("auth"));
    const user = storedData.user;
    
    return (
      <div>
        <Navbar user={user} />
        <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md w-[500px] mx-auto mt-12">
          <h1 className="font-bold text-2xl text-center text-cyan-500">
            Admin Portal
          </h1>
          <div className="space-y-2 my-12 flex flex-row items-center justify-around ">
            <div className="flex flex-col mt-2 ">
              <Link
                className="p-5 w-[200px] text-cyan-400 border border-slate-600 rounded-lg hover:border-cyan-400 text-center mb-5"
                to="/admin/assignment"
              >
                Assignment
              </Link>
              <Link
                className="p-5 w-[200px] text-center  text-cyan-400 border border-slate-600 rounded-lg hover:border-cyan-400 bg-transparent"
                to="/admin/assignmentMark"
              >
                Assignment Mark
              </Link>
            </div>
            <div className="flex flex-col">
              <Link
                className="p-5 w-[200px] text-center text-cyan-400 border border-slate-600 rounded-lg hover:border-cyan-400 mb-5 bg-transparent"
                to="/quizzes"
              >
                Quizzes
              </Link>
              <Link
                className="p-5 w-[200px] text-center text-cyan-400 border border-slate-600 rounded-lg hover:border-cyan-400 bg-transparent"
                to="/videos"
              >
                Videos
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;