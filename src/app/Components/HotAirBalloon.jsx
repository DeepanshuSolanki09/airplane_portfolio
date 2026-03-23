"use client";
import { useGLTF } from "@react-three/drei";
import React, { useMemo } from "react";
import * as THREE from "three";
import { fadeOnBeforeCompileFlat } from "../utils/fadermaterial";
import { mod } from "three/src/nodes/math/OperatorNode";

const HotAirBalloon = () => {
  const model = useGLTF("/hot air baloon.glb");
  console.log(model.scene)

  const clouds = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      const z = -i * 20;
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 40;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * (5 + Math.random() * 10);
      const scale = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.4 + 0.3;
      arr.push({
        position: [x, y, z + (Math.random() - 0.5) * 40],
        scale: [scale, scale, scale],
        rotation: [0, Math.random() * Math.PI, 0],
        opacity,
      });
    }
    return arr;
  }, []);

  return (
    <>
     {clouds.map((data,i) => {
        return <primitive key={i} position={data.position} rotation={data.rotation} scale={data.scale} object={model.scene}>

        </primitive>
     })}
    </>
  );
};

export default HotAirBalloon;
