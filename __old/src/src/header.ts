import { RenderHead } from './RenderHead'
import * as THREE from 'three'
import { Obj2Mesh } from './Obj2Mesh'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { Text2Mesh } from './Text2Mesh'

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 1.1, 2)
camera.lookAt(0, 0, 0)

const head = new RenderHead(camera)
head.renderer.toneMapping = THREE.ReinhardToneMapping
head.renderer.toneMappingExposure = 2
head.renderer.shadowMap.enabled = true

const fontPath = 'https://raw.githubusercontent.com/Simbs38/Vazo/improve/simbsText/src/fonts/Bebas%20Neue_Regular.json'

Text2Mesh.LoadFont(fontPath).then(font => {
    const textMesh = Text2Mesh.CreateText('Deram te o vaso?', 0.5, 0.1, 10, 1, 1, font)
    textMesh.position.set(-1.9, 0.5, -4)
    head.scene.add(textMesh)
})

const composer = new EffectComposer(head.renderer)
composer.addPass(new RenderPass(head.scene, camera))

const ligth = head.AddLigth(0xffa95c, 0x111024, 0xe6f7ec)
document.body.appendChild(head.getDomElement())
head.scene.background = new THREE.Color(0x456990)

export function startHeader ():void {
    const tmpElement = document.getElementById('headCanvas') as HTMLElement
    tmpElement.appendChild(head.renderer.domElement)
    const path = 'https://raw.githubusercontent.com/Simbs38/Vazo/master/src/public/static/vaso.obj'
    const promiss = Obj2Mesh.CreateMesh(path, new THREE.Vector3(0, -1, 0), new THREE.Vector3(0.05, 0.05, 0.05))

    promiss.then(args => {
        Obj2Mesh.ChangeToToon(args.children[0] as THREE.Mesh, 0xffffff)
        Obj2Mesh.ChangeColor(args.children[1] as THREE.Mesh, 0x17DE63)

        const outlinePass = new OutlinePass(new THREE.Vector2(1024, 1024), head.scene, camera, [args.children[0], args.children[1]])
        outlinePass.visibleEdgeColor.set(0xffffff)
        outlinePass.edgeThickness = 2
        outlinePass.edgeStrength = 10
        outlinePass.overlayMaterial.blending = THREE.SubtractiveBlending
        composer.addPass(outlinePass)

        head.scene.add(args)
    }).catch(err => console.log(err))

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
