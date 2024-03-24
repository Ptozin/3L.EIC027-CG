import {CGFobject, CGFappearance} from '../../../lib/CGF.js';
import { MyHollowInsideHalfSphere } from "./MyHollowInsideHalfSphere.js";
import { MyHollowOutsideHalfSphere } from "./MyHollowOutsideHalfSphere.js"

export class MyNest extends CGFobject {
    constructor(scene, CGFtexture, x, y, z, radius) {
        super(scene);
        this.texture = CGFtexture;
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1.0);
        
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.x = x; 
        this.y = y; 
        this.z = z; 

        //Eggs inside the nest 
        this.birdeggs = []; 

        //Nest Radius
        this.radius = radius; 

        this.insidesphere = new MyHollowInsideHalfSphere(this.scene, 10 , 5, this.radius);
        this.outsidesphere = new MyHollowOutsideHalfSphere (this.scene, 10 , 5, this.radius);
    }

    updatePredefinedNestPositions(){
        for(let i=0; i<this.birdeggs.length; i++){
            if (i == 0){
                this.birdeggs[i].x = this.x - 2; 
                this.birdeggs[i].y = this.y+1;
                this.birdeggs[i].z = this.z + 2; 
            }
            else if (i == 1){
                this.birdeggs[i].x = this.x + 2;
                this.birdeggs[i].y = this.y+1;
                this.birdeggs[i].z = this.z - 4; 
            }
            else if (i == 2){
                this.birdeggs[i].x = this.x - 2;
                this.birdeggs[i].y = this.y+1;
                this.birdeggs[i].z = this.z - 3;  
            }
            else{
                this.birdeggs[i].x = this.x + 3; 
                this.birdeggs[i].y = this.y+1;
                this.birdeggs[i].z = this.z + 2; 
            }
        }
    }


    displayNestEggs(){
        this.updatePredefinedNestPositions(); 
        
        for(let i=0; i<this.birdeggs.length; i++){
            this.birdeggs[i].display(); 
        }
    }


    display() {
        this.displayNestEggs(); 

        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(this.x, this.y+(this.insidesphere.radius), this.z); 
        this.outsidesphere.display();
        this.insidesphere.display();
        this.scene.popMatrix();
    }

    getX(){
        return this.x; 
    }

    getY(){
        return this.y; 
    }

    getZ(){
        return this.z; 
    }
}