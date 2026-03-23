"use client";
import { useThree } from "@react-three/fiber";
import {
  Float,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Text,
  useScroll,
  Sphere,
  CloudInstance,
  useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import Background from "./Background";
import * as THREE from "three";
import Cloud from "./Cloud";
import AirPlane from "./AirPlane";
import { Clouds } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadermaterial";
import HotAirBalloon from "./HotAirBalloon";

const Experience = () => {
  const texture = useTexture(
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  );

  const { viewport } = useThree();
  const isMobile = viewport.width < 6;
  
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -250),
        new THREE.Vector3(100, 0, -2 * 250),
        new THREE.Vector3(-100, 0, -3 * 250),
        new THREE.Vector3(100, 0, -4 * 250),
        new THREE.Vector3(0, 0, -5 * 250),
        new THREE.Vector3(0, 0, -6 * 250),
        new THREE.Vector3(0, 0, -7 * 250),
      ],
      false,
      "catmullrom",
      0.5,
    );
  }, []);

  const points = useMemo(() => {
    return curve.getPoints(12000);
  }, [curve]);

  const point = curve.getPoint(0.15);
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);

  const cameragroup = useRef(null);
  const sphereRef = useRef(null);

  // Reusable objects to avoid GC jitter
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const tempTarget = useMemo(() => new THREE.Vector3(), []);
  const tempQuat = useMemo(() => new THREE.Quaternion(), []);
  const dummyGroup = useMemo(() => new THREE.Group(), []);

  const scroll = useScroll();

  useEffect(() => {
    if (!sphereRef.current) return;

    sphereRef.current.rotation.set(0, Math.PI / 2, 0);
  }, []);

  useFrame((state, delta) => {
    const scrolloffset = Math.max(0, scroll.offset);

    // Get points on the curve
    const curpoint = curve.getPoint(scrolloffset);
    const lookAtPoint = curve.getPoint(Math.min(scrolloffset + 0.01, 1));

    // Smoothing factor - lower is smoother/slower
    const lerpFactor = Math.min(1, delta * 3);

    // 1. Camera Group Position
    cameragroup.current.position.lerp(curpoint, lerpFactor);

    // 2. Camera Group Rotation (Stable Slerp)
    dummyGroup.position.copy(cameragroup.current.position);
    dummyGroup.lookAt(lookAtPoint);
    cameragroup.current.quaternion.slerp(dummyGroup.quaternion, lerpFactor);

    // 3. Sphere Banking Effect
    // We calculate banking based on the change in tangent (curvature)
    const tangent = curve.getTangent(scrolloffset);
    const nextTangent = curve.getTangent(Math.min(scrolloffset + 0.01, 1));

    // The cross product of the current and next tangent tells us the direction and intensity of the turn
    const cross = tempVec.crossVectors(tangent, nextTangent);

    // cross.y will be positive for left turns and negative for right turns (or vice versa depending on curve)
    // We use this to set the Z-axis banking
    const targetBank = cross.y * 150; // Multiplier for banking intensity
    const clampedBank = Math.max(-0.5, Math.min(0.5, targetBank));

    tempQuat.setFromEuler(new THREE.Euler(0, 0, clampedBank));
    sphereRef.current.quaternion.slerp(tempQuat, delta * 4);
  });

  return (
    <>
      <color attach="background" args={["#ececec"]} />
      <group ref={cameragroup}>
        <PerspectiveCamera
          position={[0, 0, -5]}
          rotation={[0, Math.PI, 0]}
          fov={30}
          makeDefault
          near={0.01}
          far={2000}
        />
        {/* SPHERE (Replaced AirPlane) */}
        {/* <Background /> */}
        <group ref={sphereRef}>
          <Float speed={2} floatIntensity={0.5}>
            <AirPlane />
          </Float>
        </group>
      </group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Background />
      {/* CURVE */}
      {/* <group position={[0, -3, 0]}>
        <Line
          points={points}
          color={"white"}
          lineWidth={10}
          opacity={0.8}
          transparent={true}
        />
      </group> */}

      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: 12000,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial
            color={"white"}
            transparent
            envMapIntensity={2}
            onBeforeCompile={(shaders) => {
              fadeOnBeforeCompileFlat(shaders);
            }}
          />
        </mesh>
      </group>
      {/* TEXT */}
      <group position={[1, 0, -10]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.22}
          maxWidth={2.5}
        >
          Welcome To My Intro!{"\n"}
          Have a seat and enjoy the ride!
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[400].x + (isMobile ? -2 : -5), points[400].y + (isMobile ? 4 : 0), points[400].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
        >
          Who Am I?
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.3}
          fontSize={0.22}
          maxWidth={3}
        >
          Making cool stuff on the web… because normal is kinda boring.{"\n"}
          Hi, I’m a creative developer turning ideas into interactive
          experiences.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[1000].x + (isMobile ? -2 : -6), points[1000].y + (isMobile ? 4 : 0), points[1000].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={(isMobile ? 5 : 10)}
        >
          Where It All Started?
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.2 + (isMobile ? -0.5 : 0)}
          fontSize={0.22}
          maxWidth={3}
        >
          It began with curiosity… clicking buttons, breaking things,{"\n"}
          and wondering how the internet actually works.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[1500].x + (isMobile ? -2 : -6), points[1500].y  + (isMobile ? 4 : 0), points[1500].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          First Lines of Code
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.3}
          fontSize={0.22}
          maxWidth={3}
        >
          From simple HTML pages to styling with CSS,{"\n"}
          I slowly started shaping my own digital world.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[2000].x + (isMobile ? -2 : 3), points[2000].y  + (isMobile ? 4 : 0), points[2000].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          Falling Into the Rabbit Hole
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.4}
          fontSize={0.22}
          maxWidth={3}
        >
          JavaScript changed everything.{"\n"}
          Suddenly, websites weren’t just pages… they became alive
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[2500].x + (isMobile ? -2 : -6), points[2500].y  + (isMobile ? 4 : 0), points[2500].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          Not Just a Developer
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.4}
          fontSize={0.22}
          maxWidth={3}
        >
          I don’t just build things.{"\n"}
          I design experiences that people can feel and interact with.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[3500].x + (isMobile ? -2 : -6), points[3500].y  + (isMobile ? 4 : 0), points[3500].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          The 3D Obsession
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.4}
          fontSize={0.22}
          maxWidth={3}
        >
          Then came WebGL and Three.js{"\n"}
          and I realized the web could be way more than flat screens.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[4500].x + (isMobile ? 0 : 6), points[4500].y  + (isMobile ? 4 : 0), points[4500].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          Breaking Limits
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.2}
          fontSize={0.22}
          maxWidth={3}
        >
          From smooth animations to immersive worlds,{"\n"}
          I push boundaries to make the web unforgettable.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[5500].x + (isMobile ? -2 : -6), points[5500].y  + (isMobile ? 4 : 0), points[5500].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          Late Nights & Debugging
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.4}
          fontSize={0.22}
          maxWidth={3}
        >
          Countless nights, countless errors{"\n"}
          but every fix made me sharper and better.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[6500].x + (isMobile ? -3 : -6), points[6500].y  + (isMobile ? 5 : 0), points[6500].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          I'm Deepanshu Solanki
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-2  + (isMobile ? -0.75 : 0)}
          fontSize={0.22}
          maxWidth={(isMobile ? 6 : 10)}
        >
          I am a creative web developer with a strong foundation in
          problem-solving, shaped by my background in competitive programming. I
          began my journey with curiosity about how the web works, gradually
          building expertise in core technologies like HTML, CSS, and
          JavaScript. Over time, I developed the ability to think analytically,
          optimize solutions, and approach complex challenges with clarity and
          efficiency. Combining this logical mindset with a passion for design
          and interaction, I now focus on creating modern, high-performance web
          applications and immersive user experiences, including animations and
          3D interfaces. My goal is to build solutions that are not only
          technically robust but also engaging, intuitive, and impactful.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[7000].x + (isMobile ? -2 : -6), points[7000].y  + (isMobile ? 2 : 0), points[7000].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          My Skills
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[7500].x + (isMobile ? -1 : 6), points[7500].y  + (isMobile ? 4 : 0), points[7500].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          Frontend
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.1}
          fontSize={0.22}
          maxWidth={3}
        >
          HTML, CSS, JavaScript,{"\n"}
          React, Next.js,{"\n"}
          and interactive 3D experiences{"\n"}
          with Three.js.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[8000].x + (isMobile ? -1 : 6), points[8000].y  + (isMobile ? 4 : 0), points[8000].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          Backend
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.1}
          fontSize={0.22}
          maxWidth={3}
        >
          Node.js, Express, APIs,{"\n"}
          MongoDB & SQL databases,{"\n"}
          building scalable and{"\n"}
          efficient backend systems.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[8500].x + (isMobile ? -2 : -6), points[8500].y  + (isMobile ? 4 : 0), points[8500].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          Competitive Programming
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          position-y={-1.6}
          fontSize={0.22}
          maxWidth={3}
        >
          Data Structures & Algorithms,{"\n"}
          strong problem-solving skills,{"\n"}
          and experience solving{"\n"}
          complex coding challenges.
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[9000].x + (isMobile ? -2 : -6), points[9000].y  + (isMobile ? 2 : 0), points[9000].z]}>
        <Text
          color="white"
          anchorX={"left"}
          anchorY={"middle"}
          fontSize={0.66}
          maxWidth={5}
          lineHeight={"1"}
        >
          My Projects
          <meshStandardMaterial
            color={"white"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[9500].x + (isMobile ? -2 : -6), points[9500].y  + (isMobile ? 6 : 0), points[9500].z]}>
        {/* Title */}
        <Text
          color="white"
          anchorX="left"
          anchorY="middle"
          fontSize={0.6}
          maxWidth={5}
        >
          3D Portfolio
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        {/* Image */}
        <mesh
          position={[1.5, -1.5, 0]}
          onClick={() => window.open("https://example.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <planeGeometry args={[2.5, 1.5]} />
          <meshStandardMaterial
            map={texture}
            transparent
            depthWrite={false}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </mesh>

        {/* Description */}
        <Text
          color="white"
          anchorX="left"
          anchorY="top"
          position={[0, -2.5, 0]}
          fontSize={0.22}
          maxWidth={3}
        >
          An immersive 3D portfolio{"\n"}
          built with React Three Fiber{"\n"}
          and custom shaders.
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
          <Text
            color="white"
            anchorX="left"
            anchorY="top"
            position={[0, -1, 0]}
            fontSize={0.2}
            maxWidth={3}
          >
            Stack Used:{"\n"}
            React, Next.js,{"\n"}
            Three.js, R3F, GLSL
            <meshStandardMaterial
              color="white"
              onBeforeCompile={fadeOnBeforeCompileFlat}
            />
          </Text>
        </Text>
      </group>

      <group position={[points[10000].x + (isMobile ? -2 : -6), points[10000].y + (isMobile ? 6 : 0), points[10000].z]}>
        {/* Title */}
        <Text
          color="white"
          anchorX="left"
          anchorY="middle"
          fontSize={0.6}
          maxWidth={5}
        >
          3D Portfolio
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        {/* Image */}
        <mesh
          position={[1.5, -1.5, 0]}
          onClick={() => window.open("https://example.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <planeGeometry args={[2.5, 1.5]} />
          <meshStandardMaterial
            map={texture}
            transparent
            depthWrite={false}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </mesh>

        {/* Description */}
        <Text
          color="white"
          anchorX="left"
          anchorY="top"
          position={[0, -2.5, 0]}
          fontSize={0.22}
          maxWidth={3}
        >
          An immersive 3D portfolio{"\n"}
          built with React Three Fiber{"\n"}
          and custom shaders.
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
          <Text
            color="white"
            anchorX="left"
            anchorY="top"
            position={[0, -1, 0]}
            fontSize={0.2}
            maxWidth={3}
          >
            Stack Used:{"\n"}
            React, Next.js,{"\n"}
            Three.js, R3F, GLSL
            <meshStandardMaterial
              color="white"
              onBeforeCompile={fadeOnBeforeCompileFlat}
            />
          </Text>
        </Text>
      </group>

      <group position={[points[10500].x + (isMobile ? -2 : -6), points[10500].y + (isMobile ? 6 : 0), points[10500].z]}>
        {/* Title */}
        <Text
          color="white"
          anchorX="left"
          anchorY="middle"
          fontSize={0.6}
          maxWidth={5}
        >
          3D Portfolio
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        {/* Image */}
        <mesh
          position={[1.5, -1.5, 0]}
          onClick={() => window.open("https://example.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <planeGeometry args={[2.5, 1.5]} />
          <meshStandardMaterial
            map={texture}
            transparent
            depthWrite={false}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </mesh>

        {/* Description */}
        <Text
          color="white"
          anchorX="left"
          anchorY="top"
          position={[0, -2.5, 0]}
          fontSize={0.22}
          maxWidth={3}
        >
          An immersive 3D portfolio{"\n"}
          built with React Three Fiber{"\n"}
          and custom shaders.
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
          <Text
            color="white"
            anchorX="left"
            anchorY="top"
            position={[0, -1, 0]}
            fontSize={0.2}
            maxWidth={3}
          >
            Stack Used:{"\n"}
            React, Next.js,{"\n"}
            Three.js, R3F, GLSL
            <meshStandardMaterial
              color="white"
              onBeforeCompile={fadeOnBeforeCompileFlat}
            />
          </Text>
        </Text>
      </group>

      <group position={[points[11000].x + (isMobile ? -2 : -6), points[11000].y + (isMobile ? 6 : 0), points[11000].z]}>
        {/* Title */}
        <Text
          color="white"
          anchorX="left"
          anchorY="middle"
          fontSize={0.6}
          maxWidth={5}
        >
          3D Portfolio
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        {/* Image */}
        <mesh
          position={[1.5, -1.5, 0]}
          onClick={() => window.open("https://example.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <planeGeometry args={[2.5, 1.5]} />
          <meshStandardMaterial
            map={texture}
            transparent
            depthWrite={false}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </mesh>

        {/* Description */}
        <Text
          color="white"
          anchorX="left"
          anchorY="top"
          position={[0, -2.5, 0]}
          fontSize={0.22}
          maxWidth={3}
        >
          An immersive 3D portfolio{"\n"}
          built with React Three Fiber{"\n"}
          and custom shaders.
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
          <Text
            color="white"
            anchorX="left"
            anchorY="top"
            position={[0, -1, 0]}
            fontSize={0.2}
            maxWidth={3}
          >
            Stack Used:{"\n"}
            React, Next.js,{"\n"}
            Three.js, R3F, GLSL
            <meshStandardMaterial
              color="white"
              onBeforeCompile={fadeOnBeforeCompileFlat}
            />
          </Text>
        </Text>
      </group>

      <group position={[points[11500].x + (isMobile ? -2 : -6), points[11500].y + (isMobile ? 4 : 0), points[11500].z]}>
        {/* Title */}
        <Text
          color="white"
          anchorX="left"
          anchorY="middle"
          fontSize={0.6}
          maxWidth={5}
        >
          Contact
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        {/* Description */}
        <Text
          color="white"
          anchorX="left"
          anchorY="top"
          position={[0, -0.5, 0]}
          fontSize={0.22}
          maxWidth={3}
          onClick={() => window.open("https://example.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Instagram
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        <Text
          color="white"
          anchorX="left"
          anchorY="top"
          position={[0, -0.8, 0]}
          fontSize={0.22}
          maxWidth={3}
          onClick={() => window.open("https://example.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Phone : +91 9871409724
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        <Text
          color="white"
          anchorX="left"
          anchorY="top"
          position={[0, -1.1, 0]}
          fontSize={0.22}
          maxWidth={3}
          onClick={() => window.open("https://example.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Discord
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        <Text
          color="white"
          anchorX="left"
          anchorY="top"
          position={[0, -1.4, 0]}
          fontSize={0.22}
          maxWidth={3}
          onClick={() => window.open("https://example.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Email
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        <Text
          color="white"
          anchorX="left"
          anchorY="top"
          position={[0, -1.7, 0]}
          fontSize={0.22}
          maxWidth={3}
          onClick={() => window.open("https://example.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          Linked In
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>

        <Text
          color="white"
          anchorX="left"
          anchorY="top"
          position={[0, -2, 0]}
          fontSize={0.22}
          maxWidth={3}
          onClick={() => window.open("https://example.com", "_blank")}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          GitHub
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>

      <group position={[points[12000].x + (isMobile ? -2 : -6), points[12000].y + (isMobile ? 4 : 0) , points[12000].z]}>
        {/* Title */}
        <Text
          color="white"
          anchorX="left"
          anchorY="middle"
          fontSize={0.6}
          maxWidth={5}
        >
          Thank You For Visiting {"\n"}
          Have a Good Day
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      </group>
      <Cloud />
      <HotAirBalloon />

      {/* <Clouds material={THREE.MeshStandardMaterial}>
        <Cloud
          position={[0, 0, -900]}
          scale={[3, 3, 3]}
          opacity={0.5}
          speed={0.2}
          segments={20}
        />

        <Cloud
          position={[6, 1, -50]}
          scale={[4, 4, 4]}
          opacity={0.4}
          speed={0.1}
        />

        <Cloud position={[-2, -1, -6]} scale={[3, 3, 3]} opacity={0.3} />
      </Clouds> */}
    </>
  );
};

export default Experience;
