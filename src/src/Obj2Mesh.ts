import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three'

export class Obj2Mesh {
    public static async CreateMesh (path: string, position: THREE.Vector3, scale : THREE.Vector3) : Promise<THREE.Group> {
        return Promise.resolve().then(async _ => {
            const ans = await new OBJLoader().loadAsync(path)
            ans.scale.set(scale.x, scale.y, scale.z)
            ans.position.set(position.x, position.y, position.z)

            return ans
        })
    }

    public static ChangeToNormals (mesh : THREE.Mesh): void {
        const material = new THREE.MeshNormalMaterial()
        mesh.material = material
    }

    public static ChangeToToon (mesh : THREE.Mesh, color : THREE.ColorRepresentation): void {
        const material = new THREE.MeshToonMaterial()
        material.color.set(color)
        mesh.material = material
    }

    public static ChangeColor (mesh : THREE.Mesh, color : THREE.ColorRepresentation): void {
        const material = new THREE.MeshLambertMaterial()
        material.color.set(color)
        mesh.material = material
    }
}
