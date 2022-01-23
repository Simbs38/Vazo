import * as THREE from 'three'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x456990)

const light = new THREE.PointLight()
light.position.set(20, 20, 250)
scene.add(light)
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  800
)
camera.position.set(0, 0, 5)

const gui = new GUI()
gui.add(camera.position, 'x', -5, 5)
gui.add(camera.position, 'y', -5, 5)
gui.add(camera.position, 'z', -10, 10)
gui.open()

const renderer = new THREE.WebGLRenderer()
//  renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshToonMaterial({
  color: 0x00ff00,
  wireframe: true
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function render () {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

render()

export function getElement ():void {
  console.log('starting the three js')
  const tmpElement = document.getElementById('headCanvas') as HTMLElement
  const tmp2 = tmpElement?.appendChild(renderer.domElement)
  console.log(tmp2)
}
