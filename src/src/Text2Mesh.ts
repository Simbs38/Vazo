import * as THREE from 'three'
import { FontLoader } from 'three/src/loaders/FontLoader'
import { TextGeometry } from 'three'

export class Text2Mesh {
    public static async LoadFont (fontPath : string) : Promise<THREE.Font> {
        const loader = new FontLoader()
        return loader.loadAsync(fontPath)
    }

    public static CreateText (text: string, size: number, heigth: number, curves : number, bevelThickness: number, bevelSize : number, font : THREE.Font) : THREE.Mesh {
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

        return mesh
    }
}
