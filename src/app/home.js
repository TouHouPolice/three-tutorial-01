import React, { useState, useEffect, useRef } from "react";

import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three-stdlib/controls/OrbitControls.js";

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
    width: 400,
    height: 400,
    widthSegments: 60,
    heightSegments: 60,
    r: 0.1,
    g: 0.5,
    b: 1,
    light: 0.32
  });

  function handleDatUpdate(newData) {
    setPlaneData(newData);
  }

  return (
    <>
      <DatGui
        style={{ zIndex: "99", opacity: 0 }}
        data={planeData}
        onUpdate={handleDatUpdate}
      >
        <DatNumber path="width" label="Width" min={1} max={500} step={1} />
        <DatNumber path="height" label="Height" min={1} max={500} step={1} />
        <DatNumber
          path="widthSegments"
          label="Width Segments"
          min={1}
          max={200}
          step={1}
        />
        <DatNumber
          path="heightSegments"
          label="Height Segments"
          min={1}
          max={200}
          step={1}
        />
        <DatNumber path="r" label="r" min={0} max={1} step={0.01} />
        <DatNumber path="g" label="g" min={0} max={1} step={0.01} />
        <DatNumber path="b" label="b" min={0} max={1} step={0.01} />
        <DatNumber path="light" label="light" min={0} max={1} step={0.01} />
      </DatGui>

      <div className="centered-wrapper">
        <h1 className="header">A mysterious ocean waiting to be discovered</h1>

        <a className="main-btn">Explore</a>
      </div>

      <Canvas
        style={{ backgroundColor: "black" }}
        camera={{ fov: 75, near: 0.1, far: 999, position: [0, 0, 50] }}
      >
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

  const orbitControlsRef = useRef();

  // useFrame((state, dealta) => {
  //   orbitControlsRef.current.update();
  // });

  return (
    <>
      <WavePlane
        position={[0, 0, 0]}
        args={[
          planeData.width,
          planeData.height,
          planeData.widthSegments,
          planeData.heightSegments
        ]}
        hoverColor={[planeData.r, planeData.g, planeData.b]}
        rotation={[-0.1, 0, 2]}
      ></WavePlane>
      <orbitControls
        ref={orbitControlsRef}
        rotateSpeed={0.2}
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        minPolarAngle={1.285398}
        maxPolarAngle={1.75619}
        minAzimuthAngle={-0.285398}
        maxAzimuthAngle={0.285398}
        args={[camera, domElement]}
      ></orbitControls>

      <directionalLight
        color={0xffffff}
        intensity={planeData.light}
        position={[0, -1, 1]}
      ></directionalLight>
      <directionalLight
        color={0xffffff}
        intensity={planeData.light}
        position={[0, 0, -1]}
      ></directionalLight>
    </>
  );
}
