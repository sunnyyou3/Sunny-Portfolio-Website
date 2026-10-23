   import React, { useRef, useState, useEffect } from 'react';
   import { Canvas } from '@react-three/fiber';
   import { DSLRCamera3D } from './DSLRCamera3D';

   export function DiagnosticCanvas() {
     const [rendered, setRendered] = useState(false);

     useEffect(() => {
       // If we get here, the component mounted
       setRendered(true);
     }, []);

     return (
       <Canvas
         gl={{ antialias: true, alpha: true }}
         camera={{ position: [0, 0, 4.5], fov: 45 }}
         onCreated={({ gl }) => {
           gl.toneMapping = THREE.ACESFilmicToneMapping;
           gl.toneMappingExposure = 1.1;
         }}
       >
         <DSLRCamera3D
           position={[0, 0, 0]}
           rotation={[0, 0, 0]}
           scale={1}
           lcdContent={null}  <!-- No LCD content for this test -->
         />
       </Canvas>
     );
   }