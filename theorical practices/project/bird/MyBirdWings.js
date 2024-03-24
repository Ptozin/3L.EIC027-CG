import { CGFobject } from '../../lib/CGF.js';
import { MyBirdWing } from './MyBirdWing.js';

export class MyBirdWings extends CGFobject {
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        this.wing_R = new MyBirdWing(scene, 1);
        this.wing_L = new MyBirdWing(scene, 1);
    }

    update(t, speed, speedFactor){
        this.wing_R.update(t, speed, speedFactor);
        this.wing_L.update(t, speed, speedFactor);
    }

    display() {
        //Wings
        this.scene.pushMatrix();
        this.scene.translate(0.8, 0.2, 0);
        this.scene.translate(0,0,-3.5);
        this.scene.rotate(-Math.PI/30, 0, 1, 0);
        this.scene.translate(0,0,3.5);
        this.wing_R.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1,1,1);
        this.scene.translate(0.8, 0.2, 0);
        this.scene.translate(0,0,-3.5);
        this.scene.rotate(-Math.PI/30, 0, 1, 0);
        this.scene.translate(0,0,3.5);
        this.wing_L.display();
        this.scene.popMatrix();

    }

}