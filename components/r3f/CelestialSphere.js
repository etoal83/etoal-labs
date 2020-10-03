import { WebGLCubeRenderTarget } from 'three';
import { useThree } from 'react-three-fiber';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';

const CelestialSphere = () => {
  const { gl, scene } = useThree();
  const starBackgroundTexture = new EXRLoader().load(
    '/textures/starmap_2020_4k.exr',
    () => {
      const renderTarget = new WebGLCubeRenderTarget(
        starBackgroundTexture.image.height
      );
      renderTarget.fromEquirectangularTexture(gl, starBackgroundTexture);
      scene.background = renderTarget;
    }
  );

  return null;
};

export default CelestialSphere;
