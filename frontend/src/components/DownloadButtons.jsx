import jsPDF from "jspdf";

function DownloadButtons({ result }) {

  const downloadPDF = (content, filename) => {

  const doc = new jsPDF();

  const lines = doc.splitTextToSize(content, 180);

  doc.setFont("helvetica", "normal");

  doc.setFontSize(12);

  doc.text(lines, 15, 20);

  doc.save(filename);

};

  return (

  <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">

      Downloads

    </h2>

    <div className="flex flex-col sm:flex-row justify-center gap-4">

      <button
        onClick={() =>
  downloadPDF(
    result.optimized_resume,
    "optimized_resume.pdf"
  )
}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-xl hover:scale-105"
      >
        Download Resume
      </button>

      <button
        onClick={() =>
  downloadPDF(
    result.cover_letter,
    "cover_letter.pdf"
  )
}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-xl hover:scale-105"
      >
        Download Cover Letter
      </button>

    </div>

  </div>
);
}

export default DownloadButtons;