import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

const ThreeScene = () => {
    const mountRef = useRef(null);

    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    useEffect(() => {
        // Ensure this only runs on the client
        if (typeof window === 'undefined') return;

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

        window.addEventListener('resize', handleResize);

        let mouseDown = false;
        let touchActive = false;
        let rgb = [];

        // Mouse events
        window.addEventListener('mousedown', () => (mouseDown = true));
        window.addEventListener('mouseup', () => (mouseDown = false));

        // Touch events
        window.addEventListener('touchstart', () => (touchActive = true));
        window.addEventListener('touchend', () => (touchActive = false));

        const handleColorChange = (x, y) => {
            rgb = [
                Math.round((x / window.innerWidth) * 255),
                Math.round((y / window.innerHeight) * 255),
                getRandomNumber(150, 250),
            ];
            const newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
            gsap.to(sphere.material.color, {
                r: newColor.r,
                g: newColor.g,
                b: newColor.b,
            });
        };

        window.addEventListener('mousemove', (e) => {
            if (mouseDown) {
                handleColorChange(e.pageX, e.pageY);
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (touchActive) {
                const touch = e.touches[0]; // Get the first touch point
                handleColorChange(touch.clientX, touch.clientY);
            }
        });

        return () => {
            const currentRef = mountRef.current; 
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', () => {});
            window.removeEventListener('touchmove', () => {});
            if (currentRef && renderer.domElement) {
                currentRef.removeChild(renderer.domElement);
            }
        };
    }, []);

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

// Use dynamic import for client-side rendering
const DynamicThreeScene = dynamic(() => Promise.resolve(ThreeScene), {
    ssr: false, // Disable server-side rendering
});

export default DynamicThreeScene;
