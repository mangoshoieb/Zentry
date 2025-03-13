import { useRef } from "react";
import Lottie from "lottie-react";


const AnimatedBtn = ({ title, id, animationData, containerClass }) => {
  const lottieRef = useRef(null);

  return (
    <button
      id={id}
      className={` mx-auto mt-10 font-circular-web font-semibold btn relative z-10 w-fit px-7 py-3 overflow-hidden rounded-full hover:rounded-lg
                    text-black bg-blue-500 ${containerClass}`}
      onMouseEnter={() => lottieRef.current?.play()}  // Play on hover
      onMouseLeave={() => lottieRef.current?.stop()}  // Stop on hover out
    >
      <div className="flex gap-2 items-center">


      <span className="relative inline-flex font-general text-sm overflow-hidden uppercase">
        <div>{title}</div>
      </span>

        {/* Lottie Animation */}
        <Lottie
          lottieRef={lottieRef} // Use ref to control animation
          animationData={animationData}
          autoplay={false} // Prevent autoplay
          loop={false} // Play only once per hover
          className="w-7 h-7"
        />
      </div>
      <a href="https://lordicon.com/"></a>
    </button>
  );
};

export default AnimatedBtn;

