import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { PerspectiveCamera } from '@react-three/drei';

const Box = (props) => {
  const mesh = useRef();
  const [active, setActive] = useState(false);

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1.0, 1.0, 1.0]}
      onClick={(e) => setActive(!active)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={props.color} />
    </mesh>
  );
};

const R3fEventDetectionLab = () => (
  <Canvas style={{ width: '100vw', height: '100vh' }}>
    <ambientLight intensity={0.7} />
    <pointLight position={[10, 10, 10]} />
    <Box color={'red'} position={[0, 2, 0]} />
    <Box color={'green'} position={[-1.732, -1, 0]} />
    <Box color={'blue'} position={[1.732, -1, 0]} />
  </Canvas>
);

export default R3fEventDetectionLab;
