import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

/**
 * CameraModel - A realistic DSLR camera built from Three.js primitives.
 * Each part is a separate group for independent assembly animation.
 */
export const CameraModel = React.forwardRef(({ 
  assemblyProgress = 0,
  rotationY = 0,
}, ref) => {
  const groupRef = useRef(ref);
  
  // Realistic DSLR proportions (Canon 5D style)
  const bodyW = 1.53, bodyH = 1.04, bodyD = 0.78;
  const lensR = 0.32, lensH = 0.65;
  const gripW = 0.42, gripH = 0.78, gripD = 0.52;
  const viewfinderW = 0.55, viewfinderH = 0.22, viewfinderD = 0.38;
  const flashW = 0.65, flashH = 0.14, flashD = 0.28;
  const lcdW = 1.22, lcdH = 0.82;
  const topPlateH = 0.08;
  const dial1R = 0.14, dial1H = 0.07;
  const dial2R = 0.09, dial2H = 0.05;
  const shutterR = 0.055, shutterH = 0.035;

  // Assembly offsets: { scatteredPos, targetPos } for each part
  // All targets are absolute world positions where each part should assemble
  const partOffsets = useMemo(() => ({
    body: {
      pos: [0, -3.0, -4.0],
      target: [0, 0, 0],
      rot: [0.8, 0.5, 0.3],
      targetRot: [0, 0, 0],
    },
    lens: {
      pos: [0, 2.5, 5.0],
      target: [0, 0, bodyD / 2 + lensH / 2],
      rot: [0, -0.6, 0.4],
      targetRot: [0, 0, 0],
    },
    grip: {
      pos: [-2.5, -1.2, 2.0],
      target: [-bodyW / 4, -bodyH / 2 - gripH / 2, bodyD / 2 + gripD / 2],
      rot: [0.4, 0, -0.6],
      targetRot: [0, 0, 0],
    },
    viewfinder: {
      pos: [2.5, 3.0, -2.0],
      target: [0, bodyH / 2 + viewfinderH / 2, -bodyD / 2 + viewfinderD / 2],
      rot: [0, 0.7, 0],
      targetRot: [0, 0, 0],
    },
    flash: {
      pos: [-2.0, 3.0, 1.5],
      target: [0, bodyH / 2 + flashH / 2, -bodyD / 2 + flashD / 2],
      rot: [0.5, 0, 0.3],
      targetRot: [0, 0, 0],
    },
    lcd: {
      pos: [0, -3.5, 4.5],
      target: [0, 0, -(bodyD / 2 + 0.03)],
      rot: [0.6, 0, 0],
      targetRot: [0, 0, 0],
    },
    topPlate: {
      pos: [3.0, 1.0, -2.5],
      target: [0, bodyH / 2 + topPlateH / 2, 0],
      rot: [0, 0.4, 0.6],
      targetRot: [0, 0, 0],
    },
    dial1: {
      pos: [-3.0, 2.5, 2.0],
      target: [-bodyW / 3, bodyH / 2 + dial1H / 2, -bodyD / 3],
      rot: [0.4, 0, 0.9],
      targetRot: [0, 0, 0],
    },
    dial2: {
      pos: [2.8, -1.8, -2.5],
      target: [bodyW / 3, bodyH / 2 + dial2H / 2, -bodyD / 3],
      rot: [0, 0.6, 0.4],
      targetRot: [0, 0, 0],
    },
    shutter: {
      pos: [0, 3.5, -3.0],
      target: [bodyW / 3 - 0.05, bodyH / 2 + shutterH / 2, -bodyD / 3],
      rot: [0.6, 0.3, 0],
      targetRot: [0, 0, 0],
    },
    strapLoopL: {
      pos: [-3.0, 0, 0],
      target: [-bodyW / 2 - 0.05, 0, 0],
      rot: [0, 0, 0],
      targetRot: [0, 0, 0],
    },
    strapLoopR: {
      pos: [3.0, 0, 0],
      target: [bodyW / 2 + 0.05, 0, 0],
      rot: [0, 0, 0],
      targetRot: [0, 0, 0],
    },
    sensor: {
      pos: [0, 0, 5.0],
      target: [0, 0, -bodyD / 2 + 0.05],
      rot: [0, 0, 0],
      targetRot: [0, 0, 0],
    },
  }), [bodyW, bodyH, bodyD, lensH, gripH, gripD, viewfinderH, viewfinderD, flashH, flashD, topPlateH, dial1H, dial2H, shutterR]);

  // Smooth easing function
  const getPartTransform = (partName, progress) => {
    const offset = partOffsets[partName];
    if (!offset) return { position: [0, 0, 0], rotation: [0, 0, 0] };
    
    const eased = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    return {
      position: [
        THREE.MathUtils.lerp(offset.pos[0], offset.target[0], eased),
        THREE.MathUtils.lerp(offset.pos[1], offset.target[1], eased),
        THREE.MathUtils.lerp(offset.pos[2], offset.target[2], eased),
      ],
      rotation: [
        THREE.MathUtils.lerp(offset.rot[0], offset.targetRot[0], eased),
        THREE.MathUtils.lerp(offset.rot[1], offset.targetRot[1], eased),
        THREE.MathUtils.lerp(offset.rot[2], offset.targetRot[2], eased),
      ],
    };
  };

  // Create leather grip texture
  const gripTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    // Base leather color
    ctx.fillStyle = '#1a1816';
    ctx.fillRect(0, 0, 256, 256);
    // Leather grain pattern
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = Math.random() * 3 + 1;
      const brightness = Math.random() * 30 + 15;
      ctx.fillStyle = `rgb(${brightness + 15}, ${brightness + 10}, ${brightness + 5})`;
      ctx.fillRect(x, y, size, size);
    }
    // Horizontal grip lines
    for (let y = 0; y < 256; y += 8) {
      ctx.strokeStyle = `rgba(40, 35, 30, ${Math.random() * 0.3 + 0.1})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y + Math.random() * 2);
      ctx.lineTo(256, y + Math.random() * 2);
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    return texture;
  }, []);

  // Create normal map for grip texture
  const gripNormalMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#8080ff';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const r = 128 + (Math.random() - 0.5) * 40;
      const g = 128 + (Math.random() - 0.5) * 40;
      ctx.fillStyle = `rgb(${r}, ${g}, 255)`;
      ctx.fillRect(x, y, 2, 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    return texture;
  }, []);

  // Materials
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1c1c1c',
    roughness: 0.55,
    metalness: 0.05,
  }), []);

  const leatherMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1816',
    roughness: 0.9,
    metalness: 0.0,
    map: gripTexture,
    normalMap: gripNormalMap,
    normalScale: new THREE.Vector2(0.3, 0.3),
  }), [gripTexture, gripNormalMap]);

  const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    roughness: 0.4,
    metalness: 0.6,
  }), []);

  const chromeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d8d8d8',
    roughness: 0.15,
    metalness: 1.0,
  }), []);

  const darkChromeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8a8a8a',
    roughness: 0.25,
    metalness: 0.9,
  }), []);

  const lensMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0d0d0d',
    roughness: 0.25,
    metalness: 0.3,
  }), []);

  const lensRubberMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#151515',
    roughness: 0.95,
    metalness: 0.0,
  }), []);

  const lensGlassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#0a1530',
    roughness: 0.02,
    metalness: 0.0,
    transmission: 0.3,
    thickness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.0,
    emissive: '#0a1a3a',
    emissiveIntensity: 0.15,
  }), []);

  const lcdMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#000000',
    roughness: 0.05,
    metalness: 0.2,
  }), []);

  const lcdScreenMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a1a3a',
    emissive: '#1a3a6a',
    emissiveIntensity: 0.2,
    roughness: 0.1,
    metalness: 0.0,
  }), []);

  const sensorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#050510',
    roughness: 0.05,
    metalness: 0.9,
    emissive: '#1a1a3a',
    emissiveIntensity: 0.3,
  }), []);

  const rubberMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#151515',
    roughness: 0.95,
    metalness: 0.0,
  }), []);

  // Rounded box geometry helper
  const RoundedBox = ({ width, height, depth, radius = 0.05, segments = 2 }) => {
    const shape = new THREE.Shape();
    const w = width / 2 - radius;
    const h = height / 2 - radius;
    
    shape.moveTo(-w - radius, -h);
    shape.lineTo(w + radius, -h);
    shape.quadraticCurveTo(w + radius + radius, -h, w + radius, -h + radius);
    shape.lineTo(w + radius, h - radius);
    shape.quadraticCurveTo(w + radius, h + radius, w, h + radius);
    shape.lineTo(-w, h + radius);
    shape.quadraticCurveTo(-w - radius, h + radius, -w - radius, h);
    shape.lineTo(-w - radius, -h + radius);
    shape.quadraticCurveTo(-w - radius, -h, -w, -h);
    
    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelThickness: radius * 0.5,
      bevelSize: radius * 0.5,
      bevelSegments: segments,
    };
    
    return <extrudeGeometry args={[shape, extrudeSettings]} />;
  };

  return (
    <group ref={groupRef} rotation={[0, rotationY, 0]}>
      {/* Body - main camera body with rounded edges */}
      {(() => {
        const t = getPartTransform('body', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Main body */}
            <mesh material={bodyMaterial} castShadow receiveShadow>
              <RoundedBox args={[bodyW, bodyH, bodyD, 0.06, 3]} />
            </mesh>
            {/* Top bevel */}
            <mesh material={metalMaterial} position={[0, bodyH/2 + 0.02, 0]}>
              <boxGeometry args={[bodyW * 0.85, 0.02, bodyD * 0.85]} />
            </mesh>
          </group>
        );
      })()}

      {/* Lens - realistic multi-element lens */}
      {(() => {
        const t = getPartTransform('lens', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Lens mount ring */}
            <mesh material={chromeMaterial} position={[lensH / 2 + 0.01, 0, 0]}>
              <torusGeometry args={[lensR * 0.95, 0.025, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Lens barrel - main tube */}
            <mesh material={lensMaterial} castShadow>
              <cylinderGeometry args={[lensR * 0.95, lensR * 1.05, lensH * 0.7, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Lens barrel - front section */}
            <mesh material={lensMaterial} position={[lensH * 0.35, 0, 0]}>
              <cylinderGeometry args={[lensR * 1.05, lensR * 0.95, lensH * 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Focus ring (rubber) */}
            <mesh material={lensRubberMaterial} position={[lensH * 0.1, 0, 0]}>
              <cylinderGeometry args={[lensR * 1.08, lensR * 1.08, lensH * 0.12, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Zoom ring */}
            <mesh material={lensRubberMaterial} position={[-lensH * 0.15, 0, 0]}>
              <cylinderGeometry args={[lensR * 1.1, lensR * 1.1, lensH * 0.08, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Lens front ring (chrome) */}
            <mesh material={chromeMaterial} position={[lensH / 2 + 0.02, 0, 0]}>
              <torusGeometry args={[lensR * 1.05, 0.02, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Lens glass - front element */}
            <mesh material={lensGlassMaterial} position={[lensH / 2 + 0.03, 0, 0]}>
              <circleGeometry args={[lensR * 0.88, 32]} />
            </mesh>
            {/* Lens glass - inner reflection */}
            <mesh material={new THREE.MeshPhysicalMaterial({
              color: '#1a3a6a',
              roughness: 0.0,
              metalness: 0.1,
              clearcoat: 1.0,
              clearcoatRoughness: 0.0,
              envMapIntensity: 3.0,
            })} position={[lensH / 2 + 0.035, 0, 0]}>
              <circleGeometry args={[lensR * 0.4, 32]} />
            </mesh>
            {/* Lens inner ring */}
            <mesh material={darkChromeMaterial} position={[lensH / 4, 0, 0]}>
              <torusGeometry args={[lensR * 0.85, 0.012, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Lens label ring */}
            <mesh material={chromeMaterial} position={[-lensH * 0.25, 0, 0]}>
              <torusGeometry args={[lensR * 1.08, 0.008, 8, 32]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
          </group>
        );
      })()}

      {/* Grip - textured leather grip */}
      {(() => {
        const t = getPartTransform('grip', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Grip base */}
            <mesh material={leatherMaterial} castShadow>
              <RoundedBox args={[gripW, gripH, gripD, 0.08, 3]} />
            </mesh>
            {/* Grip front rubber strip */}
            <mesh material={rubberMaterial} position={[0, 0, gripD / 2 + 0.001]}>
              <boxGeometry args={[gripW * 0.3, gripH * 0.6, 0.01]} />
            </mesh>
          </group>
        );
      })()}

      {/* Viewfinder hump - prism housing */}
      {(() => {
        const t = getPartTransform('viewfinder', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Main hump body */}
            <mesh material={bodyMaterial} castShadow>
              <RoundedBox args={[viewfinderW, viewfinderH, viewfinderD, 0.04, 2]} />
            </mesh>
            {/* Eyepiece rubber */}
            <mesh material={lensRubberMaterial} position={[0, 0, viewfinderD / 2 + 0.02]}>
              <torusGeometry args={[0.1, 0.025, 12, 24]} />
            </mesh>
            {/* Eyepiece opening */}
            <mesh material={rubberMaterial} position={[0, 0, viewfinderD / 2 + 0.04]}>
              <circleGeometry args={[0.08, 16]} />
            </mesh>
          </group>
        );
      })()}

      {/* Flash unit - hot shoe mount */}
      {(() => {
        const t = getPartTransform('flash', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Hot shoe base */}
            <mesh material={chromeMaterial}>
              <boxGeometry args={[flashW * 0.5, 0.03, flashD * 0.8]} />
            </mesh>
            {/* Flash housing */}
            <mesh material={bodyMaterial}>
              <RoundedBox args={[flashW, flashH, flashD, 0.03, 2]} />
            </mesh>
            {/* Flash glass */}
            <mesh material={new THREE.MeshStandardMaterial({
              color: '#f0f0e0',
              roughness: 0.3,
              metalness: 0.0,
              emissive: '#fffff0',
              emissiveIntensity: 0.05,
              transparent: true,
              opacity: 0.9,
            })} position={[0, 0, flashD / 2 + 0.001]}>
              <boxGeometry args={[flashW * 0.85, flashH * 0.7, 0.01]} />
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
              <RoundedBox args={[lcdW + 0.1, lcdH + 0.1, 0.05, 0.02, 2]} />
            </mesh>
            {/* LCD screen glass */}
            <mesh material={lcdMaterial} position={[0, 0, 0.03]}>
              <RoundedBox args={[lcdW, lcdH, 0.02, 0.01, 2]} />
            </mesh>
            {/* LCD display */}
            <mesh material={lcdScreenMaterial} position={[0, 0, 0.045]}>
              <planeGeometry args={[lcdW * 0.92, lcdH * 0.88]} />
            </mesh>
            {/* Screen bezel */}
            <mesh material={rubberMaterial} position={[0, 0, 0.025]}>
              <boxGeometry args={[lcdW + 0.02, lcdH + 0.02, 0.01]} />
            </mesh>
          </group>
        );
      })()}

      {/* Top plate - silver aluminum */}
      {(() => {
        const t = getPartTransform('topPlate', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Main top plate */}
            <mesh material={chromeMaterial} castShadow>
              <RoundedBox args={[bodyW * 0.92, topPlateH, bodyD * 0.88, 0.02, 2]} />
            </mesh>
            {/* Top plate branding area */}
            <mesh material={darkChromeMaterial} position={[-bodyW * 0.2, 0, 0]}>
              <boxGeometry args={[bodyW * 0.3, 0.005, bodyD * 0.3]} />
            </mesh>
          </group>
        );
      })()}

      {/* Mode dial - program/auto/manual dial */}
      {(() => {
        const t = getPartTransform('dial1', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Dial base */}
            <mesh material={chromeMaterial} castShadow>
              <cylinderGeometry args={[dial1R, dial1R, dial1H, 24]} />
            </mesh>
            {/* Dial grip ring */}
            <mesh material={lensRubberMaterial}>
              <torusGeometry args={[dial1R * 0.9, 0.015, 8, 24]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            {/* Dial grip lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <mesh key={i} material={rubberMaterial} position={[
                Math.cos((i * Math.PI * 2) / 20) * (dial1R - 0.008),
                0,
                Math.sin((i * Math.PI * 2) / 20) * (dial1R - 0.008),
              ]}>
                <boxGeometry args={[0.008, dial1H + 0.005, 0.008]} />
              </mesh>
            ))}
          </group>
        );
      })()}

      {/* Command dial - rear dial */}
      {(() => {
        const t = getPartTransform('dial2', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            <mesh material={chromeMaterial} castShadow>
              <cylinderGeometry args={[dial2R, dial2R, dial2H, 24]} />
            </mesh>
            {/* Command dial grip */}
            <mesh material={lensRubberMaterial}>
              <torusGeometry args={[dial2R * 0.85, 0.012, 8, 20]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
          </group>
        );
      })()}

      {/* Shutter button - with ring */}
      {(() => {
        const t = getPartTransform('shutter', assemblyProgress);
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Shutter button base ring */}
            <mesh material={chromeMaterial}>
              <torusGeometry args={[shutterR * 1.3, 0.01, 12, 24]} />
            </mesh>
            {/* Shutter button */}
            <mesh material={chromeMaterial} castShadow>
              <cylinderGeometry args={[shutterR, shutterR, shutterH, 16]} />
            </mesh>
            {/* Power switch ring */}
            <mesh material={chromeMaterial} position={[shutterR * 1.8, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.06, 16]} />
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
              <mesh material={chromeMaterial}>
                <torusGeometry args={[0.05, 0.012, 8, 16]} />
              </mesh>
            </group>
            <group position={tR.position} rotation={tR.rotation}>
              <mesh material={chromeMaterial}>
                <torusGeometry args={[0.05, 0.012, 8, 16]} />
              </mesh>
            </group>
          </>
        );
      })()}

      {/* Sensor - visible during assembly */}
      {(() => {
        const t = getPartTransform('sensor', assemblyProgress);
        const sensorVisible = assemblyProgress > 0.3 && assemblyProgress < 0.8;
        if (!sensorVisible) return null;
        return (
          <group position={t.position} rotation={t.rotation}>
            {/* Sensor chip */}
            <mesh material={sensorMaterial}>
              <planeGeometry args={[bodyW * 0.55, bodyH * 0.45]} />
            </mesh>
            {/* Sensor glass cover */}
            <mesh material={new THREE.MeshPhysicalMaterial({
              color: '#0a0a2a',
              roughness: 0.0,
              metalness: 0.0,
              transmission: 0.5,
              thickness: 0.05,
              clearcoat: 1.0,
            })} position={[0, 0, 0.01]}>
              <planeGeometry args={[bodyW * 0.55, bodyH * 0.45]} />
            </mesh>
          </group>
        );
      })()}
    </group>
  );
});

CameraModel.displayName = 'CameraModel';

// Pre-load placeholder
try {
  useGLTF.preload('/models/camera.glb');
} catch (e) {
  // Using procedural model
}
