function ComparisonSection({ original, optimized }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-3xl font-bold mb-8 text-center">

        Before vs After Optimization

      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* BEFORE */}

        <div>

          <h3 className="text-xl font-bold text-red-600 mb-4">

            Original Resume

          </h3>

          <div className="bg-gray-100 p-5 rounded-xl h-[500px] overflow-y-auto whitespace-pre-wrap text-sm">

            {original}

          </div>

        </div>

        {/* AFTER */}

        <div>

          <h3 className="text-xl font-bold text-green-600 mb-4">

            Optimized Resume

          </h3>

          <div className="bg-gray-100 p-5 rounded-xl h-[500px] overflow-y-auto whitespace-pre-wrap text-sm">

            {optimized}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComparisonSection;