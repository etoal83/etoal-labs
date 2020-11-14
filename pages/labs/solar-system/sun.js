import { useRef, Suspense, lazy } from 'react';
import { TextureLoader, WebGLCubeRenderTarget } from 'three';
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  extend,
} from 'react-three-fiber';
import FullWindowContainer from '../../../components/FullWindowContainer';

const SunLab = () => <FullWindowContainer></FullWindowContainer>;

export default SunLab;
