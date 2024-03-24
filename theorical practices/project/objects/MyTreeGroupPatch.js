import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import {MyBillboard} from './2d/MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
    constructor(scene, CGFtexture, CGFtexture2, CGFtexture3, coordinates, spacing, wind, CGFHeigthMapTexture) {
        super(scene);
        this.spacing = spacing;
        this.textures = [
            CGFtexture,
            CGFtexture2,
            CGFtexture3,
        ]

        this.billboards = [];
        for (let i = 0; i < 9; i++) {
            this.billboards.push(new MyBillboard(this.scene, this.textures[Math.floor(Math.random()*3)], wind, CGFHeigthMapTexture, (Math.floor(Math.random()*3) + 9.0 )/10.0));
        }
        this.coordinatesOffset = [
            [Math.random()*this.spacing/3, 0, Math.random()*this.spacing/3],
            [Math.random()*this.spacing/3, 0, Math.random()*this.spacing/3],
            [Math.random()*this.spacing/3, 0, Math.random()*this.spacing/3],
            [Math.random()*this.spacing/3, 0, Math.random()*this.spacing/3],
            [Math.random()*this.spacing/3, 0, Math.random()*this.spacing/3],
            [Math.random()*this.spacing/3, 0, Math.random()*this.spacing/3],
            [Math.random()*this.spacing/3, 0, Math.random()*this.spacing/3],
            [Math.random()*this.spacing/3, 0, Math.random()*this.spacing/3],
            [Math.random()*this.spacing/3, 0, Math.random()*this.spacing/3],
        ];
        this.coordinates = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];

        this.setCoordinates(coordinates[0], coordinates[1], coordinates[2], spacing);

        console.log(this.coordinatesOffset);
    }
    setCoordinates(startX, startY, startZ, spacing) {
        this.spacing = spacing;

        for (let i = 0; i < 9; i++) {
            this.coordinates[i] =
            [
                startX + (i%3 - 1)*this.spacing + this.coordinatesOffset[i][0],
                startY,
                startZ + Math.floor(i/3)*this.spacing + this.coordinatesOffset[i][2],
            ];
        }
    }
    update(t, ambientR, ambientG, ambientB) {
        for (let i = 0; i < 9; i++) {
            this.billboards[i].update(t, ambientR, ambientG, ambientB);
        }
    }
    display(x, y, z, spacing, wind) {
        this.setCoordinates(x, y, z, spacing);
        for (let i = 0; i < 9; i++) {
            this.billboards[i].display(this.coordinates[i][0], this.coordinates[i][1], this.coordinates[i][2], wind);
        }
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}