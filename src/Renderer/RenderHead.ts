import * as THREE from 'three'

export class RenderHead {
    public scene : THREE.Scene;
    public renderer : THREE.WebGLRenderer;

    public constructor () {
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        const color = 0xFFFFFF
        const near = 600
        const far = 1000
        this.scene.fog = new THREE.Fog(color, near, far)
        this.renderer.toneMapping = THREE.ReinhardToneMapping
        this.renderer.toneMappingExposure = 3
        this.renderer.shadowMap.enabled = true
        console.log(this.scene)
    }

    public AddMeshToScene (mesh : THREE.Mesh): void {
        this.scene.add(mesh)
    }

    public onMouseMove (event : MouseEvent) : void {
        const moveX = event.movementX
        const moveY = event.movementY

        if (this.scene != null) {
            console.log(moveX, moveY)
            this.scene.position.x -= moveX / 1000
            this.scene.position.y += moveY / 1000
        }
    }

    public AddLigth (color : THREE.ColorRepresentation, groundColor : THREE.ColorRepresentation, skyColor : THREE.ColorRepresentation): THREE.Light {
        const hemiLigth = new THREE.HemisphereLight(skyColor, groundColor, 2)
        this.scene.add(hemiLigth)

        const spotLigth = new THREE.SpotLight(color, 4)
        spotLigth.castShadow = true
        spotLigth.shadow.bias = -0.00001
        spotLigth.shadow.mapSize.height = 1024 * 4
        spotLigth.shadow.mapSize.width = 1024 * 4
        this.scene.add(spotLigth)

        return spotLigth
    }

    public CreateCube (): THREE.Mesh {
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: false
        })
        const cube = new THREE.Mesh(geometry, material)
        this.scene.add(cube)

        return cube
    }

    public UpdateWindowSize () : void {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    getDomElement (): HTMLCanvasElement {
        return this.renderer.domElement
    }
}
