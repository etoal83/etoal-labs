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
import Planet from '../../components/r3f/Planet';

const Earth = () => (
  <Planet
    physicalProps={{
      equatorialRadius: 6378.1e3,
      flattening: 0.003353,
      siderealRotationPeriod: 23 * 3600 + 56 * 60 + 4.1,
    }}
    orbitalProps={{}}
    texturePath={'/textures/2k_earth_daymap.jpg'}
  />
);

const EarthLab = () => (
  <FullWindowContainer>
    <Canvas
      style={{ background: '#222' }}
      gl={{ logarithmicDepthBuffer: true }}
    >
      <PerspectiveCamera
        makeDefault
        position={[3e7, 0, 0]}
        near={100}
        far={3.0e16}
      />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.15}
        minDistance={1e7}
      />
      <directionalLight position={[500, 500, 500]} intensity={0.9} />
      <Suspense fallback={null}>
        <Earth />
        <CelestialSphere />
      </Suspense>
      {/* <Stats /> */}
    </Canvas>
  </FullWindowContainer>
);

export default EarthLab;
