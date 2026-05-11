import { memo, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Stars, PerformanceMonitor, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

const AVATAR_BASE_Y = -0.55;

function seededRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function CameraRig({ reducedMotion }) {
  const { camera, pointer } = useThree();

  useFrame((state) => {
    if (reducedMotion) return;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.45, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.45 + pointer.y * 0.25, 0.035);
    camera.lookAt(0, 0, 0);
    state.scene.rotation.y = THREE.MathUtils.lerp(state.scene.rotation.y, pointer.x * 0.08, 0.025);
  });

  return null;
}

function AvatarCard({ reducedMotion }) {
  const group = useRef();
  const face = useRef();
  const texture = useLoader(THREE.TextureLoader, '/images/ayush-bitmoji-full-transparent.png');

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
  }, [texture]);

  useFrame((state) => {
    if (!group.current) return;
    const scrollLimit = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollProgress = reducedMotion ? 0 : window.scrollY / scrollLimit;
    const scrollTilt = Math.sin(scrollProgress * Math.PI * 2) * 0.32;

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, scrollTilt, 0.055);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.22, 0.05);
    group.current.position.y = AVATAR_BASE_Y;

    if (face.current) {
      face.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.4) * 0.025;
    }
  });

  return (
    <group ref={group} position={[0, AVATAR_BASE_Y, 0]}>
      <mesh ref={face} position={[0, 0.02, 0.04]}>
        <planeGeometry args={[2.9, 3.68]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.08} depthWrite={false} />
      </mesh>
    </group>
  );
}

function InterstellarBackdrop() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    const base = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    base.addColorStop(0, '#03111f');
    base.addColorStop(0.38, '#080b1a');
    base.addColorStop(0.72, '#11112a');
    base.addColorStop(1, '#050816');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cyanNebula = ctx.createRadialGradient(260, 250, 20, 260, 250, 420);
    cyanNebula.addColorStop(0, 'rgba(79, 220, 255, 0.34)');
    cyanNebula.addColorStop(0.42, 'rgba(22, 93, 142, 0.18)');
    cyanNebula.addColorStop(1, 'rgba(3, 17, 31, 0)');
    ctx.fillStyle = cyanNebula;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const violetNebula = ctx.createRadialGradient(790, 520, 30, 790, 520, 520);
    violetNebula.addColorStop(0, 'rgba(139, 92, 246, 0.32)');
    violetNebula.addColorStop(0.48, 'rgba(66, 35, 120, 0.16)');
    violetNebula.addColorStop(1, 'rgba(5, 8, 22, 0)');
    ctx.fillStyle = violetNebula;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width * 0.52, canvas.height * 0.48);
    ctx.rotate(-0.28);
    const galaxy = ctx.createRadialGradient(0, 0, 10, 0, 0, 360);
    galaxy.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
    galaxy.addColorStop(0.18, 'rgba(79, 220, 255, 0.2)');
    galaxy.addColorStop(0.7, 'rgba(139, 92, 246, 0.08)');
    galaxy.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = galaxy;
    ctx.scale(1.85, 0.34);
    ctx.beginPath();
    ctx.arc(0, 0, 360, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    for (let index = 0; index < 170; index += 1) {
      const x = seededRandom(index + 11) * canvas.width;
      const y = seededRandom(index + 29) * canvas.height;
      const size = seededRandom(index + 47) * 1.35 + 0.25;
      ctx.globalAlpha = seededRandom(index + 83) * 0.7 + 0.2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    return canvasTexture;
  }, []);

  return (
    <mesh position={[0, 0, -2.4]}>
      <planeGeometry args={[8.5, 6]} />
      <meshBasicMaterial map={texture} depthWrite={false} />
    </mesh>
  );
}

function SceneContent({ reducedMotion }) {
  return (
    <>
      <InterstellarBackdrop />
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-3, 1.5, 2]} color="#8b5cf6" intensity={3} distance={7} />
      <Stars radius={45} depth={22} count={reducedMotion ? 260 : 720} factor={3.4} saturation={0} fade speed={reducedMotion ? 0 : 0.22} />
      <AvatarCard reducedMotion={reducedMotion} />
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
      camera={{ position: [0, 0.45, 5.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
      <SceneContent reducedMotion={reducedMotion} />
    </Canvas>
  );
});

export default DeveloperScene;
