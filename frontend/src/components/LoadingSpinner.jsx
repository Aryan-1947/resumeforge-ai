function LoadingSpinner() {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-10 mt-10 text-center">

      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-700 mx-auto mb-6"></div>

      <h2 className="text-2xl font-bold text-blue-700 mb-3">

        AI is analyzing your resume...

      </h2>

      <p className="text-gray-600 leading-7">

        Parsing resume • Matching ATS keywords •
        Generating optimized resume • Creating cover letter

      </p>

    </div>
  );
}

export default LoadingSpinner;