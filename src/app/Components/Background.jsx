"use client";
import { Environment, Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Depth, Gradient, LayerMaterial } from "lamina";
import React, { useRef } from "react";
import * as THREE from "three";

const Background = () => {
  const colorA = new THREE.Color("#2590BC");
  const colorB = new THREE.Color("#ffffff");

  const targetA = new THREE.Color("#FC8F77");
  const targetB = new THREE.Color("#ffffff");

  const nightA = new THREE.Color("#0b0f2a");
  const nightB = new THREE.Color("#1a2a6c");

  const gradientref = useRef(null);
  const scroll = useScroll();

  const gradients = [
    { A: new THREE.Color("#2590BC"), B: new THREE.Color("#ffffff") }, // Day (your start)
    { A: new THREE.Color("#6EC6FF"), B: new THREE.Color("#FFE29A") }, // Soft golden hour
    { A: new THREE.Color("#FF7E5F"), B: new THREE.Color("#FEB47B") }, // Sunset (orange)
    { A: new THREE.Color("#6A5ACD"), B: new THREE.Color("#2C3E50") }, // Dusk (purple/blue)
    { A: new THREE.Color("#0B0C2A"), B: new THREE.Color("#000000") }, // Night
  ];

  useFrame(() => {
    const t = scroll.offset;

    const total = gradients.length - 1;
    const scaledT = t * total;

    const index = Math.floor(scaledT);
    const localT = scaledT - index;

    const g1 = gradients[index];
    const g2 = gradients[index + 1] || gradients[index];

    // smoother transition (important)
    const smoothT = localT * localT * (3 - 2 * localT);

    const A = g1.A.clone().lerp(g2.A, smoothT);
    const B = g1.B.clone().lerp(g2.B, smoothT);

    if (gradientref.current) {
      gradientref.current.colorA = A;
      gradientref.current.colorB = B;
    }
  });

  return (
    <>
      <Environment resolution={256}>
        <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
          <LayerMaterial side={THREE.BackSide}>
            <Gradient
              colorA={colorA}
              colorB={colorB}
              start={0}
              end={-0.5}
              axes="y"
            />
          </LayerMaterial>
        </Sphere>
      </Environment>

      <Environment preset="sunset" />
      <Sphere scale={[2000, 2000, 2000]}>
        <LayerMaterial
          lighting="physical"
          transmission={0}
          side={THREE.BackSide}
          // fog={false}
        >
          <Gradient
            ref={gradientref}
            colorA={"#2590BC"}
            colorB={"white"}
            start={0}
            end={-0.5}
            axes="y"
          />
        </LayerMaterial>
      </Sphere>

      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      {/* <fogExp2 attach="fog" args={["#e6f2ff", 0.003]} /> */}
    </>
  );
};

export default Background;
