"use client";
import { useGLTF } from "@react-three/drei";
import React, { useMemo } from "react";
import * as THREE from "three";
import { fadeOnBeforeCompileFlat } from "../utils/fadermaterial";

const Cloud = () => {
  const model = useGLTF("/model.gltf");
  // console.log(model);

  const clouds = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 1000; i++) {
      const z = -i * 20;
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 40;
      const x = Math.cos(angle) * 50;
      const y = Math.sin(angle) * 20;
      const scale = Math.random() * 5 + 1;
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
      <mesh
        geometry={model.nodes.Mball001.geometry}
        position={[-15,- 20, -50]}
        scale={[10, 10, 10]}
      >
        <meshStandardMaterial
          color="white"
          transparent
          depthWrite={false}
          onBeforeCompile={(shader) => {
            fadeOnBeforeCompileFlat(shader);
            // shader.uniforms.opacity.value = data.opacity;
          }}
        />
      </mesh>

      <mesh
        geometry={model.nodes.Mball001.geometry}
        position={[20,-20, -40]}
        scale={[10, 10, 10]}
      >
        <meshStandardMaterial
          color="white"
          transparent
          depthWrite={false}
          onBeforeCompile={(shader) => {
            fadeOnBeforeCompileFlat(shader);
            // shader.uniforms.opacity.value = data.opacity;
          }}
        />
      </mesh>

      {clouds.map((data, i) => (
        <mesh
          geometry={model.nodes.Mball001.geometry}
          position={data.position}
          scale={data.scale}
          rotation={data.rotation}
          key={i}
          envMap={true}
        >
          <meshStandardMaterial
            color="white"
            transparent
            // depthWrite={false}
            onBeforeCompile={(shader) => {
              fadeOnBeforeCompileFlat(shader);
              // shader.uniforms.opacity.value = data.opacity;
            }}
          />
        </mesh>
      ))}
    </>
  );
};

export default Cloud;
