import gsap from "gsap";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WavePlane(props) {
  const {
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    args = [200, 200, 50, 50],
    hoverColor = [0, 0, 0]
  } = props;

  const mesh = useRef();

  function onMeshUpdate(mesh) {
    setPlaneColors(mesh);
  }

  function setPlaneColors(mesh) {
    const newColors = [];
    for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
      newColors.push(0, 0.19, 0.4);
    }
    mesh.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(newColors), 3)
    );
  }

  function handleRaycast(e) {
    const face = e.intersections[0].face;
    const geometry = e.intersections[0].object.geometry;
    const color = geometry.attributes.color;

    const initColor = {
      r: 0,
      g: 0.19,
      b: 0.4
    };
    const currentHoverColor = {
      r: hoverColor[0],
      g: hoverColor[1],
      b: hoverColor[2]
    };
    gsap.to(currentHoverColor, {
      r: initColor.r,
      g: initColor.g,
      b: initColor.b,
      onUpdate: () => {
        //vertice 1
        color.setXYZ(
          face.a,
          currentHoverColor.r,
          currentHoverColor.g,
          currentHoverColor.b
        );

        //vertice 2
        color.setXYZ(
          face.b,
          currentHoverColor.r,
          currentHoverColor.g,
          currentHoverColor.b
        );

        //vertice 3
        color.setXYZ(
          face.b,
          currentHoverColor.r,
          currentHoverColor.g,
          currentHoverColor.b
        );

        color.needsUpdate = true;
      }
    });
  }

  useEffect(() => {
    const vPositions = mesh.current.geometry.attributes.position.array;
    const randomValues = [];
    const multiplier = 1.5;
    for (let i = 0; i < mesh.current.geometry.attributes.position.count; i++) {
      const index = 3 * i;
      const x = vPositions[index];
      const y = vPositions[index + 1];
      const z = vPositions[index + 2];

      vPositions[index] = x + (Math.random() - 0.5) * multiplier;
      vPositions[index + 1] = y + (Math.random() - 0.5) * multiplier;
      vPositions[index + 2] = z + Math.random() * multiplier * 2;

      randomValues.push(Math.random() * Math.PI * 2);
      randomValues.push(Math.random() * Math.PI * 2);
      randomValues.push(Math.random() * Math.PI * 2);
    }
    mesh.current.geometry.attributes.position.originalPosition = vPositions;
    mesh.current.geometry.attributes.position.randomValues = randomValues;
    console.log("added");
  }, []);

  useFrame((state, delta) => {
    // console.log(state);
    const clock = state.clock;
    const time = (clock.oldTime - clock.startTime + clock.elapsedTime) * 0.001;

    const {
      array,
      originalPosition,
      randomValues
    } = mesh.current.geometry.attributes.position;

    if (originalPosition && randomValues) {
      const multiplier = 1;

      for (
        let i = 0;
        i < mesh.current.geometry.attributes.position.count;
        i++
      ) {
        const index = 3 * i;
        array[index] =
          originalPosition[index] +
          Math.cos(time + randomValues[index]) * 0.0015;
        array[index + 1] =
          originalPosition[index + 1] +
          Math.sin(time + randomValues[index + 1]) * 0.011;
        array[index + 2] =
          originalPosition[index + 2] +
          Math.cos(time + randomValues[index + 2]) * 0.0015;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <mesh
      ref={mesh}
      onPointerMove={e => {
        handleRaycast(e);
      }}
      onUpdate={mesh => {
        onMeshUpdate(mesh);
      }}
      position={position}
      rotation={rotation}
    >
      <planeGeometry attach="geometry" args={args} />
      <meshPhongMaterial
        attach="material"
        // color={color}
        side={THREE.DoubleSide}
        flatShading={THREE.FlatShading}
        vertexColors={true}
      />
    </mesh>
  );
}
