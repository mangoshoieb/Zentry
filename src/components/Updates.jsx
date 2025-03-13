import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle.jsx";
import Button from "./Button.jsx";
import { MdOutlineWebStories } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);
const Card = ({ src, description, time }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const [bgScale, setBgScale] = useState(1); // State for background zoom
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 20;
    const tiltY = (relativeX - 0.5) * -20;

    setTransformStyle(`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`);
    setBgScale(1.15); // Zoom in on hover
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
    setBgScale(1); // Reset zoom when leaving
  };

  return (
    <div
      className="text-black flex flex-col gap-4 -ml-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={itemRef}
      style={{ transform: transformStyle, transition: "transform 0.2s ease-out", cursor: "pointer" }}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={src}
          alt="gallery"
          className="h-[25rem] w-[40rem] rounded-2xl transition-transform duration-700"
          style={{ transform: `scale(${bgScale})` }} // Apply zoom effect
        />
      </div>
      <div className="flex justify-between gap-2">
        <span>{time}</span>
        <p className="max-w-80 font-medium text-lg">{description}</p>
      </div>
    </div>
  );
};
const Updates = ({ className, dataBgColor }) => {
  const fixedRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: fixedRef.current,
      start: "top 10%",
      end: "bottom center",
      scrub: 1,
      pin: true
      // pinSpacing: true
    });
  });


  return (
    <>
      <section className={`${className} mt-[800px] flex justify-around gap-20`} data-bgcolor={dataBgColor}>
        <div className="min-h-screen -ml-24" ref={fixedRef}>
          <AnimatedTitle
            title="Lat<b>e</b>st <br /> <b>U</b>pd<b>a</b>tes"
            containerClass="text-[110px] leading-[5.5rem] flex justify-start !text-start  text-black special-font font-zentry"
          />

          <p className="text-black max-w-72 text-sm ml-10 mt-10 leading-4">Stay updated with the latest news, events,
            and
            updates in our
            ecosystem. Be part of our universe's growth and evolution.</p>

          <Button title="Read all news" containerClass="ml-10 mt-5 !bg-black !text-blue-50 flex gap-3"
                  rightIcon={<MdOutlineWebStories />} />
        </div>
        <div className="flex flex-col gap-20">
          <Card
            src="../../public/img/gallery-2.webp"
            description="Nexus: Zentry’s Social Portal Bridging Human & AI in the Global Play Economy"
            time="09.05.2024"
          />
          <Card
            src="../../public/img/gallery-3.webp"
            description="Zentry Whitepaper: The Blueprint The Blueprint to the Metagame"
            time="22.11.2024"
          />
        </div>
      </section>
    </>
  );
};
export default Updates;
