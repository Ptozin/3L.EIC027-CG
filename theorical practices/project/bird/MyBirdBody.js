import {CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../objects/3d/MySphereOut.js';
import { MyFrustum } from '../objects/3d/MyFrustum.js';

export class MyBirdBody extends CGFobject {
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        this.body_frustum = new MyFrustum(scene, 20, 20, -0.4);
        this.body_sphere1 = new MySphere(scene, 20, 10, 1);
        this.body_sphere2 = new MySphere(scene, 20, 10, 1);

    }

    display() {
        //Body Frustum
        this.scene.pushMatrix();
        this.scene.scale(0.6,0.6,1.8);
        this.body_frustum.display();
        this.scene.popMatrix();

        //Body Sphere 1
        this.scene.pushMatrix();
        this.scene.scale(0.59,0.59,0.59);
        this.body_sphere1.display();
        this.scene.popMatrix();

        //Body Sphere 
        this.scene.pushMatrix();
        this.scene.translate(0,0,1.7);
        this.scene.scale(0.365,0.365,0.365);
        this.body_sphere2.display();
        this.scene.popMatrix();
    }

}