import { useRef, useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);


const Partners = ({ className, dataBgColor }) => {
  const fixedRef = useRef(null);
  const barsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!barsRef.current.length || !fixedRef.current) return;

    // Pin the left description when it reaches the center
    ScrollTrigger.create({
      trigger: fixedRef.current,
      start: "top 50%", // Pins when center of div reaches center of viewport
      end: "bottom top",
      pin: true,
      pinSpacing: false
    });

    // Partner names scrolling effect
    barsRef.current.forEach((bar, index) => {
      gsap.set(bar, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: bar,
        start: "top 60%", // Adjusted start position
        end: "bottom 10%", // Ensures it stays active longer
        markers: false, // Set to true for debugging
        onEnter: () => {
          setActiveIndex((prev) => (prev !== index ? index : prev));
          gsap.to(bar, { opacity: 1, y: 0, duration: 0.1 });
        },
        onLeaveBack: () => {
          if (index > 0) {
            setActiveIndex((prev) => (prev !== index - 1 ? index - 1 : prev));
          }
          gsap.to(bar, { opacity: 0, y: 50, duration: 0.1 });
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <section className={`${className} `} data-bgcolor={dataBgColor}>
      <div className="flex justify-between gap-10 h-[100vh] px-10">
        {/* Fixed Description */}
        <div
          ref={fixedRef}
          className="description text-blue-50 max-w-96 mt-[15rem] ml-24 text-[17px] font-circular-web font-medium leading-5"
        >
          <div className={`text-gray-500 ${activeIndex < 8 ? "" : "hidden"}`}>
            <b className="text-blue-50">Our backers</b> include top-tier VCs, funds, and companies, providing expertise,
            network, and resources to fuel our project&apos;s success.
          </div>
          <div className={`text-gray-500 ${activeIndex > 7 && activeIndex < 11 ? "" : "hidden"}`}>
            <b className="text-blue-50">Our gaming</b> partners span projects, communities,
            protocols,&infrastructure, accelerating expansive
            growth of the new gaming era.
          </div>
          <div className={`text-gray-500 ${activeIndex > 10 ? "" : "hidden"}`}>
            <b className="text-blue-50">Our Web3 </b> partners support tech & community, driving
            cutting-edge innovation and a vibrant ecosystem
            users.

          </div>
        </div>

        {/* Scrolling Partner List */}
        <div className="partners text-blue-50 mt-[10rem] text-[60px] special-font font-zentry -ml-16 leading-5">
          <h1 className="font-semibold uppercase">o<b>u</b>r partners</h1>

          {[
            "Binance Labs",
            "Coinbase Ventures",
            "Pantera Capital",
            "DeFiance Capital",
            "Animoca Brands",
            "SkyVision Capital",
            "Play Venture",
            "Vessel Capital",
            "Arche Fund",
            "Marblex",
            "Fnatic",
            "XSET",
            "Jambo",
            "AWS"
          ].map((name, index) => (
            <div
              key={index}
              ref={(el) => (barsRef.current[index] = el)}
              className={`opacity-0 transition-all duration-500 ${
                activeIndex === index ? "text-yellow-300" : "text-blue-50"
              }`}
            >
              <span key={index} className={`inline text-[10px] font-general -ml-14 text-gray-500 ${
                activeIndex === index ? "text-yellow-300" : "text-blue-50"
              }`}>BACKE RS</span>
              <div>{name}</div>
            </div>
          ))}
        </div>

        <div>logos</div>
      </div>
    </section>
  );
};

export default Partners;
