import { memo, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Line, PerformanceMonitor, Points, PointMaterial, Preload, Ring, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

const accent = {
  cyan: '#00d4ff',
  violet: '#7c3aed',
  pink: '#f472b6',
  ink: '#030712'
};

function seededRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function CameraRig({ reducedMotion }) {
  const { camera, pointer } = useThree();

  useFrame((state) => {
    if (reducedMotion) return;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.42, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.5 + pointer.y * 0.24, 0.035);
    camera.lookAt(0, 0.1, 0);
    state.scene.rotation.y = THREE.MathUtils.lerp(state.scene.rotation.y, pointer.x * 0.045, 0.025);
  });

  return null;
}

function ParticleGalaxy({ reducedMotion }) {
  const pointsRef = useRef();
  const particleCount = reducedMotion ? 520 : 1100;

  const positions = useMemo(() => {
    const points = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 1.8 + seededRandom(i + 11) * 5.6;
      const branch = (i % 4) * (Math.PI / 2);
      const spin = radius * 0.58;
      const randomness = Math.pow(seededRandom(i + 23), 2) * 1.6;
      const randomSign = seededRandom(i + 37) < 0.5 ? -1 : 1;

      points[i * 3] = Math.cos(branch + spin) * radius + randomness * randomSign;
      points[i * 3 + 1] = (seededRandom(i + 51) - 0.5) * 3.2;
      points[i * 3 + 2] = Math.sin(branch + spin) * radius + randomness * randomSign - 2.2;
    }
    return points;
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.035;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={accent.cyan}
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.72}
      />
    </Points>
  );
}

function Laptop() {
  return (
    <group position={[0, -0.72, 0]} rotation={[0.06, -0.22, 0]}>
      <RoundedBox args={[2.35, 0.1, 1.45]} radius={0.035} smoothness={8} position={[0, -0.05, 0.18]}>
        <meshStandardMaterial color="#101827" roughness={0.42} metalness={0.55} />
      </RoundedBox>
      <RoundedBox args={[2.08, 0.02, 1.1]} radius={0.025} smoothness={8} position={[0, 0.015, 0.16]}>
        <meshStandardMaterial color="#050816" emissive="#07172a" emissiveIntensity={0.35} roughness={0.32} />
      </RoundedBox>
      <RoundedBox args={[1.88, 1.18, 0.07]} radius={0.045} smoothness={10} position={[0, 0.68, -0.52]} rotation={[-0.38, 0, 0]}>
        <meshStandardMaterial color="#0c1221" roughness={0.36} metalness={0.45} />
      </RoundedBox>
      <RoundedBox args={[1.68, 0.92, 0.025]} radius={0.03} smoothness={8} position={[0, 0.7, -0.555]} rotation={[-0.38, 0, 0]}>
        <meshStandardMaterial
          color="#06111f"
          emissive={accent.cyan}
          emissiveIntensity={0.24}
          roughness={0.2}
          transparent
          opacity={0.92}
        />
      </RoundedBox>
      {['const craft = true', '<Hero scene />', 'motion.spring()', 'deploy: ready'].map((line, index) => (
        <Text
          key={line}
          position={[-0.68, 0.93 - index * 0.16, -0.59]}
          rotation={[-0.38, 0, 0]}
          fontSize={0.045}
          color={index === 1 ? accent.violet : accent.cyan}
          anchorX="left"
          anchorY="middle"
        >
          {line}
        </Text>
      ))}
    </group>
  );
}

function CodePanel({ position, rotation, label, lines, color = accent.cyan, delay = 0 }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.85 + delay) * 0.055;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.16} floatIntensity={0.16}>
      <group ref={ref} position={position} rotation={rotation}>
        <RoundedBox args={[1.18, 0.72, 0.035]} radius={0.04} smoothness={8}>
          <meshPhysicalMaterial
            color="#07111f"
            roughness={0.18}
            metalness={0.18}
            transmission={0.35}
            thickness={0.45}
            transparent
            opacity={0.58}
            emissive={color}
            emissiveIntensity={0.05}
          />
        </RoundedBox>
        <Text position={[-0.48, 0.24, 0.03]} fontSize={0.06} color={color} anchorX="left">
          {label}
        </Text>
        {lines.map((line, index) => (
          <Text
            key={line}
            position={[-0.48, 0.08 - index * 0.13, 0.035]}
            fontSize={0.04}
            color={index % 2 ? '#c4b5fd' : '#dbeafe'}
            anchorX="left"
          >
            {line}
          </Text>
        ))}
      </group>
    </Float>
  );
}

