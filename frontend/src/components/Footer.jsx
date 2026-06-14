import { FaGithub, FaLinkedin } from "react-icons/fa";
function Footer() {

  return (

<footer className="bg-white dark:bg-gray-900 shadow-inner py-8 transition duration-300">

    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

      <div className="text-center md:text-left">

        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">

          Resume Tailor AI

        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-2">

          AI-Powered ATS Resume Optimization Platform

        </p>

      </div>

      <div className="flex gap-5 text-2xl text-gray-600 dark:text-gray-300">

        <FaGithub className="hover:text-black cursor-pointer transition" />

        <FaLinkedin className="hover:text-blue-700 cursor-pointer transition" />

      </div>

    </div>

    <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4 text-center text-gray-500 dark:text-gray-400 text-sm">

  © 2026 Resume Tailor AI • Built with React + FastAPI

</div>

  </footer>
);
}

export default Footer;