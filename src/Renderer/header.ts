import { RenderHead } from './RenderHead'
import * as THREE from 'three'
import { Obj2Mesh } from './Obj2Mesh'
import { EffectsManager } from './Managers/EffectsManager'
import { TextManager } from './Managers/TextManager'
import { CameraManager } from './Managers/CameraManager'

const cameraManager = new CameraManager()
const head = new RenderHead()

const effectManager = new EffectsManager(head.scene, head.renderer, cameraManager.Camera)
const textManager = new TextManager()

textManager.LoadText('Deram te o vaso?', new THREE.Vector3(-1.9, 0.5, -4)).then(mesh => {
    head.scene.add(mesh)
    effectManager.models.push(mesh)
})

head.AddLigth(0xffa95c, 0x111024, 0xe6f7ec)

document.body.appendChild(head.getDomElement())

export function startHeader ():void {
    const tmpElement = document.getElementById('headCanvas') as HTMLElement
    tmpElement.appendChild(head.renderer.domElement)
    const path = 'https://raw.githubusercontent.com/Simbs38/Vazo/master/public/static/vaso.obj'
    const promiss = Obj2Mesh.CreateMesh(path, new THREE.Vector3(0, -1, 0), new THREE.Vector3(0.05, 0.05, 0.05))

    promiss.then(args => {
        Obj2Mesh.ChangeToToon(args.children[0] as THREE.Mesh, 0xffffff)
        Obj2Mesh.ChangeColor(args.children[1] as THREE.Mesh, 0x17DE63)

        effectManager.models.push(args.children[0])
        effectManager.models.push(args.children[1])

        effectManager.UpdateWindowSize()

        head.scene.add(args)
    })

    render()
}

window.addEventListener('resize', cameraManager.onWindowResize, false)
window.addEventListener('resize', head.UpdateWindowSize, false)
window.addEventListener('resize', effectManager.UpdateWindowSize, false)
window.addEventListener('resize', render, false)

window.addEventListener('mousemove', (event) => { head.onMouseMove(event) })
window.addEventListener('wheel', (event) => { head.OnMouseWheel(event) }, false)

function render () {
    head.MoveScene()
    requestAnimationFrame(render)
    effectManager.composer.render()
}
