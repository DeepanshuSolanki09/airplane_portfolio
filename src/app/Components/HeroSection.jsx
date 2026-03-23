import React from "react";

const HeroSection = () => {
  return (
    <div className="h-screen w-screen font-custom p-5 sticky">
      <img
        src={"/Photos/1000008246.png"}
        className="h-full w-full object-cover absolute bottom-0 left-0 z-10"
      />
      <img
        src={"/Photos/1000008249.png"}
        className="h-[500px] w-[500px] z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
      />

      <img
        src={"/Photos/1000008250.png"}
        className="h-[500px] w-[700px] z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
      />
      <button className="bg-black rounded-full text-white font-bold px-3 py-2 absolute right-2 bottom-2 cursor-pointer">
        Contact
      </button>

      <h1 className="absolute text-xl bottom-15 left-1/2 transform -translate-x-1/2 text-black/20 z-20">
        Scroll to explore
      </h1>

      <h1
        className="w-full m-2 z-50 text-center font-bold font-custom text-6xl lg:text-8xl lg:m-0
bg-gradient-to-r 
from-red-300 via-orange-300 via-yellow-300 via-green-300 via-blue-300 to-purple-300
bg-clip-text text-transparent stroke"
      >
        DEEPANSHU SOLANKI
      </h1>
      <h1 className="w-full text-center text-black/50 leading-0">
        I'm a web developer
      </h1>
    </div>
  );
};

export default HeroSection;
