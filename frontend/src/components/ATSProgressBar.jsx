import { FaChartLine } from "react-icons/fa";
function ATSProgressBar({ score }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 p-8 mt-8">

      <h2 className="text-3xl font-bold flex items-center justify-center gap-3 mb-8 text-blue-700">

  <FaChartLine />

  ATS Score

</h2>

      <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">

        <div
          className="bg-blue-600 h-8 flex items-center justify-center text-white font-bold transition-all duration-700"
          style={{ width: `${score}%` }}
        >

          {score}%

        </div>

      </div>

    </div>
  );
}

export default ATSProgressBar;