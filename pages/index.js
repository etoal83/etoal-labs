/** @jsx jsx */
import { useRef } from 'react'
import Header from '../components/Header'
import { css, jsx } from '@emotion/core'
import { Canvas, useFrame } from 'react-three-fiber'

const fullWindowStyle = css({
  width: '100vw',
  height: '100vh',
  backgroundColor: '#222',
});

const Sample = () => {
  const ref = useRef();

  useFrame(() => {
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
        color='hotpink'
      />
    </mesh>
  )
}

const Earth = () => (
  <Canvas camera={{ position: [0, 0, 1000] }}>
    <directionalLight
      position={[500, 500, 500]}
      intensity={0.8}
    />
    <Sample />
  </Canvas>
)

const Home = () => (
  <div>
    <Header />
    <div css={fullWindowStyle}>
      <Earth />
    </div>
  </div>
)

export default Home
