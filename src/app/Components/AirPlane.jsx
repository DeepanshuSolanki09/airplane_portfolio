"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const AirPlane = () => {
  const model = useGLTF("/model.glb");
  const helix = useRef();

  useFrame((state, delta) => {
    helix.current.rotation.x += delta * 30;
  });
  return (
    <>
      <group
        dispose={null}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[0.2, 0.2, 0.2]}
      >
        <mesh geometry={model.nodes.PUSHILIN_Plane_Circle000.geometry}>
          <meshStandardMaterial color="#C5C6D0"/>
        </mesh>

        <mesh
          ref={helix}
          geometry={model.nodes.PUSHILIN_Plane_Helix.geometry}
          position={[1.09, 0.23, 0]}
        >
          <meshStandardMaterial color={"white"}/>
        </mesh>
      </group>
    </>
  );
};

export default AirPlane;
