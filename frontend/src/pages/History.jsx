import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function History() {

  const [analyses, setAnalyses] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const response = await API.get(
        "/my-analyses"
      );

      setAnalyses(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <div className="p-10">
        Loading history...
      </div>
    );
  }

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Resume Analyses
      </h1>

      {
        analyses.length === 0
        ? (
          <p>No analyses found.</p>
        )
        : (
          analyses.map((analysis) => (

            <div
  key={analysis.id}
  onClick={() =>
    navigate(`/analysis/${analysis.id}`)
  }
  className="border rounded-xl p-4 mb-4 cursor-pointer hover:bg-gray-50 transition"
>

              <h2 className="font-semibold">

                {analysis.filename}

              </h2>

              <p>

                ATS Score:
                {" "}
                {analysis.ats_score}

              </p>

              <p className="text-blue-600 mt-2 font-medium">
  View Details →
</p>

            </div>

          ))
        )
      }

    </div>

  );
}

export default History;