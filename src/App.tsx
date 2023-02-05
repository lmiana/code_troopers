import { useEffect, useState, ReactElement } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function App(): ReactElement<any, any> {
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.rotation.y = (45 / 180) * Math.PI;
    camera.position.x = 800;
    camera.position.y = 100;
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);

    const hlight = new THREE.AmbientLight(0x404040, 8);
    scene.add(hlight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const light = new THREE.PointLight(0xc4c4c4, 2);
    light.position.set(0, 300, 500);
    scene.add(light);
    const light2 = new THREE.PointLight(0xc4c4c4, 2);
    light2.position.set(500, 100, 0);
    scene.add(light2);
    const light3 = new THREE.PointLight(0xc4c4c4, 2);
    light3.position.set(0, 100, -500);
    scene.add(light3);
    const light4 = new THREE.PointLight(0xc4c4c4, 2);
    light4.position.set(-500, 300, 500);
    scene.add(light4);

    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load("/scene.gltf", function (gltf) {
      const car = gltf.scene.children[0];
      car.scale.set(1, 1, 1);
      scene.add(gltf.scene);
      animate();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
  }, []);

  return <></>;
}

export default App;
