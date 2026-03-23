"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import React from 'react'
import  Experience from "./Experience";

const Scene = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas className="h-screen w-screen" camera={{ position: [0, 0, 2] }}>
        <ScrollControls pages={100} damping={1} wrapperClass="scroll-container">
          {/* <OrbitControls /> */}
          <Experience/>
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default Scene
