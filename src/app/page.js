"use client";
import Image from "next/image";
import Experience from "./Components/Experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import SmoothScroll from "./Components/SmoothScroll";
import Scene from "./Components/Scene";
import HeroSection from "./Components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Scene />
    </>
  );
}
