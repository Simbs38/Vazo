import * as THREE from 'three'
import { Camera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Controls {
    private orbitControls : OrbitControls

    public constructor (camera : Camera, domElement : HTMLElement) {
        this.orbitControls = new OrbitControls(camera, domElement)
        this.orbitControls.autoRotateSpeed = 1.0
        this.orbitControls.maxDistance = 65.0
        this.orbitControls.minDistance = 5.0
        this.orbitControls.enableKeys = false
        this.orbitControls.update()
    }

    public UpdateControls () : void {
        this.orbitControls.update()
    }
}
