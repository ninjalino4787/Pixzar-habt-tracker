"use client";

// import router from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  // authToggle state
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // error state
  const [error, setError] = useState<string>("");
  //  LOGIN STATE
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  // REGISTER STATE
  const [regUsername, setRegUsername] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  // ==============================================
  // function to handle login - backend code
  // ============================================
  async function handleLogin() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      if (!response.ok) {
        throw new Error(`Response status ${response.status}`);
      }
      const result = await response.json();
      console.log("full result:", result);
      console.log("token value:", result.token);
      localStorage.setItem("token", result.token);
      router.push("/dashboard");
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  // ================================
  // function to handle registering
  // ==================================
  async function handleRegister() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/register`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: regUsername,
          email: regEmail,
          password: regPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status ${response.status}`);
      }
      const result = await response.json();
      console.log("full result:", result);
      console.log("token value:", result.token);
      localStorage.setItem("token", result.token);
      router.push("/dashboard");
      console.log(result);
    } catch (error) {
      console.log("unsuccessful: ", error);
    }
  }
  {
    if (error)
      return (
        <div className="flex justify-center items-center border-2 h-screen">
          {" "}
          <p className=""> Something went wrong </p>
        </div>
      );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-cyan-200 to-blue-100 p-4">
      <div className="relative w-full max-w-lg rounded-2xl border bg-gray-600 p-6 text-white shadow-xl md:p-10">
        {/* Toggle Button */}
        <button
          className="absolute top-4 right-4 text-xs font-medium text-cyan-300 hover:text-cyan-200 hover:underline bg-gray-700/50 px-2.5 py-1 rounded-md border border-gray-500 transition-all"
          onClick={toggleAuthMode}
        >
          {isLogin ? "Register" : "Login"}
        </button>

        {isLogin ? (
          /* ========================================================
             LOGIN VIEW
             ======================================================== */
          <div className="flex flex-col gap-4">
            {/* Header Text */}
            <div className="p-5 text-center">
              <h1 className="text-2xl font-bold md:text-4xl">Login</h1>
              <h1 className="text-xl font-bold md:text-2xl mt-1">
                Welcome Back to PIZAR
              </h1>
              <h2 className="text-lg text-gray-200 mt-2">
                Back to building great habits
              </h2>
            </div>

            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="login-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  id="login-email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-400 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5 mt-4">
                <label htmlFor="login-password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="login-password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-400 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-cyan-500 py-2.5 font-semibold text-gray-900 transition-colors hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-gray-600"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          /* ========================================================
             REGISTER VIEW
             ======================================================== */
          <div className="flex flex-col gap-4">
            {/* Header Text */}
            <div className="p-5 text-center">
              <h1 className="text-2xl font-bold md:text-4xl">REGISTER</h1>
              <h1 className="text-xl font-bold md:text-2xl mt-1">
                Welcome to PIZAR
              </h1>
              <h2 className="text-lg text-gray-200 mt-2">
                Ready to build good habits?
              </h2>
            </div>

            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              {/* Username Field */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  className="w-full rounded-md border border-gray-400 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5 mt-4">
                <label htmlFor="reg-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  id="reg-email"
                  placeholder="Email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-400 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5 mt-4">
                <label htmlFor="reg-password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="reg-password"
                  placeholder="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-400 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-cyan-500 py-2.5 font-semibold text-gray-900 transition-colors hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-gray-600"
              >
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
