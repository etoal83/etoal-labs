/** @jsx jsx */
import { useRef } from 'react'
import Header from '../components/Header'
import { css, jsx } from '@emotion/core'
import { Canvas, useFrame } from 'react-three-fiber'

const fullWindowStyle = css({
  width: '100vw',
  height: '100vh',
});

const Sample = () => {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.z += 0.01;
  });

  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach='geometry' args={[1, 1]} />
      <meshBasicMaterial
        attach='material'
        color='hotpink'
        opacity={0.5}
        transparent
      />
    </mesh>
  )
}

const Home = () => (
  <div>
    <Header />
    <div css={fullWindowStyle}>
      <Canvas>
        <Sample />
      </Canvas>
    </div>
  </div>
)

export default Home
