import * as THREE from "three";
import { Camera } from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x004fff);

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

let cube = CreateCube();
let cone = CreateCone();
let icosahedron = CreateIcosahedron();
cone.position.x = -1;
icosahedron.position.x = 1;
scene.add(cube);
scene.add(cone);
scene.add(icosahedron);

function render(time) {
    time *= 0.001;
    //cube.rotation.x = time;
    cube.rotation.y = time;
    //cone.rotation.x = time;
    cone.rotation.y = time;
    //icosahedron.rotation.x = time;
    icosahedron.rotation.y = time;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

function CreateCube() {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    return CreateMesh(geometry);
}

function CreateCone() {
    const geometry = new THREE.ConeGeometry(0.4, 0.6, 6);
    return CreateMesh(geometry);
}

function CreateIcosahedron() {
    const geometry = new THREE.IcosahedronGeometry(0.4, 0);
    return CreateMesh(geometry);
}

function CreateMesh(geometry) {
    const material = new THREE.MeshStandardMaterial({ color: 0x999999 });
    return new THREE.Mesh(geometry, material);
}

function OnWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", OnWindowResize);
