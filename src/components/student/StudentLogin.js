import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import logo from "../../image/code.png";
import loginimg from "../../image/login-removebg-preview.png";
import Error from "../ui/Error";
import { Oval } from "react-loader-spinner";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/portal");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    login({
      email,
      password,
    });
  };
  return (
    <div
      style={{
        backgroundColor: "#000000",
        opacity: "1",
        backgroundImage:
          "linear-gradient(#090909 2px, transparent 2px), linear-gradient(90deg, #090909 2px, transparent 2px), linear-gradient(#090909 1px, transparent 1px), linear-gradient(90deg, #090909 1px, #000000 1px)",
        backgroundSize: " 50px 50px, 50px 50px, 10px 10px, 10px 10px",
        backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px",
      }}
    >
      <section className="py-6  h-screen grid grid-cols-2 place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div className="flex flex-col items-center justify-start">
            <div className="flex items-center justify-start">
              <img src={logo} alt="logo" width={35} height={35} />
              <p className="ml-2 text-2xl font-semibold ">
                <span className="text-cyan-300">The Dev</span> Spot
              </p>
            </div>
            <h2 className="mt-6 text-center text-xl font-semibold text-slate-100">
              <p className="text-violet-400">Sign in to your account</p>
            </h2>
          </div>

          <form
            className="mt-8 space-y-6 w-[470px]"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="login-input bg-transparent border-0 border-b mb-3 text-slate-200"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="login-input  bg-transparent border-0 border-b text-slate-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="/register"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Create New Account
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-violet-700 bg-violet-600"
              } group relative w-full flex justify-center py-2 px-4 border border-transparent  font-semibold rounded-md text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}
            >
              {isLoading ? (
                <p className="flex justify-center">
                  <Oval
                    height={20}
                    width={20}
                    color="violet"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="violet"
                    strokeWidth={3}
                    strokeWidthSecondary={2}
                  />
                  <span className="ml-2 text-violet-500">Signing in</span>
                </p>
              ) : (
                "Sign in"
              )}
            </button>

            {error !== "" && <Error message={error} />}
          </form>
        </div>
        <div>
          <img src={loginimg} alt="" />
        </div>
      </section>
    </div>
  );
};

export default StudentLogin;
