import React from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";
import logo from "../../image/learningportal.svg";
import { useNavigate, Link, useParams } from "react-router-dom";

const Navbar = ({ user }) => {
  const {id}=useParams()
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
        <img className={logo} alt="logo" />
        <div className="flex items-center gap-3">
          <Link to={`/leaderboard/${id}`}>Leaderboard</Link>
          <h2 className="font-bold">{user?.name}</h2>
          <button
            className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan "
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
