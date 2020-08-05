import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  extend,
} from 'react-three-fiber';
import FullWindowContainer from '../../components/FullWindowContainer';

// これがうまく動かない理由がまだよく理解できていない
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let OrbitControls;

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

  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const EarthLab = () => (
  <FullWindowContainer>
    <Canvas style={{ background: '#222' }}>
      <CameraControls />
      <directionalLight position={[500, 500, 500]} intensity={0.8} />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
    </Canvas>
  </FullWindowContainer>
);

export default EarthLab;
