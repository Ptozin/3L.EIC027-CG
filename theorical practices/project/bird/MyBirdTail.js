import {CGFobject} from '../../lib/CGF.js';
import { MyFrustum } from '../objects/3d/MyFrustum.js';
import { MyPlane } from '../objects/2d/MyPlane.js';


export class MyBirdTail extends CGFobject {
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        this.tail_prism = new MyFrustum(scene, 4, 10, 1.7);
        this.tail_plane = new MyPlane(scene,10);
    }

    display() {
        //Tail Prism
        this.scene.pushMatrix();
        this.scene.translate(0,0.1,1.9);
        this.scene.rotate(-Math.PI/6, 1,0,0);
        this.scene.scale(0.3,0.05,0.7);
        this.tail_prism.display();
        this.scene.popMatrix();

        // Tail Plane
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0);
        this.scene.rotate(-Math.PI/6, 1,0,0);
        this.scene.translate(0,0,2.9);
        this.scene.scale(4,4,4);
        this.scene.scale(0.3,0.05,0.7);
        this.scene.rotate(-Math.PI/4, 0,0,1);
        this.tail_plane.display();
        this.scene.popMatrix();
    }

}