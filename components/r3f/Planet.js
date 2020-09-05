import { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { useTextureLoader } from 'drei';

const Planet = ({ physicalProps, orbitalProps, texturePath }) => {
  const ref = useRef();
  const texture = useTextureLoader(texturePath);

  useFrame(() => {
    ref.current.rotation.y += 0.001;
    // (2 * Math.PI) / physicalProps.siderealRotationPeriod / 60;
  });

  return (
    <mesh ref={ref} scale={[1.0, 1.0 - physicalProps.flattening, 1.0]}>
      <sphereGeometry
        attach="geometry"
        args={[physicalProps.equatorialRadius, 64, 64]}
      />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
};

export default Planet;
