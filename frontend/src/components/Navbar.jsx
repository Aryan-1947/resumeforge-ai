import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";
function Navbar({ darkMode, setDarkMode }) {

  const navigate = useNavigate();

const token = localStorage.getItem("token");

const username = localStorage.getItem("username");

const handleLogout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("username");

  toast.success("Logged out successfully");

  navigate("/");
};

  return (

  <nav className="bg-white dark:bg-gray-900 shadow-md px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-4 transition duration-300">

    <div className="flex items-center gap-3">

      <div className="bg-blue-100 p-3 rounded-full">

        <FaBrain className="text-2xl text-blue-700" />

      </div>

      <div>

        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">

          Resume Tailor AI

        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-300">

          AI-Powered ATS Optimization Platform

        </p>

      </div>

    </div>

    <div className="flex items-center gap-4">

  <p className="text-gray-600 dark:text-gray-300 font-medium text-center hidden md:block">
    Optimize resumes for modern ATS systems
  </p>

  {!token ? (
  <>
    <a
      href="/login"
      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Login
    </a>

    <a
      href="/signup"
      className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
    >
      Signup
    </a>
  </>
) : (
  <>
  <span className="font-semibold text-blue-600 dark:text-blue-400">
    {username}
  </span>

  <Link
    to="/history"
    className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
  >
    History
  </Link>

  <button
    onClick={handleLogout}
    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
  >
    Logout
  </button>
</>
)}

  <button
    onClick={() => setDarkMode(!darkMode)}
    className="bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-full transition duration-300"
  >
    {darkMode ? <FaSun /> : <FaMoon />}
  </button>

</div>

  </nav>
);
}

export default Navbar;