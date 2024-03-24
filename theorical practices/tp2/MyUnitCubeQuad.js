import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);

        //Initialize Cube edges' objects
        this.quad_x_positive = new MyQuad(scene);
        this.quad_x_negative = new MyQuad(scene);
        this.quad_y_positive = new MyQuad(scene);
        this.quad_y_negative = new MyQuad(scene);
        this.quad_z_positive = new MyQuad(scene);
        this.quad_z_negative = new MyQuad(scene);   
	}
    setDefaultAppearance() {
        this.scene.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.scene.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.scene.setShininess(10.0);
    }
    display() {
        this.scene.pushMatrix();

        ///// Quad x_positive 

        this.quad_y_positive.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Quad x_negative 

        this.scene.translate(0, 0, -1);
        this.scene.rotate(2*Math.PI/2, 0, 1, 0);
        this.quad_y_negative.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Quad y_positive 

        this.scene.translate(0.5, 0, -0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad_y_positive.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Quad y_negative 

        this.scene.translate(-0.5, 0, -0.5);
        this.scene.rotate(3*Math.PI/2, 0, 1, 0);
        this.quad_y_negative.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Quad z_positive 

        this.scene.translate(0, 0.5, -0.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad_z_positive.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Quad z_negative 

        this.scene.translate(0, -0.5, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad_z_positive.display();

        ////////
    }
}