import * as THREE from "three";
import { OrbitControls } from "orbitcontrols";
import { Vector3 } from "three";

// Scene
const scene = new THREE.Scene();

// Camera
const fov = 120;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = 0;
camera.position.y = 1;
camera.position.z = 1.8;
camera.lookAt(new Vector3(0, 0, 0));
// Renderers
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 2;
controls.maxDistance = 6;
controls.maxPolarAngle = Math.PI / 2;
controls.update();

// Light

// AmbientLight
//const light = new THREE.AmbientLight(0xffffff, 0.8);

// DirectionalLight
// const light = new THREE.DirectionalLight(0xffffff, 0.8);
// light.position.set(1, 1, 1);
// const helper = new THREE.DirectionalLightHelper(light, 0.2, 0x0000ff);

// HemisphereLight
//const light = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.3);

// PointLight
const light = new THREE.PointLight(0xffffff);
light.position.set(0.5, 0.5, 0.5);
const helper = new THREE.PointLightHelper(light);

// RectAreaLight
// const light = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5);
// light.position.set(0.5, 0.5, 1);
// light.lookAt(0, 0, 0);

// SpotLight
//const light = new THREE.SpotLight(0xffffff, 0.5);
// light.position.set(0.5, 0.5, 1);
// light.lookAt(0, 0, 0);

light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.radius = 8;
scene.add(helper);
scene.add(light);

// Plane (Floor)
let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xeeeeee })
);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.5;
plane.receiveShadow = true;
scene.add(plane);

function render(time) {
    time *= 0.001;
    meshes.forEach((mesh) => {
        mesh.rotation.y = time;
    });
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

//const geometry = new THREE.SphereGeometry(0.5, 32, 16);
const geometry = new THREE.IcosahedronGeometry(0.5, 0);
//const geometry = new THREE.ConeGeometry(0.4, 0.7, 6);
const materials = [new THREE.MeshStandardMaterial({ color: 0x004fff })];

const meshes = [];
materials.forEach((material, index) => {
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -materials.length / 2 + index;
    mesh.castShadow = true;
    scene.add(mesh);
    meshes.push(mesh);
});
function OnWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", OnWindowResize);
