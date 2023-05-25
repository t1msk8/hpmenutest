import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { MeshReflectorMaterial, useGLTF  } from "@react-three/drei";
import { RepeatWrapping, TextureLoader } from "three";
import * as THREE from "three";

export const Ground = () => {
  const [roughness, normal, black] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/terrain-roughness.jpg",
    process.env.PUBLIC_URL + "textures/terrain-normal.jpg",
    process.env.PUBLIC_URL + "textures/terrain-grey.jpg"
  ]);

const { scene } = useGLTF("./logo/hookaRED.glb")
  useEffect(() => {
    [roughness, normal].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });

    [black].forEach((t) => {
      t.repeat.set(1, 1);
      
    });
  }, [roughness, normal, black]);

  return (
    <mesh rotation-x={-Math.PI * 0.5}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        normalScale={[0.3, 0.3]}
        roughnessMap={roughness}
        color={[0.5, 0.5, 0.5]}
        map={black}
      />

<primitive
        object={scene}
        position={[0, 0, 3]}
        rotation={[-4.8, 0, 0]}
      />
    </mesh>
  );
};
