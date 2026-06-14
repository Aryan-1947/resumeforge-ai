import toast from "react-hot-toast";
function CopyButton({ text }) {

  const handleCopy = async () => {

    await navigator.clipboard.writeText(text);

    toast.success("Copied to clipboard!");
  };

  return (

    <button
      onClick={handleCopy}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 hover:scale-105"
    >

      Copy

    </button>
  );
}

export default CopyButton;