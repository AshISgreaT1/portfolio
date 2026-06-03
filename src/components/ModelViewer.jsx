/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Html, OrbitControls, useProgress } from '@react-three/drei';
import * as THREE from 'three';

const degToRad = (degrees) => (degrees * Math.PI) / 180;

function LocalModel() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, -0.06, 0]} rotation={[0.04, 0.08, 0]}>
        <boxGeometry args={[1.85, 0.5, 0.82]} />
        <meshStandardMaterial color="#10c7ff" metalness={0.32} roughness={0.24} />
      </mesh>
      <mesh castShadow receiveShadow position={[-0.08, 0.34, 0]} rotation={[0, 0.05, 0]}>
        <boxGeometry args={[0.92, 0.48, 0.68]} />
        <meshPhysicalMaterial color="#7c3cff" metalness={0.22} roughness={0.18} transmission={0.08} transparent opacity={0.86} />
      </mesh>
      {[-0.62, 0.62].map((x) =>
        [-0.46, 0.46].map((z) => (
          <mesh key={`${x}-${z}`} castShadow receiveShadow position={[x, -0.39, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.16, 36]} />
            <meshStandardMaterial color="#0b1120" metalness={0.35} roughness={0.38} />
          </mesh>
        ))
      )}
      <mesh position={[0.78, 0.02, 0.43]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#ffffff" emissive="#67e8f9" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[0.78, 0.02, -0.43]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#ffffff" emissive="#67e8f9" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[0, -0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85, 1.05, 96]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function Loader({ placeholderSrc }) {
  const { progress, active } = useProgress();

  if (!active && placeholderSrc) return null;

  return (
    <Html center>
      {placeholderSrc ? (
        <img src={placeholderSrc} width={128} height={128} style={{ filter: 'blur(8px)', borderRadius: 8 }} alt="" />
      ) : (
        <span style={{ color: '#e2e8f0', fontSize: 13 }}>{Math.round(progress)}%</span>
      )}
    </Html>
  );
}

function ModelInner({
  url,
  modelXOffset,
  modelYOffset,
  defaultRotationX,
  defaultRotationY,
  enableMouseParallax,
  enableHoverRotation,
  autoRotate,
  autoRotateSpeed,
  fadeIn,
  onModelLoaded
}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerCurrent = useRef({ x: 0, y: 0 });
  const hoverTarget = useRef({ x: 0, y: 0 });
  const hoverCurrent = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useLayoutEffect(() => {
    if (!innerRef.current || !outerRef.current) return undefined;

    const group = innerRef.current;
    const bounds = new THREE.Box3().setFromObject(group);
    const sphere = bounds.getBoundingSphere(new THREE.Sphere());
    const scale = sphere.radius ? 1 / (sphere.radius * 2) : 1;

    group.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
    group.scale.setScalar(scale);
    outerRef.current.rotation.set(degToRad(defaultRotationX), degToRad(defaultRotationY), 0);
    onModelLoaded?.();
    return undefined;
  }, [defaultRotationX, defaultRotationY, onModelLoaded]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;

      if (enableMouseParallax) {
        pointerTarget.current = { x: -x * 0.08, y: y * 0.08 };
      }

      if (enableHoverRotation) {
        hoverTarget.current = { x: y * degToRad(6), y: x * degToRad(6) };
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [enableHoverRotation, enableMouseParallax]);

  useFrame((_, delta) => {
    if (!outerRef.current) return;

    pointerCurrent.current.x += (pointerTarget.current.x - pointerCurrent.current.x) * 0.1;
    pointerCurrent.current.y += (pointerTarget.current.y - pointerCurrent.current.y) * 0.1;
    hoverCurrent.current.x += (hoverTarget.current.x - hoverCurrent.current.x) * 0.12;
    hoverCurrent.current.y += (hoverTarget.current.y - hoverCurrent.current.y) * 0.12;

    outerRef.current.position.x = modelXOffset + pointerCurrent.current.x;
    outerRef.current.position.y = modelYOffset + pointerCurrent.current.y;
    outerRef.current.rotation.x = degToRad(defaultRotationX) + hoverCurrent.current.x;
    outerRef.current.rotation.y = degToRad(defaultRotationY) + hoverCurrent.current.y;

    if (autoRotate) {
      outerRef.current.rotation.y += autoRotateSpeed * delta;
    }
  });

  useEffect(() => {
    camera.position.set(0, 0, 2.8);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
      <group ref={outerRef}>
      <group ref={innerRef}>
        <LocalModel />
      </group>
    </group>
  );
}

export default function ModelViewer({
  url,
  width = '100%',
  height = '100%',
  modelXOffset = 0,
  modelYOffset = 0,
  defaultRotationX = -18,
  defaultRotationY = 25,
  defaultZoom = 2.8,
  minZoomDistance = 1.4,
  maxZoomDistance = 5,
  enableMouseParallax = true,
  enableHoverRotation = true,
  enableManualZoom = true,
  ambientIntensity = 0.45,
  keyLightIntensity = 1.2,
  fillLightIntensity = 0.55,
  rimLightIntensity = 1,
  environmentPreset = 'city',
  placeholderSrc,
  fadeIn = true,
  autoRotate = true,
  autoRotateSpeed = 0.25,
  onModelLoaded
}) {
  return (
    <div style={{ width, height, position: 'relative', touchAction: 'pan-y pinch-zoom' }}>
      <Canvas
        shadows
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
        camera={{ fov: 45, position: [0, 0, defaultZoom], near: 0.01, far: 100 }}
        style={{ background: 'transparent', touchAction: 'pan-y pinch-zoom' }}
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[4, 5, 5]} intensity={keyLightIntensity} castShadow />
        <directionalLight position={[-4, 2, 4]} intensity={fillLightIntensity} />
        <directionalLight position={[0, 5, -5]} intensity={rimLightIntensity} />
        <ContactShadows position={[0, -0.58, 0]} opacity={0.35} scale={6} blur={2.4} />
        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
          <ModelInner
            url={url}
            modelXOffset={modelXOffset}
            modelYOffset={modelYOffset}
            defaultRotationX={defaultRotationX}
            defaultRotationY={defaultRotationY}
            enableMouseParallax={enableMouseParallax}
            enableHoverRotation={enableHoverRotation}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            fadeIn={fadeIn}
            onModelLoaded={onModelLoaded}
          />
        </Suspense>
        <OrbitControls enablePan={false} enableRotate={false} enableZoom={enableManualZoom} minDistance={minZoomDistance} maxDistance={maxZoomDistance} />
      </Canvas>
    </div>
  );
}
