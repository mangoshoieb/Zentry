import AnimatedTitle from "./AnimatedTitle.jsx";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const Glance = ({ className, dataBgColor, currentBgColor }) => {

  const featureRef = useRef(null);

  useGSAP(() => {
    if (!featureRef.current) return;
    const elements = featureRef.current.querySelectorAll(".card");

    if (elements.length === 0) {
      console.warn("No animated-card elements found!");
      return;
    }

    // 🔄 Loop over each card to apply animation separately
    elements.forEach((element) => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: element, // Each element triggers animation separately
          start: "top 95%", // Animation starts when the card is 85% visible
          // end: "top 20%",
          scrub: 4,

          toggleActions: "play none none none"
        }
      });

      // 🚀 Initial animation: Override .animated-card class transform
      clipAnimation.from(element, {
        x: 0,
        y: -10,
        z: -60,
        rotateX: -80, // Fix rotation issue
        rotateY: 0,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      });

      // 🏁 Final state: Moves to a flat position
      clipAnimation.to(element, {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        // scale: 0.95,
        ease: "power2.inOut",
        duration: 1.5
      });
    });

    // 🔄 Refresh ScrollTrigger after animations are applied
    ScrollTrigger.refresh();
    console.log("ScrollTrigger refreshed!");
  });

  const [colorswicth, setColorswicth] = useState(true);

  useEffect(() => {

    if (currentBgColor === "#000") {
      setColorswicth(false);
    } else if (currentBgColor === "#DFDFF0") {
      setColorswicth(true);
    }

  }, [currentBgColor]);


  return (
    <section className={`${className}  py-24`} data-bgcolor={dataBgColor}>
      <div className={`min-h-screen w-screen  mx-auto px-3 md:px-10 ${colorswicth ? "text-black" : "text-blue-50"} `}
           ref={featureRef}>
        <div className="top-part w-full py-10  ">
          <p className="text-[13px] text-start mb-8 pl-8">Our universe in a nutshell</p>
          <AnimatedTitle
            title="ze<b>n</b>try at a <br /> gl<b>a</b>nce"
            containerClass={` ${colorswicth ? "text-black" : "text-blue-50"} flex  justify-start `}
          />
        </div>
        <div
          className="content grid grid-rows-9 grid-cols-6 max-md:grid-rows-12 max-md:grid-cols-3 gap-7 max-w-[1000px] mx-auto h-[210vh]">
          <div
            className="card row-span-2 row-start-2 col-span-3 max-md:row-span-2 max-md:col-span-2 relative border border-[0.5px] border-gray-800 ">
            <p className="text-sm absolute top-3 left-2">Products</p>
            <p className="text-[100px] font-zentry font-bold absolute top-5 left-2 special-font">4 <b>+</b></p>
            <video
              src="../../public/videos/local-11.webm"
              loop
              autoPlay
              muted
              className="object-cover size-full "
            />
          </div>
          <div className="card row-span-4 col-span-3 max-md:row-span-3 max-md:col-span-3 bg-[#422ce3] relative ">
            <div className="text-black text-sm absolute top-1 left-2">Reisdents</div>

            <div
              className="magic-3 w-96 ml-14 -mt-10 text-[150px] pl-3 text-black font-zentry special-font absolute -z-0 top-4 left-1">
              500<b>K</b>+
            </div>
            <div style={{ backgroundImage: "url('/img/gallery-1.webp')" }}
                 className="w-full h-full bg-cover bg-center z-3 "></div>
          </div>
          <div
            className="card row-span-2 col-span-2 max-md:row-span-2 max-md:col-span-2 max-md:col-start-1 col-start-2 bg-[#EDFF66] relative">
            <div className="magic-2 w-full -mt-10 text-[180px] pl-3 text-black font-semibold special-font">
              3<b>0</b>+
            </div>
            <p className="absolute text-sm bottom-4 right-2 text-black ">Partners</p>
          </div>
          <div
            className="card row-span-2 col-span-2 col-start-4 max-md:row-span-3 max-md:col-span-2 max-md:col-start-1 text-blue-50 p-2 border border-[0.5px] border-gray-800">
            <div className="text-[50px] font-zentry leading-[2.7rem] special-font ">
              W<b>o</b>rld-class <br /> B<b>a</b>ckers
            </div>
            <div className="ml-40 max-w-32 text-end mt-12 text-[10px] font-general">
              COIHBASE VEHTURES <br />
              BIHANCE LABS <br />
              DEFIANCE CAPITAL<br />
              HASHED<br />
              РАНТЕRA CAPITAL<br />
              AHIHOCA BRANDS<br />
              PLAY VEHTURES<br />
              SKYVISION CAPITAL<br />
              VESSEL CAPITAL<br />
              ARCHE FUHD

            </div>
          </div>
          <div className="card row-span-4 col-span-3 max-md:row-span-3 max-md:col-span-3 bg-[#422ce3] relative">
            <div className="text-[100px] font-zentry text-black pl-4 special-font absolute top-1 left-3"> 140 <b>M</b>
              <b>+</b></div>
            <video
              src="../../public/videos/local-12.webm"
              loop
              autoPlay
              muted
              className="object-cover scale-75"
            />
            <div className="w-full flex justify-evenly text-blue-50 absolute bottom-2 text-[13px] gap-4">
              <div className="relative font-general uppercase font-bold ">
                <div className="absolute top-1 -left-5 w-3 h-3 rounded-full bg-black" />
                <div>
                  liquid token
                </div>
                <div>
                  70%
                </div>
              </div>
              <div className="relative font-general uppercase font-bold ">
                <div className="absolute top-1 -left-5 w-3 h-3 rounded-full bg-yellow-300" />
                <div>
                  investments
                </div>
                <div>
                  20%
                </div>
              </div>
              <div className="relative font-general uppercase font-bold ">
                <div className="absolute top-1 -left-5 w-3 h-3 rounded-full bg-blue-50" />
                <div>
                  nft assets
                </div>
                <div>
                  10%
                </div>
              </div>
            </div>
          </div>
          <div className="card row-span-2 col-span-3 max-md:row-span-2 max-md:col-span-2 bg-blue-50 p-4">
            <p className="text-sm text-black">Revenue generated <br />
              2024</p>
            <div className="magic-1 w-full -mt-20 text-[260px] pl-3 text-black font-zentry font-bold special-font">
              40<b>M</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Glance;
