import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { Color, Vector2, Vector3 } from 'three'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {OutlinePass} from 'three/examples/jsm/postprocessing/OutlinePass'
import { doStuff, AnimateBackGround } from '../src/Utils'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x456990)
scene.fog = new THREE.FogExp2(0xDFE9F3,0.00025)


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10000,10000),
    new THREE.MeshStandardMaterial({color:0x000000, metalness: 0.9})
)
plane.position.z = -1000
scene.add(plane)

const light = new THREE.PointLight()
light.position.set(-272, -95, -132)
scene.add(light)
/*
const gui = new GUI()

const lightPosition = gui.addFolder('LigthPosition')
lightPosition.add(light.position, 'x', -500, 100)
lightPosition.add(light.position, 'y', -100, 100)
lightPosition.add(light.position, 'z', -400, 400)
lightPosition.open()
*/


const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / 200,
    0.1,
    3000
)
camera.position.set(-86,49,98)
/*
const cameraRotation = gui.addFolder('Rotation')
cameraRotation.add(camera.rotation, 'x', 0, Math.PI * 2)
cameraRotation.add(camera.rotation, 'y', 0, Math.PI * 2)
cameraRotation.add(camera.rotation, 'z', 0, Math.PI * 2)
cameraRotation.open()

const cameraPosition = gui.addFolder('Position')
cameraPosition.add(camera.position, 'x', -100, 100)
cameraPosition.add(camera.position, 'y', -100, 100)
cameraPosition.add(camera.position, 'z', -400, 400)
cameraPosition.open()
*/

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, 200)

const effectComposer = new EffectComposer(renderer);
var outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
effectComposer.addPass( outlinePass );

document.getElementById("MidSection")?.append(renderer.domElement);

var mainObject = new THREE.Group()
var rotationDirection = new THREE.Vector3()

const objLoader = new OBJLoader()
objLoader.load(
    'models/vaso.obj',
    (object) => {
        mainObject = object
        object.scale.set(3, 3, 3);
        rotationDirection = new Vector3(Math.random(), Math.random(), Math.random()).normalize()
        
        for (let i = 0; i < mainObject.children.length; i++) {
            if(mainObject.children[i] instanceof THREE.Mesh){
                var material = new THREE.MeshStandardMaterial({flatShading: true})
                var mesh = mainObject.children[i] as THREE.Mesh;
                
                if(mesh.name.includes("Plant"))
                    material.color = new THREE.Color(0x17DE63);
                else
                    material.color = new THREE.Color(0xffffff);

                mesh.material = material;
            }
        }

        outlinePass.selectedObjects = [object]
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log('An error happened')
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function isInViewport(element : HTMLElement) {
    const rect = element.getBoundingClientRect();
    return (
       !(Math.abs(rect.top) >= window.innerHeight)
    );
}

//const stats = Stats()
//document.body.appendChild(stats.dom)

var otherObject = new THREE.Object3D();
var otherInitialized = false

const clock = new THREE.Clock()
const header = document.getElementById("Defenition") as HTMLElement;


function render() {

    requestAnimationFrame( render );
    
    if (isInViewport(header))
    {
        if(mainObject.children.length != 0)
        {

            var currentRotation = mainObject.rotation;
            currentRotation.y = currentRotation.y + 0.01;
        }

        renderer.render(scene, camera)
    }
    //stats.update()
}

render()