import { Canvas } from 'react-three-fiber';
import { OrthographicCamera } from 'drei';
import FullWindowContainer from '../../../components/FullWindowContainer';

import emptyVertexShader from './emptyVertexShader.glsl';
import emptyFragmentShader from './emptyFragmentShader.glsl';

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
              vertexShader: emptyVertexShader,
              fragmentShader: emptyFragmentShader,
              wireframe: true,
            },
          ]}
        />
      </mesh>
    </Canvas>
  </FullWindowContainer>
);

export default EmptyShaderCanvas;
