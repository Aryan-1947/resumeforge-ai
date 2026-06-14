import { FaRobot } from "react-icons/fa";
function EmptyState() {

  return (

  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 md:p-10 mt-10 text-center transition duration-300">

    <div className="flex justify-center mb-6">

      <div className="bg-blue-100 p-6 rounded-full">

        <FaRobot className="text-5xl text-blue-700" />

      </div>

    </div>

    <h2 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400 mb-4">

      AI-Powered Resume Optimization

    </h2>

    <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-7 md:leading-8 max-w-3xl mx-auto">

      Upload your resume and paste a job description to receive
      ATS analysis, AI-generated resume improvements,
      missing skill insights, and personalized cover letters.

    </p>

  </div>
);
}

export default EmptyState;