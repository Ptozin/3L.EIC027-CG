import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import {MyBillboard} from './2d/MyBillboard.js';

export class MyTreeRowPatch extends CGFobject {
    constructor(scene, CGFtexture, CGFtexture2, CGFtexture3, coordinates, spacingXorZ, spacing, wind, CGFHeigthMapTexture) {
        super(scene);
        this.spacingX = 0;
        this.spacingZ = 0;
        this.spacingXorZ = spacingXorZ;
        this.spacing = spacing;

        this.textures = [
            CGFtexture,
            CGFtexture2,
            CGFtexture3,
        ]

        this.billboards = [];
        for (let i = 0; i < 6; i++) {
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
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
        ];
        this.setCoordinates(coordinates[0], coordinates[1], coordinates[2]);
    }
    setCoordinates(startX, startY, startZ, spacing) {

        if(this.spacingXorZ == "x") { // spacingXorZ = "x" or "z"
            this.spacingX = spacing;
        } else  {
            this.spacingZ = spacing;
        }

        for (let i = 0; i < 6; i++) {
            this.coordinates[i] =
            [
                startX + i*this.spacingX + this.coordinatesOffset[i][0],
                startY,
                startZ + i*this.spacingZ + this.coordinatesOffset[i][2],
            ];
        }
    }
    update(t, ambientR, ambientG, ambientB) {
        for (let i = 0; i < 6; i++) {
            this.billboards[i].update(t, ambientR, ambientG, ambientB);
        }
    }
    display(x, y, z, spacing, wind) {
        this.setCoordinates(x, y, z, spacing);

        for (let i = 0; i < 6; i++) {
            this.billboards[i].display(this.coordinates[i][0], this.coordinates[i][1], this.coordinates[i][2], wind);
        }

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}