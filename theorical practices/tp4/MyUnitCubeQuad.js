import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, plusYtexture, plusZtexture, plusXtexture, minusZtexture, minusXtexture, minusYtexture) {
		super(scene);

        //Initialize Cube edges' objects
        this.quad = new MyQuad(scene);

        //Initialize Cube sides' materials
        this.cubeMaterial = new CGFappearance(this.scene);
        this.cubeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeMaterial.setShininess(10.0);
        this.cubeMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //Loads sides Textures
        this.textures = []
        this.textures.push(plusXtexture);
        this.textures.push(minusXtexture);
        this.textures.push(plusYtexture);
        this.textures.push(minusYtexture);
        this.textures.push(plusZtexture);
        this.textures.push(minusZtexture);


	}
    display() {
        this.scene.pushMatrix();
        
        ///// Quad z_positive 

        this.cubeMaterial.setTexture(this.textures[4]);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Quad z_negative 

        this.scene.translate(0, 0, -1);
        this.scene.rotate(2*Math.PI/2, 0, 1, 0);
        this.cubeMaterial.setTexture(this.textures[5]);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Quad x_positive 

        this.scene.translate(0.5, 0, -0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.cubeMaterial.setTexture(this.textures[0]);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Quad x_negative 

        this.scene.translate(-0.5, 0, -0.5);
        this.scene.rotate(3*Math.PI/2, 0, 1, 0);
        this.cubeMaterial.setTexture(this.textures[1]);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Quad y_positive 

        this.scene.translate(0, 0.5, -0.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.cubeMaterial.setTexture(this.textures[2]);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        ////////

        this.scene.popMatrix();
        this.scene.pushMatrix();

        ///// Quad y_negative 

        this.scene.translate(0, -0.5, -0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cubeMaterial.setTexture(this.textures[3]);
        this.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();

        this.scene.popMatrix();

        ////////
    }
}