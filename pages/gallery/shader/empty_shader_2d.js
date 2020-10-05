import { Canvas } from 'react-three-fiber';
import { OrthographicCamera } from 'drei';
import FullWindowContainer from '../../../components/FullWindowContainer';

const vertexSource = `
  void main() {
    vec3 pos = position;
    pos.y = ( pos.y * 0.5 ) + sin( pos.x * 3.0 ) * 0.5;
    gl_Position = vec4(pos, 1.0);
  }
`;

const fragmentSource = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

const EmptyShaderCanvas = () => (
  <FullWindowContainer>
    <Canvas>
      <OrthographicCamera args={[-1, 1, 1, -1, 0, 1]} />
      <mesh>
        <planeGeometry attach="geometry" args={[2, 2, 32, 32]} />
        <shaderMaterial
          attach="material"
          args={[
            {
              vertexShader: vertexSource,
              fragmentShader: fragmentSource,
              wireframe: true,
            },
          ]}
        />
      </mesh>
    </Canvas>
  </FullWindowContainer>
);

export default EmptyShaderCanvas;
