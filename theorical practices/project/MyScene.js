import { CGFscene, CGFcamera, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyTerrain } from "./objects/3d/MyTerrain.js";
import { MyPanoram } from "./objects/MyPanoram.js";
import { MyTreeFullPatch } from "./objects/MyTreeFullPatch.js";
import { MyBird } from "./objects/3d/MyBird.js";
import { MyWater } from "./objects/3d/MyWater.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    this.fovFactor = 1.25;

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects

    this.nestTexture = new CGFtexture(this, 'images/nest.jpg');
    this.birdEggTexture = new CGFtexture(this, 'images/egg.jpg'); 
    this.birdFeathersTexture = new CGFtexture(this, 'images/bird_feathers.jpg');

    this.bird = new MyBird(this, 1, this.nestTexture, this.birdEggTexture, this.birdFeathersTexture);
    this.speedFactor = 1;
    this.scaleFactor = 1;

    //Objects connected to MyInterface
    this.displayPanorama = true;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.texture2 = new CGFtexture(this, "images/heightmap_v2.jpg");
    this.texture3 = new CGFtexture(this, "images/altimetry.png");
    this.terrain = new MyTerrain(this, this.texture, this.texture2, this.texture3);

    this.texturePanorama = new CGFtexture(this, "images/panorama4.jpg");
    this.panoram = new MyPanoram(this, this.texturePanorama);
    this.fixedPanorama = false;

    this.textureBillboard1 = new CGFtexture(this, "images/billboardtree.png");
    this.textureBillboard2 = new CGFtexture(this, "images/billboardtree2.png");
    this.textureBillboard3 = new CGFtexture(this, "images/billboardtree3.png");

    this.windAngle = 0;
    this.windStrength = 0.01;
    this.isWind = true;

    this.treeSpacing = 15;

    this.treeGroupPatch = new MyTreeFullPatch(this, this.textureBillboard1, this.textureBillboard2, this.textureBillboard3, this.treeSpacing, [this.windAngle, this.windStrength, this.isWind], this.texture2);

    this.groupPosX = 100;
    this.groupPosY = 100;
    this.groupPosZ = -46;

    this.cameraYOffset = 5.0;
    this.birdDistance = 10.0;

    this.followBirdKey = false;
    this.followBirdB = true;

    this.waterTex = new CGFtexture(this, "images/waterTex.jpg");
    this.waterMap = new CGFtexture(this, "images/waterMap.jpg");
    this.water = new MyWater(this, this.waterTex, this.waterMap);

    // set the scene update period 
		// (to invoke the update() method every 50ms or as close as possible to that )
		this.setUpdatePeriod(33);
  }
  initLights() {
    this.lights[0].setPosition(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(77, -16, 70),
      vec3.fromValues(77, -46, 10)
    );

  }
  setDefaultAppearance() {
    this.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  // called periodically (as per setUpdatePeriod() in init())
	update(t) {
    let ambientR = 1.0;
    let ambientG = 1.0;
    let ambientB = 1.0;

    this.panoram.update(ambientR, ambientG, ambientB);
    this.terrain.update(ambientR);
    this.treeGroupPatch.update(t, ambientR, ambientG, ambientB);

    this.checkKeys();
    this.bird.update(t, this.speedFactor);
    this.water.update(t);
  }
  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    // Check for key codes e.g. in https://keycode.info/

    if (this.gui.isKeyPressed("KeyT")) {
      this.cameraYOffset += 1.0;
      if (this.cameraYOffset > 15.0) {
        this.cameraYOffset = 15.0;
      }
    }

    if (this.gui.isKeyPressed("KeyG")) {
      this.cameraYOffset -= 1.0;
      if (this.cameraYOffset < -15.0) {
        this.cameraYOffset = -15.0;
      }

    }

    if (this.gui.isKeyPressed("KeyV")) {
      this.birdDistance += 1.0;
      if (this.birdDistance > 25.0) {
        this.birdDistance = 25.0;
      }
    }

    if (this.gui.isKeyPressed("KeyB")) {
      this.birdDistance -= 1.0;
      if (this.birdDistance < 5.0) {
        this.birdDistance = 5.0;
      }

    }

    if (this.gui.isKeyPressed("KeyR")) {
      this.bird.reset();
    }

    if (this.gui.isKeyPressed("KeyF")) {
      if(!this.followBirdKey) {
        this.followBirdB = !this.followBirdB;
      }
      this.followBirdKey = true;
    } else {
      this.followBirdKey = false;
    }

  } 
  followBird() {

    let angle = this.bird.angle;

    let x = this.bird.x;
    let y = this.bird.fixedY;
    let z = this.bird.z;

    let x1 = x + Math.cos(angle - Math.PI/2)*this.birdDistance;
    let y1 = y + this.cameraYOffset;
    let z1 = z - Math.sin(angle - Math.PI/2)*this.birdDistance;

    this.camera.setPosition(vec3.fromValues(x1, y1, z1));
    this.camera.setTarget(vec3.fromValues(x, y, z));

  }

  display() {
    this.camera.fov = this.fovFactor;
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section

    if(!this.fixedPanorama)
      this.panoram.updatePanoram(this.camera.position);
    else
      this.panoram.updatePanoram(vec3.fromValues(0, 0, 0));


    if(this.followBirdB)
      this.followBird();

    if(this.displayPanorama)
      this.panoram.display();
    
    this.terrain.display();

    this.water.display();

    this.treeGroupPatch.display([this.windAngle, this.windStrength, this.isWind]);

    this.bird.display();
    
    this.setActiveShader(this.defaultShader);

    // ---- END Primitive drawing section
  }
}
