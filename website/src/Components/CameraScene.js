import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { CameraModel } from './CameraModel';

/**
 * AnimatedCamera - Controls the camera assembly and rotation animation
 */
function AnimatedCamera({ assemblyProgress, rotationY, cameraPosition }) {
  const groupRef = useRef();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
    }
  });

  return (
    <group ref={groupRef}>
      <CameraModel 
        assemblyProgress={assemblyProgress}
        rotationY={0}
      />
    </group>
  );
}

/**
 * CameraScene - The 3D scene containing the camera
 */
export const CameraScene = ({ 
  assemblyProgress = 0, 
  rotationY = 0,
  cameraPos = [0, 0, 4]
}) => {
  return (
    <div className="camera-canvas-container">
      <Canvas
        camera={{ position: cameraPos, fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Lighting - Studio softbox setup */}
        <ambientLight intensity={0.3} color="#ffffff" />
        
        {/* Key light - front left */}
        <directionalLight
          position={[-3, 3, 3]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* Fill light - front right */}
        <directionalLight
          position={[3, 2, 2]}
          intensity={0.6}
          color="#e8e0d8"
        />
        
        {/* Rim light - back */}
        <directionalLight
          position={[0, 2, -4]}
          intensity={0.8}
          color="#ffffff"
        />
        
        {/* Bottom fill */}
        <directionalLight
          position={[0, -3, 1]}
          intensity={0.2}
          color="#d8d0c8"
        />

        {/* Environment for reflections on silver parts */}
        <Environment
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr"
          background={false}
          blur={0.8}
        />

        {/* The camera */}
        <AnimatedCamera
          assemblyProgress={assemblyProgress}
          rotationY={rotationY}
          cameraPosition={cameraPos}
        />

        {/* Subtle ground reflection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial
            color="#08090b"
            roughness={0.8}
            metalness={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Canvas>
    </div>
  );
};
