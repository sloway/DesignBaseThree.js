import * as THREE from "three";
import { Camera } from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x004fff);

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const canvas = document.querySelector("#canvas3d");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
