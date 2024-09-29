"use client"; // Ensure this component runs on the client side
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from "gsap";

const ThreeScene = () => {
    const mountRef = useRef(null);

    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    useEffect(() => {
        // Ensure the mountRef is defined
        if (!mountRef.current) return;

        // Create the scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
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
        controls.autoRotateSpeed = 3;

        const geometry = new THREE.SphereGeometry(9, 60, 55);
        const material = new THREE.MeshStandardMaterial({ color: '#00ff83' });
        material.metalness = 0.8;
        material.roughness = 1.80;

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const light = new THREE.PointLight(0xffffff, 200, 100);
        light.position.set(10, 12, 15);
        scene.add(light);

        const light2 = new THREE.PointLight(0xff0000, 200, 100);
        light2.position.set(2.13, -3, -1.98);
        scene.add(light2);

        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.x += 0.02;
            sphere.rotation.y += 0.02;
            renderer.render(scene, camera);
            controls.update();
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        let mouseDown = false;
        let rgb = [];
        window.addEventListener("mousedown", () => (mouseDown = true));
        window.addEventListener("mouseup", () => (mouseDown = false));

        window.addEventListener("mousemove", (e) => {
            if (mouseDown) {
                rgb = [
                    Math.round((e.pageX / window.innerWidth) * 255),
                    Math.round((e.pageY / window.innerHeight) * 255),
                    getRandomNumber(150, 250),
                ];
                const newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
                gsap.to(sphere.material.color, {
                    r: newColor.r,
                    g: newColor.g,
                    b: newColor.b,
                });
            }
        });

        // Cleanup function
        return () => {
            const currentRef = mountRef.current; // Copy the reference
            window.removeEventListener("resize", handleResize);
            if (currentRef && renderer.domElement) {
                currentRef.removeChild(renderer.domElement);
            }
        };
    }, []); // Ensure empty dependency array

    return (
        <div
            ref={mountRef}
            style={{
                width: '100vw',
                height: '200vh',
                position: 'absolute',
            }}
        />
    );
};

export default ThreeScene;
