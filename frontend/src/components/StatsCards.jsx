function StatsCards({ result }) {

  return (

    <div className="grid md:grid-cols-4 gap-6">

      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

        <h3 className="text-lg font-semibold text-gray-500">

          ATS Score

        </h3>

        <p className="text-4xl font-bold text-blue-700 mt-3">

          {result.ats_analysis.ats_score}%

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

        <h3 className="text-lg font-semibold text-gray-500">

          Matched Skills

        </h3>

        <p className="text-4xl font-bold text-green-600 mt-3">

          {result.ats_analysis.matched_skills.length}

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

        <h3 className="text-lg font-semibold text-gray-500">

          Missing Skills

        </h3>

        <p className="text-4xl font-bold text-red-600 mt-3">

          {result.ats_analysis.missing_skills.length}

        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

        <h3 className="text-lg font-semibold text-gray-500">

          Target Role

        </h3>

        <p className="text-xl font-bold text-purple-700 mt-3">

          {result.target_role || "AI Role"}

        </p>

      </div>

    </div>
  );
}

export default StatsCards;