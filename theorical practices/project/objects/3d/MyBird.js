import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyBirdBody } from './bird/MyBirdBody.js';
import { MyBirdHead } from './bird/MyBirdHead.js';
import { MyBirdTail } from './bird/MyBirdTail.js';
import { MyBirdWings } from './bird/MyBirdWings.js';
import { MyNest } from './MyNest.js';
import { MyBirdEgg } from './MyBirdEgg.js';

export class MyBird extends CGFobject {
    constructor(scene,  scale, nestTexture, birdEggTexture, birdFeathersTexture) {
        super(scene);
        this.scale = scale;

        //Initialize Objects
        this.body = new MyBirdBody(scene, 1);
        this.head = new MyBirdHead(scene, 1);
        this.tail = new MyBirdTail(scene, 1);
        this.wings = new MyBirdWings(scene, 1);

        //Initialize  Materials
        this.wingsAppearance = new CGFappearance(this.scene);
        this.wingsAppearance.setAmbient(1, 1, 1, 1);  
        this.wingsAppearance.setShininess(10.0);
        this.wingsTexture = birdFeathersTexture;
        this.wingsAppearance.setTexture(this.wingsTexture);
        this.wingsAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.bodyAppearance = new CGFappearance(this.scene);
        this.bodyAppearance.setShininess(10.0);
        this.bodyAppearance.setAmbient(1, 1, 1, 1);
        this.bodyTexture = birdFeathersTexture;
        this.bodyAppearance.setTexture(this.bodyTexture);
        this.bodyAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.tailAppearance = new CGFappearance(this.scene);
        this.tailAppearance.setShininess(10.0);
        this.tailAppearance.setAmbient(0.2, 0.2, 0.2, 1);
        this.tailTexture = new CGFtexture(this.scene, '../../images/bird_feathers_diag.jpg');
        this.tailAppearance.setTexture(this.bodyTexture);
        this.tailAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.maxSpeed = 2;
        this.angle = 0;
        this.speed = 0;
        this.x = 66;
        this.y = -25;
        this.fixedY = this.y;
        this.z = 0;

        this.nestTexture = nestTexture;
        this.nest = new MyNest(this.scene, this.nestTexture, 100, -50.2, 0, 12);


        this.birdEggTexture = birdEggTexture; 

        this.numberEggs = 4;

        this.eggSize = 3.0;
        
        this.eggs = [
            new MyBirdEgg(this.scene, this.birdEggTexture, 30, -50.2, 30, this.eggSize),
            new MyBirdEgg(this.scene, this.birdEggTexture, 60, -50.2, 80, this.eggSize),
            new MyBirdEgg(this.scene, this.birdEggTexture, 100, -50.2, 30, this.eggSize),
            new MyBirdEgg(this.scene, this.birdEggTexture, 100, -50.2, -50, this.eggSize), 
        ]; 


        //Bird Dive Variables
        this.state = "glide"; 
        this.sequencestart = 0.0;
        this.delay = 2;
        this.groundlimit = -50.2; 
        this.boundlimit = 115; 

        //BirdFeet Offset
        this.birdfeetxoffset = 0; 
        this.birdfeetyoffset = -8; 
        this.birdfeetzoffset = 0; 

        this.disableDive = false;
        this.ySpeed = 0.0;
        this.ySpeedVal = (this.fixedY + 50.2 - 8);
        this.tolerance = 5.0; 
        this.transportEgg = null; 
        this.dropStart = 0.0;
        this.disableDrop = false;
        
    }

