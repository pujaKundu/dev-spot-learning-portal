import React from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";
import logo from '../../image/code.png'
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ user }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to="/portal/1">
          <div className="flex items-center">
            <img src={logo} alt="logo" width={30} height={30} />
            <p className="ml-2 text-xl font-semibold ">
              <span className="text-cyan-300">The Dev</span> Spot
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to={`/leaderboard/${user?.id}`}
            className="text-slate-300 hover:text-slate-100"
          >
           Leaderboard
          </Link>
          <h2 className="font-bold text-cyan-300 uppercase">{user?.name}</h2>
          <button
            className="flex gap-2 border-2 border-rose-800 items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-rose-800 "
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
