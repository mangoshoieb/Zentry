import { useEffect, useState } from "react";
import AnimatedTitle from "./AnimatedTitle.jsx";
import Button from "./Button.jsx";


const Discover = ({ className, dataBgColor, currentBgColor }) => {
  const [colorswicth, setColorswicth] = useState(true);

  useEffect(() => {

    if (currentBgColor === "#000") {
      setColorswicth(false);
    } else if (currentBgColor === "#DFDFF0") {
      setColorswicth(true);
    }

  }, [currentBgColor]);
  return (
    <section className={` ${className} h-[150vh] w-full`} data-bgcolor={dataBgColor}>
      <div className={`text-center w-screen ${colorswicth ? "text-black" : "text-blue-50"}`}>
        <div className="text-sm font-circular-web">Who we are</div>
        <div className="mt-5 max-w-[940px] max-md:max-w-[400px]  mx-auto text-center relative">
          <AnimatedTitle
            title={`We're b<b>u</b>ilding <br /> <b>a</b> new        realit<b>y</b><br />that r<b>e</b>wards <br /> s<b>p</b>l<b>a</b>yers        and<br />emp<b>o</b>wers<br />hu<b>m</b>ans & AI<br />to       thri<b>v</b>e`}
            containerClass={`flex-center !text-black md:text-[115px] !max-md:text[50px] ${colorswicth ? "text-black" : "text-blue-50"}`}
          />
          <div
            className="max-lg:hidden  bg-black rounded-xl  h-14 w-16 absolute top-[7rem] left-[25.25rem] hover:scale-[5] hover:bg-[url('../../public/img/gallery-5.webp')] bg-cover bg-no-repeat transition-all duration-1000 cursor-pointer "></div>
          <div
            className="max-lg:hidden bg-black rounded-xl h-14 w-16 absolute top-[19rem] left-[34.75rem] hover:scale-[5] hover:bg-[url('../../public/img/local-10.jpg')] bg-cover bg-no-repeat transition-all duration-1000 cursor-pointer "></div>
          <div
            className="max-lg:hidden bg-black rounded-xl h-14 w-16 absolute top-[37rem] left-[22.25rem] hover:scale-[5] hover:bg-[url('../../public/img/local-9.jpg')] bg-cover bg-no-repeat transition-all duration-1000 cursor-pointer "></div>
        </div>
        <div className="text-sm font-circular-web max-w-96 mx-auto mt-10 text-center text-inherit">
          Zentry envisions a future where players, emerging tech, and a new economy unite at the convergence of gaming
          and AI.
        </div>
        <Button title="discover who we are"
                containerClass={`mt-10 ${colorswicth ? "!bg-black !text-blue-50" : "!bg-white"}`} />
      </div>
    </section>
  );
};
export default Discover;
