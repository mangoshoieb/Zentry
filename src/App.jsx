import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Features from "./components/Features.jsx";
import PageWrapper from "./components/PageWrapper.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {

  return (
    <main
      className="w-screen min-h-screen relative overflow-x-hidden scroll-smooth"
    >
      <div>
        <Navbar />
        <Hero />
        <About />
        <Features />
        <PageWrapper />
        <Footer />
      </div>
    </main>
  );
};

export default App;