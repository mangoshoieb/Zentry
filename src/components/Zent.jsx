import AnimatedTitle from "./AnimatedTitle.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";

gsap.registerPlugin(ScrollTrigger);


const Zent = ({ className, dataBgColor, currentBgColor }) => {
  const progressRef = useRef(null);
  const barsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [colorswicth, setColorswicth] = useState(true);

  useGSAP(() => {
    if (!progressRef.current) return;

    ScrollTrigger.create({
      trigger: progressRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * 1.3}`, // Dynamic height
      pin: true, // Pins the section
      scrub: 5, // Smooth progress animation
      pinSpacing: false, // Prevents extra spacing
      onUpdate: (self) => {
        const totalItems = barsRef.current.length;
        const progress = self.progress * totalItems;
        const newIndex = Math.floor(progress);
        setActiveIndex(Math.min(newIndex, totalItems - 1));

        // Animate bars dynamically based on scroll
        barsRef.current.forEach((bar, index) => {
          const targetHeight = index <= progress ? `${(progress - index) * 100}%` : "10%";
          gsap.to(bar, {
            height: targetHeight,
            duration: 0.5,
            ease: "power2.out"
          });
        });
      }
    });
  });

  useEffect(() => {

    if (currentBgColor === "#000") {
      setColorswicth(false);
    } else if (currentBgColor === "#EDFF66") {
      setColorswicth(true);
    }

  }, [currentBgColor]);
  return (
    <section className={`${className} h-[250vh]`} data-bgcolor={dataBgColor} ref={progressRef}>
      <div className="h-dvh w-screen text-black ">
        <div className="top-part w-full py-10">
          <AnimatedTitle
            title="the <b>u</b>niverse <br /> p<b>o<b>wered by <b>Z</b>ENT"
            containerClass="!text-black flex  justify-start"
          />
          <Button title="Enter Valut"
                  containerClass={`mt-10 ml-10 ${colorswicth ? "!bg-black !text-blue-50" : "!bg-white"}`} />
        </div>
        <div className="body-container flex justify-between gap-3 px-8">
          <div className="max-w-[330px] mt-14 pl-[2rem]">
            <ul>
              <li className="m-5">
                <header className={`${activeIndex === 0 ? "active-header" : ""} relative  text-[15px] text-gray-600`}>
                  <h1 className="text-xl leading-6 font-medium mb-3 relative">Shaping Zentry
                    Collectively
                  </h1>
                  <div className="absolute top-0 -left-7 w-3 h-3 text-[1rem]">01</div>
                </header>
                <div className={`content relative hidden ${activeIndex === 0 ? "active-content" : " "}`}>

                  <p className=" text-sm ">
                    Participate in governance, influence key decisions in the ever-growing
                    Zentry
                    Universe that is
                    limited only by people&apos;s imaginations</p>
                  <div className="absolute top-1 -left-6 w-[3px] rounded-2xl z-1 h-20 bg-gray-400 text-[12px]"></div>
                  <div ref={(el) => {
                    if (el) barsRef.current[0] = el;
                  }}
                       className=" bar absolute top-1 -left-6 w-[3px] rounded-2xl z-2 h-12 bg-black text-[12px]"></div>
                </div>
              </li>
              <li className="m-5">
                <header className={`${activeIndex === 1 ? "active-header" : ""} relative  text-[15px] text-gray-600`}>
                  <h1 className=" leading-6 font-medium mb-3 relative">Unlocking Economic Opportunity
                  </h1>
                  <div className="absolute top-0 -left-7 w-3 h-3 text-[1rem]">02</div>
                </header>
                <div className={`content relative hidden ${activeIndex === 1 ? "active-content" : " "}`}>


                  <p className="text-sm ">ZENT, a commodity-based currency that unlocks exclusive benefits, airdrops,
                    quotas, and co-creation within and beyond Zentry ecosystem.</p>
                  <div className="absolute top-1 -left-6 w-[3px] rounded-2xl z-1 h-20 bg-gray-400 text-[12px]"></div>
                  <div ref={(el) => {
                    if (el) barsRef.current[1] = el;
                  }}
                       className=" bar absolute top-1 -left-6 w-[3px] rounded-2xl z-2 h-12 bg-black text-[12px]"></div>
                </div>
              </li>
              <li className="m-5">
                <header className={`${activeIndex === 2 ? "active-header" : ""} relative  text-[15px] text-gray-600`}>
                  <h1 className=" leading-6 font-medium mb-3 relative">Sharing Value Accrued
                  </h1>
                  <div className="absolute top-0 -left-7 w-3 h-3 text-[1rem]">03</div>
                </header>
                <div className={`content relative hidden ${activeIndex === 2 ? "active-content" : " "}`}>


                  <p className="text-sm ">ZENT holders thrive as Zentry grows, benefiting from the expansive
                    partnerships, treasury investment and economic activities.</p>
                  <div className="absolute top-1 -left-6 w-[3px] rounded-2xl z-1 h-20 bg-gray-400 text-[12px]"></div>
                  <div ref={(el) => {
                    if (el) barsRef.current[2] = el;
                  }}
                       className=" bar absolute top-1 -left-6 w-[3px] rounded-2xl z-2 h-12 bg-black text-[12px]"></div>
                </div>
              </li>

            </ul>
          </div>
          <div className="-mt-32 max-md:hidden">

            <video
              src={`../../public/videos/local-${activeIndex + 5}.webm`}
              loop
              muted
              autoPlay
              className="object-contain w-[32rem] h-[32rem]"
            />
          </div>
        </div>
      </div>

    </section>
  );
};
export default Zent;
