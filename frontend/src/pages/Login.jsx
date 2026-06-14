import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response = await API.post(
      "/login",
      {
        email,
        password
      }
    );

    console.log(response.data);

    if (response.data.success) {

  localStorage.setItem(
    "token",
    response.data.access_token
  );

  localStorage.setItem(
    "username",
    response.data.username
  );

  toast.success("Login successful");

  navigate("/");

} else {

      toast.error(
        response.data.message
      );
    }

  } catch (error) {

    console.error(error);

    toast.error("Login failed");
  }
};

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">

      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h1>

        <form
  onSubmit={handleLogin}
  className="space-y-4"
>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );
}

export default Login;