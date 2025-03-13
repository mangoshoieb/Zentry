import { useRef, useEffect } from "react";
import gsap from "gsap";
import { BsLightningChargeFill } from "react-icons/bs";

const Footer = () => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const handleMouseMove = (event) => {
      if (!textRef.current) return;

      const rect = textRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const xPercent = (event.clientX - centerX) / rect.width; // Normalize X (-1 to 1)

      // Matching transformation values
      const a = 1 - Math.abs(xPercent) * 0.2; // Shrink horizontally
      const f = 1 - Math.abs(xPercent) * 1.2; // Shrink vertically (stronger effect)
      const b = -xPercent * 0.3; // Skew perspective
      const e = xPercent * 0.9; // Opposite skew for balance
      const tx = xPercent * 800; // Move left/right
      const ty = -150; // Constant slight upward shift


      gsap.to(textRef.current, {
        duration: 0.3,
        ease: "power2.out",
        attr: {
          style: `transform: matrix3d(
            ${a}, ${b}, 0, ${xPercent * 0.002}, 
            ${e}, ${f}, 0, ${Math.abs(xPercent) * 0.0003}, 
            0, 0, 1, 0, 
            ${tx}, ${ty}, 0, 1
          );`
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen bg-[#422ce3] w-screen flex flex-col justify-center items-center">
      <div
        ref={textRef}
        className="text-[500px] mt-32 text-center special-font font-zentry leading-[28rem] transition-transform duration-300 ease-out"
      >
        ZENTR<b>Y</b>
      </div>

      <div className="flex justify-between gap-[12rem] px-5 mb-20">
        <BsLightningChargeFill size="100" />
        <div>
          <p className="footer-titles">Explore</p>
          <div className="footer-ele font-robert-medium">

            <div className="hovering">
              Home
            </div>
            <div className="hovering">
              Prologue
            </div>
            <div className="hovering">
              About
            </div>
            <div className="hovering">
              Contact
            </div>
          </div>
        </div>
        <div>
          <p className="footer-titles">products</p>
          <div className="footer-ele font-robert-medium">
            <div className="!text-gray-800 hovering">
              Radiant
            </div>
            <div className="hovering">
              Nexus
            </div>
            <div className="!text-gray-800 hovering">
              Zigma
            </div>
            <div className="!text-gray-800 hovering">
              Azul
            </div>
          </div>
        </div>
        <div>
          <p className="footer-titles">follow us</p>
          <div className="footer-ele font-robert-medium">
            <div className="hovering">
              Discord
            </div>
            <div className="hovering">
              X
            </div>
            <div className="hovering">
              Youtube
            </div>
            <div className="hovering">
              Medium
            </div>
          </div>
        </div>
        <div>
          <p className="footer-titles">resources</p>
          <div className="footer-ele font-robert-medium">
            <div className="hovering">
              Media Kit
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-[60rem] mb-3">
        <p className="uppercase font-general text-xs">©Zentry 2024. All rights reserved</p>
        <p className="uppercase font-general text-xs">privacy polcy</p>
      </div>
    </section>
  );
};

export default Footer;
