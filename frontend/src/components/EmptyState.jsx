import { FiZap, FiTarget, FiFileText, FiMail } from "react-icons/fi";

const features = [
  { icon: FiTarget, label: "ATS Score Analysis" },
  { icon: FiZap, label: "Skill Gap Detection" },
  { icon: FiFileText, label: "Resume Optimization" },
  { icon: FiMail, label: "Cover Letter Generation" },
];

function EmptyState() {
  return (
    <div className="mt-8 bg-white dark:bg-gray-900 border border-[#E4E7EC] dark:border-gray-800 rounded-2xl p-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
        What you'll get
      </p>
      <h2 className="text-xl font-bold text-[#0F1117] dark:text-white mb-2">
        AI analysis in seconds
      </h2>
      <p className="text-sm text-[#6B7280] dark:text-gray-400 mb-8 max-w-md mx-auto">
        Fill in the form above and hit Analyze — we'll parse your resume, match it to the job, and generate everything you need.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F8F9FB] dark:bg-gray-800 border border-[#E4E7EC] dark:border-gray-700"
          >
            <div className="bg-blue-100 dark:bg-blue-950 p-2.5 rounded-lg">
              <Icon className="text-blue-600 text-base" />
            </div>
            <span className="text-xs font-medium text-[#0F1117] dark:text-white text-center leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyState;