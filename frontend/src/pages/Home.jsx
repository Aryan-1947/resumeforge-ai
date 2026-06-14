import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";

function Home({ darkMode, setDarkMode }) {
  return (

  <div className="min-h-screen flex flex-col">

    <Navbar
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />

    <div className="flex-grow">

      <UploadForm darkMode={darkMode} />

    </div>

    <Footer />

  </div>
);
}

export default Home;