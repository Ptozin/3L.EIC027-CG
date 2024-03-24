import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./tangram/MyDiamond.js";
import { MyTriangle } from "./tangram/MyTriangle.js";
import { MyParallelogram } from "./tangram/MyParallelogram.js";
import { MyTriangleSmall } from "./tangram/MyTriangleSmall.js";
import { MyTriangleBig } from "./tangram/MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        //Initialize Tangram objects
        this.diamond = new MyDiamond(scene);
        this.redTriangle = new MyTriangleSmall(scene);
        this.purpleTriangle = new MyTriangleSmall(scene);
        this.pinkTriangle = new MyTriangle(scene);
        this.orangeTriangle = new MyTriangleBig(scene);
        this.blueTriangle = new MyTriangleBig(scene);
        this.yellowParallelogram = new MyParallelogram(scene);

        //Initialize Tangram Materials
        this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        
        //Loads Object Texture (Whole tangram texture)
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');       
	}
    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.redTriangle.enableNormalViz();
        this.purpleTriangle.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
        this.orangeTriangle.enableNormalViz();
        this.blueTriangle.enableNormalViz();
        this.yellowParallelogram.enableNormalViz();
    }
    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.redTriangle.disableNormalViz();
        this.purpleTriangle.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
        this.orangeTriangle.disableNormalViz();
        this.blueTriangle.disableNormalViz();
        this.yellowParallelogram.disableNormalViz();
    }
	display() {

        this.tangramMaterial.apply();

        this.scene.pushMatrix();

        ///// Diamond 

        // Matrix rotation values
        var angle = Math.PI/4.0;  

        var matrix_rotate = [
            Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
            Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            0.0, 0.0, 0.0, 1.0,
        ];

        // Matrix translation values
        var T_x = -3.0;
        var T_y = 1.5;
        var T_z = 0.0;

        var matrix_translate = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            T_x, T_y, T_z, 1.0, 
        ];

        this.scene.multMatrix(matrix_translate);
        this.scene.multMatrix(matrix_rotate);

        //this.scene.customMaterial.apply();

        
        this.diamond.display(); 

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Red Triangle

        // Matrix rotation values
        angle = 3*Math.PI/4.0;  

        matrix_rotate = [
            Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
            Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            0.0, 0.0, 0.0, 1.0,
        ];

        // Matrix translation values
        T_x = -4.4;
        T_y = 1.5;
        T_z = 0.0;

        matrix_translate = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            T_x, T_y, T_z, 1.0, 
        ];

        this.scene.multMatrix(matrix_translate);
        this.scene.multMatrix(matrix_rotate);

        this.redTriangle.texCoords = [
            0.5, 0.5, //A
            0.25, 0.75, //B
            0.75, 0.75, //C

            0.5, 0.5, //A
            0.75, 0.75, //B
            0.25, 0.75, //C
        ]
        this.redTriangle.updateTexCoordsGLBuffers();
        this.redTriangle.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Purple Triangle

        // Matrix rotation values
        angle = Math.PI;  

        matrix_rotate = [
            Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
            Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            0.0, 0.0, 0.0, 1.0,
        ];

        // Matrix translation values
        T_x = -4.7;
        T_y = 2.2;
        T_z = 0.0;

        matrix_translate = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            T_x, T_y, T_z, 1.0, 
        ];

        this.scene.multMatrix(matrix_translate);
        this.scene.multMatrix(matrix_rotate);

        this.purpleTriangle.texCoords = [
            0.25, 0.25, //A
            0, 0, //B
            0, 0.5, //C

            0.25, 0.25, //A
            0, 0.5, //B
            0, 0, //C
        ]
        this.purpleTriangle.updateTexCoordsGLBuffers();

        this.purpleTriangle.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Pink Triangle

        // Matrix rotation values
        angle = 0.0;  

        matrix_rotate = [
            Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
            Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            0.0, 0.0, 0.0, 1.0,
        ];

        // Matrix translation values
        T_x = -1.3;
        T_y = 1.2;
        T_z = 0.0;

        matrix_translate = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            T_x, T_y, T_z, 1.0, 
        ];

        this.scene.multMatrix(matrix_translate);
        this.scene.multMatrix(matrix_rotate);

        this.pinkTriangle.texCoords = [
            0, 1, //A
            0.5, 1, //B
            0, 0.5, //C

            0, 1, //A
            0, 0.5, //B
            0.5, 1, //C
        ]
        this.pinkTriangle.updateTexCoordsGLBuffers();
        this.pinkTriangle.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Pink Triangle

        // Matrix rotation values
        angle = Math.PI;  

        matrix_rotate = [
            Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
            Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            0.0, 0.0, 0.0, 1.0,
        ];

        // Matrix translation values
        T_x = -0.3;
        T_y = 0.2;
        T_z = 0.0;

        matrix_translate = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            T_x, T_y, T_z, 1.0, 
        ];

        this.scene.multMatrix(matrix_translate);
        this.scene.multMatrix(matrix_rotate);

        this.orangeTriangle.texCoords = [
            1, 0, //A
            1, 1, //B
            0.5, 0.5, //C

            0.5, 0.5, //A
            1, 1, //B
            1, 0, //C
        ]
        this.orangeTriangle.updateTexCoordsGLBuffers();
        this.orangeTriangle.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Pink Triangle

        // Matrix rotation values
        angle = 0.0;  

        matrix_rotate = [
            Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
            Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            0.0, 0.0, 0.0, 1.0,
        ];

        // Matrix translation values
        T_x = 2.0;
        T_y = 0.2;
        T_z = 0.0;

        matrix_translate = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            T_x, T_y, T_z, 1.0, 
        ];

        this.scene.multMatrix(matrix_translate);
        this.scene.multMatrix(matrix_rotate);

        this.blueTriangle.texCoords = [
            0, 0, //A 
            1, 0, //B 
            0.5, 0.5, //C 

            0.5, 0.5, //A
            1, 0, //B
            0, 0, //C
        ]
        this.blueTriangle.updateTexCoordsGLBuffers();
        this.blueTriangle.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Yellow Parallelogram

        // Matrix rotation values
        angle = Math.PI;  

        matrix_rotate = [
            Math.cos(angle), - Math.sin(angle), 0.0, 0.0, 
            Math.sin(angle), Math.cos(angle), 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            0.0, 0.0, 0.0, 1.0,
        ];

        // Matrix translation values
        T_x = 4.0;
        T_y = 0.2;
        T_z = 0.0;

        matrix_translate = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            T_x, T_y, T_z, 1.0, 
        ];

        this.scene.multMatrix(matrix_translate);
        this.scene.multMatrix(matrix_rotate);

        this.yellowParallelogram.display();

        ////////
    }
	
}

