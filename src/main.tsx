import { createRoot } from "react-dom/client";
import React, { Suspense, useRef, type JSX } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Bounds,
  OrbitControls,
  Html,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import "./stylesheet.css";

const MODEL_PATH = "OuterWallGLTF/outer_wall_and_sheath-transformed.gltf";

export function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const gltf = useGLTF(MODEL_PATH);

  // subtle idle motion
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!group.current) return;
    group.current.rotation.y = Math.sin(t * 0.15) * 0.1;
    group.current.position.y = Math.sin(t * 0.25) * 0.05;
  });

  return (
    <group ref={group} {...props} rotation={[-Math.PI / 2, 0, 0]}>
      <primitive object={gltf.scene} castShadow receiveShadow />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

const App = () => (
  <>
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [9.5, 22, -15], fov: 50, near: 0.1, far: 100 }}
    >
      <color attach="background" args={["#0e0a10"]} />
      <fog attach="fog" args={["#0e0a10", 10, 80]} />

      <ambientLight intensity={0.3} />
      <directionalLight
        castShadow
        intensity={1.2}
        position={[5, 8, 5]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-6, -3, -6]} intensity={0.4} />

      <Environment preset="warehouse" />

      <Suspense fallback={<Html center>Loading cell…</Html>}>
        <Bounds fit clip observe margin={1.2}>
          <Model />
        </Bounds>
      </Suspense>

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={4}
        maxDistance={16}
        maxPolarAngle={1.45}
        setPolarAngle={Math.PI / 2.7}
      />
    </Canvas>
  </>
);

createRoot(document.getElementById("root")!).render(<App />);
