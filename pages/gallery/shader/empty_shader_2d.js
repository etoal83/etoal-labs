import { useRef, useCallback } from 'react';
import { Vector2 } from 'three';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei';
import FullWindowContainer from '../../../components/FullWindowContainer';

import emptyVertexShader from './emptyVertexShader.glsl';
import emptyFragmentShader from './emptyFragmentShader.glsl';

const CustomShaderScreen = () => {
  const material = useRef();
  const { size, mouse } = useThree();
  const uniforms = {
    u_time: { value: 0.0 },
    u_mouse: { value: mouse },
    u_resolution: { value: [size.width, size.height] },
  };

  useFrame(({ mouse }) => {
    material.current.uniforms.u_time.value += 0.05;
    material.current.uniforms.u_mouse.value = mouse;
  });

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[2, 2, 10, 10]} />
      <shaderMaterial
        attach="material"
        ref={material}
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
