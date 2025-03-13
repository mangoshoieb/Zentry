import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Story from "./Story.jsx";
import Zent from "./Zent.jsx";
import Discover from "./Discover.jsx";
import Glance from "./Glance.jsx";
import Partners from "./Partners.jsx";
import Updates from "./Updates.jsx";
import Contact from "./Contact.jsx"; // Your third component

gsap.registerPlugin(ScrollTrigger);


const PageWrapper = () => {
  const containerRef = useRef(null);
  const [bgColor, setBgColor] = useState("#000");

  useEffect(() => {
    const sections = containerRef.current.querySelectorAll(".section");

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",

        // scrub: 1,
        onEnter: () => {
          const newColor = section.dataset.bgcolor;

          setBgColor(newColor); // ✅ Update state
          changeBackground(newColor);
        },
        onLeaveBack: () => {
          const prevColor = index > 0 ? sections[index - 1].dataset.bgcolor : "#000";
          console.log("Leaving:", prevColor);
          setBgColor(prevColor); // ✅ Revert state
          changeBackground(prevColor);
        }
      });
    });

    function changeBackground(color) {
      gsap.set(containerRef.current, { backgroundColor: color });
    }
  }, []);

  return (
    <div ref={containerRef} className=" transition-colors duration-700">
      <Story className="section" dataBgColor="#000" currentBgColor={bgColor} />
      <Zent className="section" dataBgColor="#EDFF66" currentBgColor={bgColor} />
      <Discover className="section" dataBgColor="#DFDFF0" currentBgColor={bgColor} />
      <Glance className="section" dataBgColor="#000" currentBgColor={bgColor} />
      <Partners className="section" dataBgColor="#000" currentBgColor={bgColor} />
      <Updates className="section" dataBgColor="#DFDFF0" currentBgColor={bgColor} />
      <Contact className="section" dataBgColor="#DFDFF0" />
    </div>
  );
};

export default PageWrapper;
