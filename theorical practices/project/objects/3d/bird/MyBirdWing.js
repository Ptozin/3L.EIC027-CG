import { CGFobject, CGFappearance, CGFtexture } from '../../../../lib/CGF.js';

export class MyBirdWing extends CGFobject{
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        this.wingA = new MyBirdWingA(scene, 1);
        this.wingB = new MyBirdWingB(scene, 1);

        this.animWingA = 0;
        this.animWingB = 0;
        this.initBuffers();
    }

    update(t, speed, speedFactor){
        if (speed == 0){
            this.animWingA = 0.5 * Math.sin(t/1000 * Math.PI *2 * speedFactor);
            this.animWingB = 0.6 * Math.sin(t/1000 * Math.PI *2 * speedFactor);
        }
        else{
            var oscilation = (-speed) + 2;
            this.animWingA = 0.5 * Math.sin(t/1000 * Math.PI * oscilation * speedFactor);
            this.animWingB = 0.6 * Math.sin(t/1000 * Math.PI * oscilation * speedFactor);
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(this.animWingA, 0, 0, 1);
        this.wingA.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(this.animWingA, 0, 0, 1);
        this.scene.translate(1, 0, 0);
        this.scene.rotate(this.animWingB, 0, 0, 1);
        this.scene.translate(-1, 0, 0);
        this.wingB.display();
        this.scene.popMatrix();
	}

} 

export class MyBirdWingA extends CGFobject{
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;
        this.initBuffers();

    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,	  //0
            0, 0, 1.4,	  //1
            1, 0, 0.5,    //2
            1, 0, 1.5,    //3
        ];  
        
        this.indices = [
            0, 1, 2,
            1, 3, 2,
            2, 1, 0,
            2, 3, 1,
        ];

        this.normals = [
            0,1,0,
            0,1,0,
            0,1,0,
            0,1,0,
        ];

        this.texCoords = [
            0,0,
            0,0.5,
            0.5,0,
            0.5,0.5,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

export class MyBirdWingB extends CGFobject{
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;
        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [
            2 ,0, 2,      // 0 
            1, 0, 0.5,    // 1
			1, 0, 1.5,    // 2
        ];  
        
        this.indices = [
            1, 2, 0,
            0, 2, 1,
        ];

        this.normals = [
            0,1,0,
            0,1,0,
            0,1,0,
        ];

        this.texCoords = [
            0.7,0.7,
            0,0,
            0,0.5,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}

