import { FaLightbulb } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

function SuggestionsSection({ suggestions }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 p-6">

      <h2 className="text-3xl font-bold mb-6 text-blue-700 flex items-center justify-center gap-3">

  <FaLightbulb />

  AI Suggestions

</h2>

      <div className="bg-gray-100 rounded-xl p-5 text-gray-700 leading-7 space-y-2">

        <ReactMarkdown
  components={{
    p: ({ children }) => (
      <p className="mb-3 leading-7">
        {children}
      </p>
    ),
    li: ({ children }) => (
      <li className="mb-2">
        {children}
      </li>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mb-3">
        {children}
      </h2>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">
        {children}
      </strong>
    ),
  }}
>
  {suggestions}
</ReactMarkdown>

      </div>

    </div>
  );
}

export default SuggestionsSection;