import * as THREE from "three";
import { Camera } from "three";

const scene = new THREE.Scene();

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function render(time) {
    time *= 0.001;
    meshes.forEach((mesh) => {
        mesh.rotation.y = time;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 2, 12);
scene.add(light);

const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff7f00 }),
    new THREE.MeshStandardMaterial({
        color: 0xff7f00,
        metalness: 0.6,
        roughness: 0.4,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
    }),
    new THREE.MeshPhysicalMaterial({
        color: 0xff7f00,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
    }),
    new THREE.MeshLambertMaterial({ color: 0xff7f00 }),
    new THREE.MeshPhongMaterial({
        color: 0xff7f00,
        shininess: 60,
        specular: 0x004fff,
    }),
];

const meshes = [];
materials.forEach((material, index) => {
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -2 + index;
    scene.add(mesh);
    meshes.push(mesh);
});
function OnWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", OnWindowResize);
