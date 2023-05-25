import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { MeshReflectorMaterial, useGLTF  } from "@react-three/drei";
import { RepeatWrapping, TextureLoader } from "three";
import * as THREE from "three";

export const Ground = () => {
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/terrain-roughness.jpg",
    process.env.PUBLIC_URL + "textures/terrain-normal.jpg"
  ]);

// const logo =  useGLTF("./logo/hookaRed.glb");
const { scene } = useGLTF("./logo/logoBig.glb")
  useEffect(() => {
    [roughness, normal].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });

    // [logo].forEach((t) => {
    //   t.repeat.set(5, 5);
    //   t.center.set(0.5, 0.5);
    // });
  }, [roughness, normal]);

  return (
    <mesh rotation-x={-Math.PI * 0.5}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        normalScale={[0.3, 0.3]}
        roughnessMap={roughness}
        color={[0.08, 0.08, 0.08]}
        // map={logo}
      />

<primitive
        object={scene}
   
      />
    </mesh>
  );
};
