import { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { useTextureLoader } from 'drei';

import { planets } from '../../lib/data/solarSystem.json';

const Planet = ({ name }) => {
  const planet = planets[name];
  const ref = useRef();
  const texture = useTextureLoader(planet.texturePath);

  useFrame(() => {
    ref.current.rotation.y += 0.001;
    // (2 * Math.PI) / planet.siderealRotationPeriod / 60;
  });

  return (
    <mesh
      ref={ref}
      scale={[1.0, 1.0 - planet.flattening, 1.0]}
      castShadow
      receiveShadow
    >
      <sphereGeometry
        attach="geometry"
        args={[planet.equatorialRadius, 64, 64]}
      />
      <meshLambertMaterial attach="material" map={texture} />
    </mesh>
  );
};

export default Planet;
