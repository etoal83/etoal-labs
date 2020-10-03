import { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { PerspectiveCamera, OrbitControls, Stats } from 'drei';

import FullWindowContainer from '../../../components/FullWindowContainer';
import CelestialSphere from '../../../components/r3f/CelestialSphere';
import Planet from '../../../components/r3f/Planet';

import { planets } from '../../../lib/data/solarSystem.json';

const PlanetaryLab = ({ name }) => (
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
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.15}
        minDistance={1e7}
      />
      <directionalLight position={[500, 500, 500]} intensity={1.0} />
      <Suspense fallback={null}>
        <Planet name={name} />
        <CelestialSphere />
      </Suspense>
      {/* <Stats /> */}
    </Canvas>
  </FullWindowContainer>
);

export const getStaticPaths = async () => {
  const names = Object.keys(planets);
  const paths = names.map((name) => `/labs/solar-system/${name}`);
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const name = params.planet;
  return {
    props: { name },
  };
};

export default PlanetaryLab;
