import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle.jsx";
import RoundedCorners from "./RoundedCorners.jsx";
import { useEffect, useRef, useState } from "react";

const About = () => {

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "bottom -80%",
        scrub: 0.1,
        pin: true,
        pinSpacing: true
      }
    });

    clipAnimation.fromTo(
      ".mask-clip-pathh",
      {
        width: "23vw",
        height: "70vh",
        clipPath: "polygon(7% 0%, 83% 17%, 100% 100%, 6% 95%)"
      },
      {
        width: "100vw",
        height: "100vh",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power2.inOut",
        duration: 2, // Ensures smooth interpolation
        modifiers: {
          clipPath: (value) => {
            return value.replace(/\d+(\.\d+)?%/g, (match) => `${parseFloat(match)}%`);
          }
        }
      }
    );
  });


  return (
    <div id="about" className="w-screen min-h-screen scroll-smooth ">
      <div className="relative flex flex-col mt-36 mb-8 items-center gap-5">
        <h2 className="text-sm font-general md:text-[10px] uppercase ">
          Welcom to Zentry
        </h2>
        <AnimatedTitle title="Disc<b>o</b>ver the world's<br />l<b>a</b>rgest shared adventure"
                       containerClass="mt-5 text-center !text-black flex-center" />
        <div className="about-subtext">
          <p>The Metagames begins your life,now an epic MMORPG</p>
          <p className="text-gray-500"> Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy</p>
        </div>

      </div>
      <div className=" relative h-dvh w-screen " id="clip">
        <img
          src="public/img/stones.webp"
          alt="stones"
          className="absolute size-full z-50 left-0 -top-4 object-cover"
        />
        <div className="mask-container">
          <div className="mask-clip-pathh about-image  ">
            <img
              src="public/img/about.webp"
              alt="Background"
              className="absolute size-full left-0 top-0 object-cover "
            />
            <RoundedCorners />
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
