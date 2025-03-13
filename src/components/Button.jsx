import { useRef } from "react";

const Button = ({ title, id, leftIcon, rightIcon, containerClass }) => {
  const audioRef = useRef(null);
  const handleMouseClick = () => {
    audioRef.current.play();
  };
  return (
    <button id={id}
            className={`group font-circular-web font-semibold btn relative z-10 w-fit px-7 py-3 overflow-hidden rounded-full hover:rounded-lg
                    text-black bg-violet-50 ${containerClass}`} onMouseEnter={handleMouseClick}>
      {leftIcon}
      <span className="relative inline-flex font-general text-xs overflow-hidden uppercase ">
                <div>{title}</div></span>
      {rightIcon}
      <audio ref={audioRef} src="/audio/425727__moogy73__click02.wav" className="hidden" />
    </button>
  );
};
export default Button;
