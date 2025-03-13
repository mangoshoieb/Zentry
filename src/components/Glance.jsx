import AnimatedTitle from "./AnimatedTitle.jsx";

const Clane = ({ className, dataBgColor }) => {
  return (
    <section className={`${className} h-[200vh]`} data-bgcolor={dataBgColor}>
      <div className="h-dvh w-screen text-blue-50 ">
        <div className="top-part w-full py-10">
          <p className="text-sm text-start">Our universe in a nutshell</p>
          <AnimatedTitle
            title="e<b>n</b>try at a <br /> gl<b>a</b>nce"
            containerClass="!text-black flex  justify-start"
          />
        </div>
      </div>
    </section>
  );
};
export default Clane;
