import * as THREE from "three";
import { OrbitControls } from "orbitcontrols";
import { FontLoader } from "fontloader";
import { TextGeometry } from "textgeometry";

function SetupScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x004fff);
    return scene;
}

function SetupCamera() {
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 3;
    return camera;
}

function SetupRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

function SetupLight(scene) {
    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);
    return light;
}

function SetupOrbitControls() {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 2;
    controls.maxDistance = 6;
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();
    return controls;
}

const scene = SetupScene();
const camera = SetupCamera();
const renderer = SetupRenderer();
const light = SetupLight(scene);
const controls = SetupOrbitControls();

function render(time) {
    time *= 0.001;
    meshes.forEach((mesh) => {
        mesh.rotation.x = mesh.rotation.y = time;
    });

    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

function OnWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", OnWindowResize);

function SetupMeshes() {
    const geometries = [
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.CapsuleGeometry(0.2, 0.5, 4, 8),
        new THREE.CircleGeometry(0.5, 32),
        new THREE.ConeGeometry(0.3, 0.5, 32),
        new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32),
        new THREE.DodecahedronGeometry(0.3, 2),
        new THREE.IcosahedronGeometry(0.3, 2),
        new THREE.OctahedronGeometry(0.3, 2),
        new THREE.PlaneGeometry(0.5, 0.5),
        new THREE.RingGeometry(0.1, 0.3, 32),
        new THREE.SphereGeometry(0.3, 32, 16),
        new THREE.TetrahedronGeometry(0.3, 2),
        new THREE.TorusGeometry(0.2, 0.1, 16, 40),
        new THREE.TorusKnotGeometry(0.2, 0.05, 100, 16),
    ];
    const material = new THREE.MeshStandardMaterial({
        color: 0xff7f00,
        wireframe: true,
    });

    return geometries.map((geometry) => new THREE.Mesh(geometry, material));
}

function SetupMeshNames() {
    return [
        "Box",
        "Capsule",
        "Circle",
        "Cone",
        "Cylinder",
        "Dodecahedron",
        "Icosahedron",
        "Octahedron",
        "Plane",
        "Ring",
        "Sphere",
        "Tetrahedron",
        "Torus",
        "TorusKnot",
    ];
}

function LoadFont() {
    const loader = new FontLoader();
    const fontPath =
        "https://unpkg.com/three@0.145.0/examples/fonts/helvetiker_regular.typeface.json";

    return new Promise((resolve, reject) => {
        loader.load(fontPath, function (font) {
            resolve(font);
        });
    });
}

const font = await LoadFont();
function CreateTextMesh(text) {
    const geometry = new TextGeometry(text, {
        font: font,
        size: 0.1,
        height: 0.1,
    });

    const material = new THREE.MeshBasicMaterial({
        color: 0xeeeeee,
    });

    return new THREE.Mesh(geometry, material);
}

const meshes = SetupMeshes();
const meshNames = SetupMeshNames();
const meshPerLine = 5;
meshes.forEach((mesh, index) => {
    mesh.position.x =
        -Math.floor(meshPerLine / 2) + (index % meshPerLine) * 1.2;
    mesh.position.y = -1 + Math.floor(index / 5) * 1.2;
    scene.add(mesh);

    const nameMesh = CreateTextMesh(meshNames[index]);
    nameMesh.position.set(
        mesh.position.x - 0.3,
        mesh.position.y - 0.5,
        mesh.position.z
    );
    nameMesh.lookAt(camera.position);
    scene.add(nameMesh);
});
