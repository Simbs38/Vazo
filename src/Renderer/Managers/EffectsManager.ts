import { Object3D, WebGLRenderer } from 'three'
import * as THREE from 'three'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

export class EffectsManager {
    private scene : THREE.Scene
    private camera : THREE.Camera
    public models : Object3D[]
    private currentPass : OutlinePass
    public composer : EffectComposer

    public constructor (scene : THREE.Scene, renderer : WebGLRenderer, camera : THREE.Camera) {
        this.scene = scene
        this.camera = camera
        this.models = new Array<Object3D>()
        this.currentPass = new OutlinePass(new THREE.Vector2(1, 1), scene, camera, this.models)
        this.composer = new EffectComposer(renderer)
        this.composer.addPass(new RenderPass(scene, camera))
    }

    public UpdatePass (width : number, height : number, composer : EffectComposer) : void {
        composer.removePass(this.currentPass)
        this.currentPass.dispose()

        this.currentPass = this.DrawPass(width, height)
        composer.addPass(this.currentPass)
    }

    public UpdateWindowSize () : void {
        this.UpdatePass(window.innerWidth, window.innerHeight, this.composer)
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
