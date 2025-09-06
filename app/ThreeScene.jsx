"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";

const ThreeScene = () => {
  const mountRef = useRef(null);

  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.5;

    // Sphere with your original feel
    const geometry = new THREE.SphereGeometry(9, 60, 55);
    const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
    material.metalness = 0.8;
    material.roughness = 1.8;

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // === Lights (slightly tuned for brighter eclipse effect) ===
    const light = new THREE.PointLight(0xffffff, 250, 120); // brighter white
    light.position.set(15, 12, 20);
    scene.add(light);

    const light2 = new THREE.PointLight(0xff0033, 120, 80); // softer red glow
    light2.position.set(-5, -4, -3);
    scene.add(light2);

    const ambient = new THREE.AmbientLight(0x111111, 0.4); // subtle fill light
    scene.add(ambient);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
      controls.update();
    };
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Mouse drag color change
    let mouseDown = false;
    window.addEventListener("mousedown", () => (mouseDown = true));
    window.addEventListener("mouseup", () => (mouseDown = false));

    const handleColorChange = (x, y) => {
      const rgb = [
        Math.round((x / window.innerWidth) * 255),
        Math.round((y / window.innerHeight) * 255),
        getRandomNumber(150, 250),
      ];
      const newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
      gsap.to(sphere.material.color, {
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
      });
    };

    window.addEventListener("mousemove", (e) => {
      if (mouseDown) {
        handleColorChange(e.pageX, e.pageY);
      }
    });

    return () => {
      const currentRef = mountRef.current;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", () => {});
      if (currentRef && renderer.domElement) {
        currentRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "200vh",
        position: "absolute",
      }}
    />
  );
};

// Dynamic import to avoid SSR issues
const DynamicThreeScene = dynamic(() => Promise.resolve(ThreeScene), {
  ssr: false,
});

export default DynamicThreeScene;
