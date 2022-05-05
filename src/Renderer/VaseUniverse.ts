import * as THREE from 'three'
import { VasePath } from './VasePath'

export class VaseUniverse {
    public Models : THREE.Object3D[];
    public Paths : VasePath[];
    public PathsObjects : THREE.Line[]

    public constructor (obj : THREE.Object3D, count : number) {
        this.Models = new Array<THREE.Object3D>()
        this.Paths = new Array<VasePath>()
        this.PathsObjects = new Array<THREE.Line>()

        const orbitCenter = new THREE.Vector3()
        const orbitMinSize = new THREE.Vector2(50, 50)
        const orbitMaxSize = new THREE.Vector2(400, 400)
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })

        for (let i = 0; i < count; i++) {
            const tmp = obj.clone(true)

            const clockwise = Math.random() < 0.5
            const newPath = new VasePath(orbitCenter, orbitMinSize, orbitMaxSize, clockwise)

            this.PathsObjects.push(newPath.GetCurvePoints(lineMaterial))

            this.Paths.push(newPath)
            const firstPosition = newPath.GetFirstPoint()
            tmp.position.set(firstPosition.x, firstPosition.y, firstPosition.z)
            this.Models.push(tmp)
        }
    }

    public MoveObjects () : void {
        if (this.Paths !== undefined) {
            for (let i = 0; i < this.Models.length; i++) {
                if (this.Paths[i] !== undefined) {
                    const newPosition = this.Paths[i].GetCurrentPosition()
                    this.Models[i].position.set(newPosition.x, newPosition.y, newPosition.z)
                }
            }
        }
    }
}
