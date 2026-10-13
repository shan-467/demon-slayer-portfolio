import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

function palette() {
  const css = getComputedStyle(document.documentElement);
  const read = (name: string) => css.getPropertyValue(name).trim();
  return { void: read("--castle-void"), wood: read("--castle-wood"), grain: read("--castle-grain"), paper: read("--castle-paper"), lantern: read("--castle-lantern"), cool: read("--castle-cool") };
}

// Generated impossible architecture: suspended shoji rooms, bridges and inverted halls.
function Labyrinth({ playing, progress }: { playing: boolean; progress: React.RefObject<number> }) {
  const beams = useRef<THREE.InstancedMesh>(null);
  const panels = useRef<THREE.InstancedMesh>(null);
  const floors = useRef<THREE.InstancedMesh>(null);
  const time = useRef(0);
  const colors = useMemo(palette, []);
  const textures = useMemo(() => {
    const make = (paper: boolean) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = paper ? colors.paper : colors.wood;
        ctx.fillRect(0, 0, 128, 128);
        ctx.strokeStyle = colors.grain;
        ctx.lineWidth = paper ? 4 : 1;
        for (let i = 0; i < 128; i += paper ? 32 : 4) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + (paper ? 0 : Math.sin(i) * 3), 128); ctx.stroke();
          if (paper) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(128, i); ctx.stroke(); }
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };
    return { paper: make(true), wood: make(false) };
  }, [colors]);
  useEffect(() => () => { textures.paper.dispose(); textures.wood.dispose(); }, [textures]);
  useEffect(() => {
    if (!beams.current || !panels.current || !floors.current) return;
    const dummy = new THREE.Object3D();
    const matrix = new THREE.Matrix4();
    let b = 0, p = 0, f = 0;
    const place = (mesh: THREE.InstancedMesh, index: number, base: THREE.Matrix4, x: number, y: number, z: number, sx: number, sy: number, sz: number) => {
      dummy.position.set(x, y, z); dummy.rotation.set(0, 0, 0); dummy.scale.set(sx, sy, sz); dummy.updateMatrix();
      matrix.multiplyMatrices(base, dummy.matrix); mesh.setMatrixAt(index, matrix);
    };
    for (let layer = 0; layer < 7; layer++) {
      for (let side = 0; side < 4; side++) {
        const origin = new THREE.Object3D();
        const angle = side * Math.PI / 2 + layer * 0.12;
        origin.position.set(Math.cos(angle) * 10, (layer - 3) * 5, Math.sin(angle) * 10 - 12);
        origin.rotation.set(layer % 3 === 0 ? Math.PI : 0, -angle, layer % 2 === 0 ? 0.08 : -0.08);
        origin.updateMatrix();
        const base = origin.matrix;
        place(floors.current, f++, base, 0, 0, 0, 8.5, 0.25, 7);
        place(floors.current, f++, base, 0, 4, 0, 9, 0.22, 7.5);
        place(floors.current, f++, base, 0, -0.3, 6, 2, 0.15, 8);
        for (const x of [-4, 0, 4]) {
          for (const z of [-3, 3]) place(beams.current, b++, base, x, 2, z, 0.2, 4, 0.2);
        }
        for (const y of [0.5, 3.7]) {
          place(beams.current, b++, base, 0, y, 3.15, 8.6, 0.16, 0.16);
          place(beams.current, b++, base, 0, y, -3.15, 8.6, 0.16, 0.16);
        }
        for (const x of [-3, -1, 1, 3]) {
          place(panels.current, p++, base, x, 2, -3, 1.9, 3.4, 0.08);
        }
        for (const x of [-4, 4]) place(panels.current, p++, base, x, 2, 0, 0.08, 3.4, 5.8);
        for (let step = 0; step < 9; step++) place(beams.current, b++, base, 3, -step * 0.25, 4 + step * 0.45, 1.8, 0.16, 0.5);
      }
    }
    beams.current.count = b; panels.current.count = p; floors.current.count = f;
    for (const mesh of [beams.current, panels.current, floors.current]) { mesh.instanceMatrix.needsUpdate = true; mesh.computeBoundingSphere(); }
  }, []);
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, pointer }, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (playing) time.current += dt;
    target.set(Math.sin(time.current * 0.1) * 2.4 + pointer.x * 1.2, 3 - progress.current * 7 + pointer.y * 0.7, 23 - progress.current * 8);
    camera.position.lerp(target, 1 - Math.exp(-2 * dt));
    camera.lookAt(0, -1 - progress.current * 4, -12);
  });
  return <>
    <color attach="background" args={[colors.void]} />
    <fog attach="fog" args={[colors.void, 30, 95]} />
    <ambientLight intensity={0.8} />
    <directionalLight position={[0, 12, 14]} color={colors.lantern} intensity={2.5} />
    <pointLight position={[0, 0, -4]} color={colors.lantern} intensity={90} distance={50} />
    <Environment resolution={64}>
      <Lightformer intensity={2} position={[0, 10, 0]} scale={[30, 30, 1]} color={colors.lantern} />
      <Lightformer intensity={1} position={[-10, 0, 0]} rotation-y={Math.PI / 2} scale={[20, 10, 1]} color={colors.cool} />
    </Environment>
    <instancedMesh ref={beams} args={[undefined, undefined, 600]}><boxGeometry /><meshStandardMaterial map={textures.wood} roughness={0.8} /></instancedMesh>
    <instancedMesh ref={floors} args={[undefined, undefined, 100]}><boxGeometry /><meshStandardMaterial map={textures.wood} roughness={0.65} /></instancedMesh>
    <instancedMesh ref={panels} args={[undefined, undefined, 200]}><boxGeometry /><meshStandardMaterial map={textures.paper} emissive={colors.lantern} emissiveIntensity={0.35} roughness={0.95} /></instancedMesh>
  </>;
}

export default function InfinityCastleScene({ playing, progress, active }: { playing: boolean; progress: React.RefObject<number>; active: boolean }) {
  return <Canvas aria-label="Three-dimensional Infinity Castle with suspended rooms and stairways" dpr={1} frameloop={active ? "always" : "never"} camera={{ position: [0, 3, 23], fov: 65 }} gl={{ antialias: true, alpha: false }}><Labyrinth playing={playing} progress={progress} /></Canvas>;
}