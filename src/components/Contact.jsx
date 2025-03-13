import AnimatedTitle from "./AnimatedTitle.jsx";
import RoundedCorners from "./RoundedCorners.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import Animate_button from "./Animate_button.jsx";
import animationData from "../../public/animations/system-regular-58-call-phone-hover-phone-ring.json";


gsap.registerPlugin(ScrollTrigger);
const Contact = () => {
  const frameRef = useRef(null);


  useGSAP(() => {
    gsap.set(".contact_img_1", { translateY: 86, opacity: 0 }); // Set initial state

    gsap.to(".contact_img_1", {
      translateY: 0,
      opacity: 1,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: frameRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: false // Set to `true` if you want a smooth effect while scrolling
      }
    });

    const element = frameRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = element.getBoundingClientRect();
      const xPercent = (clientX - rect.left) / rect.width - 0.5;
      const yPercent = (clientY - rect.top) / rect.height - 0.5;

      // Move the background image
      gsap.to("#current-img", {
        duration: 0.3,
        x: xPercent * 25,
        y: yPercent * 25,
        ease: "power1.out"
      });

      // Move the container slightly
      gsap.to("#current-img", {
        duration: 0.3,
        x: xPercent * 25,
        y: yPercent * 25,
        ease: "power1.out"
      });
    };

    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className="mt-52 mb-14 p-10 w-[1260px] h-[500px] mx-auto bg-black rounded-2xl">
      <div className="relative" ref={frameRef}>
        <p className="text-xs text-center mx-auto font-circular-web text-blue-50  ">join zentry</p>
        <AnimatedTitle title="let’s b<b>u</b>ild the <br /> new er<b>a</b> of gami<b>n</b>g <br /> t<b>o</b>gether."
                       containerClass="!text-blue-50 md:text-[80px] text-2xl mx-auto mt-14 leading-[2rem] flex justify-center max-w-80 text-center" />

        <div className="contact-container ">
          <div className="contact_img contact_img_1 absolute -right-[30px] -top-[400px] w-80 h-[440px]">
            <img
              src="../../public/img/swordman.webp"
              alt="swordman"
              id="current-img"
              className="size-full object-cover object-center origin-center "
            />
          </div>
          <div className="contact_img contact_img_2 absolute left-[50px] -top-[420px] w-64 h-[170px]">
            <img
              src="../../public/img/contact-1.webp"
              alt="fire"
              id="current-img"
              className="size-full object-cover object-center origin-center "
            />
          </div>
          <div className="contact_img contact_img_3 absolute left-[130px] -top-[90px] w-72 h-[200px]">
            <img
              src="../../public/img/contact-2.webp"
              alt="fire"
              id="current-img"
              className="size-full object-cover "
            />
          </div>
          <RoundedCorners />
        </div>
        <a href="https://wa.me/+201097436397">
          <Animate_button title="contact us" containerClass="flex justify-center text-center"
                          animationData={animationData} />
        </a>
      </div>
    </div>
  );
};
export default Contact;
