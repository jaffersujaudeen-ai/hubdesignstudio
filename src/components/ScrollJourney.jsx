import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

function JourneyScene({ progressRef, reducedMotion }) {
  const world = useRef()
  const core = useRef()
  const portal = useRef()
  const orbit = useRef()
  const cards = useRef()

  useFrame((state, delta) => {
    const p = progressRef.current
    const phase = p * Math.PI * 2
    if (world.current) {
      world.current.position.x = THREE.MathUtils.damp(world.current.position.x, Math.sin(phase * .72) * .72, 2.2, delta)
      world.current.position.y = THREE.MathUtils.damp(world.current.position.y, Math.cos(phase * .8) * .26, 2.2, delta)
      world.current.rotation.y = THREE.MathUtils.damp(world.current.rotation.y, p * Math.PI * 1.8, 2.5, delta)
      world.current.rotation.z = THREE.MathUtils.damp(world.current.rotation.z, Math.sin(phase) * .12, 2, delta)
    }
    if (core.current && !reducedMotion) {
      core.current.rotation.x += delta * .22
      core.current.rotation.y += delta * (.3 + p * .22)
      core.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.1) * .035)
    }
    if (portal.current) {
      const reveal = THREE.MathUtils.smoothstep(p, .43, .82)
      portal.current.scale.setScalar(.22 + reveal * 1.15)
      portal.current.rotation.z = THREE.MathUtils.damp(portal.current.rotation.z, p * Math.PI * 1.3, 2, delta)
      if (!reducedMotion) portal.current.rotation.y += delta * .12
    }
    if (orbit.current) {
      orbit.current.rotation.y = THREE.MathUtils.damp(orbit.current.rotation.y, p * Math.PI * 2.4, 2.4, delta)
      orbit.current.rotation.x = THREE.MathUtils.damp(orbit.current.rotation.x, .25 + Math.sin(phase) * .25, 2, delta)
    }
    if (cards.current) {
      cards.current.rotation.y = THREE.MathUtils.damp(cards.current.rotation.y, -.4 + p * 1.4, 2, delta)
      cards.current.position.y = THREE.MathUtils.damp(cards.current.position.y, Math.sin(phase) * .22, 2, delta)
    }
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, Math.sin(phase * .65) * .55, 1.8, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, Math.cos(phase) * .2, 1.8, delta)
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 7.2 - Math.sin(p * Math.PI) * .75, 1.8, delta)
    state.camera.lookAt(0, 0, 0)
  })

  return <>
    <color attach="background" args={['#100e17']} />
    <fog attach="fog" args={['#100e17', 8, 18]} />
    <ambientLight intensity={.8} />
    <directionalLight position={[4, 5, 6]} intensity={2.4} />
    <pointLight position={[-4, 1, 3]} intensity={28} color="#9270FB" />
    <pointLight position={[4, -2, -1]} intensity={22} color="#F48936" />
    <group ref={world}>
      <group ref={core}>
        <mesh><icosahedronGeometry args={[1.08, 5]} /><meshPhysicalMaterial color="#9b82ff" metalness={.72} roughness={.13} clearcoat={1} clearcoatRoughness={.08} /></mesh>
        <mesh scale={1.13}><icosahedronGeometry args={[1.08, 2]} /><meshBasicMaterial color="#e3dfff" wireframe transparent opacity={.2} /></mesh>
        <mesh rotation={[.4, .2, .1]}><torusKnotGeometry args={[1.38, .055, 160, 12, 2, 5]} /><meshStandardMaterial color="#f0a56c" metalness={.88} roughness={.18} /></mesh>
      </group>
      <group ref={orbit}>
        <mesh rotation={[1.1, .2, .4]}><torusGeometry args={[2.15, .025, 12, 160]} /><meshBasicMaterial color="#c5b7ff" transparent opacity={.72} /></mesh>
        <mesh rotation={[.4, .8, 1.2]}><torusGeometry args={[2.55, .012, 8, 160]} /><meshBasicMaterial color="#f48936" transparent opacity={.7} /></mesh>
        <Float speed={1.2} floatIntensity={.3}><mesh position={[2.12, .2, 0]}><octahedronGeometry args={[.26, 0]} /><meshPhysicalMaterial color="#f48936" metalness={.8} roughness={.16} clearcoat={1} /></mesh></Float>
        <Float speed={1.5} floatIntensity={.35}><mesh position={[-1.7, 1.15, .1]}><dodecahedronGeometry args={[.2, 0]} /><meshPhysicalMaterial color="#e9e9e9" metalness={.65} roughness={.16} /></mesh></Float>
      </group>
      <group ref={cards} position={[0, 0, -1.4]}>
        {[-1, 0, 1].map((x, i) => <group key={i} position={[x * 1.05, (i - 1) * .5, 0]} rotation={[.1, (i - 1) * -.18, (i - 1) * -.12]}>
          <mesh><boxGeometry args={[.82, 1.12, .055]} /><meshPhysicalMaterial color={i === 1 ? '#9b82ff' : '#272333'} metalness={.45} roughness={.2} transparent opacity={.86} clearcoat={1} /></mesh>
          <mesh position={[0, .27, .04]}><planeGeometry args={[.58, .22]} /><meshBasicMaterial color={i === 1 ? '#f4a66c' : '#b6a6ff'} /></mesh>
          {[0, 1, 2].map(k => <mesh key={k} position={[-.1, -.02 - k * .15, .04]}><planeGeometry args={[.48 - k * .07, .035]} /><meshBasicMaterial color="#e7e2f2" transparent opacity={.5 - k * .08} /></mesh>)}
        </group>)}
      </group>
      <group ref={portal} position={[0, 0, -.5]}>
        <mesh rotation={[.12, .15, 0]}><torusGeometry args={[2, .09, 24, 160]} /><meshPhysicalMaterial color="#a58cff" metalness={.9} roughness={.12} clearcoat={1} emissive="#4a2b9a" emissiveIntensity={.55} /></mesh>
        <mesh rotation={[.12, .15, 0]} scale={.87}><torusGeometry args={[2, .025, 12, 160]} /><meshBasicMaterial color="#f4a66c" /></mesh>
      </group>
    </group>
    <Sparkles count={85} scale={8} size={2.1} speed={.22} opacity={.7} color="#c9bbff" />
  </>
}