function TechBadge({ position, label, color, delay }) {
  return (
    <Float speed={1.4} rotationIntensity={0.28} floatIntensity={0.28}>
      <group position={position} rotation={[0.08, -0.2, 0]}>
        <Ring args={[0.2, 0.215, 48]} rotation={[0, 0, Math.PI / 8]}>
          <meshBasicMaterial color={color} transparent opacity={0.68} side={THREE.DoubleSide} />
        </Ring>
        <Text position={[0, 0, 0.02]} fontSize={0.085} color="#ffffff" anchorX="center" anchorY="middle">
          {label}
        </Text>
        <pointLight color={color} intensity={delay} distance={1.4} />
      </group>
    </Float>
  );
}

function GlassGeometry() {
  const wireRef = useRef();

  useFrame((state) => {
    if (!wireRef.current) return;
    wireRef.current.rotation.x = state.clock.elapsedTime * 0.18;
    wireRef.current.rotation.y = state.clock.elapsedTime * 0.24;
  });

  return (
    <>
      <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.3}>
        <mesh position={[1.75, 0.78, -0.35]}>
          <sphereGeometry args={[0.24, 32, 32]} />
          <meshPhysicalMaterial
            color="#dff7ff"
            transmission={0.62}
            opacity={0.34}
            transparent
            roughness={0.05}
            metalness={0.1}
          />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.42} floatIntensity={0.3}>
        <group position={[-1.85, 0.54, -0.15]} rotation={[0.55, 0.18, 0.22]}>
          <Ring args={[0.34, 0.37, 64]}>
            <meshBasicMaterial color={accent.violet} transparent opacity={0.46} side={THREE.DoubleSide} />
          </Ring>
          <Ring args={[0.48, 0.495, 64]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color={accent.cyan} transparent opacity={0.26} side={THREE.DoubleSide} />
          </Ring>
        </group>
      </Float>
      <lineSegments ref={wireRef} position={[1.4, -0.18, 0.45]}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(0.32, 1)]} />
        <lineBasicMaterial color={accent.cyan} transparent opacity={0.52} />
      </lineSegments>
    </>
  );
}

function OrbitLines() {
  const points = useMemo(() => {
    const curve = [];
    for (let i = 0; i <= 120; i += 1) {
      const t = (i / 120) * Math.PI * 2;
      curve.push([Math.cos(t) * 2.25, Math.sin(t) * 0.32 - 0.08, Math.sin(t) * 1.05 - 0.22]);
    }
    return curve;
  }, []);

  return <Line points={points} color={accent.cyan} transparent opacity={0.22} lineWidth={1} />;
}

function SceneContent({ reducedMotion }) {
  return (
    <>
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 5.5, 11]} />
      <ambientLight intensity={0.62} />
      <directionalLight position={[3.5, 4.5, 4]} intensity={2.1} />
      <pointLight position={[-2.4, 1.8, 2.1]} color={accent.cyan} intensity={5.4} distance={6} />
      <pointLight position={[2.6, -0.1, 1.2]} color={accent.violet} intensity={4.2} distance={5.2} />

      <ParticleGalaxy reducedMotion={reducedMotion} />
      <OrbitLines />
      <Laptop />
      <CodePanel
        position={[-1.45, 0.76, -0.28]}
        rotation={[0.04, 0.55, -0.03]}
        label="ui.system"
        lines={['React + R3F', 'GSAP reveals', 'Tailwind tokens']}
        color={accent.cyan}
        delay={0.2}
      />
      <CodePanel
        position={[1.38, 0.86, -0.5]}
        rotation={[0.08, -0.55, 0.03]}
        label="api.layer"
        lines={['Node routes', 'Mongo models', 'GitHub flow']}
        color={accent.violet}
        delay={1.4}
      />
      <TechBadge position={[-0.95, 1.48, -0.2]} label="React" color={accent.cyan} delay={1.1} />
      <TechBadge position={[0.2, 1.62, -0.42]} label="Node" color="#22c55e" delay={0.8} />
      <TechBadge position={[1.2, 1.36, -0.2]} label="GitHub" color="#ffffff" delay={0.55} />
      <GlassGeometry />
      <CameraRig reducedMotion={reducedMotion} />
      <Preload all />
    </>
  );
}

const DeveloperScene = memo(function DeveloperScene() {
  const reducedMotion = usePrefersReducedMotion();
  const [dpr, setDpr] = useState(1.25);

  return (
    <Canvas
      shadows={false}
      dpr={dpr}
      camera={{ position: [0, 0.5, 5.25], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping
      }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
      <SceneContent reducedMotion={reducedMotion} />
    </Canvas>
  );
});

export default DeveloperScene;
