import { useRef, Suspense, lazy } from 'react';
import { TextureLoader, WebGLCubeRenderTarget } from 'three';
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  extend,
} from 'react-three-fiber';
import FullWindowContainer from '../../components/FullWindowContainer';
import CelestialSphere from '../../components/r3f/CelestialSphere';

// これがうまく動かない理由がまだよく理解できていない
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let OrbitControls;

const Earth = () => {
  const ref = useRef();
  const earthTexture = useLoader(
    TextureLoader,
    '/textures/2k_earth_daymap.jpg'
  );

  useFrame(() => {
    ref.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry attach="geometry" args={[300, 30, 30]} />
      <meshStandardMaterial attach="material" map={earthTexture} />
    </mesh>
  );
};

const CameraControls = () => {
  OrbitControls = require('three/examples/jsm/controls/OrbitControls')
    .OrbitControls;
  extend({ OrbitControls });

  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();

  useFrame((state) => {
    controls.current.update();
  });

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      maxDistance={1200}
      minDistance={400}
      enableDamping={true}
      dampingFactor={0.15}
    />
  );
};

const EarthLab = () => (
  <FullWindowContainer>
    <Canvas camera={{ position: [900, 0, 0] }} style={{ background: '#222' }}>
      <CameraControls />
      <directionalLight position={[500, 500, 500]} intensity={0.9} />
      <Suspense fallback={null}>
        <Earth />
        <CelestialSphere />
      </Suspense>
    </Canvas>
  </FullWindowContainer>
);

export default EarthLab;
