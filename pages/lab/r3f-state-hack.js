import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { PerspectiveCamera, Html } from '@react-three/drei';
import { Controls, useControl } from 'react-three-gui';

const Ramiel = (props) => {
  const mesh = useRef();
  const [wireframe, setWireframe] = useState(false);

  const [color, setColor] = useState(props.color);
  const companion = {
    red: 'magenta',
    green: 'yellow',
    blue: 'cyan',
  };
  useEffect(() => setColor(props.cmyk ? companion[props.color] : props.color), [
    props.cmyk,
  ]);

  const rotationSpeed = useControl('Rotation speed', {
    group: `Ramiel ${color[0].toUpperCase()}`,
    type: 'number',
    min: 0,
    max: 30,
  });
  useFrame(
    () =>
      (mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z +=
        0.01 * rotationSpeed)
  );

  return (
    <mesh {...props} ref={mesh} onClick={(e) => setWireframe(!wireframe)}>
      <octahedronBufferGeometry attach="geometry" args={[1, 0]} />
      <meshStandardMaterial
        attach="material"
        color={color}
        wireframe={wireframe}
      />
      <Html scaleFactor={15}>
        <div style={{ color: '#fff' }}>{color}</div>
      </Html>
    </mesh>
  );
};

const RamielGroup = () => {
  const group = useRef();

  const [cmyk, setCmyk] = useState(false);
  useControl('RGB ⇄ CMY', {
    group: 'All',
    type: 'button',
    onClick: () => setCmyk((state) => !state),
  });

  useFrame(
    () =>
      (group.current.rotation.x = group.current.rotation.y = group.current.rotation.z += 0.01)
  );

  return (
    <group ref={group}>
      <Ramiel color={'red'} cmyk={cmyk} position={[0, 2, 0]} />
      <Ramiel color={'green'} cmyk={cmyk} position={[-1.732, -1, 0]} />
      <Ramiel color={'blue'} cmyk={cmyk} position={[1.732, -1, 0]} />
    </group>
  );
};

const R3fStateHackingLab = () => (
  <Controls.Provider>
    <Controls.Canvas
      style={{
        background: '#333',
        width: '100vw',
        height: '100vh',
      }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <RamielGroup />
    </Controls.Canvas>
    <Controls title={'Control panel'} width={240} />
  </Controls.Provider>
);

export default R3fStateHackingLab;
