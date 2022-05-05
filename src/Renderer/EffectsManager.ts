import { Object3D } from 'three'
import * as THREE from 'three'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

export class EffectsManager {
    private scene : THREE.Scene
    private camera : THREE.Camera
    private models : Object3D[]
    private currentPass : OutlinePass

    public constructor (scene : THREE.Scene, camera : THREE.Camera) {
        this.scene = scene
        this.camera = camera
        this.models = new Array<Object3D>()
        this.currentPass = new OutlinePass(new THREE.Vector2(1, 1), scene, camera, this.models)
    }

    public SetModels (models : Object3D[]) : void {
        this.models = models
    }

    public UpdatePass (width : number, height : number, composer : EffectComposer) : void {
        composer.removePass(this.currentPass)
        this.currentPass.dispose()

        this.currentPass = this.DrawPass(width, height)
        composer.addPass(this.currentPass)
    }

    private DrawPass (width : number, height : number) : OutlinePass {
        const outlinePass = new OutlinePass(new THREE.Vector2(width, height), this.scene, this.camera, this.models)
        outlinePass.visibleEdgeColor.set(0xffffff)
        outlinePass.edgeThickness = 2
        outlinePass.edgeStrength = 10
        outlinePass.overlayMaterial.blending = THREE.SubtractiveBlending
        return outlinePass
    }
}
