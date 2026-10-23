import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

/**
 * CameraModel - A realistic DSLR camera built from Three.js primitives.
 * Each part is a separate group for independent animation.
 * 
 * NOTE: When a real glTF model is available, replace this component with:
 *   const { nodes, materials } = useGLTF('/models/camera.glb');
 *   return <group>nodes here</group>;
 */
export const CameraModel = React.forwardRef(({ 
  assemblyProgress = 0,
  rotationY = 0,
  partVisibility = {}
}, ref) => {
  const groupRef = useRef(ref);
  
  // Camera dimensions (in Three.js units)
  const bodyW = 1.4, bodyH = 0.9, bodyD = 0.7;
  const lensR = 0.28, lensH = 0.5;
  const gripW = 0.35, gripH = 0.7, gripD = 0.45;
  const viewfinderW = 0.5, viewfinderH = 0.2, viewfinderD = 0.35;
  const flashW = 0.6, flashH = 0.12, flashD = 0.25;
  const lcdW = 1.1, lcdH = 0.75;
  const topPlateH = 0.06;
  const dial1R = 0.12, dial1H = 0.06;
  const dial2R = 0.08, dial2H = 0.04;
  const shutterR = 0.05, shutterH = 0.03;
  const strapLoopR = 0.04;
  
  // Assembly offsets (where each part starts before assembly)
  const partOffsets = useMemo(() => ({
    body: { pos: [0, -1.5, -2], rot: [0.5, 0.3, 0] },
    lens: { pos: [0, 1.2, 1.5], rot: [0, -0.5, 0.3] },
    grip: { pos: [-1.5, -0.5, 1], rot: [0.3, 0, -0.5] },
    viewfinder: { pos: [1.5, 1.5, -1], rot: [0, 0.5, 0] },
    flash: { pos: [-1.2, 1.8, 0.5], rot: [0.4, 0, 0.2] },
    lcd: { pos: [0, -2, 2], rot: [0.5, 0, 0] },
    topPlate: { pos: [1.8, 0, -1.5], rot: [0, 0.3, 0.5] },
    dial1: { pos: [-1.8, 1.5, 1], rot: [0.3, 0, 0.8] },
    dial2: { pos: [1.5, -1.2, -1.5], rot: [0, 0.5, 0.3] },
    shutter: { pos: [0, 2, -1.8], rot: [0.5, 0.2, 0] },
    strapLoopL: { pos: [-2, 0, 0], rot: [0, 0, 0] },
    strapLoopR: { pos: [2, 0, 0], rot: [0, 0, 0] },
    sensor: { pos: [0, 0, 3], rot: [0, 0, 0] },
  }), []);

  // Interpolate part position based on assembly progress
  const getPartTransform = (partName, progress) => {
    const offset = partOffsets[partName];
    if (!offset) return { position: [0, 0, 0], rotation: [0, 0, 0] };
    
    // Ease function for smooth assembly
    const eased = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    return {
      position: [
        offset.pos[0] * (1 - eased),
        offset.pos[1] * (1 - eased),
        offset.pos[2] * (1 - eased),
      ],
      rotation: [
        offset.rot[0] * (1 - eased),
        offset.rot[1] * (1 - eased),
        offset.rot[2] * (1 - eased),
      ],
    };
  };

  // Materials
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.6,
    metalness: 0.1,
  }), []);

  const silverMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#c0c0c0',
    roughness: 0.2,
    metalness: 0.9,
  }), []);

  const lensMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 0.3,
    metalness: 0.2,
  }), []);

  const lensGlassMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a2a4a',
    roughness: 0.05,
    metalness: 0.1,
    emissive: '#0a1a3a',
    emissiveIntensity: 0.3,
  }), []);

  const gripMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.9,
    metalness: 0.0,
  }), []);

  const lcdMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#000000',
    roughness: 0.1,
    metalness: 0.3,
    emissive: '#1a2a4a',
    emissiveIntensity: 0.1,
  }), []);

  const flashMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#f0f0e0',
    roughness: 0.4,
    metalness: 0.1,
    emissive: '#fffff0',
    emissiveIntensity: 0.05,
  }), []);

  const sensorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a1a',
    roughness: 0.1,
    metalness: 0.8,
    emissive: '#1a1a3a',
    emissiveIntensity: 0.2,
  }), []);

  const strapMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 0.8,
    metalness: 0.0,
  }), []);

  const buttonMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    roughness: 0.4,
    metalness: 0.3,
  }), []);

  // Texture for grip (bumpy pattern)
  const gripTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 128, 128);
    // Add bump pattern
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      ctx.fillStyle = `rgba(40, 40, 40, ${Math.random() * 0.3})`;
      ctx.fillRect(x, y, 2, 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    return texture;
  }, []);

  return (
    <group ref={groupRef} rotation={[0, rotationY, 0]}>
      {/* Body */}
      {(() => {
        const t = getPartTransform('body', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Main body */}
            <mesh material={bodyMaterial} castShadow receiveShadow>
              <boxGeometry args={[bodyW, bodyH, bodyD]} />
            </mesh>
            {/* Body texture overlay */}
            <mesh material={gripMaterial} position={[0, 0, bodyD / 2 + 0.001]}>
              <boxGeometry args={[bodyW * 0.6, bodyH * 0.8, 0.01]} />
            </mesh>
          </group>
        );
      })()}

      {/* Lens */}
      {(() => {
        const t = getPartTransform('lens', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Lens barrel */}
            <mesh material={lensMaterial} castShadow>
              <cylinderGeometry args={[lensR, lensR * 1.1, lensH, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Lens front ring */}
            <mesh material={silverMaterial} position={[lensH / 2 + 0.01, 0, 0]}>
              <torusGeometry args={[lensR * 1.05, 0.02, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Lens glass */}
            <mesh material={lensGlassMaterial} position={[lensH / 2 + 0.02, 0, 0]}>
              <circleGeometry args={[lensR * 0.85, 32]} />
            </mesh>
            {/* Lens inner ring */}
            <mesh material={lensMaterial} position={[lensH / 4, 0, 0]}>
              <torusGeometry args={[lensR * 0.9, 0.015, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
          </group>
        );
      })()}

      {/* Grip */}
      {(() => {
        const t = getPartTransform('grip', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            <mesh material={gripMaterial} castShadow>
              <boxGeometry args={[gripW, gripH, gripD]} />
            </mesh>
          </group>
        );
      })()}

      {/* Viewfinder hump */}
      {(() => {
        const t = getPartTransform('viewfinder', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            <mesh material={bodyMaterial} castShadow>
              <boxGeometry args={[viewfinderW, viewfinderH, viewfinderD]} />
            </mesh>
            {/* Eyepiece */}
            <mesh material={buttonMaterial} position={[0, 0, viewfinderD / 2 + 0.01]}>
              <circleGeometry args={[0.08, 16]} />
            </mesh>
          </group>
        );
      })()}

      {/* Flash unit */}
      {(() => {
        const t = getPartTransform('flash', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            <mesh material={flashMaterial} castShadow>
              <boxGeometry args={[flashW, flashH, flashD]} />
            </mesh>
          </group>
        );
      })()}

      {/* LCD Screen (rear) */}
      {(() => {
        const t = getPartTransform('lcd', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* LCD bezel */}
            <mesh material={bodyMaterial}>
              <boxGeometry args={[lcdW + 0.08, lcdH + 0.08, 0.04]} />
            </mesh>
            {/* LCD screen */}
            <mesh material={lcdMaterial} position={[0, 0, 0.025]}>
              <boxGeometry args={[lcdW, lcdH, 0.01]} />
            </mesh>
            {/* Screen content glow */}
            <mesh material={new THREE.MeshStandardMaterial({
              color: '#0a1a3a',
              emissive: '#1a3a6a',
              emissiveIntensity: 0.5,
              transparent: true,
              opacity: 0.3,
            })} position={[0, 0, 0.04]}>
              <planeGeometry args={[lcdW * 0.9, lcdH * 0.85]} />
            </mesh>
          </group>
        );
      })()}

      {/* Top plate (silver) */}
      {(() => {
        const t = getPartTransform('topPlate', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            <mesh material={silverMaterial} castShadow>
              <boxGeometry args={[bodyW * 0.9, topPlateH, bodyD * 0.9]} />
            </mesh>
          </group>
        );
      })()}

      {/* Mode dial */}
      {(() => {
        const t = getPartTransform('dial1', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            <mesh material={silverMaterial} castShadow>
              <cylinderGeometry args={[dial1R, dial1R, dial1H, 24]} />
            </mesh>
            {/* Dial grip lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <mesh key={i} material={buttonMaterial} position={[
                Math.cos((i * Math.PI * 2) / 12) * (dial1R - 0.005),
                0,
                Math.sin((i * Math.PI * 2) / 12) * (dial1R - 0.005),
              ]}>
                <boxGeometry args={[0.01, dial1H + 0.01, 0.01]} />
              </mesh>
            ))}
          </group>
        );
      })()}

      {/* Command dial */}
      {(() => {
        const t = getPartTransform('dial2', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            <mesh material={silverMaterial} castShadow>
              <cylinderGeometry args={[dial2R, dial2R, dial2H, 24]} />
            </mesh>
          </group>
        );
      })()}

      {/* Shutter button */}
      {(() => {
        const t = getPartTransform('shutter', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            <mesh material={buttonMaterial} castShadow>
              <cylinderGeometry args={[shutterR, shutterR, shutterH, 16]} />
            </mesh>
          </group>
        );
      })()}

      {/* Strap loops */}
      {(() => {
        const tL = getPartTransform('strapLoopL', assemblyProgress);
        const tR = getPartTransform('strapLoopR', assemblyProgress);
        return (
          <>
            <group position={tL.position} rotation={tL.rotation}>
              <mesh material={silverMaterial}>
                <torusGeometry args={[strapLoopR, 0.015, 8, 16]} />
              </mesh>
            </group>
            <group position={tR.position} rotation={tR.rotation}>
              <mesh material={silverMaterial}>
                <torusGeometry args={[strapLoopR, 0.015, 8, 16]} />
              </mesh>
            </group>
          </>
        );
      })()}

      {/* Sensor (visible during assembly) */}
      {(() => {
        const t = getPartTransform('sensor', assemblyProgress);
        const sensorVisible = assemblyProgress > 0.3 && assemblyProgress < 0.8;
        if (!sensorVisible) return null;
        return (
          <group position={t.position} rotation={t.rotation}>
            <mesh material={sensorMaterial}>
              <planeGeometry args={[bodyW * 0.6, bodyH * 0.5]} />
            </mesh>
          </group>
        );
      })()}
    </group>
  );
});

CameraModel.displayName = 'CameraModel';

// Pre-load glTF if model is available
try {
  useGLTF.preload('/models/camera.glb');
} catch (e) {
  // Model not yet available, using primitive fallback
}