    update(t, speedFactor){
        if (this.speed == 0){
            this.y = 0.3 * Math.cos(t/1000 * (Math.PI * 2) * speedFactor) + this.fixedY;
        } else {
            var maxOscilation = 0.4;
            var oscilation = maxOscilation/this.speed/2 < -maxOscilation ? maxOscilation : maxOscilation/this.speed/2;
            this.y = oscilation * Math.cos(t/1000 * (Math.PI * 2) * speedFactor) + this.fixedY;
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
        if (this.scene.gui.isKeyPressed("KeyO")){
            if(this.transportEgg != null){
                if(this.checkNearNest()) {
                    this.state = "drop";
                    this.dropStart = t/1000.0;
                }
            }
        }

        if (this.scene.gui.isKeyPressed("KeyP")){ 
            if(!this.disableDive && this.transportEgg == null){  
                this.state = "dive"; 
                this.sequencestart = t/1000.0; 
                this.disableDive = true;
            }
        }

        
        this.dealWithFlyAndDive(t);

        this.displayEggDropping(t); 
    }

    dealWithFlyAndDive(t){
        if (this.state === "dive"){
            const currtime = t/1000.0 - this.sequencestart;
            this.ySpeed = this.ySpeedVal;

            this.dive(currtime); 

            if(currtime > this.delay/2){
                this.state = "fly"
            }

        } else if (this.state === "fly"){
            const currtime = t/1000.0 - this.sequencestart;
            this.ySpeed = this.ySpeedVal;

            this.fly(currtime); 

            if(currtime > this.delay){
                this.state = 'glide'; 
            }

        } else if(this.state == 'glide') {
            this.ySpeed = 0.0;
            this.sequencestart = 0; 
            this.disableDive = false;
        }
    }
    

    dive(t){
        this.y -= this.ySpeed*t;
        
        for(let i=0; i<this.numberEggs; i++){
            if(this.checkNearEgg(this.eggs[i]) && this.transportEgg === null){
                this.transportEgg = this.eggs[i];  
                this.eggs.splice(i, 1);
                this.numberEggs--;
                break;  
            }
        }
    }

    fly(t){
        this.y += this.ySpeed*(t-2.0); 
    }
    checkNearEgg(Egg){
        //console.log(Egg.x, Egg.y, Egg.z, this.x -this.tolerance - Egg.x, this.x + this.tolerance + Egg.x, this.y -this.tolerance, this.y + this.tolerance, this.z -this.tolerance, this.z + this.tolerance);
        if((Egg.x >= this.x -this.tolerance && Egg.x <= this.x + this.tolerance) && (Egg.y >= this.y -this.tolerance - 8.0 && Egg.y <= this.y + this.tolerance + 8.0) && (Egg.z >= this.z -this.tolerance && Egg.z <= this.z + this.tolerance)){
            return true; 
        }
        else 
            return false; 
    }

    checkNearNest(){
        if((this.transportEgg.x >= this.nest.x - this.nest.radius && this.transportEgg.x <= this.nest.x + this.nest.radius) && (this.transportEgg.z >= this.nest.z - this.nest.radius && this.transportEgg.z <= this.nest.z + this.nest.radius)){
            return true; 
        }
        else 
            return false; 
    }

    checkNestColision(){
        if((this.transportEgg.y >= this.nest.y - this.nest.radius/2.0 && this.transportEgg.y <= this.nest.y + this.nest.radius/2.0) && this.state === "drop"){
            return true; 
        }

        return false; 
    }

    displayEggDropping(t){
        if (this.state === "drop"){
            if (this.checkNearNest() && !this.checkNestColision()){
                this.transportEgg.setY(this.transportEgg.y- (t/1000.0 - this.dropStart));
                this.transportEgg.display(); 
            }
            if(this.checkNestColision()){
                this.state = 'glide'; 
                this.nest.birdeggs.push(this.transportEgg); 
                this.transportEgg = null; 
            }
            else if (this.transportEgg.y < this.groundlimit){
                this.state = 'glide'; 
                this.eggs.push(this.transportEgg);
                this.transportEgg = null; 
            }
        }
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
        this.x = 66;
        this.y = this.fixedY;
        this.z = 0;
        this.angle = 0;
        this.speed = 0;
    }
    displayEggs() {
        for (let i = 0; i < this.numberEggs; i++) {
            this.eggs[i].display();
        }
        if((this.transportEgg != null && this.state != "drop")){
            this.transportEgg.setX(this.x + this.birdfeetxoffset); 
            this.transportEgg.setY(this.y + this.birdfeetyoffset); 
            this.transportEgg.setZ(this.z + this.birdfeetzoffset); 
        }
        if(this.transportEgg != null){
            this.transportEgg.display(); 
        }
    }

    display() {
        //Display Bird Eggs
        this.displayEggs();

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.bodyAppearance.apply();
        this.body.display();
        this.head.display();
        this.tailAppearance.apply();
        this.tail.display();
        this.wingsAppearance.apply();
        this.wings.display();
        this.scene.popMatrix();

        this.nest.display();
    }
}