import animationData from "../../public/animations/Animation - 1741758711733.json"; // Adjust path if needed
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import Animate_button from "./Animate_button.jsx";
import animationDataa from "../../public/animations/system-regular-161-trending-flat-hover-ternd-flat-1.json";


const Alert = () => {
  const [isActive, setActive] = useState(false); // Initially hidden
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust width for tablets
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        setActive(true);
        document.body.style.overflow = "hidden"; // Prevent scrolling
      }, 1000); // Show alert after 1 second
    }
  }, [isMobile]);

  const handleClose = () => {
    setActive(false);
    document.body.style.overflow = "auto"; // Enable scrolling again
  };

  if (!isMobile) return null;

  return (
    <div
      className={`${isActive ? "" : "hidden"} fixed top-0 left-0 w-full h-full font-circular-web  flex justify-center items-center z-50`}>
      <div
        className="w-[80vw] h-[60vh] bg-opacity-65 bg-black rounded-2xl flex flex-col items-center justify-center">
        <Lottie loop animationData={animationData} className="max-w-80 max-h-72 mx-auto -mt-10 opacity-100" />
        <div className="text-xl text-gray-500 text-center -mt-2 max-sm:text-lg">
          This web application is more suitable for big screens.
        </div>
        <div
          className="text-gray-900 text-2xl max-sm:text-xl cursor-pointer"
          onClick={handleClose}
        >
          <Animate_button title="Continue" containerClass="flex justify-center mt-3 text-center "
                          animationData={animationDataa} />
        </div>
      </div>
    </div>
  );
};

export default Alert;
``;