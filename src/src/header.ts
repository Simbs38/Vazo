import { RenderHead } from './RenderHead'
import * as THREE from 'three'
import { Obj2Mesh } from './Obj2Mesh'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 1.1, 2)
camera.lookAt(0, 0, 0)

const head = new RenderHead(camera)
head.renderer.toneMapping = THREE.ReinhardToneMapping
head.renderer.toneMappingExposure = 2
head.renderer.shadowMap.enabled = true

const composer = new EffectComposer(head.renderer)
composer.addPass(new RenderPass(head.scene, camera))
// composer.addPass(new UnrealBloomPass(new THREE.Vector2(1024, 1024), 2, 0, 0.9))
// composer.addPass(new FilmPass())

const ligth = head.AddLigth(3, 10, 3, 0xffffff)
document.body.appendChild(head.getDomElement())
head.scene.background = new THREE.Color(0x456990)

export function startHeader ():void {
  const tmpElement = document.getElementById('headCanvas') as HTMLElement
  tmpElement.appendChild(head.renderer.domElement)
  const path = 'https://raw.githubusercontent.com/Simbs38/Vazo/master/src/assets/models/vazoSimplified.obj'
  const promiss = Obj2Mesh.CreateMesh(path, new THREE.Vector3(0, -1, 0), new THREE.Vector3(0.05, 0.05, 0.05))

  promiss.then(args => {
    Obj2Mesh.ChangeToToon(args.children[0] as THREE.Mesh, 0xffffff)
    Obj2Mesh.ChangeColor(args.children[1] as THREE.Mesh, 0x17DE63)

    const outlines = [args.children[0], args.children[1]]
    const outlinePass = new OutlinePass(new THREE.Vector2(1024, 1024), head.scene, camera, outlines)
    outlinePass.visibleEdgeColor.set(0x000000)
    composer.addPass(outlinePass)

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
  ligth.position.set(camera.position.x + 10, camera.position.y + 10, camera.position.z + 10)
  composer.render()
}
