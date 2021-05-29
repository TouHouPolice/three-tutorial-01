import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WavePlane(props) {
  const {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    args = [15, 15, 10, 10],
    color = 0x006b99
  } = props;

  const mesh = useRef();

  function addDepth(mesh) {
    console.log("called");
    const vPositions = mesh.geometry.attributes.position.array;
    for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
      const index = 3 * i;
      const x = vPositions[index];
      const y = vPositions[index + 1];
      const z = vPositions[index + 2];
      vPositions[index + 2] = z + Math.random();
    }
  }

  // useEffect(() => {
  //   console.log(mesh.current);
  // }, [args]);

  useFrame((state, delta) => {});

  return (
    <mesh
      onUpdate={mesh => {
        addDepth(mesh);
      }}
      // ref={mesh}
      position={position}
      rotation={rotation}
    >
      <planeGeometry attach="geometry" args={args} />
      <meshStandardMaterial
        attach="material"
        color={color}
        side={THREE.DoubleSide}
        flatShading={THREE.FlatShading}
      />
    </mesh>
  );
}
