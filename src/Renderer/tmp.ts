import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Controls } from './Controls'
import { GrassGenerator } from './GrassGenerator'

// There are two scenes: one for the sky/sun and another for the grass. The sky is rendered without depth information on a plane geometry that fills the screen. Automatic clearing is disabled and after the sky has been rendered, we draw the grass scene on top of the background. Both scenes share a camera and light direction information.

const mobile = (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i))

// Variables for blade mesh
const joints = 4
const bladeWidth = 0.12
const bladeHeight = 1

// Patch side length
let width = 100

// Number of blades
let instances = 40000
if (mobile) {
    instances = 7000
    width = 50
}
// Camera rotate
const rotate = false

// Initialise three.js. There are two scenes which are drawn after one another with clear() called manually at the start of each frame
// Grass scene
const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

// Camera
const FOV = 45 // 2 * Math.atan(window.innerHeight / distance) * 180 / Math.PI;
const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 1, 20000)

camera.position.set(-30, 5, 30)
camera.lookAt(new THREE.Vector3(0, 0, 0))

scene.add(camera)

// Light for ground plane
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const controls = new Controls(camera, renderer.domElement)

renderer.autoClear = false

const grassGenerator = new GrassGenerator(bladeWidth, bladeHeight, instances, width, joints)
scene.add(grassGenerator.mesh)

function draw () {
    grassGenerator.UpdateMaterial()
    renderer.clear()
    renderer.render(scene, camera)

    if (rotate) {
        controls.UpdateControls()
    }
    requestAnimationFrame(draw)
}

export function startHeader ():void {
    const tmpElement = document.getElementById('headCanvas') as HTMLElement
    tmpElement.appendChild(renderer.domElement)

    draw()
}
