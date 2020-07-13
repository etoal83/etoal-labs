/** @jsx jsx */
import Header from '../components/Header'
import { useRef, Suspense } from 'react'
import { css, jsx } from '@emotion/core'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
// import earthTextureUrl from ''

const fullWindowStyle = css({
  width: '100vw',
  height: '100vh',
  backgroundColor: '#222',
});

const Earth = () => {
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, '/textures/earthmap1k.jpg')

  useFrame(() => {
    ref.current.rotation.y += 0.005
  });

  return (
    <mesh
      ref={ref}
      onClick={e => console.log('click')}
      onPointerOver={e => console.log('hover')}
      onPointerOut={e => console.log('unhover')}

    >
      <sphereGeometry attach='geometry' args={[300, 30, 30]} />
      <meshStandardMaterial
        attach='material'
        map={texture}
      />
    </mesh>
  )
}

const EarthNow = () => (
  <Canvas camera={{ position: [900, 0, 0] }}>
    <directionalLight
      position={[500, 500, 500]}
      intensity={0.8}
    />
    <Suspense fallback={null}>
      <Earth />
    </Suspense>
  </Canvas>
)

const Home = () => (
  <div>
    <Header />
    <div css={fullWindowStyle}>
      <EarthNow />
    </div>
  </div>
)

export default Home
