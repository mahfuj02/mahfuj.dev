"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type ViewerProps = {
  className?: string;
};

function IphoneModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/iphone.glb");

  const normalizedScene = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const targetSize = 2.6;
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDimension > 0 ? targetSize / maxDimension : 1;

    cloned.position.sub(center);
    cloned.scale.setScalar(scaleFactor);

    return cloned;
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }
    groupRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={groupRef} rotation={[-0.24, 0.24, -0.12]} position={[0, -0.02, 0]}>
      <primitive object={normalizedScene} />
    </group>
  );
}

export function IphoneModelViewer({ className }: ViewerProps) {
  return (
    <div className={className} style={{ background: "transparent" }}>
      <Canvas
        camera={{ position: [0, 0.14, 6.25], fov: 30 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 4, 3]} intensity={1.4} />
        <directionalLight position={[-3, 2, -4]} intensity={0.6} />
        <Suspense fallback={null}>
          <IphoneModel />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/iphone.glb");
