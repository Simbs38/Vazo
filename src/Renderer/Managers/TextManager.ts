import { TextGeometry } from 'three'
import * as THREE from 'three'
import { FontLoader } from 'three/src/loaders/FontLoader'
import { waitUntil } from 'async-wait-until'

export class TextManager {
    private fontPath : string
    private font : THREE.Font
    private fontLoaded : boolean

    public constructor () {
        this.fontPath = 'https://raw.githubusercontent.com/Simbs38/Vazo/master/fonts/Bebas%20Neue_Regular.json'
        const fontPromise = new FontLoader().loadAsync(this.fontPath)
        this.font = new THREE.Font('')
        this.fontLoaded = false
        fontPromise.then(font => {
            this.font = font
            this.fontLoaded = true
        })
    }

    public async LoadText (text : string, position : THREE.Vector3) : Promise<THREE.Mesh> {
        await waitUntil(() => this.fontLoaded)

        const textMesh = this.CreateText(text, 0.5, 0.1, 10, 1, 1, position, this.font)
        textMesh.position.set(position.x, position.y, position.z)
        return textMesh
    }

    private CreateText (text: string, size: number, heigth: number, curves : number, bevelThickness: number, bevelSize : number, position : THREE.Vector3, font : THREE.Font) : THREE.Mesh {
        const textGeo = new TextGeometry(text, {
            font: font,
            size: size,
            height: heigth,
            curveSegments: curves,
            bevelThickness: bevelThickness,
            bevelSize: bevelSize
        })

        textGeo.computeBoundingBox()

        const materials = new THREE.MeshBasicMaterial()
        const mesh = new THREE.Mesh(textGeo, materials)
        mesh.position.set(position.x, position.y, position.z)

        return mesh
    }
}
