import { useRef } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { OrthographicCamera } from 'drei';
import FullWindowContainer from '../../../components/FullWindowContainer';

import emptyVertexShader from './emptyVertexShader.glsl';
import emptyFragmentShader from './emptyFragmentShader.glsl';

const CustomShaderScreen = () => {
  const ref = useRef();
  const { aspect, clock } = useThree();
  const uniforms = {
    uAspect: { value: aspect },
    uTime: { value: 0.0 },
  };

  useFrame(() => (ref.current.uniforms.uTime.value += 0.05));

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[2, 2, 10, 10]} />
      <shaderMaterial
        attach="material"
        ref={ref}
        uniforms={uniforms}
        vertexShader={emptyVertexShader}
        fragmentShader={emptyFragmentShader}
        uniformsNeedUpdate
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
