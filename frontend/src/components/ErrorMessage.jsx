function ErrorMessage({ message }) {

  return (

    <div className="bg-red-100 border border-red-300 text-red-700 px-5 py-4 rounded-xl mt-6">

      <p className="font-semibold">

        {message}

      </p>

    </div>
  );
}

export default ErrorMessage;