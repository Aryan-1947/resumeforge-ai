import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function AnalysisDetails() {

  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchAnalysis();

  }, []);

  const fetchAnalysis = async () => {

    try {

      const response = await API.get(
  `/analysis/${id}`
);

console.log(response.data);

setAnalysis(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <div className="p-10">
        Loading analysis...
      </div>
    );
  }

  if (!analysis) {

    return (
      <div className="p-10">
        Analysis not found.
      </div>
    );
  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">

        Analysis Details

      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">

  <h2 className="text-2xl font-bold mb-4">
    Resume Summary
  </h2>

  <p>
    <strong>Filename:</strong> {analysis.filename}
  </p>

  <p>
    <strong>ATS Score:</strong> {analysis.ats_score}
  </p>

  <p>
    <strong>Created:</strong>{" "}
    {new Date(
      analysis.created_at
    ).toLocaleString()}
  </p>

</div>
<div className="bg-white shadow-lg rounded-2xl p-6 mb-6">

  <h2 className="text-2xl font-bold mb-4">
    ATS Skill Analysis
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div>

      <h3 className="font-semibold text-green-600 mb-2">
        Matched Skills
      </h3>

      <ul className="list-disc ml-6">

        {
          analysis.ats_analysis?.matched_skills?.map(
            (skill, index) => (
              <li key={index}>
                {skill}
              </li>
            )
          )
        }

      </ul>

    </div>

    <div>

      <h3 className="font-semibold text-red-600 mb-2">
        Missing Skills
      </h3>

      <ul className="list-disc ml-6">

        {
          analysis.ats_analysis?.missing_skills?.map(
            (skill, index) => (
              <li key={index}>
                {skill}
              </li>
            )
          )
        }

      </ul>

    </div>

  </div>

</div>

<div className="bg-white shadow-lg rounded-2xl p-6 mb-6">

  <h2 className="text-2xl font-bold mb-4">
    AI Suggestions
  </h2>

  <div className="whitespace-pre-wrap text-gray-700 max-h-[500px] overflow-y-auto">

    {analysis.suggestions}

  </div>

</div>

<div className="bg-white shadow-lg rounded-2xl p-6 mb-6">

  <h2 className="text-2xl font-bold mb-4">
    Generated Cover Letter
  </h2>

  <div className="whitespace-pre-wrap text-gray-700 max-h-[500px] overflow-y-auto">

    {analysis.cover_letter}

  </div>

</div>

<div className="bg-white shadow-lg rounded-2xl p-6 mb-6">

  <h2 className="text-2xl font-bold mb-4">
    Resume Improvements
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <p>
      <strong>Original Words:</strong>{" "}
      {analysis.comparison_analysis?.original_word_count}
    </p>

    <p>
      <strong>Optimized Words:</strong>{" "}
      {analysis.comparison_analysis?.optimized_word_count}
    </p>

    <p>
      <strong>Action Verb Improvement:</strong>{" "}
      {analysis.comparison_analysis?.action_verb_improvement}
    </p>

    <p>
      <strong>Skill Improvement:</strong>{" "}
      {analysis.comparison_analysis?.skill_improvement}
    </p>

  </div>

</div>

    </div>

  );
}

export default AnalysisDetails;