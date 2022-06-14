import { RenderHead } from './RenderHead'
import * as THREE from 'three'
import { Obj2Mesh } from './Obj2Mesh'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { VaseUniverse } from './VaseUniverse'
import { Skybox } from './Skybox'
import { EffectsManager } from './EffectsManager'
import { TextManager } from './TextManager'
import { VasePath } from './VasePath'
import { Vector2, Vector3 } from 'three'

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
camera.position.set(-5, 5, 5)
camera.lookAt(0, 0, 0)
let universeManager : VaseUniverse

const head = new RenderHead(camera)

const outlineObjects = new Array<THREE.Object3D>()

const effectManager = new EffectsManager(head.scene, camera)
const textManager = new TextManager()

textManager.LoadText('Deram te o vaso?', new THREE.Vector3(-1.9, 0.5, -4)).then(mesh => {
    head.scene.add(mesh)
    outlineObjects.push(mesh)
})

const composer = new EffectComposer(head.renderer)
composer.addPass(new RenderPass(head.scene, camera))

head.AddLigth(0xffa95c, 0x111024, 0xe6f7ec)

document.body.appendChild(head.getDomElement())

export function startHeader ():void {
    const tmpElement = document.getElementById('headCanvas') as HTMLElement
    tmpElement.appendChild(head.renderer.domElement)
    const path = 'https://raw.githubusercontent.com/Simbs38/Vazo/master/public/static/vaso.obj'
    const promiss = Obj2Mesh.CreateMesh(path, new THREE.Vector3(0, -1, 0), new THREE.Vector3(0.05, 0.05, 0.05))

    const texturePath = 'https://raw.githubusercontent.com/Simbs38/Vazo/master/public/static/skyboxTexture.png'
    Obj2Mesh.GetTextureMaterial(texturePath).then(result => {
        const skybox = Skybox.Create(result)
        head.scene.add(skybox)
    })

    promiss.then(args => {
        Obj2Mesh.ChangeToToon(args.children[0] as THREE.Mesh, 0xffffff)
        Obj2Mesh.ChangeColor(args.children[1] as THREE.Mesh, 0x17DE63)
        universeManager = new VaseUniverse(args, 10)

        universeManager.Models.forEach(vase => {
            outlineObjects.push(vase)
            head.scene.add(vase)
        })

        universeManager.PathsObjects.forEach(line => {
            head.scene.add(line)
        })

        outlineObjects.push(args.children[0])
        outlineObjects.push(args.children[1])

        effectManager.SetModels(outlineObjects)
        effectManager.UpdatePass(window.innerWidth, window.innerHeight, composer)

        head.scene.add(args)
    })

    render()
}

window.addEventListener('resize', onWindowResize, false)

function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    head.renderer.setSize(window.innerWidth, window.innerHeight)
    effectManager.UpdatePass(window.innerWidth, window.innerHeight, composer)
    render()
}

function render () {
    requestAnimationFrame(render)
    head.controls.update()
    if (universeManager !== undefined) {
        universeManager.MoveObjects()
    }
    composer.render()
}
