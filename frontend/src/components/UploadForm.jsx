import toast from "react-hot-toast";
import EmptyState from "./EmptyState";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import ResultDashboard from "./ResultDashboard";
import API from "../services/api";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

function UploadForm({ darkMode }) {

  const [resume, setResume] = useState(null);

  const [jobDescription, setJobDescription] = useState("");

  const [selectedRole, setSelectedRole] = useState("Machine Learning Engineer");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");

  const [dragActive, setDragActive] = useState(false);

  const resultRef = useRef(null);

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (!resume || !jobDescription) {
    toast.error("Please upload resume and enter job description");
    return;
  }

  try {

    setError("");
    setResult(null);
    setLoading(true);

    const formData = new FormData();

    formData.append("file", resume);

    formData.append("job_description", jobDescription);

    formData.append("target_role", selectedRole);

    const response = await API.post(
      "/analyze-resume/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setResult(response.data);

    toast.success("Resume analyzed successfully!");

    setTimeout(() => {

  resultRef.current?.scrollIntoView({
    behavior: "smooth",
  });

}, 200);

    console.log(response.data);

  } catch (error) {

    console.error(error);

    setError("Something went wrong while analyzing resume.");

    toast.error("Analysis failed.");

  } finally {

    setLoading(false);
  }
};

  return (

  <div className={`flex-grow px-4 py-8 pb-16 md:p-10 transition duration-300 ${
  darkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black"
    : "bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100"
}`}>

    <motion.div
  className="max-w-5xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)] border border-white/40 dark:border-gray-700 p-4 md:p-8 transition-all duration-300"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

      <h1 className="text-2xl md:text-4xl font-bold text-center mb-10 text-blue-700 dark:text-blue-400">

        Resume Tailor AI

      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300">

          <label className="block text-lg font-semibold mb-2 text-black dark:text-white">

            Upload Resume

          </label>

          <label
  onDragOver={(e) => {
    e.preventDefault();
    setDragActive(true);
  }}
  onDragLeave={() => setDragActive(false)}
  onDrop={(e) => {
    e.preventDefault();

    setDragActive(false);

    const file = e.dataTransfer.files[0];

    if (file) {

      setResume(file);

      setResult(null);
    }
  }}
  className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-2xl p-8 cursor-pointer hover:scale-[1.01] transition duration-300
  ${
    dragActive
      ? "border-blue-500 bg-blue-100 dark:bg-blue-900/30"
      : "border-blue-300 bg-blue-50 hover:bg-blue-100"
  }`}
>

  <span className="text-lg font-semibold text-blue-700">

    Click to Upload Resume

  </span>

  <span className="text-gray-500 mt-2">

    PDF or DOCX supported

  </span>

  <input
    type="file"
    onChange={(e) => {

  setResume(e.target.files[0]);

  setResult(null);
}}
    className="hidden"
  />

</label>


{
  resume && (
    <p className="mt-3 text-green-700 font-medium">

      Selected File: {resume.name}

    </p>
  )
}

        </div>

        <div className="space-y-6">


<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300">

  <label className="block text-lg font-semibold mb-2 text-black dark:text-white">

    Target Role

  </label>

  <select
    value={selectedRole}
    onChange={(e) => setSelectedRole(e.target.value)}
    className="w-full border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-2xl bg-white dark:bg-gray-700 dark:text-white transition"
  >

    <option>Machine Learning Engineer</option>

    <option>Data Scientist</option>

    <option>Backend Developer</option>

    <option>AI Engineer</option>

    <option>Full Stack Developer</option>

  </select>

</div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition duration-300">
          <label className="block text-lg font-semibold mb-2 text-black dark:text-white">
            Job Description
          </label>

          <textarea
            rows="8"
            placeholder="Paste Job Description Here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-4 rounded-2xl bg-white dark:bg-gray-900 dark:text-white transition resize-none"
          />

        </div>

        </div>

        <div className="flex justify-center">

  <button
    type="submit"
    disabled={loading}
    className={`px-8 py-3 rounded-2xl font-semibold transition duration-300 hover:scale-105 shadow-md hover:shadow-xl text-white ${
  loading
    ? "bg-gray-400 cursor-not-allowed"
    : "bg-blue-600 hover:bg-blue-700"
}`}
  >

    {loading ? "Analyzing..." : "Analyze Resume"}

  </button>

</div>

      </form>

      <div
  className="mt-10"
  ref={resultRef}
>



        {
  error && (
    <ErrorMessage message={error} />
  )
}
        
        
        {
  loading && (
    <LoadingSpinner />
  )
}

        {
  !loading && !result && (
    <EmptyState />
  )
}


        {
  !loading && result && (
    <ResultDashboard result={result} />
  )
}

      </div>

    </motion.div>

  </div>
);
}

export default UploadForm;