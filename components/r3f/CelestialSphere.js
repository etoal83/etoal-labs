import { TextureLoader, WebGLCubeRenderTarget } from 'three';
import { useThree } from 'react-three-fiber';

const CelestialSphere = () => {
  const { gl, scene } = useThree();
  const starBackgroundTexture = new TextureLoader().load(
    '/textures/2k_stars_milky_way.jpg',
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
