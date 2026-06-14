import { FaEnvelope } from "react-icons/fa";
import CopyButton from "./CopyButton";
function CoverLetterSection({ coverLetter }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 p-6">

      <h2 className="text-3xl font-bold mb-6 text-green-700 flex items-center justify-center gap-3">

  <FaEnvelope />

  AI Generated Cover Letter

</h2>

      <div className="flex justify-end mb-4">

  <CopyButton text={coverLetter} />

</div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-10 whitespace-pre-wrap leading-8 text-gray-800 shadow-inner">

        {coverLetter}

      </div>

    </div>
  );
}

export default CoverLetterSection;