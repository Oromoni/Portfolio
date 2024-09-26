"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'dat.gui'
import { gsap } from "gsap";


const ThreeScene = () => {
    const mountRef = useRef(null);
    // const gui = new dat.GUI()

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    useEffect(() => {
        if (!mountRef.current) return;

        // Create the scene
        const scene = new THREE.Scene();


        // Create a camera, which determines what we'll see when we render the scene
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 25;

        // Create a renderer and attach it to the DOM
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(2)
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create a geometry and a material and combine them into a mesh

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.enableZoom = false;
        controls.autoRotate = true
        controls.autoRotateSpeed = 3



        const geometry = new THREE.SphereGeometry(9, 60, 55);
        const material = new THREE.MeshStandardMaterial({ color: '#00ff83', });
        material.metalness = 0.8
        material.roughness = 1.80;

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);


        const light = new THREE.PointLight(0xffffff, 200, 100);
        light.position.set(10, 12, 15);
        light.intensity = 150

        const light2 = new THREE.PointLight(0xff0000, 200, 100);
        light2.position.set(2.13, -3, -1.98);
        light2.intensity = 150

        scene.add(light, light2);


        // Render loop
        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.x += 0.02;
            sphere.rotation.y += 0.02;
            light.rotation.x += 0.02

            renderer.render(scene, camera);
            controls.update();

        };
        animate();



        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        })

        let mouseDown = false
        let rgb = []
        window.addEventListener("mousedown", () => (mouseDown = true))
        window.addEventListener("mouseup", () => (mouseDown = false))

        window.addEventListener("mousemove", (e) => {
            if (mouseDown) {
                rgb = [
                    Math.round((e.pageX / window.innerWidth) * 255),
                    Math.round((e.pageY / window.innerHeight) * 255),
                    getRandomNumber(150, 250),


                ]
                let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
                gsap.to(sphere.material.color, {
                    r: newColor.r,
                    g: newColor.g,
                    b: newColor.b,
                })
            }
        })



        // Clean up on component unmount
        return () => {
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref = { mountRef }
    style = {
        { width: '100vw', height: '200vh', position: 'absolute', }
    }
    />;
};

export default ThreeScene;