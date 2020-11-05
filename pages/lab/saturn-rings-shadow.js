import { useRef, Suspense } from 'react';
import { View } from 'react-native';
import {
  Vector3,
  RingGeometry,
  MeshLambertMaterial,
  DirectionalLight,
  UniformsUtils,
  UniformsLib,
  ShaderChunk,
  DoubleSide,
} from 'three';
import { Canvas } from 'react-three-fiber';
import {
  PerspectiveCamera,
  OrbitControls,
  useTextureLoader,
  Stats,
} from 'drei';

import FullWindowContainer from '../../components/FullWindowContainer';
import Planet from '../../components/r3f/Planet';

const Saturn = () => <Planet name={'saturn'} />;

const Rings = () => {
  const ref = useRef();
  const texture = useTextureLoader('/textures/saturn-rings-top.png');
  const innerRadius = 0.7e8;
  const outerRadius = 1.5e8;
  const nTheta = 128;
  const nPhi = 1;

  let geometry = new RingGeometry(innerRadius, outerRadius, nTheta, nPhi);
  for (let yi = 0; yi < nPhi; yi++) {
    let u0 = yi / nPhi;
    let u1 = (yi + 1) / nPhi;

    for (let xi = 0; xi < nTheta; xi++) {
      let fi = 2 * (xi + nTheta * yi);
      let v0 = xi / nTheta;
      let v1 = (xi + 1) / nTheta;

      geometry.faceVertexUvs[0][fi][0].x = u0;
      geometry.faceVertexUvs[0][fi][0].y = v0;
      geometry.faceVertexUvs[0][fi][1].x = u1;
      geometry.faceVertexUvs[0][fi][1].y = v0;
      geometry.faceVertexUvs[0][fi][2].x = u0;
      geometry.faceVertexUvs[0][fi][2].y = v1;
      fi++;
      geometry.faceVertexUvs[0][fi][0].x = u1;
      geometry.faceVertexUvs[0][fi][0].y = v0;
      geometry.faceVertexUvs[0][fi][1].x = u1;
      geometry.faceVertexUvs[0][fi][1].y = v1;
      geometry.faceVertexUvs[0][fi][2].x = u0;
      geometry.faceVertexUvs[0][fi][2].y = v1;
    }
  }

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow
      receiveShadow
    >
      <meshLambertMaterial
        attach="material"
        map={texture}
        side={DoubleSide}
        transparent
      />
    </mesh>
  );
};

const Ball = () => (
  <mesh position={[0, 0, 3e8]} castShadow>
    <sphereBufferGeometry attach="geometry" args={[3e7, 32, 32]} />
    <meshStandardMaterial attach="material" color={'red'} />
  </mesh>
);

const Light = () => {
  const light = new DirectionalLight(0xffffff, 1.0);
  light.position.set(5e9, 5e9, 5e9);
  light.castShadow = true;
  light.shadow.camera.left = -1e9;
  light.shadow.camera.right = 1e9;
  light.shadow.camera.top = 1e9;
  light.shadow.camera.bottom = -1e9;
  light.shadow.camera.near = 1e2;
  light.shadow.camera.far = 1e10;
  return <primitive object={light} />;
};

const Screen = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6e7, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1e9, 1e9]} />
      <meshStandardMaterial attach="material" color={'white'} />
    </mesh>
  );
};

const SaturnRingsShadow = () => (
  <View>
    <Canvas
      shadowMap
      style={{ width: '100vw', height: '100vh', background: '#222' }}
      gl={{ logarithmicDepthBuffer: true, antialias: true }}
    >
      <PerspectiveCamera
        makeDefault
        position={[3e8, 0, 0]}
        near={100}
        far={3.0e16}
      />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.15}
        minDistance={100}
      />
      <Light />
      <Suspense fallback={null}>
        <Screen />
        <Rings />
        <Saturn />
        <Ball />
      </Suspense>
      <Stats />
    </Canvas>
  </View>
);

export default SaturnRingsShadow;
