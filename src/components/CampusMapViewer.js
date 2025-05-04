import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function normalizeRoom(room) {
  if (!room) return "";

  // If format is like 148G → G-148
  const match = room.match(/^(\d+)([A-Za-z])$/);
  if (match) {
    return `G-${match[1]}`;
  }

  // If it's already like G-148
  return room.toUpperCase();
}


function FCITModel({ currentRoom }) {
  const { scene } = useGLTF("/models/CPIT405FloorPlan.glb");
  const { camera } = useThree();
  const meshRefs = useRef({});

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;

      const name = child.name.toLowerCase();

      if (name === "base" || name === "border") {
        // Starbucks logo
        child.material = new THREE.MeshStandardMaterial({
          color: "#0e6a3b",
          side: THREE.DoubleSide,
        });
      } else if (name.includes("tag")) {
        // G-XXXTag
        child.material = new THREE.MeshStandardMaterial({
          color: "#808080", // أبيض
          side: THREE.DoubleSide,
        });
      } else if (name.includes("text")) {
        // G-XXXText
        child.material = new THREE.MeshStandardMaterial({
          color: "#ffffff", // أسود
          side: THREE.DoubleSide,
        });
      } else {
        let isCurrent = false;
        const roomName = currentRoom?.room || "";

        if (roomName.includes("G")) {
          const normalizedCurrent = normalizeRoom(roomName);
          isCurrent = name.toUpperCase() === normalizedCurrent;
        }

        child.material = new THREE.MeshStandardMaterial({
          color: "#F5FFFA",
          emissive: isCurrent ? new THREE.Color("#ffff66") : new THREE.Color(0x000000),
          side: THREE.DoubleSide,
        });
      }
    });
  }, [scene, currentRoom]);

  return <primitive object={scene} />;
}

export default function CampusMapViewer({ schedule, currentRoom }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [-10, 20, 15], fov: 7 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
        <FCITModel currentRoom={currentRoom} />
        <OrbitControls
          enablePan
          enableRotate
          enableZoom
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
}
