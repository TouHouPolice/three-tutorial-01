import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Cube(props) {
  const { position = [0, 0, 0], rotation = [0, 0, 0] } = props;

  const mesh = useRef();

  useFrame((state, delta) => {
    // console.log(10 * delta);
    // console.log(mesh.current.rotation.y);
    mesh.current.rotation.y += 0.1 * delta;
    mesh.current.rotation.x += 0.1 * delta;
  });

  return (
    <>
      <mesh ref={mesh} position={position} rotation={rotation}>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={0xf542d1} />
      </mesh>
    </>
  );
}
