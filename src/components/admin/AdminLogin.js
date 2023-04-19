import logo from "../../image/code.png";
import { useState, useEffect } from "react";
import { useAdminLoginMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, isLoading, error: responseError }] =
    useAdminLoginMutation();
  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/admin/dashboard");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <div className="flex items-center">
            <img src={logo} alt="logo" width={35} height={35} />
            <p className="ml-2 text-2xl font-semibold ">
              <span className="text-cyan-300">The Dev</span> Spot
            </p>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to <span className="text-cyan-300">Admin Account</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6  w-[500px]">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlhtmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input bg-slate-900  text-slate-300 border-0 border-b mb-3"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlhtmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input  bg-slate-900  text-slate-300 border-0 border-b "
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="text-red-500">{error.message}</div>}

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <p className="font-medium text-violet-600 hover:text-violet-500">
                Forgot your password?
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-violet-700 bg-violet-600"
              } group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
