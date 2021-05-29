import React, { useState, useEffect } from "react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three-stdlib/controls/OrbitControls";

import Cube from "./three_components/cube";
import WavePlane from "./three_components/wave_plane";

import DatGui, {
  DatBoolean,
  DatColor,
  DatNumber,
  DatString
} from "react-dat-gui";

extend({ OrbitControls });

export default function Home() {
  const [planeData, setPlaneData] = useState({
    width: 15,
    height: 15,
    widthSegments: 10,
    heightSegments: 10
  });

  function handleDatUpdate(newData) {
    setPlaneData(newData);
  }

  return (
    <>
      <DatGui
        style={{ zIndex: "99" }}
        data={planeData}
        onUpdate={handleDatUpdate}
      >
        <DatNumber path="width" label="Width" min={1} max={100} step={1} />
        <DatNumber path="height" label="Height" min={1} max={100} step={1} />
        <DatNumber
          path="widthSegments"
          label="Width Segments"
          min={1}
          max={50}
          step={1}
        />
        <DatNumber
          path="heightSegments"
          label="Height Segments"
          min={1}
          max={50}
          step={1}
        />
      </DatGui>

      <Canvas camera={{ fov: 75, near: 0.1, far: 999, position: [0, 0, 10] }}>
        <Scene planeData={planeData} />
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
        color={0xff0000}
        position={[0, 0, 0]}
        args={[
          planeData.width,
          planeData.height,
          planeData.widthSegments,
          planeData.heightSegments
        ]}
      ></WavePlane>
      <orbitControls
        enableZoom={false}
        minPolarAngle={0.785398}
        maxPolarAngle={2.35619}
        minAzimuthAngle={-0.785398}
        maxAzimuthAngle={0.785398}
        args={[camera, domElement]}
      ></orbitControls>

      <ambientLight intensity={0.2} />
      <pointLight color="white" intensity={1} position={[0, 0, 5]} />
      <pointLight color="white" intensity={1} position={[0, 0, -5]} />
    </>
  );
}
