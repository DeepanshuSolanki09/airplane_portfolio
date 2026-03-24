import React from "react";
import gsap from 'gsap';

const HeroSection = () => {

  function animater(){

    const t = gsap.timeline();

    t.to('.main',{
      x : -2000,
      duration:2,
      ease:"power3.out"
    },"hehe").to('.main2',{
      x : +2000,
      duration:2,
      ease:"power3.out"
    },"hehe").to('.btn1',{
      x : 2000,
       duration:2,
      ease:"power3.out"
    },"hehe").to('.btn2',{
      y : 5000,
       duration:1,
      ease:"power3.out"
    },"hehe").to('.plane',{
      scale:5,
      x : -700,
      y : 700,
      duration:2,
      ease:"power3.out"
    },"hehe").to('.target',{
        opacity:0,
        duration:3,
        ease:"power3.out",
        z:0,
        display:"none",
      },"xoxo")
  };

  return (
    <div className="min-h-screen w-screen font-custom p-5 sticky bg-gradient-to-b from-blue-400 to-white flex items-center justify-center text-white gap-5 flex-col target absolute top-0 left-0 z-20">
      <div>
        <h1 className="lg:text-7xl text-6xl font-extrabold main text-center">DEEPANSHU SOLANKI</h1>
        <p  className="lg:text-2xl text-xl text-center main2">I'm a creative web developer</p>
      </div>
      <button onClick={animater} className="bg-blue-950 font-bold py-2 px-3 hover:bg-white hover:text-black transition-all duration-300 lg:text-2xl lg:w-1/8 rounded-full cursor-pointer btn1">Explore</button>

       <button onClick={() => window.open("/contact", "_blank")}  className="bg-blue-950 font-bold py-2 px-3 hover:bg-white hover:text-black transition-all duration-300 lg:text-md lg:w-1/10 rounded-full cursor-pointer absolute bottom-5 right-5 btn2">Contact</button>

       <img src={'/Photos/1000008249.png'} className="plane absolute top-0 bottom-0 h-[100px] w-[100px] object-cover"/>
    </div>
  );
};

export default HeroSection;
