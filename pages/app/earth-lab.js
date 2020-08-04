import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import FullWindowContainer from '../../components/FullWindowContainer';

const Earth = () => {
  const ref = useRef();
  const texture = useLoader(
    THREE.TextureLoader,
    '/textures/2k_earth_daymap.jpg'
  );

  useFrame(() => {
    ref.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry attach="geometry" args={[300, 30, 30]} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
};

const EarthLab = () => (
  <FullWindowContainer>
    <Canvas camera={{ position: [900, 0, 0] }}>
      <directionalLight position={[500, 500, 500]} intensity={0.8} />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
    </Canvas>
  </FullWindowContainer>
);

export default EarthLab;
