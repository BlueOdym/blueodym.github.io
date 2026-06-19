import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector('canvas.webgl')

// Loaders
const fbxloader = new FBXLoader();
const objloader = new OBJLoader();

// Materials
const fbxMaterial = new THREE.MeshStandardMaterial({
    color: '#30d5c8',
    metalness: 1,
    roughness: 0.3,
})

const testmat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
})

// Camera
const sizes = {
    width: 1600,
    height: 900
}

const cam_position = {
    x:0,
    y:2,
    z:12
}

const sensor_size = 24 //mm
const focal_length = 50 //mm
const fielofview = 2*Math.atan(sensor_size/(2*focal_length)) * (180 / Math.PI);

const camera = new THREE.PerspectiveCamera(fielofview, sizes.width/sizes.height)

camera.position.set(cam_position.x, cam_position.y, cam_position.z)

// Scene
const scene = new THREE.Scene()

scene.add(camera)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(5, 10, 7)
scene.add(directionalLight)

function applyMaterialToMesh(object, material) {
    object.traverse((child) => {
        if (child.isMesh) {
            child.material = material
        }
    })
}

const cube = await fbxloader.loadAsync( './ressources/assets/test/Cube.fbx' ); {
    applyMaterialToMesh(cube, testmat)
}

const sphere = await fbxloader.loadAsync( './ressources/assets/test/Sphere.fbx' ); {
    applyMaterialToMesh(sphere, testmat)
}

const icosphere = await fbxloader.loadAsync( './ressources/assets/test/Icosphere.fbx' ); {
    applyMaterialToMesh(icosphere, testmat)
}

const monkey = await fbxloader.loadAsync( './ressources/assets/test/Monkey.fbx' ); {
    applyMaterialToMesh(monkey, testmat)
}

const cone = await fbxloader.loadAsync( './ressources/assets/test/Cone.fbx' ); {
    applyMaterialToMesh(cone, testmat)
}

const piedestal = await fbxloader.loadAsync( './ressources/assets/test/Piedestal.fbx' ); {
    applyMaterialToMesh(piedestal, testmat)
}

function workdisplay(object, x, y ,z) {
    const clone = piedestal.clone();
    const position_ped = {x:x, y:y, z:z};
    const position_object = {x:x, y:y+2, z:z};
    clone.scale.set(.01, .01, .01); // Adjust the scale of the model if necessary
    clone.position.set(position_ped.x, position_ped.y, position_ped.z); // Set the position of the model if necessary
    object.scale.set(.01, .01, .01); // Adjust the scale of the model if necessary
    object.position.set(position_object.x, position_object.y, position_object.z); // Set the position of the model if necessary
    scene.add(object, clone);
}

workdisplay (cube, -6, 0, 0)
workdisplay (sphere, -3, 0, 0)
workdisplay (icosphere, 0, 0, 0)
workdisplay (monkey, 3, 0, 0)
workdisplay (cone, 6, 0, 0)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

//resize
window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
});

var cam_trans_X = 0; // initiate variable
const maxSpeed = 0.2; // units per second
const deadzone = 0.2; // deadzone size in screen%
    
window.addEventListener("mousemove", (event) => {
    // -1 on left, 0 center, 1 on right
    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    if (Math.abs(mouseX) < deadzone) {mouseX = 0} else {mouseX = (mouseX - deadzone)/(1/deadzone)}
    cam_trans_X = mouseX * maxSpeed;
});

var closeness = 0;
const closeness_range = 1.5;
const closeness_deadzone = 0.2;
const range = 3;
const worldPos = new THREE.Vector3();

function animate() {
    requestAnimationFrame(animate);

    icosphere.rotation.y += 0.01;
    
    if (Math.abs(camera.position.x + cam_trans_X) < 6) {camera.position.x += cam_trans_X}
    
    scene.traverse((object) => {
        if (object.isMesh) {
            object.getWorldPosition(worldPos);
            closeness = Math.abs(camera.position.x - worldPos.x);
            var offset_Z = (closeness_range - closeness)/closeness_range * range; //no idea why I need to subtract to 1 in another variable
            if (closeness < closeness_deadzone) {offset_Z = range} else {offset_Z = (closeness_range - closeness) * range / (closeness_range-closeness_deadzone)}
            if (closeness < closeness_range) {object.parent.position.set(object.parent.position.x, object.parent.position.y, offset_Z)}
                      
        }
    });

    renderer.render(scene, camera);
}

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);

animate()