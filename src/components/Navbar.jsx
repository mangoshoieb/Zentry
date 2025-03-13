import Button from "./Button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar = () => {
  const navItems = ["Nexus", "Vault", "prologue", "About", "Contact"];
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const audioRef = useRef(null);
  const navContainerRef = useRef(null);


  const ToggleIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };
  useEffect(() => {
    if (isAudioPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isAudioPlaying]);

  const { y: currentScrollY } = useWindowScroll();
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3
    });
  }, [isNavVisible]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAudioPlaying(true);
      setIsIndicatorActive(true);
      audioRef.current.play(); // Play audio after 5 seconds
    }, 8000);

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);
  return (
    <div ref={navContainerRef} className="top-4 z-50 transition-all inset-x-0 duration-700 sm:inset-x-6 fixed
        h-16 border-none">
      <header className="absolute top-1/2 -translate-y-1/2 w-full">
        <nav className="flex items-center justify-between size-full p-4">
          <div className="flex items-center gap-7">
            <img
              alt="logo"
              src="/img/logo.png"
              className="w-10"
            />
            <Button title="Products" rightIcon={TiLocationArrow()}
                    containerClass={"bg-blue-50 flex gap-1 items-center justify-center uppercase !px-4 !py-2"} />
            <Button title="whitepaper"
                    containerClass={"bg-blue-50 md:flex hidden items-center justify-center !px-4 !py-2 uppercase"} />
          </div>
          <div className="flex items-center h-full ">
            <div className="hidden md:block">

              {navItems.map((item) => (
                <a key={item} className="nav-hover-btn" href={`#${item.toLowerCase()}`}>{item}</a>
              ))}
            </div>
            <button className="ml-10 flex items-center space-x-1" onClick={ToggleIndicator}>
              <audio ref={audioRef} src="/audio/loop.mp3" loop className="hidden" />
              {[1, 2, 3, 4].map((bar) => (
                <div key={bar} className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                     style={{ animationDelay: `${bar * 0.2}s` }} />

              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Navbar;
