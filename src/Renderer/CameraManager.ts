import * as THREE from 'three'

export class CameraManager {
    public Camera : THREE.PerspectiveCamera

    public constructor () {
        this.Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
        this.Camera.position.set(-5, 5, 5)
        this.Camera.lookAt(0, 0, 0)
    }

    public onWindowResize () : void {
        this.Camera.aspect = window.innerWidth / window.innerHeight
        this.Camera.updateProjectionMatrix()
    }
}
