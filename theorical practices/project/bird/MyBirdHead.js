import {CGFobject, CGFappearance} from '../../lib/CGF.js';
import { MySphere } from '../objects/3d/MySphereOut.js';
import { MyFrustum } from '../objects/3d/MyFrustum.js';
import { MyCone } from '../objects/3d/MyCone.js';

export class MyBirdHead extends CGFobject {
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        this.headAppearance = new CGFappearance(this.scene);
        this.headAppearance.setAmbient(0.2, 0.2, 0.2, 1);
        this.headAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.headAppearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.headAppearance.setShininess(10.0);

        this.eyeAppearance = new CGFappearance(this.scene);
        this.eyeAppearance.setAmbient(1, 1, 1, 1);
        this.eyeAppearance.setDiffuse(1, 1, 1, 1);
        this.eyeAppearance.setSpecular(1, 1, 1, 1);
        this.eyeAppearance.setShininess(10.0);

        this.beakAppearance = new CGFappearance(this.scene);
        this.beakAppearance.setAmbient(1, 1, 0.2, 1);
        this.beakAppearance.setDiffuse(1, 0.7, 0, 1);
        this.beakAppearance.setSpecular(1, 0.7, 0, 1);
        this.beakAppearance.setShininess(10.0);


        this.beak = new MyCone(scene, 10, 10, [1,1,1]);
        this.neck = new MyFrustum(scene, 20, 10, 1);
        this.head = new MySphere(scene, 20, 10, 1);
        this.eye_R = new MySphere(scene, 20, 10, 0.1);
        this.eye_L = new MySphere(scene, 20, 10, 0.1);
    }

    display() {
        //Neck
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4.3, 1,0,0);
        this.scene.scale(0.25, 0.25, 1);
        this.scene.translate(0,0,-1.3);
        this.neck.display();
        this.scene.popMatrix();

        //Head
        this.scene.pushMatrix();
        this.scene.translate(0,0.8,-0.9);
        this.scene.scale(0.3,0.3,0.4);
        this.head.display();
        this.scene.popMatrix();

        //Eyes
        this.scene.pushMatrix();
        this.eyeAppearance.apply();
        this.scene.translate(-0.15,0.9,-1.2);
        this.scene.scale(0.5, 0.5, 0.5);
        this.eye_R.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.15,0.9,-1.2);
        this.scene.scale(0.5, 0.5, 0.5);
        this.eye_R.display();
        this.scene.popMatrix();

        //Beak  
        this.beakAppearance.apply();zz
        this.scene.pushMatrix();
        this.scene.translate(0,0.75,-1.25);
        this.scene.scale(0.07,0.05,0.3);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.beak.display();
        this.scene.popMatrix();
    }

}