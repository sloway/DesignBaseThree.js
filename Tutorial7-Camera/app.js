import * as THREE from "three";
import { OrbitControls } from "orbitcontrols";

// Scene
const scene = new THREE.Scene();

// Camera
const fov = 63;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

// Renderers
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.update();

// Light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 2, 12);
scene.add(light);

// Plane (Floor)
let plane = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xeeeeee })
);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.5;
scene.add(plane);

function render(time) {
    time *= 0.001;
    meshes.forEach((mesh) => {
        mesh.rotation.y = time;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const materials = [new THREE.MeshStandardMaterial({ color: 0xff7f00 })];

const meshes = [];
materials.forEach((material, index) => {
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -materials.length / 2 + index;
    scene.add(mesh);
    meshes.push(mesh);
});
function OnWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", OnWindowResize);