const chapters = [
  { number: '01', label: 'THE ORIGIN', title: 'Ideas take shape.', body: 'A single form emerges from light and motion. Your creative journey starts with a clear direction.', tag: 'SCROLL TO SHAPE THE FORM' },
  { number: '02', label: 'THE UNIVERSE', title: 'Explore every angle.', body: 'Colour, typography and interface elements orbit your idea. Move through a space built for experimentation.', tag: 'MOVE THROUGH THE DESIGN SYSTEM' },
  { number: '03', label: 'THE PORTAL', title: 'Step into your next idea.', body: 'A new dimension opens. Your chosen visual direction becomes a complete digital experience.', tag: 'ENTER A NEW DIMENSION' },
  { number: '04', label: 'THE OUTCOME', title: 'Make it unmistakably yours.', body: 'Bring the details together, save your direction and share the brief with the UN Digital Hub team.', tag: 'READY WHEN YOU ARE' }
]

export default function ScrollJourney() {
  const sectionRef = useRef(null)
  const progressRef = useRef(0)
  const [active, setActive] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    let raf = 0
    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current
        if (!el) return
        const travel = Math.max(1, el.offsetHeight - window.innerHeight)
        const value = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / travel))
        progressRef.current = value
        const next = Math.min(3, Math.floor(value * 4))
        setActive(current => current === next ? current : next)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  return <section className="scroll-journey" ref={sectionRef} aria-label="Interactive 3D scroll journey">
    <div className="journey-heading"><span className="eyebrow">A NEW DIMENSION / SCROLL EXPERIENCE</span><h2>Don't just browse.<br/><em>Move through ideas.</em></h2><p>Scroll to guide the scene. The world responds to your movement.</p></div>
    <div className="journey-layout">
      <div className="journey-chapters">
        {chapters.map((chapter, i) => <article key={chapter.number} className={`journey-chapter ${active === i ? 'active' : ''}`}>
          <span className="journey-number">{chapter.number} / {chapter.label}</span><h3>{chapter.title}</h3><p>{chapter.body}</p><span className="journey-tag">{chapter.tag}</span>
        </article>)}
      </div>
      <div className="journey-stage">
        <div className="journey-canvas-shell">
          <Canvas camera={{ position: [0, 0, 7.2], fov: 38 }} dpr={[1, 1.35]} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
            <Suspense fallback={null}><JourneyScene progressRef={progressRef} reducedMotion={reducedMotion} /></Suspense>
          </Canvas>
          <div className="journey-stage-label"><span>UN / DIGITAL REALITY</span><b>{chapters[active].number}</b></div>
          <div className="journey-stage-progress"><i style={{ transform: `scaleX(${(active + 1) / 4})` }} /></div>
        </div>
        <span className="journey-scroll-hint">SCROLL TO TRANSFORM <span>↓</span></span>
      </div>
    </div>
  </section>
}
