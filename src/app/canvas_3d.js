import React, { useState, useEffect } from "react";

import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three-stdlib/controls/OrbitControls";

import WavePlane from "./three_components/wave_plane";

import DatGui, { DatNumber } from "react-dat-gui";

extend({ OrbitControls });

export default function Canvas3D() {
  const [colorData, setColorData] = useState({
    r: 0.1,
    g: 0.5,
    b: 0.1
  });

  function handleDatUpdate(newData) {
    setColorData(newData);
  }

  return (
    <>
      <DatGui
        style={{ zIndex: "99" }}
        data={colorData}
        onUpdate={handleDatUpdate}
      >
        <DatNumber path="r" label="r" min={0} max={1} step={0.01} />
        <DatNumber path="g" label="g" min={0} max={1} step={0.01} />
        <DatNumber path="b" label="b" min={0} max={1} step={0.01} />
      </DatGui>

      <Canvas
        className="canvas-3d"
        camera={{ fov: 75, near: 0.1, far: 999, position: [0, 0, 10] }}
      >
        <Scene planeData={colorData} />
      </Canvas>
    </>
  );
}

function Scene(props) {
  const { planeData } = props;

  const {
    camera,
    gl: { domElement }
  } = useThree();

  return (
    <>
      <WavePlane
        position={[0, 0, -100]}
        hoverColor={[planeData.r, planeData.g, planeData.b]}
      ></WavePlane>
      <orbitControls
        enableZoom={false}
        minPolarAngle={0.785398}
        maxPolarAngle={2.35619}
        minAzimuthAngle={-0.785398}
        maxAzimuthAngle={0.785398}
        args={[camera, domElement]}
      ></orbitControls>
      <directionalLight
        color="white"
        intensity={1}
        position={[0, 0, 5]}
      ></directionalLight>
    </>
  );
}
