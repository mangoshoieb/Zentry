import { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Alert from "./Alert.jsx";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const currentVideoRef = useRef(null);


  gsap.registerPlugin(ScrollTrigger);

  const handleLoadVideo = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);
  useGSAP(() => {
    gsap.set("#next-video", { visibility: "visible" });
    gsap.to("#next-video", {
      transformOrigin: "center center",
      scale: 1,
      width: "100%",
      height: "100%",
      duration: 1,
      ease: "power1.inOut",
      onStart: () => currentVideoRef.current.play()

    });
    gsap.from("#current-video", {
      transformOrigin: "center center",
      scale: 1,
      duration: 1,
      ease: "power1.inOut"
    });
  }, { dependencies: [currentIndex], revertOnUpdate: true });

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%"
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true
      }
    });
  });

  const frameRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isShrunk, setIsShrunk] = useState(false);

  const handleMouseMove = (e) => {
    clearTimeout(timeoutRef.current);

    const element = frameRef.current;
    if (!element) return;

    const { clientX, clientY } = e;
    const rect = element.getBoundingClientRect();
    const xPercent = (clientX - rect.left) / rect.width - 0.5;
    const yPercent = (clientY - rect.top) / rect.height - 0.5;

    // If shrunk, bring back to scale 1
    if (isShrunk) {
      setIsShrunk(false);
      gsap.to(element, { scale: 1, duration: 0.5, ease: "power2.out" });
    }

    // Apply hover effects
    gsap.to("#current-video", {
      duration: 0.3,
      x: xPercent * 25,
      y: yPercent * 25,
      ease: "power1.out"
    });

    gsap.to(element, {
      duration: 0.3,
      rotateX: yPercent * -15,
      rotateY: xPercent * 10,
      transformPerspective: 800,
      ease: "power1.out"
    });

    gsap.to(element, {
      duration: 0.3,
      x: xPercent * 25,
      y: yPercent * 25,
      ease: "power1.out"
    });

    // Start timeout to shrink mini video
    timeoutRef.current = setTimeout(() => {
      if (!isShrunk) {  // Ensure state does not conflict
        setIsShrunk(true);
        gsap.to(element, {
          duration: 1.5,
          scale: 0.4, // Slight shrink instead of disappearing
          ease: "power2.out"
        });
      }
    }, 500); // 1 second delay before shrinking
  };

// Clean up timeout on unmount
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);


  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;
  return (
    <>
      {isLoading && (
        <div className="flex-center absolute z-[100] w-screen min-h-screen bg-blue-100">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div className="relative h-dvh w-screen overflow-x-hidden scroll-smooth">
        <div id="video-frame" className="overflow-x-hidden h-dvh w-screen relative z-10 rounded-2xl bg-blue-75"
             onMouseMove={handleMouseMove}>
          <div>
            <div
              className="mask-clip-path absolute absolute-center z-50 size-64 rounded-lg overflow-hidden cursor-pointer"
              ref={frameRef}>
              <div onClick={handleMiniVideoClick} className="origin-center scale-100 transition-all
                    duration-300 ease-in  opacity-100 ">
                <video
                  ref={currentVideoRef}
                  src={getVideoSrc(upcomingVideoIndex)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 object-cover object-center origin-center scale-150"
                  onLoadedData={handleLoadVideo}
                />
              </div>
            </div>
            <video
              ref={currentVideoRef}
              src={getVideoSrc(currentIndex)}
              loop
              muted
              id="next-video"
              className="size-64 object-cover object-center invisible absolute absolute-center z-20"
              onLoadedData={handleLoadVideo}
            />
            <video

              src={getVideoSrc(currentIndex)}
              autoPlay
              loop
              muted
              className="size-full object-cover object-center absolute left-0 top-0"
              onLoadedData={handleLoadVideo}
            />
          </div>
          <h1 className="special-font hero-heading right-5 bottom-5 absolute text-blue-75 z-40">
            G<b>a</b>ming
          </h1>
          <div className="absolute z-40 left-0 top-0 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
              <p className="text-blue-100 max-w-64 font-general  mb-5 ">Enter the Metagame
                <br /> Unleash the play Economy</p>
              <Button id={"watch trailer"} leftIcon={<TiLocationArrow />} title="Watch Trailer"
                      containerClass="!bg-yellow-300 gap-1 flex-center" />
            </div>
          </div>
        </div>
        <h1 className="special-font hero-heading right-5 bottom-5 absolute text-black">
          G<b>a</b>ming
        </h1>
        <Alert />
      </div>

    </>
  );
};
export default Hero;
