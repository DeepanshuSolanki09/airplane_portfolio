"use client";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import React, { Suspense } from "react";
import Experience from "./Experience";

const Scene = () => {
  return (
    <div className="h-screen w-screen">
      {/* <Suspense fallback={null}> */}
        <Canvas className="h-screen w-screen" camera={{ position: [0, 0, 2] }}>
          <ScrollControls
            pages={70}
            damping={0.01}
            wrapperClass="scroll-container"
          >
            {/* <OrbitControls /> */}
            <Experience />
          </ScrollControls>
        </Canvas>
      {/* </Suspense> */}
    </div>
  );
};

export default Scene;
