import {CGFobject, CGFappearance} from '../../../lib/CGF.js';
import { MyHollowOutsideHalfSphereTop } from './MyHollowOutsideHalfSphereTop.js';

export class MyBirdEgg extends CGFobject {
    constructor(scene, CGFtexture, x, y, z, size) {
        super(scene);
        this.texture = CGFtexture;
        this.x = x; 
        this.y = y; 
        this.z = z; 
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);
        
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.size = size;

        this.topsphere = new MyHollowOutsideHalfSphereTop(this.scene, 10, 5, this.size); 
        this.bottomsphere = new MyHollowOutsideHalfSphereTop(this.scene, 10, 5, this.size);
    }


    display() {

        //Top Part of the Egg
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(this.x, this.y+this.topsphere.radius, this.z); 
        this.scene.scale(1, 1.5, 1); 
        this.topsphere.display(); 
        this.scene.popMatrix();

        //Bottom Part of the Egg
        this.scene.pushMatrix(); 
        this.appearance.apply();
        this.scene.translate(this.x, this.y+this.topsphere.radius, this.z); 
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.bottomsphere.display(); 
        this.scene.popMatrix(); 
    }

    setX(x){
        this.x = x; 
    }
    
    setY(y){
        this.y = y; 
    }

    setZ(z){
        this.z = z; 
    }

}