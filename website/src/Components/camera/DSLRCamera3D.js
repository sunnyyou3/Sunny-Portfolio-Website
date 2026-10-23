import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ShutterFlash } from '../../components/ShutterFlash/ShutterFlash';

/**
 * Procedural DSLR Camera Model
 * Built entirely with Three.js primitives - no external assets needed.
 * Represents the rear view of a DSLR camera as the hero 3D object.
 */
export function DSLRCamera3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  lcdContent,
}) {
  const cameraRef = useRef();
  const lcdScreenRef = useRef();
  const viewfinderRef = useRef();
  const bodyRef = useRef();
  const gripRef = useRef();
  const dialRefs = useRef({});
  const buttonRefs = useRef({});

  // Shutter flash Easter egg state
  const [isShutterPressed, setIsShutterPressed] = useState(false);

  // Materials - created once and reused.
  const materials = useMemo(
    () => ({
      body: new THREE.MeshStandardMaterial({
        color: 0x1a1a1e,
        roughness: 0.85,
        metalness: 0.15,
        envMapIntensity: 0.3,
      }),

      grip: new THREE.MeshStandardMaterial({
        color: 0x141416,
        roughness: 0.95,
        metalness: 0,
        envMapIntensity: 0.1,
      }),

      viewfinder: new THREE.MeshStandardMaterial({
        color: 0x1e1e22,
        roughness: 0.75,
        metalness: 0.2,
        envMapIntensity: 0.4,
      }),

      eyecup: new THREE.MeshStandardMaterial({
        color: 0x0d0d0f,
        roughness: 0.98,
        metalness: 0,
        envMapIntensity: 0.05,
      }),

      viewfinderGlass: new THREE.MeshPhysicalMaterial({
        color: 0x0a0a0c,
        roughness: 0.1,
        metalness: 0,
        transmission: 0.3,
        thickness: 0.5,
        ior: 1.5,
        envMapIntensity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      }),

      lcdBezel: new THREE.MeshStandardMaterial({
        color: 0x121216,
        roughness: 0.7,
        metalness: 0.1,
        envMapIntensity: 0.3,
      }),

      lcdScreen: new THREE.MeshPhysicalMaterial({
        color: 0x08080c,
        roughness: 0.05,
        metalness: 0,
        transmission: 0.1,
        thickness: 0.3,
        ior: 1.5,
        envMapIntensity: 0.8,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        emissive: 0x000000,
        emissiveIntensity: 0,
      }),

      button: new THREE.MeshStandardMaterial({
        color: 0x252528,
        roughness: 0.6,
        metalness: 0.2,
        envMapIntensity: 0.4,
      }),

      buttonLabel: new THREE.MeshBasicMaterial({
        color: 0xf6f4ef,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      }),

      dial: new THREE.MeshStandardMaterial({
        color: 0x2a2a2e,
        roughness: 0.4,
        metalness: 0.7,
        envMapIntensity: 0.8,
      }),

      dialRidge: new THREE.MeshStandardMaterial({
        color: 0x35353a,
        roughness: 0.3,
        metalness: 0.8,
        envMapIntensity: 0.9,
      }),

      dpad: new THREE.MeshStandardMaterial({
        color: 0x222226,
        roughness: 0.55,
        metalness: 0.3,
        envMapIntensity: 0.5,
      }),

      dpadButton: new THREE.MeshStandardMaterial({
        color: 0x2a2a2e,
        roughness: 0.5,
        metalness: 0.4,
        envMapIntensity: 0.6,
      }),

      lens: new THREE.MeshStandardMaterial({
        color: 0x18181c,
        roughness: 0.35,
        metalness: 0.85,
        envMapIntensity: 1,
      }),

      lensGlass: new THREE.MeshPhysicalMaterial({
        color: 0x0a0a0c,
        roughness: 0.02,
        metalness: 0,
        transmission: 0.95,
        thickness: 2,
        ior: 1.52,
        envMapIntensity: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.01,
      }),

      metalAccent: new THREE.MeshStandardMaterial({
        color: 0x3a3a3e,
        roughness: 0.25,
        metalness: 0.9,
        envMapIntensity: 1.2,
      }),

      rubberCover: new THREE.MeshStandardMaterial({
        color: 0x121214,
        roughness: 0.95,
        metalness: 0,
        envMapIntensity: 0.1,
      }),

      led: new THREE.MeshBasicMaterial({
        color: 0x4caf50,
        transparent: true,
        opacity: 0.9,
      }),
    }),
    []
  );

  // Create geometries once and reuse them.
  const geometries = useMemo(() => {
    // Main body.
    const body = new THREE.BoxGeometry(3.2, 2.2, 1.6, 4, 4, 2);
    const bodyPos = body.attributes.position;

    for (let i = 0; i < bodyPos.count; i++) {
      const x = bodyPos.getX(i);
      const y = bodyPos.getY(i);
      const z = bodyPos.getZ(i);
      const dist = Math.sqrt(x * x + y * y);

      if (dist > 1.3 && Math.abs(z) < 0.7) {
        const factor = 0.92;
        bodyPos.setX(i, x * factor);
        bodyPos.setY(i, y * factor);
      }
    }

    body.computeVertexNormals();

    // Viewfinder.
    const viewfinderHousing = new THREE.BoxGeometry(
      1.8,
      0.7,
      0.9,
      2,
      2,
      2
    );

    const eyecup = new THREE.BoxGeometry(0.7, 0.5, 0.25, 2, 2, 1);
    const eyecupPos = eyecup.attributes.position;

    for (let i = 0; i < eyecupPos.count; i++) {
      const x = eyecupPos.getX(i);
      const y = eyecupPos.getY(i);

      if (Math.abs(x) > 0.25 && Math.abs(y) < 0.15) {
        eyecupPos.setX(i, x * 0.85);
      }
    }

    eyecup.computeVertexNormals();

    const viewfinderGlass = new THREE.BoxGeometry(
      0.55,
      0.38,
      0.05,
      1,
      1,
      1
    );

    const diopter = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 12);

    // LCD screen.
    const lcdBezel = new THREE.BoxGeometry(2, 1.4, 0.15, 2, 2, 1);
    const lcdScreen = new THREE.PlaneGeometry(1.85, 1.25);

    // Grip.
    const grip = new THREE.BoxGeometry(0.8, 1.8, 1.8, 2, 4, 2);
    const gripPos = grip.attributes.position;

    for (let i = 0; i < gripPos.count; i++) {
      const x = gripPos.getX(i);
      const z = gripPos.getZ(i);

      if (x > 0.3) {
        gripPos.setX(i, x + (x - 0.3) * 0.3);
        gripPos.setZ(i, z * 0.9);
      }
    }

    grip.computeVertexNormals();

    // Buttons and dials.
    const buttonSmall = new THREE.BoxGeometry(0.35, 0.2, 0.12);
    const buttonRound = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 16);

    const dial = new THREE.CylinderGeometry(0.28, 0.28, 0.12, 32);
    const dialRidge = new THREE.TorusGeometry(0.26, 0.015, 8, 48);

    const dpadBase = new THREE.CylinderGeometry(0.65, 0.65, 0.08, 32);
    const dpadButton = new THREE.BoxGeometry(0.28, 0.28, 0.1);
    const dpadCenter = new THREE.CylinderGeometry(0.22, 0.22, 0.1, 24);

    // Lens.
    const lensBarrel = new THREE.CylinderGeometry(0.95, 0.95, 0.6, 32);
    const lensGlass = new THREE.CircleGeometry(0.85, 32);

    // Additional details.
    const strapLug = new THREE.BoxGeometry(0.15, 0.35, 0.12);
    const portCover = new THREE.BoxGeometry(0.3, 0.25, 0.08);
    const led = new THREE.SphereGeometry(0.05, 8, 8);
    const screw = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 8);
    const hotShoe = new THREE.BoxGeometry(0.5, 0.15, 0.8, 2, 1, 2);
    const modeDial = new THREE.CylinderGeometry(0.35, 0.35, 0.15, 24);

    return {
      body,
      viewfinderHousing,
      eyecup,
      viewfinderGlass,
      diopter,
      lcdBezel,
      lcdScreen,
      grip,
      buttonSmall,
      buttonRound,
      dial,
      dialRidge,
      dpadBase,
      dpadButton,
      dpadCenter,
      lensBarrel,
      lensGlass,
      strapLug,
      portCover,
      led,
      screw,
      hotShoe,
      modeDial,
    };
  }, []);

  // Subtle idle animation.
  useFrame((state) => {
    if (!cameraRef.current) return;

    const time = state.clock.getElapsedTime();

    cameraRef.current.position.y =
      position[1] + Math.sin(time * 0.7) * 0.02;

    cameraRef.current.position.x =
      position[0] + Math.sin(time * 0.5) * 0.015;

    cameraRef.current.rotation.y =
      rotation[1] + Math.sin(time * 0.3) * 0.005;

    cameraRef.current.rotation.x =
      rotation[0] + Math.sin(time * 0.4) * 0.003;

    // LED pulse.
    if (buttonRefs.current.led) {
      buttonRefs.current.led.material.opacity =
        0.5 + Math.sin(time * 2) * 0.4;
    }

    // LCD glow pulse.
    if (
      lcdScreenRef.current &&
      lcdScreenRef.current.material.emissiveIntensity > 0
    ) {
      lcdScreenRef.current.material.emissiveIntensity =
        0.3 + Math.sin(time * 1.5) * 0.1;
    }
  });

  // Enable or disable LCD glow when content changes.
  useEffect(() => {
    const screen = lcdScreenRef.current;

    if (!screen) return;

    if (lcdContent) {
      screen.material.emissive.set(0x1a2a3a);
      screen.material.emissiveIntensity = 0.4;
      screen.material.color.set(0x0a1a2a);
    } else {
      screen.material.emissive.set(0x000000);
      screen.material.emissiveIntensity = 0;
      screen.material.color.set(0x08080c);
    }
  }, [lcdContent]);

  // Shutter button click handler - triggers screen flash Easter egg
  const handleShutterClick = () => {
    setIsShutterPressed(true);
    // Reset after flash completes (approx 500ms)
    const resetTimer = setTimeout(() => setIsShutterPressed(false), 500);
    return () => clearTimeout(resetTimer);
  };

  return (
    <group
      ref={cameraRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* MAIN BODY */}
      <mesh ref={bodyRef} castShadow receiveShadow>
        <primitive object={geometries.body} attach="geometry" />
        <primitive object={materials.body} attach="material" />
      </mesh>

      {/* Body texture overlay */}
      <mesh position={[0, 0, 0.81]} castShadow receiveShadow>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial
          color={0x1a1a1e}
          roughness={0.9}
          metalness={0.05}
          envMapIntensity={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* VIEWFINDER HOUSING */}
      <group position={[0, 1.25, 0.9]}>
        <mesh ref={viewfinderRef} castShadow receiveShadow>
          <primitive
            object={geometries.viewfinderHousing}
            attach="geometry"
          />
          <primitive object={materials.viewfinder} attach="material" />
        </mesh>

        {/* Eyecup */}
        <mesh position={[0, 0, 0.55]} castShadow receiveShadow>
          <primitive object={geometries.eyecup} attach="geometry" />
          <primitive object={materials.eyecup} attach="material" />
        </mesh>

        {/* Viewfinder glass */}
        <mesh position={[0, 0, 0.7]} castShadow receiveShadow>
          <primitive object={geometries.viewfinderGlass} attach="geometry" />
          <primitive
            object={materials.viewfinderGlass}
            attach="material"
          />
        </mesh>

        {/* Diopter wheel */}
        <mesh
          position={[1, 0, 0.6]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
          receiveShadow
        >
          <primitive object={geometries.diopter} attach="geometry" />
          <primitive object={materials.dial} attach="material" />
        </mesh>

        {/* Diopter ridges */}
        {[0.52, 0.68].map((z) => (
          <mesh
            key={z}
            position={[1, 0, z]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <primitive object={geometries.dialRidge} attach="geometry" />
            <primitive object={materials.dialRidge} attach="material" />
          </mesh>
        ))}

        {/* Viewfinder indicator */}
        <mesh position={[-0.7, 0.15, 0.72]}>
          <primitive object={geometries.led} attach="geometry" />
          <meshBasicMaterial color={0x444444} />
        </mesh>
      </group>

      {/* HOT SHOE */}
      <mesh position={[0, 1.55, -0.1]} castShadow receiveShadow>
        <primitive object={geometries.hotShoe} attach="geometry" />
        <primitive object={materials.metalAccent} attach="material" />
      </mesh>

      {/* LCD SCREEN */}
      <group position={[0, 0, 0.95]}>
        <mesh castShadow receiveShadow>
          <primitive object={geometries.lcdBezel} attach="geometry" />
          <primitive object={materials.lcdBezel} attach="material" />
        </mesh>

        <mesh
          ref={lcdScreenRef}
          position={[0, 0, 0.08]}
          castShadow
          receiveShadow
        >
          <primitive object={geometries.lcdScreen} attach="geometry" />
          <primitive object={materials.lcdScreen} attach="material" />
        </mesh>

        {/* Screen reflection */}
        <mesh position={[0, 0, 0.1]} scale={[0.98, 0.98, 1]}>
          <planeGeometry args={[1.85, 1.25]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.02}
            color={0xffffff}
            roughness={0}
            metalness={0}
            transmission={1}
            clearcoat={1}
            clearcoatRoughness={0}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* RIGHT GRIP */}
      <group position={[1.95, -0.1, 0.3]} ref={gripRef}>
        <mesh castShadow receiveShadow>
          <primitive object={geometries.grip} attach="geometry" />
          <primitive object={materials.grip} attach="material" />
        </mesh>

        <mesh
          position={[0.42, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.8, 1, 1]}
        >
          <planeGeometry args={[1.7, 1.9]} />
          <meshStandardMaterial
            color={0x141416}
            roughness={0.98}
            metalness={0}
            envMapIntensity={0.05}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* LEFT SIDE BUTTONS */}
      <group position={[-1.85, 0, 0.6]}>
        {/* MENU */}
        <mesh
          ref={(el) => {
            buttonRefs.current.menu = el;
          }}
          position={[0, 0.35, 0]}
          castShadow
          receiveShadow
          onClick={handleShutterClick}
        >
          <primitive object={geometries.buttonSmall} attach="geometry" />
          <primitive object={materials.button} attach="material" />
        </mesh>

        <mesh position={[0, 0.35, 0.07]}>
          <planeGeometry args={[0.28, 0.12]} />
          <primitive object={materials.buttonLabel} attach="material" />
        </mesh>

        {/* BACK */}
        <mesh
          ref={(el) => {
            buttonRefs.current.back = el;
          }}
          position={[0, -0.35, 0]}
          castShadow
          receiveShadow
        >
          <primitive object={geometries.buttonSmall} attach="geometry" />
          <primitive object={materials.button} attach="material" />
        </mesh>

        <mesh position={[0, -0.35, 0.07]}>
          <planeGeometry args={[0.28, 0.12]} />
          <primitive object={materials.buttonLabel} attach="material" />
        </mesh>
      </group>

      {/* RIGHT SIDE BUTTONS */}
      <group position={[-1.85, 0, -0.6]}>
        {/* INFO */}
        <mesh
          ref={(el) => {
            buttonRefs.current.info = el;
          }}
          position={[0, 0.35, 0]}
          castShadow
          receiveShadow
        >
          <primitive object={geometries.buttonSmall} attach="geometry" />
          <primitive object={materials.button} attach="material" />
        </mesh>

        <mesh position={[0, 0.35, 0.07]}>
          <planeGeometry args={[0.28, 0.12]} />
          <primitive object={materials.buttonLabel} attach="material" />
        </mesh>

        {/* PLAYBACK */}
        <mesh
          ref={(el) => {
            buttonRefs.current.playback = el;
          }}
          position={[0, -0.35, 0]}
          castShadow
          receiveShadow
        >
          <primitive object={geometries.buttonRound} attach="geometry" />
          <primitive object={materials.button} attach="material" />
        </mesh>

        <mesh
          position={[0, -0.35, 0.07]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.2, 0.2]} />
          <primitive object={materials.buttonLabel} attach="material" />
        </mesh>
      </group>

      {/* CONTROLS AREA */}
      <group position={[-0.6, -0.1, -0.5]}>
        {/* COMMAND DIAL */}
        <group position={[0, 0.75, 0]}>
          <mesh
            ref={(el) => {
              dialRefs.current.main = el;
            }}
            castShadow
            receiveShadow
          >
            <primitive object={geometries.dial} attach="geometry" />
            <primitive object={materials.dial} attach="material" />
          </mesh>

          <mesh castShadow receiveShadow>
            <primitive object={geometries.dialRidge} attach="geometry" />
            <primitive object={materials.dialRidge} attach="material" />
          </mesh>

          <mesh position={[0, 0, 0.06]} castShadow receiveShadow>
            <primitive object={geometries.dialRidge} attach="geometry" />
            <primitive object={materials.dialRidge} attach="material" />
          </mesh>

          <mesh position={[0, 0, 0.12]} castShadow receiveShadow>
            <primitive object={geometries.buttonRound} attach="geometry" />
            <primitive object={materials.dial} attach="material" />
          </mesh>

          <mesh position={[0, -0.55, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.5, 0.15]} />
            <meshBasicMaterial
              color={0xf6f4ef}
              transparent
              opacity={0.3}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* D-PAD */}
        <group position={[0, -0.4, 0]}>
          <mesh castShadow receiveShadow>
            <primitive object={geometries.dpadBase} attach="geometry" />
            <primitive object={materials.dpad} attach="material" />
          </mesh>

          {/* Up, down, left, and right buttons */}
          {[
            { name: 'up', position: [0, 0.42, 0.06] },
            { name: 'down', position: [0, -0.42, 0.06] },
            { name: 'left', position: [-0.42, 0, 0.06] },
            { name: 'right', position: [0.42, 0, 0.06] },
          ].map(({ name, position: buttonPosition }) => (
            <group key={name}>
              <mesh
                ref={(el) => {
                  buttonRefs.current[name] = el;
                }}
                position={buttonPosition}
                castShadow
                receiveShadow
              >
                <primitive
                  object={geometries.dpadButton}
                  attach="geometry"
                />
                <primitive
                  object={materials.dpadButton}
                  attach="material"
                />
              </mesh>

              <mesh
                position={[
                  buttonPosition[0],
                  buttonPosition[1],
                  0.1,
                ]}
              >
                <planeGeometry args={[0.15, 0.15]} />
                <primitive
                  object={materials.buttonLabel}
                  attach="material"
                />
              </mesh>
            </group>
          ))}

          {/* Center OK button */}
          <mesh
            ref={(el) => {
              buttonRefs.current.ok = el;
            }}
            position={[0, 0, 0.12]}
            castShadow
            receiveShadow
          >
            <primitive object={geometries.dpadCenter} attach="geometry" />
            <primitive object={materials.dpadButton} attach="material" />
          </mesh>

          <mesh position={[0, 0, 0.16]} castShadow receiveShadow>
            <primitive object={geometries.dialRidge} attach="geometry" />
            <primitive object={materials.dialRidge} attach="material" />
          </mesh>

          <mesh
            position={[0, -0.85, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.6, 0.15]} />
            <meshBasicMaterial
              color={0xf6f4ef}
              transparent
              opacity={0.3}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>

      {/* LENS BARREL */}
      <group position={[0, 0, -1.1]}>
        <mesh castShadow receiveShadow>
          <primitive object={geometries.lensBarrel} attach="geometry" />
          <primitive object={materials.lens} attach="material" />
        </mesh>

        <mesh position={[0, 0, 0.31]} castShadow receiveShadow>
          <primitive object={geometries.lensGlass} attach="geometry" />
          <primitive object={materials.lensGlass} attach="material" />
        </mesh>

        {/* Lens mount */}
        <mesh
          position={[0, 0, 0.32]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.45, 16]} />
          <meshStandardMaterial
            color={0x4a4a4a}
            roughness={0.3}
            metalness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Lens release button */}
        <mesh position={[-0.6, -0.6, 0]} castShadow receiveShadow>
          <primitive object={geometries.buttonRound} attach="geometry" />
          <primitive object={materials.button} attach="material" />
        </mesh>
      </group>

      {/* STRAP LUGS */}
      <mesh position={[-1.6, 1.15, 0.6]} castShadow receiveShadow>
        <primitive object={geometries.strapLug} attach="geometry" />
        <primitive object={materials.metalAccent} attach="material" />
      </mesh>

      <mesh position={[1.6, 1.15, 0.6]} castShadow receiveShadow>
        <primitive object={geometries.strapLug} attach="geometry" />
        <primitive object={materials.metalAccent} attach="material" />
      </mesh>

      {/* PORT COVERS */}
      <group position={[-1.65, -0.6, 0.4]}>
        {[0, -0.35, -0.7].map((y) => (
          <mesh key={y} position={[0, y, 0]} castShadow receiveShadow>
            <primitive object={geometries.portCover} attach="geometry" />
            <primitive object={materials.rubberCover} attach="material" />
          </mesh>
        ))}
      </group>

      {/* CARD ACCESS LIGHT */}
      <mesh
        ref={(el) => {
          buttonRefs.current.led = el;
        }}
        position={[1.7, 0.6, -0.2]}
        castShadow
        receiveShadow
      >
        <primitive object={geometries.led} attach="geometry" />
        <primitive object={materials.led} attach="material" />
      </mesh>

      {/* SCREWS */}
      {[-1.4, 1.4].map((x) => (
        <mesh
          key={x}
          position={[x, 1, 0.85]}
          castShadow
          receiveShadow
        >
          <primitive object={geometries.screw} attach="geometry" />
          <primitive object={materials.metalAccent} attach="material" />
        </mesh>
      ))}

      {/* MODE DIAL */}
      <group position={[-1.2, 1.5, 0]}>
        <mesh castShadow receiveShadow>
          <primitive object={geometries.modeDial} attach="geometry" />
          <primitive object={materials.dial} attach="material" />
        </mesh>

        <mesh position={[0, 0, 0.12]} castShadow receiveShadow>
          <primitive object={geometries.dialRidge} attach="geometry" />
          <primitive object={materials.dialRidge} attach="material" />
        </mesh>

        {/* Mode indicators */}
        {[0, 45, 90, 135, 180, -135, -90, -45].map((angle, i) => (
          <mesh
            key={angle}
            position={[
              Math.sin((angle * Math.PI) / 180) * 0.28,
              Math.cos((angle * Math.PI) / 180) * 0.28,
              0.1,
            ]}
            rotation={[0, 0, -((angle * Math.PI) / 180)]}
          >
            <planeGeometry args={[0.12, 0.04]} />
            <meshBasicMaterial
              color={0xf6f4ef}
              transparent
              opacity={i === 0 ? 0.8 : 0.3}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* SHUTTER BUTTON FLASH EASTER EGG */}
      <ShutterFlash isShutterPressed={isShutterPressed} onFlashComplete={() => setIsShutterPressed(false)} />
    </group>
  );
}

DSLRCamera3D.displayName = 'DSLRCamera3D';