
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const VIEW_COLORS = {
  gallery: '#e4c28f',
  projects: '#a9d6b7',
  experience: '#11d4e6',
  home: '#d2b5ff',
};

function CameraBody({ activeView, onViewChange }) {
  const cameraRef = useRef(null);
  const lensRef = useRef(null);
  const [entryFinished, setEntryFinished] = useState(false);
  const startTime = useRef(null);

  const screenColor = VIEW_COLORS[activeView] || VIEW_COLORS.gallery;

  useFrame((state) => {
    if (!cameraRef.current || entryFinished) return;

    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;
    const duration = 2.5;
    const progress = Math.min(elapsed / duration, 1);
    const eased = progress * progress * (3 - 2 * progress);

    cameraRef.current.rotation.y = -Math.PI + eased * Math.PI * 2;
    cameraRef.current.rotation.x =
      progress < 1 ? Math.sin(elapsed * 2) * 0.035 : 0;

    // Slightly move the lens during the entrance animation.
    if (lensRef.current) {
      lensRef.current.position.z = 0.91 + Math.sin(elapsed * 3) * 0.025;
    }

    if (progress >= 1) {
      cameraRef.current.rotation.set(0, Math.PI, 0);
      if (lensRef.current) lensRef.current.position.z = 0.91;
      setEntryFinished(true);
    }
  });

  const lensRings = [
    { radius: 0.78, depth: 0.16, z: 0.76, color: '#151820' },
    { radius: 0.69, depth: 0.13, z: 0.86, color: '#555d68' },
    { radius: 0.59, depth: 0.12, z: 0.95, color: '#202630' },
    { radius: 0.49, depth: 0.13, z: 1.02, color: '#10141c' },
  ];

  return (
    <group ref={cameraRef} position={[0, 0, 0]}>
      {/* Main camera body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.7, 2.25, 1.15]} />
        <meshStandardMaterial
          color="#292d34"
          metalness={0.72}
          roughness={0.3}
        />
      </mesh>

      {/* Top ridge */}
      <mesh position={[0, 1.19, 0.02]} castShadow>
        <boxGeometry args={[3.35, 0.16, 0.95]} />
        <meshStandardMaterial
          color="#424750"
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

      {/* Camera grip */}
      <mesh position={[-1.42, -0.02, 0.12]} castShadow>
        <boxGeometry args={[0.55, 1.85, 1.12]} />
        <meshStandardMaterial color="#171a20" roughness={0.8} />
      </mesh>

      {/* Lens mount */}
      <mesh position={[-0.35, 0, 0.62]} castShadow>
        <cylinderGeometry args={[0.88, 0.88, 0.22, 64]} />
        <meshStandardMaterial
          color="#747b84"
          metalness={0.9}
          roughness={0.22}
        />
      </mesh>

      {/* Lens assembly */}
      <group ref={lensRef} position={[-0.35, 0, 0.91]}>
        {lensRings.map((ring, index) => (
          <mesh
            key={index}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, ring.z - 0.91]}
            castShadow
          >
            <cylinderGeometry
              args={[ring.radius, ring.radius * 0.96, ring.depth, 64]}
            />
            <meshStandardMaterial
              color={ring.color}
              metalness={0.88}
              roughness={0.2}
            />
          </mesh>
        ))}

        {/* Front glass */}
        <mesh position={[0, 0, 0.23]}>
          <circleGeometry args={[0.43, 64]} />
          <meshPhysicalMaterial
            color="#152e40"
            metalness={0.7}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Lens reflection */}
        <mesh position={[-0.12, 0.14, 0.235]}>
          <circleGeometry args={[0.13, 32]} />
          <meshBasicMaterial
            color="#9de7ff"
            transparent
            opacity={0.42}
          />
        </mesh>
      </group>

      {/* Top shutter dial */}
      <mesh position={[-1.05, 1.3, 0.08]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.15, 48]} />
        <meshStandardMaterial
          color="#a6a9ad"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Dial center */}
      <mesh position={[-1.05, 1.39, 0.08]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 48]} />
        <meshStandardMaterial color="#292d34" metalness={0.7} />
      </mesh>

      {/* Viewfinder */}
      <mesh position={[-0.85, 0.82, 0.28]} castShadow>
        <boxGeometry args={[0.65, 0.36, 0.45]} />
        <meshStandardMaterial color="#101319" metalness={0.6} />
      </mesh>

      {/* LCD frame */}
      <mesh position={[1.12, 0.12, 0.61]}>
        <boxGeometry args={[1.05, 1.18, 0.09]} />
        <meshStandardMaterial color="#101319" metalness={0.6} />
      </mesh>

      {/* LCD display */}
      <mesh
        position={[1.12, 0.12, 0.665]}
        onClick={(event) => {
          event.stopPropagation();
          onViewChange?.('gallery');
        }}
      >
        <planeGeometry args={[0.89, 0.98]} />
        <meshBasicMaterial color={screenColor} />
      </mesh>

      {/* LCD inner display */}
      <mesh position={[1.12, 0.12, 0.67]}>
        <planeGeometry args={[0.77, 0.85]} />
        <meshBasicMaterial color="#111923" />
      </mesh>

      {/* LCD status indicator */}
      <mesh position={[0.91, 0.43, 0.68]}>
        <circleGeometry args={[0.045, 24]} />
        <meshBasicMaterial color={screenColor} />
      </mesh>

      {/* LCD status bars */}
      {[0, 1, 2].map((index) => (
        <mesh
          key={index}
          position={[1.1, 0.23 - index * 0.16, 0.68]}
        >
          <planeGeometry args={[0.42 - index * 0.06, 0.035]} />
          <meshBasicMaterial color={screenColor} />
        </mesh>
      ))}

      {/* Bottom accent strip */}
      <mesh position={[0, -1.08, 0.59]}>
        <boxGeometry args={[2.4, 0.035, 0.025]} />
        <meshBasicMaterial color="#b6a17d" />
      </mesh>

      {/* Small front buttons */}
      {[-0.95, -0.58, -0.21].map((x) => (
        <mesh key={x} position={[x, -0.82, 0.6]}>
          <cylinderGeometry args={[0.075, 0.075, 0.06, 24]} />
          <meshStandardMaterial
            color="#a3a8b0"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* Clickable LCD navigation zones */}
      {['gallery', 'projects', 'experience'].map((tab, index) => (
        <mesh
          key={tab}
          position={[1.12, 0.22 - index * 0.23, 0.685]}
          onClick={(event) => {
            event.stopPropagation();
            onViewChange?.(tab);
          }}
        >
          <planeGeometry args={[0.72, 0.13]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export function Camera3DScene({
  activeView = 'gallery',
  lcdContent = true,
  onViewChange,
  sections = [],
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '300px',
        background:
          'radial-gradient(ellipse at center, #202633 0%, #0b0d13 58%, #050508 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050508', 1);
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[4, 5, 7]}
          intensity={3}
          color="#fff0d8"
        />

        <pointLight
          position={[-4, 1, 4]}
          intensity={65}
          color="#65bfff"
          distance={12}
        />

        <pointLight
          position={[3, -3, 2]}
          intensity={35}
          color="#e4c28f"
          distance={10}
        />

        <CameraBody
          activeView={activeView}
          onViewChange={onViewChange}
        />

        {/* Ground shadow / visual anchor */}
        <mesh
          position={[0, -1.65, -0.7]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[2.2, 64]} />
          <meshBasicMaterial color="#151a24" transparent opacity={0.8} />
        </mesh>
      </Canvas>

      {/* Screen label overlay */}
      {lcdContent && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(65px, -15px)',
            color: VIEW_COLORS[activeView] || VIEW_COLORS.gallery,
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '1px',
            pointerEvents: 'none',
            textTransform: 'uppercase',
          }}
        >
          {activeView}
        </div>
      )}
    </div>
  );
}

export default Camera3DScene;
