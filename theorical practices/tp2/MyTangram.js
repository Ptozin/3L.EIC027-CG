import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

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
	}

    setDefaultAppearance() {
        this.scene.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.scene.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.scene.setShininess(10.0);
    }
    setYellowAppearance(){
        this.scene.setAmbient(0.6, 0.6, 0, 1.0);
        this.scene.setDiffuse(0.6, 0.6, 0, 1.0);
        this.scene.setSpecular(0.6, 0.6, 0, 1.0);
        this.scene.setShininess(10.0);
    }
    setOrangeAppearance(){
        this.scene.setAmbient(0.8, 0.5, 0, 1.0);
        this.scene.setDiffuse(0.8, 0.5, 0, 1.0);
        this.scene.setSpecular(0.8, 0.5, 0, 1.0);
        this.scene.setShininess(10.0);
    }
    setPinkAppearance(){
        this.scene.setAmbient(1, 0.4, 0.4, 1.0);
        this.scene.setDiffuse(1, 0.4, 0.4, 1.0);
        this.scene.setSpecular(1, 0.4, 0.4, 1.0);
        this.scene.setShininess(10.0);
    }
    setGreenAppearance(){
        this.scene.setAmbient(0, 0.6, 0, 1.0);
        this.scene.setDiffuse(0, 0.6, 0, 1.0);
        this.scene.setSpecular(0, 0.6, 0, 1.0);
        this.scene.setShininess(10.0);
    }
    setRedApearance(){
        this.scene.setAmbient(0.8, 0.1, 0, 1.0);
        this.scene.setDiffuse(0.8, 0.1, 0, 1.0);
        this.scene.setSpecular(0.8, 0.1, 0, 1.0);
        this.scene.setShininess(10.0);
    }
    setPurpleApearance(){
        this.scene.setAmbient(0.8, 0.1, 0.5, 1.0);
        this.scene.setDiffuse(0.8, 0.1, 0.5, 1.0);
        this.scene.setSpecular(0.8, 0.1, 0.5, 1.0);
        this.scene.setShininess(10.0);
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

        this.scene.setGreenAppearance();
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

        this.scene.setRedApearance();
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

        this.scene.setPurpleApearance();
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

        this.scene.setPinkAppearance();
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

        this.scene.setOrangeAppearance();
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

        this.scene.setDefaultAppearance();
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
        T_x = 5.0;
        T_y = -0.8;
        T_z = 0.0;

        matrix_translate = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            T_x, T_y, T_z, 1.0, 
        ];

        this.scene.multMatrix(matrix_translate);
        this.scene.multMatrix(matrix_rotate);

        var matrix_reflect = [
            1.0, 0.0, 0.0, 0.0, 
            0.0, -1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0, 
            0.0, 0.0, 0.0, 1.0,
        ];

        this.scene.multMatrix(matrix_reflect);

        this.scene.setYellowAppearance();
        this.yellowParallelogram.display();

        ////////
    }
	
}

