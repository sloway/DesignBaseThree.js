import * as THREE from "three";
import { OrbitControls } from "orbitcontrols";

// Scene
const scene = new THREE.Scene();

// Camera
const fov = 75;
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

function render(time) {
    time *= 0.001;
    meshes.forEach((mesh) => {
        mesh.rotation.y = time;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

// Texture
const textureLoader = new THREE.TextureLoader();
const textureBaseColor = textureLoader.load(
    "./Textures/Stylized_Stone_Floor_005_basecolor.jpg"
);
const textureNormalMap = textureLoader.load(
    "./Textures/Stylized_Stone_Floor_005_normal.jpg"
);
const textureHeightMap = textureLoader.load(
    "./Textures/Stylized_Stone_Floor_005_height.png"
);
const textureRoughnessMap = textureLoader.load(
    "./Textures/Stylized_Stone_Floor_005_roughness.jpg"
);

const geometry = new THREE.SphereGeometry(0.3, 32, 16);
const materials = [
    new THREE.MeshStandardMaterial({ map: textureBaseColor }),
    new THREE.MeshStandardMaterial({
        map: textureBaseColor,
        normalMap: textureNormalMap,
    }),
    new THREE.MeshStandardMaterial({
        map: textureBaseColor,
        normalMap: textureNormalMap,
        displacementMap: textureHeightMap,
        displacementScale: 0.1,
    }),
    new THREE.MeshStandardMaterial({
        map: textureBaseColor,
        normalMap: textureNormalMap,
        displacementMap: textureHeightMap,
        displacementScale: 0.1,
        roughnessMap: textureRoughnessMap,
        roughness: 0.8,
    }),
];

const meshes = [];
materials.forEach((material, index) => {
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -1.5 + index;
    scene.add(mesh);
    meshes.push(mesh);
});
function OnWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", OnWindowResize);
