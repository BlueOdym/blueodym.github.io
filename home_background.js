import * as THREE from 'three';
import { InteractionManager } from "three.interactive";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { sign } from 'three/tsl';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const canvas = document.querySelector('canvas.webgl')

// Loaders and important modules
    const fbxloader = new FBXLoader();
    const objloader = new OBJLoader();

// Initiate Scene
    const scene = new THREE.Scene()

// Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })

// Camera
    const sizes = {
        width: 1600,
        height: 900
    }

    const cam_position = {
        x:0,
        y:0,
        z:12
    }

    const sensor_size = 24 //mm
    const focal_length = 50 //mm
    const fielofview = 2*Math.atan(sensor_size/(2*focal_length)) * (180 / Math.PI);

    const camera = new THREE.PerspectiveCamera(fielofview, sizes.width/sizes.height)

    camera.position.set(cam_position.x, cam_position.y, cam_position.z)

    scene.add(camera)

// Camera sizing and resizing

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

// Interaction Manager (allows to interact with objects)
    const interactionManager = new InteractionManager(renderer, camera, renderer.domElement);

// Materials
    const fbxMaterial = new THREE.MeshStandardMaterial({
        color: '#30d5c8',
        metalness: 1,
        roughness: 0.3,
    })

    const cubemat = new THREE.MeshPhysicalMaterial({
        color: '#6b6b6b',
        metalness: 0.8,
        roughness: 0.1,
    })

    function applyMaterialToMesh(object, material) {
        object.traverse((child) => {
            if (child.isMesh) {
                child.material = material
            }
        })
    }

// Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xff5959, 0.8)
    directionalLight.position.set(0, 0, -7)
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0xF0FBFF, 100)
    pointLight1.position.set(20, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xF0FBFF, 100)
    pointLight2.position.set(-20, -10, 10)
    scene.add(pointLight2)

    const pointerLight = new THREE.PointLight(0xff5959, 10)
    pointerLight.position.set(0, 0, -2)
    scene.add(pointerLight)

// Objects
    const cube = await fbxloader.loadAsync( './ressources/assets/home/Cube.fbx' ); {
        applyMaterialToMesh(cube, cubemat)
        const cube_scale = 0.0095
        cube.scale.set(cube_scale, cube_scale, cube_scale);
    }

// Scene
    for (let c = 0; c < 9; c++) {
        for (let r = 0; r < 17; r++) {
            const clone = cube.clone();
            var x = r - 7.5; var y = c - 3.5;
            clone.position.set(x, y, 0);
            scene.add(clone)
        }
    }
  
// Compositing
    const composer = new EffectComposer(renderer);
    const DefaultPass = new RenderPass(scene, camera);
    composer.addPass(DefaultPass);

    const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.0025, // strength
    0.05, // radius
    2 // threshold
    );
    composer.addPass(bloomPass);

    
// Animation scripts

    var mouseX = 0;
    var mouseY = 0;
    var rot_multiplier = 5;

    window.addEventListener("mousemove", (event) => {
        // -1 on left, 0 center, 1 on right
        mouseX = ((event.clientX/window.innerWidth) * 2 - 1) * rot_multiplier;
        mouseY = ((event.clientY/window.innerHeight) * 2 - 1) * -rot_multiplier;
    });

    function animate() {

        scene.traverse((object) => {
            if (object.isMesh) {
                var x_rot = -Math.atan(camera.position.z/(mouseY - object.parent.position.y))
                var y_rot = Math.atan(camera.position.z/(mouseX - object.parent.position.x))
                if (y_rot > 0) {y_rot = Math.PI/2 - y_rot} else {y_rot = -Math.PI/2 - y_rot}
                if (x_rot > 0) {x_rot = Math.PI/2 - x_rot} else {x_rot = -Math.PI/2 - x_rot}
                object.parent.rotation.set(x_rot, y_rot, 0)
            }
        });

        var x_pos = mouseX * (camera.position.z - pointerLight.position.z) / 7;
        var y_pos = mouseY * (camera.position.z - pointerLight.position.z) / 34;
        pointerLight.position.set(x_pos, y_pos, pointerLight.position.z)

        requestAnimationFrame(animate);
        interactionManager.update(); // Only useful when hovering/leaving or any other non event-based action
        composer.render();
    }

    animate() // VERY IMPORTANT! a function is cool but you gotta run it

// Event scripts