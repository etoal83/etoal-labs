import { Canvas, useThree } from 'react-three-fiber';
import { OrthographicCamera } from 'drei';
import FullWindowContainer from '../../../components/FullWindowContainer';

import emptyVertexShader from './emptyVertexShader.glsl';
import emptyFragmentShader from './emptyFragmentShader.glsl';

const CustomShaderScreen = () => {
  const { aspect } = useThree();

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[2, 2, 10, 10]} />
      <shaderMaterial
        attach="material"
        args={[
          {
            uniforms: {
              uAspect: { value: aspect },
            },
            vertexShader: emptyVertexShader,
            fragmentShader: emptyFragmentShader,
          },
        ]}
      />
    </mesh>
  );
};

const EmptyShaderCanvas = () => {
  return (
    <Canvas style={{ height: '100vh', width: '100vw' }}>
      <OrthographicCamera args={[-1, 1, 1, -1, 0, 1]} />
      <CustomShaderScreen />
    </Canvas>
  );
};

export default EmptyShaderCanvas;
