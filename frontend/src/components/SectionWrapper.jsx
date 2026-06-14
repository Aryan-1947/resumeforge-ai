import { useState } from "react";

function SectionWrapper({ title, children }) {

  const [open, setOpen] = useState(true);

  return (

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-xl bg-gray-50 hover:bg-gray-100 transition"
      >

        <span>{title}</span>

        <span>
          {open ? "−" : "+"}
        </span>

      </button>

      {
        open && (
          <div className="p-6">
            {children}
          </div>
        )
      }

    </div>
  );
}

export default SectionWrapper;