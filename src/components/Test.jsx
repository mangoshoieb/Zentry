import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);
const Story = () => {
  const itemRef = useRef(null);
  useGSAP(() => {
    gsap.to(".one", {
      scrollTrigger: {
        trigger: ".one",
        start: "top center",
        end: "bottom center",
        markers: true,
        scrub: 4
      },
      x: 400,
      rotation: 360,
      duration: 5
    });
    gsap.to(".two", {
      scrollTrigger: {
        trigger: ".two",
        start: "top center",
        end: "bottom center",
        markers: true,
        scrub: 4
      },
      x: 400,
      rotation: 360,
      duration: 5
    });
    gsap.to(".three", {
      scrollTrigger: {
        trigger: ".three",
        start: "top center",
        end: "bottom center",
        markers: true,
        scrub: 4
      },
      x: 400,
      rotation: 360,
      duration: 5
    });
  });
  return (
    <section className="size-full h-[180vh] p-20 pt-52 bg-black">
      <div ref={itemRef} className="bg-violet-300 h-16 w-16 p-5 m-9 one" />
      <div className="bg-green-300 h-16 w-16 p-5 m-9 two" />
      <div className="bg-red-500 h-16 w-16 p-5 m-9 three" />

    </section>

  );
};
export default Story;
