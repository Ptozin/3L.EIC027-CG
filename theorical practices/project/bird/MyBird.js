import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyBirdBody } from './MyBirdBody.js';
import { MyBirdHead } from './MyBirdHead.js';
import { MyBirdTail } from './MyBirdTail.js';
import { MyBirdWings } from './MyBirdWings.js';

export class MyBird extends CGFobject {
    constructor(scene,  scale) {
        super(scene);
        this.scale = scale;

        //Initialize Objects
        this.body = new MyBirdBody(scene, 1);
        this.head = new MyBirdHead(scene, 1);
        this.tail = new MyBirdTail(scene, 1);
        this.wings = new MyBirdWings(scene, 1);

        //Initialize  Materials
        this.wingsAppearance = new CGFappearance(this.scene);
        this.wingsAppearance.setAmbient(0.2, 0.2, 0.2, 1);
        this.wingsAppearance.setDiffuse(0, 0.1, 0.2, 1);
        this.wingsAppearance.setSpecular(0, 0.1, 0.2, 1);
        this.wingsAppearance.setShininess(10.0);
        this.wingsTexture = new CGFtexture(this.scene, '../images/bird_feathers.jpg');
        this.wingsAppearance.setTexture(this.wingsTexture);
        this.wingsAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.bodyAppearance = new CGFappearance(this.scene);
        this.bodyAppearance.setAmbient(0.2, 0.2, 0.2, 1);
        this.bodyAppearance.setDiffuse(0, 0.3, 0.4, 1);
        this.bodyAppearance.setSpecular(0, 0.3, 0.4, 1);
        this.bodyAppearance.setShininess(10.0);

        this.tailAppearance = new CGFappearance(this.scene);
        this.tailAppearance.setAmbient(0.2, 0.2, 0.2, 1);
        this.tailAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.tailAppearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.tailAppearance.setShininess(10.0);


        this.maxSpeed = 2 ;
        this.angle = 0;
        this.speed = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    update(t, speedFactor){
        if (this.speed == 0){
            this.y = 0.3 * Math.cos(t/1000 * (Math.PI * 2) * speedFactor);
        } else {
            var maxOscilation = 0.4;
            var oscilation = maxOscilation/this.speed/2 < -maxOscilation ? maxOscilation : maxOscilation/this.speed/2;
            this.y = oscilation * Math.cos(t/1000 * (Math.PI * 2) * speedFactor);
        }
        this.wings.update(t, this.speed, speedFactor);

        this.x =  this.x + this.speed * Math.sin(this.angle);
        this.z = this.z + this.speed * Math.cos(this.angle);

        if (this.scene.gui.isKeyPressed("KeyA")){
            this.turn(0.1 * speedFactor);
        }
        if (this.scene.gui.isKeyPressed("KeyD")){
            this.turn(-0.1 * speedFactor);
        }
        if (this.scene.gui.isKeyPressed("KeyW")){
            this.accelerate(-0.1 * speedFactor);
        }
        if (this.scene.gui.isKeyPressed("KeyS")){
            this.accelerate(0.1 * speedFactor);
        }
        if (this.scene.gui.isKeyPressed("KeyR")){
            this.reset();
        }
        console.log(this.speed);
    }

    turn(v){
        this.angle += v;
    }

    accelerate(v){
        this.speed += v;
        if (this.speed > 0 ){
            this.speed = 0;
        }else if (this.speed < -this.maxSpeed){
            this.speed = -this.maxSpeed;
        }
    }
    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.angle = 0;
        this.speed = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.translate(-this.x, -this.y, -this.z);
        this.scene.translate(this.x, this.y, this.z);
        this.scene.translate(0, this.y, 0);
        //this.scene.scale(1,1,-1);
        this.bodyAppearance.apply();
        this.body.display();
        this.head.display();
        this.wingsAppearance.apply();
        this.tail.display();
        this.wingsAppearance.apply();
        this.wings.display();
        this.scene.popMatrix();
    }
}