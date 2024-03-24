import {CGFobject} from '../../lib/CGF.js';
import {MyBillboard} from './2d/MyBillboard.js';

export class MyTreeFullPatch extends CGFobject {
    constructor(scene, CGFtexture, CGFtexture2, CGFtexture3, spacing, wind, CGFHeigthMapTexture) {
        super(scene);
        this.spacing = spacing;
        this.textures = [
            CGFtexture,
            CGFtexture2,
            CGFtexture3,
        ]

        this.treeSize = 13;

        this.billboards = [];
        for (let i = 0; i < this.treeSize; i++) {
            this.billboards.push(new MyBillboard(this.scene, this.textures[Math.floor(Math.random()*3)], wind, CGFHeigthMapTexture, (Math.floor(Math.random()*3) + 9.0 )/10.0));
        }

        this.coordinatesOffset = [];

        for (let i = 0; i < this.treeSize; i++) {
            this.coordinatesOffset.push([Math.random()*this.spacing/3, 0, Math.random()*this.spacing/3]);
        }

        this.coordinates = [];

        for (let i = 0; i < this.treeSize; i++) {
            this.coordinates.push([0, 0, 0]);
        }

        this.coordinates = [
            [100, -87.5, 50],
            [100, -87.5, -50],
            [80, -87.5, -40],
            [120, -87.5, -20],
            [120, -87.5, 20],
            [80, -87.5, 0],
            [50, -87.5, 20],
            [55, -87.5, 50],
            [10, -87.5, 30],
            [75, -87.5, 52],
            [-100, -97.5, 0],
            [-55, -100, -35],
            [-25, -100, -100],
        ];

        this.applyOffset();
    }
    applyOffset() {
        for (let i = 0; i < this.treeSize; i++) {
            this.coordinates[i][0] = this.coordinates[i][0] + this.coordinatesOffset[i][0];
            this.coordinates[i][1] = this.coordinates[i][1] + this.coordinatesOffset[i][1];
            this.coordinates[i][2] = this.coordinates[i][2] + this.coordinatesOffset[i][2];
        }
    }f
    update(t, ambientR, ambientG, ambientB) {
        for (let i = 0; i < this.treeSize ; i++) {
            this.billboards[i].update(t, ambientR, ambientG, ambientB);
        }
    }
    display(wind) {
        for (let i = 0; i < this.treeSize ; i++) {
            this.billboards[i].display(this.coordinates[i][0], this.coordinates[i][1], this.coordinates[i][2], wind);
        }
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}