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
import { doStuff, AnimateBackGround } from './Utils'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x456990)
//scene.fog = new THREE.Fog(0x456990,40, 600) //new THREE.FogExp2(0xDFE9F3,0.00025)


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10000,10000,1,1),
    new THREE.PointsMaterial()
)
plane.position.z = -400
//scene.add(plane)



const light = new THREE.PointLight()
light.position.set(20, 20, 250)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    10,
    800
)
camera.position.set(20,0, 345)


const gui = new GUI()
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

gui.close()



const renderer = new THREE.WebGLRenderer()
//renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)



const effectComposer = new EffectComposer(renderer);
var outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
effectComposer.addPass( outlinePass );


document.getElementById("headCanvas")?.appendChild(renderer.domElement)



renderer.domElement.addEventListener('mousemove', animateParticles)
let mouseX = 0;
let mouseY = 0;
let isMouseClicked = false

renderer.domElement.addEventListener('mousedown', clickMouse) 
renderer.domElement.addEventListener('mouseup', unclickMouse)
renderer.domElement.addEventListener("mouseover", amimateBackGround)

function amimateBackGround(){
    if(otherInitialized){
        AnimateBackGround(otherObject, mouseX, mouseY, clock.getElapsedTime());
    }
}

function clickMouse(){
    isMouseClicked = true
    console.log("clicked")
} 

function unclickMouse(){
    isMouseClicked = false
    console.log("leaved")
}

function animateParticles(event : MouseEvent){
    mouseX = event.movementX;
    mouseY = event.movementY;

    if(otherInitialized){
        if(isMouseClicked && otherInitialized){
            otherObject.rotation.y += mouseX * 0.005
            otherObject.rotation.x += mouseY * 0.005  
        }
        else{
            AnimateBackGround(otherObject, mouseX, mouseY, clock.getElapsedTime());
        }
    }
}

var mainObject = new THREE.Group()
var rotationDirection =new Vector3(Math.random(), Math.random(), Math.random()).normalize()

const objLoader = new OBJLoader()
objLoader.load(
    'models/vazoSimplified.obj',
    (object) => {
        mainObject = object
        object.scale.set(3, 3, 3);
        
        for (let i = 0; i < mainObject.children.length; i++) {
            if(mainObject.children[i] instanceof THREE.Mesh){
                var material = new THREE.MeshToonMaterial()
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
const header = document.getElementById("headCanvas") as HTMLElement;


function render() {

    requestAnimationFrame( render );
    
    if (isInViewport(header))
    {
        if(mainObject.children.length != 0)
        {
            if(!otherInitialized)
            {
                otherInitialized = true
                //otherObject.copy(mainObject, true);
                //otherObject = doStuff(mainObject);
                //scene.add(otherObject);
            }

            //var currentRotation = mainObject.rotation;
            //currentRotation.x = currentRotation.x + rotationDirection.x * 0.01;
            //currentRotation.y = currentRotation.y + rotationDirection.y * 0.01;
            //currentRotation.z = currentRotation.z + rotationDirection.z * 0.01;
        }
        renderer.render(scene, camera)
    }
    //stats.update()
}

render()