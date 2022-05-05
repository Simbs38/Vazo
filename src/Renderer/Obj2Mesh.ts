import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three'

export class Obj2Mesh {
    public static async CreateMesh (path: string, position: THREE.Vector3, scale : THREE.Vector3) : Promise<THREE.Group> {
        const ans = await new OBJLoader().loadAsync(path)
        ans.scale.set(scale.x, scale.y, scale.z)
        ans.position.set(position.x, position.y, position.z)

        return ans
    }

    public static ChangeToNormals (mesh : THREE.Mesh): void {
        const material = new THREE.MeshNormalMaterial()
        material.side = THREE.BackSide
        mesh.material = material
    }

    public static ChangeToToon (mesh : THREE.Mesh, color : THREE.ColorRepresentation): void {
        const material = new THREE.MeshToonMaterial()
        material.color.set(color)
        material.side = THREE.DoubleSide
        mesh.material = material
    }

    public static ChangeColor (mesh : THREE.Mesh, color : THREE.ColorRepresentation): void {
        const material = new THREE.MeshLambertMaterial()
        material.color.set(color)
        material.side = THREE.DoubleSide
        mesh.material = material
    }

    public static async GetTextureMaterial (texturePath : string) : Promise<THREE.Material> {
        const textureLoader = new THREE.TextureLoader()
        const texture = textureLoader.load(texturePath)
        const material = new THREE.MeshBasicMaterial({ map: texture })
        material.side = THREE.BackSide

        return material
    }

    public static async ChangeToTexture (mesh : THREE.Mesh, texturePath : string) : Promise<void> {
        const textureLoader = new THREE.TextureLoader()
        textureLoader.loadAsync(texturePath).then(texture => {
            const material = new THREE.MeshBasicMaterial({ map: texture })
            material.side = THREE.BackSide
            mesh.material = material
        })

        console.log('here')
        console.log(mesh.geometry)
    }
}
