import { useRef, Suspense } from 'react';
import {
  Vector3,
  RingGeometry,
  MeshLambertMaterial,
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

import FullWindowContainer from '../../../components/FullWindowContainer';
import Planet from '../../../components/r3f/Planet';

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

// const Rings = () => {
//   const ref = useRef();
//   const texture = useTextureLoader('/textures/saturn-rings-top.png');
//   const innerRadius = 0.7e8;
//   const outerRadius = 1.5e8;
//   const uniforms = UniformsUtils.merge([
//     UniformsLib.ambient,
//     UniformsLib.lights,
//     UniformsLib.shadowmap,
//     {
//       ringTexture: { value: texture },
//       innerRadius: { value: innerRadius },
//       outerRadius: { value: outerRadius },
//       lightPosition: { value: new Vector3(5.0e9, 3.0e9, 5.0e9) },
//     },
//   ]);

//   const SaturnRingShader = {
//     uniforms,
//     vertexShader: `
//       varying vec3 vPos;
//       varying vec3 vWorldPosition;
//       varying vec3 vNormal;

//       ${ShaderChunk['shadowmap_pars_vertex']}

//       void main() {
//         vPos = position;
//         vec4 worldPosition = modelMatrix * vec4(position, 1.);

//         vWorldPosition = worldPosition.xyz;
//         ${ShaderChunk.beginnormal_vertex}
//         ${ShaderChunk.defaultnormal_vertex}
//         ${ShaderChunk.shadowmap_vertex}

//         gl_Position = projectionMatrix * viewMatrix * vec4(worldPosition.xyz, 1.);

//         //vec3 viewPosition = (modelViewMatrix * vec4(position, 1.)).xyz;
//         //gl_Position = projectionMatrix * vec4(viewPosition, 1.);
//       }`,
//     fragmentShader: `
//       uniform sampler2D ringTexture;
//       uniform float innerRadius;
//       uniform float outerRadius;
//       uniform vec3 lightPosition;

//       varying vec3 vPos;
//       varying vec3 vNormal;
//       varying vec3 vWorldPosition;

//       ${ShaderChunk.common}
//       ${ShaderChunk.packing}
//       ${ShaderChunk.bsdfs}
//       ${ShaderChunk.lights_pars_begin}
//       ${ShaderChunk.shadowmap_pars_fragment}
//       ${ShaderChunk.shadowmask_pars_fragment}

//       vec4 color() {
//         vec2 uv = vec2(0);
//         uv.x = (length(vPos) - innerRadius) / (outerRadius - innerRadius);
//         if (uv.x < 0.0 || uv.x > 1.0) {
//           discard;
//         }

//         vec4 pixel = texture2D(ringTexture, uv);
//         return pixel;
//       }

//       void main() {
//         gl_FragColor = color() * vec4(vec3(getShadowMask()), 1.0);
//       }`,
//     lights: true,
//     transparent: true,
//     side: DoubleSide,
//   };

//   return (
//     <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
//       <ringGeometry attach="geometry" args={[innerRadius, outerRadius, 128]} />
//       <meshLambertMaterial
//         attach="material"
//         map={texture}
//         side={DoubleSide}
//         transparent
//       />
//     </mesh>
//   );
// };

// const Rings = () => {
//   const ref = useRef();
//   const texture = useTextureLoader('/textures/2k_saturn_ring_alpha.png');

//   const geometry = new RingBufferGeometry(1.0e8, 1.5e8, 128);
//   let pos = geometry.attributes.position;
//   let v3 = new Vector3();
//   for (let i = 0; i < pos.count; i++) {
//     v3.fromBufferAttribute(pos, i);
//     geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
//   }

//   return (
//     <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
//       {/* <ringBufferGeometry attach="geometry" args={[1.0e8, 1.5e8, 128]} /> */}
//       <bufferGeomtry attach="geometry">
//         <bufferAttribute attachObject={['attributes', 'position']} />
//       </bufferGeomtry>
//       <meshBasicMaterial
//         attach="material"
//         map={texture}
//         transparent={true}
//         side={DoubleSide}
//       />
//     </mesh>
//   );
// };

const RingsOfSaturn = () => (
  <FullWindowContainer>
    <Canvas
      style={{ background: '#222' }}
      gl={{ logarithmicDepthBuffer: true, antialias: true }}
      shadowMap
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
      <directionalLight
        position={[5.0e9, 3.0e9, 5.0e9]}
        intensity={1.0}
        castShadow
      />
      <Suspense fallback={null}>
        <Rings />
        <Saturn />
      </Suspense>
      <Stats />
    </Canvas>
  </FullWindowContainer>
);

export default RingsOfSaturn;
