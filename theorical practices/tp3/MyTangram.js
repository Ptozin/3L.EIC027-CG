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

        // Red Triangle Material
        this.redTriangleMaterial = new CGFappearance(scene);
        this.redTriangleMaterial.setAmbient(0.2, 0.025, 0, 1.0);
        this.redTriangleMaterial.setDiffuse(0.2, 0.025, 0, 1.0);
        this.redTriangleMaterial.setSpecular(0.8, 0.1, 0, 1.0);
        this.redTriangleMaterial.setShininess(10.0);
        
        // Purple Triangle Material
        this.purpleTriangleMaterial = new CGFappearance(scene);
        this.purpleTriangleMaterial.setAmbient(0.2, 0.025, 0.125, 1.0);
        this.purpleTriangleMaterial.setDiffuse(0.2, 0.025, 0.125, 1.0);
        this.purpleTriangleMaterial.setSpecular(0.8, 0.1, 0.5, 1.0);
        this.purpleTriangleMaterial.setShininess(10.0);

        // Pink Triangle Material
        this.pinkTriangleMaterial = new CGFappearance(scene);
        this.pinkTriangleMaterial.setAmbient(0.25, 0.1, 0.1, 1.0);
        this.pinkTriangleMaterial.setDiffuse(0.25, 0.1, 0.1, 1.0);
        this.pinkTriangleMaterial.setSpecular(1, 0.4, 0.4, 1.0);
        this.pinkTriangleMaterial.setShininess(10.0);

        // Orange Triangle Material
        this.orangeTriangleMaterial = new CGFappearance(scene);
        this.orangeTriangleMaterial.setAmbient(0.2, 0.125, 0.0, 1.0);
        this.orangeTriangleMaterial.setDiffuse(0.2, 0.125, 0.0, 1.0);
        this.orangeTriangleMaterial.setSpecular(0.8, 0.5, 0.0, 1.0);
        this.orangeTriangleMaterial.setShininess(10.0);

        // Blue Triangle Material
        this.blueTriangleMaterial = new CGFappearance(scene);
        this.blueTriangleMaterial.setAmbient(0.025, 0.025, 0.25, 1.0);
        this.blueTriangleMaterial.setDiffuse(0.025, 0.025, 0.25, 1.0);
        this.blueTriangleMaterial.setSpecular(0.1, 0.1, 1, 1.0);
        this.blueTriangleMaterial.setShininess(10.0);

        // Yellow Parallelogram Material
        this.yellowParallelogramMaterial = new CGFappearance(scene);
        this.yellowParallelogramMaterial.setAmbient(0.25, 0.25, 0.0, 1.0);
        this.yellowParallelogramMaterial.setDiffuse(0.25, 0.25, 0.0, 1.0);
        this.yellowParallelogramMaterial.setSpecular(1, 1, 0.0, 1.0);
        this.yellowParallelogramMaterial.setShininess(10.0);
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

        this.scene.customMaterial.apply();
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

        this.redTriangleMaterial.apply();
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

        this.purpleTriangleMaterial.apply();
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

        this.pinkTriangleMaterial.apply();
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

        this.orangeTriangleMaterial.apply();
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

        this.blueTriangleMaterial.apply();
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

        this.yellowParallelogramMaterial.apply();
        this.yellowParallelogram.display();

        ////////
    }
	
}

