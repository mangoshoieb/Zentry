import AnimatedTitle from "./AnimatedTitle.jsx";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners.jsx";
import Button from "./Button.jsx";

const Story = ({ className, dataBgColor = "#000", currentBgColor }) => {
  const frameRef = useRef(null);
  const [colorswicth, setColorswicth] = useState(true);
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 7;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut"
    });
  };
  useEffect(() => {

    if (currentBgColor === "#000") {
      setColorswicth(false);
    } else if (currentBgColor === "#EDFF66") {
      setColorswicth(true);
    }

  }, [currentBgColor]);

  return (
    <section className={`${className} min - h - dvh w-screen  text-blue-50 overflow-hidden`} id="story"
             data-bgcolor={dataBgColor}>
      <div className="flex flex-col items-center size-full py-10 pb-24 ">
        <p className="text-sm md:text-[10px] font-general uppercase">the open ip universe</p>
        <div className=" relative size-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            section
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 flex-center"
          />
          <div className="story-img-container" onMouseMove={handleMouseMove}>
            <div className="story-img-mask" ref={frameRef}>
              <div className="story-img-content">
                <img
                  src="img/entrance.webp"
                  alt="entrance"
                  className="object-contain"
                />

              </div>
            </div>
            <RoundedCorners />
          </div>
        </div>
        <div className="-mt-100 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p
              className={`mt - 3 max-w-sm text-center font-circular-web  md:text-start ${colorswicth ? "text-black" : "text-violet-50"}`}>
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            <Button title="Discover prologue"
                    containerClass={`mt-10 ml-5 ${colorswicth ? "!bg-black !text-blue-50" : "!bg-white"}`} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Story;
