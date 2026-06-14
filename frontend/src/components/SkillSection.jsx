import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
function SkillSection({ title, skills, color }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 p-6">

      <h2 className={`text-2xl font-bold mb-5 flex items-center gap-3 ${color}`}>

  {
    title.includes("Matched")
      ? <FaCheckCircle />
      : <FaExclamationTriangle />
  }

  {title}

</h2>

      <div className="flex flex-wrap gap-3">

        {
          skills.map((skill, index) => (

            <span
              key={index}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium shadow-sm"
            >
              {skill}
            </span>

          ))
        }

      </div>

    </div>
  );
}

export default SkillSection;