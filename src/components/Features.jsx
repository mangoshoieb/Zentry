import { TiLocationArrow } from "react-icons/ti";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 10;
    const tiltY = (relativeX - 0.5) * -10;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.9, .9, .9)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(.9, .9, .9)");
  };


  return (
    <div
      ref={itemRef}
      className={`${className} animated-card`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: "0.2s", cursor: "pointer" }}
    >
      {children}
    </div>
  );
};


const BentoCard = ({ src, title, description }) => {
  const videoRef = useRef(null);


  return (
    <div className="relative size-full"
         id="clip">

      <video
        ref={videoRef}
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 size-full text-blue-50 flex flex-col justify-between p-5">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-[11px] md:text-base opacity-80">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const featureRef = useRef(null);

  useGSAP(() => {
    if (!featureRef.current) return;
    const elements = featureRef.current.querySelectorAll(".animated-card");

    elements.forEach((element) => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 95%",
          end: "top 60%",
          toggleActions: "play none none none",
          scrub: 1
        }
      });

      // Initial State
      gsap.set(element, {
        scale: 0.9 // Set initial scale properly
      });

      // GSAP Animation
      clipAnimation.to(element, {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 0.95, // Final scale when animation completes
        ease: "power2.inOut",
        duration: 1,
        opacity: 1
      });
    });

    ScrollTrigger.refresh();
  });


  return (
    <section className="bg-black pb-52 scroll-smooth">
      <div className="container mx-auto px-3 md:px-10" ref={featureRef}>
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">Explore the Zentry Universe</p>
          <p className="font-circular-web text-lg text-blue-50 opacity-50 max-w-md">Immerse yourself in an
            IP-rich
            product universe where AI-driven gamification and hyper-personalization lead the human-agentic
            economy.</p>
        </div>
        <BentoTilt
          className="relative border-hsla w-full h-96 overflow-hidden md:h-[65vh] mb-7 rounded-md "
          id="clip">
          <BentoCard
            src="videos/feature-1.mp4"
            title={<>radi<b>n</b>t</>}
            description="The game of games transforming your in-game actions across Web2 & Web3 titles into arewarding adventure."
          />
        </BentoTilt>
        <div className=" grid h-[165vh] grid-cols-2 grid-rows-4 gap-7">

          <BentoTilt className="bento-tilt_1 row-span-2 md:row-span-4 md:col-span-1">
            <BentoCard
              src="videos/local-1.mp4"
              title={<>zig<b>m</b>a</>}
              description="The NFT collection merging Zentry's IP, AI, and gaming-pushing the boundaries of NFTinnovation."
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 row-span-2 ms-32 md:ms-0 md:col-span-1">
            <BentoCard
              src="videos/local-2.mp4"
              title={<>n<b>e</b>xus</>}
              description="The player portal uniting humans & Al to play, compete, earn and showcase-gamifying social & Web3 experiences."
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 row-span-2 me-14 md:me-0 md:col-span-1">
            <BentoCard
              src="videos/local-3.mp4"
              title={<>az<b>u</b>l</>}
              description="The agent of agents elevating agentic Al experience to be more fun and productive."
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <div className="p-5 bg-violet-300 size-full flex justify-between flex-col">
              <h1 className="bento-title special-font max-w-64">m<b>o</b>re co<b>m</b>ing so<b>o</b>n</h1>
              <TiLocationArrow className="m-5 self-end scale-[5]" />
            </div>
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <video
              src="../../public/videos/local-4.mp4"
              loop
              muted
              autoPlay
              className="object-center object-cover size-full"
            />
          </BentoTilt>
        </div>
      </div>
    </section>);
};
export default Features;
