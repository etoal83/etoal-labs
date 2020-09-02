import { useRef, Suspense, lazy } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import {
  PerspectiveCamera,
  OrbitControls,
  useTextureLoader,
  Stats,
} from 'drei';

import FullWindowContainer from '../../components/FullWindowContainer';
import CelestialSphere from '../../components/r3f/CelestialSphere';

const Earth = () => {
  const ref = useRef();
  const earthTexture = useTextureLoader('/textures/2k_earth_daymap.jpg');

  useFrame(() => {
    ref.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry attach="geometry" args={[300, 64, 64]} />
      <meshStandardMaterial attach="material" map={earthTexture} />
    </mesh>
  );
};

const EarthLab = () => (
  <FullWindowContainer>
    <Canvas
      style={{ background: '#222' }}
      gl={{ logarithmicDepthBuffer: true }}
    >
      <PerspectiveCamera makeDefault position={[900, 0, 0]} />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.15}
        minDistance={400}
      />
      <directionalLight position={[500, 500, 500]} intensity={0.9} />
      <Suspense fallback={null}>
        <Earth />
        <CelestialSphere />
      </Suspense>
    </Canvas>
  </FullWindowContainer>
);

export default EarthLab;
