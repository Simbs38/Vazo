import { RenderHead } from './RenderHead'
import * as THREE from 'three'
import { Obj2Mesh } from './Obj2Mesh'

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 1.5, 2)
camera.lookAt(0, 0, 0)

const head = new RenderHead(camera)
document.body.appendChild(head.getDomElement())
head.scene.background = new THREE.Color(0x456990)

export function startHeader ():void {
  const tmpElement = document.getElementById('headCanvas') as HTMLElement
  tmpElement.appendChild(head.renderer.domElement)
  const path = 'https://raw.githubusercontent.com/Simbs38/Vazo/master/src/assets/models/vazoSimplified.obj'
  const promiss = Obj2Mesh.CreateMesh(path, new THREE.Vector3(0, -1, 0), new THREE.Vector3(0.05, 0.05, 0.05))

  promiss.then(args => {
    Obj2Mesh.ChangeColor(args.children[0] as THREE.Mesh, 0x17DE63)
    Obj2Mesh.ChangeColor(args.children[1] as THREE.Mesh, 0xffffff)
    head.scene.add(args)
  })
    .catch(err => console.log(err))

  animate()
}

window.addEventListener('resize', onWindowResize, false)

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  head.renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate () {
  requestAnimationFrame(animate)
  head.controls.update()
  render()
}

function render () {
  head.renderer.render(head.scene, camera)
}
