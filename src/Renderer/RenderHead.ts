import * as THREE from 'three'

export class RenderHead {
    public scene : THREE.Scene;
    public renderer : THREE.WebGLRenderer;
    private movementDirectionX : number;
    private movementDirectionY : number;
    private MAX_SPEED : number;
    private linePosition : number;
    private moveMesh : THREE.Group

    public constructor () {
        const scene = new THREE.Scene()
        const loader = new THREE.TextureLoader()
        loader.load('https://raw.githubusercontent.com/Simbs38/Vazo/master/public/static/gradient.png',
            function (texture) { scene.background = texture })
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        const color = 0xFFFFFF
        const near = 600
        const far = 1000
        this.scene = scene
        this.scene.fog = new THREE.Fog(color, near, far)
        this.renderer.toneMapping = THREE.ReinhardToneMapping
        this.renderer.toneMappingExposure = 3
        this.renderer.shadowMap.enabled = true
        this.movementDirectionX = 0
        this.movementDirectionY = 0
        this.MAX_SPEED = 100
        this.linePosition = 0
        this.moveMesh = new THREE.Group()
    }

    public AddMeshToScene (mesh : THREE.Group, isMoveMesh : boolean): void {
        if (isMoveMesh) {
            this.moveMesh = mesh
        }

        this.scene.add(mesh)
    }

    public onMouseMove (event : MouseEvent) : void {
        this.AddMovement(-event.movementX, event.movementY)
    }

    public OnMouseWheel (event : WheelEvent) : void {
        this.linePosition += Math.sign(event.deltaY)
    }

    private AddMovement (directionX : number, dirextionY : number) : void {
        if (Math.abs(this.movementDirectionX) < this.MAX_SPEED) {
            this.movementDirectionX += directionX
        }

        if (Math.abs(this.movementDirectionY) < this.MAX_SPEED) {
            this.movementDirectionY += dirextionY
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

    public MoveScene () : void {
        this.movementDirectionX -= Math.sign(this.movementDirectionX)
        this.movementDirectionY -= Math.sign(this.movementDirectionY)
        const tmp = new THREE.Vector3(this.movementDirectionX, this.movementDirectionY, 0)
        tmp.multiplyScalar(1 / 100000)
        this.moveMesh.position.add(tmp)
    }

    getDomElement (): HTMLCanvasElement {
        return this.renderer.domElement
    }
}
