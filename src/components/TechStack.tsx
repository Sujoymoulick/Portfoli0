import * as THREE from "three";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

// Import skills assets
import reactImg from "@/assets/skills/react2.webp";
import nextImg from "@/assets/skills/next2.webp";
import nodeImg from "@/assets/skills/node2.webp";
import expressImg from "@/assets/skills/express.webp";
import mongoImg from "@/assets/skills/mongo.webp";
import mysqlImg from "@/assets/skills/mysql.webp";
import tsImg from "@/assets/skills/typescript.webp";
import jsImg from "@/assets/skills/javascript.webp";

const imageUrls = [
  reactImg,
  nextImg,
  nodeImg,
  expressImg,
  mongoImg,
  mysqlImg,
  tsImg,
  jsImg,
];

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const textures = useMemo(() => imageUrls.map((url) => textureLoader.load(url)), [textureLoader]);

  useEffect(() => {
    const handleScroll = () => {
      const worksSection = document.getElementById("works");
      if (!worksSection) return;
      
      const rect = worksSection.getBoundingClientRect();
      // Activate when the works section is partially out of view at the top 
      // or when the tech stack section (this container) comes into view.
      // For now, let's just use scroll threshold relative to viewport or simple height.
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = rect.top + scrollY;
      setIsActive(scrollY > threshold - 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.1,
          metalness: 0.2,
          roughness: 0.8,
          clearcoat: 0.5,
        })
    );
  }, [textures]);

  return (
    <div id="tech-stack" className="techstack w-full h-[600px] md:h-[800px] relative overflow-hidden bg-black/50 py-20">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 text-center">
        <span className="text-[12px] font-bold tracking-[0.3em] text-[#a1a1aa] uppercase mb-4 block">
          Skills & Core
        </span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white drop-shadow-2xl">
          My Tech Stack
        </h2>
        <p className="text-[#a1a1aa] text-sm mt-4 font-bold tracking-widest uppercase animate-pulse">
            Interactive Play: Move your cursor
        </p>
      </div>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: true, antialias: true }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.2)}
        className="tech-canvas w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={2} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment preset="night" />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
