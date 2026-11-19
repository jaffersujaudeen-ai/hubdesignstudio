import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows, Sparkles, Stars, MeshDistortMaterial } from '@react-three/drei'
import { Suspense, useRef } from 'react'

function MotionRig({ children }) {
  const rig = useRef()
  useFrame((state, delta) => {
    if (!rig.current) return
    const targetX = (state.pointer.y || 0) * 0.12
    const targetY = (state.pointer.x || 0) * 0.18
    rig.current.rotation.x += (targetX - rig.current.rotation.x) * Math.min(1, delta * 1.8)
    rig.current.rotation.y += (targetY - rig.current.rotation.y) * Math.min(1, delta * 1.8)
  })
  return <group ref={rig}>{children}</group>
}

function Spin({ children, position = [0, 0, 0], speed = 0.25, tilt = 0.25 }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed
      ref.current.rotation.x += delta * speed * tilt
    }
  })
  return <group ref={ref} position={position}>{children}</group>
}

function GlassOrb({ position, scale = 0.3, color = '#BBAAFF', speed = 1 }) {
  return <Float speed={speed} rotationIntensity={0.65} floatIntensity={0.75}>
    <mesh position={position} scale={scale}>
      <icosahedronGeometry args={[1, 5]} />
      <MeshDistortMaterial color={color} roughness={0.08} metalness={0.22} distort={0.18} speed={1.8} transparent opacity={0.88} clearcoat={1} />
    </mesh>
  </Float>
}

function Scene() {
  return <>
    <color attach="background" args={['#111018']} />
    <fog attach="fog" args={['#111018', 7, 16]} />
    <ambientLight intensity={0.85} />
    <directionalLight position={[4, 6, 5]} intensity={2.2} />
    <pointLight position={[-4, 1, 3]} intensity={25} color="#9270FB" />
    <pointLight position={[4, -1, -2]} intensity={22} color="#F48936" />
    <pointLight position={[0, 4, 1]} intensity={12} color="#DCD5FF" />
    <MotionRig>
      <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.16}>
        <Spin position={[-0.7, 0.12, 0]} speed={0.2}>
          <mesh>
            <torusKnotGeometry args={[0.83, 0.23, 180, 24, 2, 5]} />
            <meshPhysicalMaterial color="#9270FB" metalness={0.78} roughness={0.16} clearcoat={1} clearcoatRoughness={0.08} />
          </mesh>
        </Spin>
      </Float>
      <Spin position={[1.12, 0.76, -0.65]} speed={-0.34}>
        <mesh>
          <octahedronGeometry args={[0.72, 0]} />
          <meshPhysicalMaterial color="#F48936" metalness={0.82} roughness={0.13} clearcoat={1} />
        </mesh>
        <mesh scale={1.18}>
          <octahedronGeometry args={[0.72, 0]} />
          <meshBasicMaterial color="#FFD0A6" wireframe transparent opacity={0.3} />
        </mesh>
      </Spin>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.35}>
        <Spin position={[1.12, -0.95, 0.2]} speed={0.32}>
          <mesh rotation={[0.8, 0.2, 0.25]}>
            <torusGeometry args={[0.78, 0.12, 24, 120]} />
            <meshStandardMaterial color="#D8D0FF" metalness={0.94} roughness={0.16} />
          </mesh>
          <mesh rotation={[0.8, 0.2, 0.25]} scale={1.18}>
            <torusGeometry args={[0.78, 0.012, 8, 120]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.48} />
          </mesh>
        </Spin>
      </Float>
      <Spin position={[-1.8, -0.88, -0.7]} speed={0.27}>
        <mesh rotation={[0.3, 0.4, 0.2]}>
          <boxGeometry args={[0.92, 0.92, 0.92]} />
          <meshStandardMaterial color="#E9E9E9" metalness={0.88} roughness={0.2} />
        </mesh>
        <mesh rotation={[0.3, 0.4, 0.2]} scale={1.035}>
          <boxGeometry args={[0.92, 0.92, 0.92]} />
          <meshBasicMaterial color="#FFFFFF" wireframe transparent opacity={0.36} />
        </mesh>
      </Spin>
      <GlassOrb position={[0.05, 1.48, -1.1]} scale={0.3} color="#B9A8FF" speed={1.3} />
      <GlassOrb position={[-2.02, 0.82, 0.42]} scale={0.2} color="#F7A76A" speed={1.7} />
      <GlassOrb position={[0.3, -1.46, -0.5]} scale={0.17} color="#E9E9E9" speed={1.1} />
      <Float speed={0.65} rotationIntensity={0.22} floatIntensity={0.18}>
        <mesh position={[1.85, 1.45, -1.1]} rotation={[0.4, 0.2, 0.8]}>
          <dodecahedronGeometry args={[0.28, 0]} />
          <meshPhysicalMaterial color="#B8F0E4" metalness={0.65} roughness={0.18} clearcoat={1} />
        </mesh>
      </Float>
    </MotionRig>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.72, 0]}>
      <circleGeometry args={[3.3, 80]} />
      <meshBasicMaterial color="#191625" transparent opacity={0.55} />
    </mesh>
    <ContactShadows position={[0, -1.68, 0]} opacity={0.34} scale={5.8} blur={2.8} far={4} />
    <Sparkles count={48} scale={5.5} size={2} speed={0.22} opacity={0.58} color="#C8B8FF" />
    <Stars radius={12} depth={5} count={140} factor={1.8} saturation={0} fade speed={0.18} />
    <Environment preset="city" />
  </>
}

export default function Scene3D() {
  return <div className="scene-canvas" aria-label="Interactive 3D sculpture collection">
    <Canvas camera={{ position: [0, 0, 5.4], fov: 39 }} dpr={[1, 1.35]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <Suspense fallback={null}><Scene /></Suspense>
    </Canvas>
  </div>
}
