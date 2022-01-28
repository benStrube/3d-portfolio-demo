import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//building the scene
const scene = new THREE.Scene();

//creating the camera view
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//rendering the objects
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//creating the geometry's for the torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

//adding torus to scene
scene.add(torus);

//creating lighting for teh scene
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

//creating wide lighting for the scene
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//creating helpers for the scene and lighting
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

//scene refreshing loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

//calling the refresh loop
animate();
