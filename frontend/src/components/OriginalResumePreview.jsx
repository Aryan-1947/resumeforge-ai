function OriginalResumePreview({ resume }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 p-6">

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">

        Original Resume

      </h2>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-10 whitespace-pre-wrap break-words overflow-x-hidden leading-8 text-gray-800 max-h-[800px] overflow-y-auto shadow-inner">

        {resume}

      </div>

    </div>
  );
}

export default OriginalResumePreview;