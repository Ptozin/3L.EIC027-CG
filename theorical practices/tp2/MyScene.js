import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

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

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.tangram = new MyTangram(this)
    this.cube_quad = new MyUnitCubeQuad(this)

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.diamond_Tx = 0;
    this.diamond_Ty = 0;
    this.diamond_Tz = 0;

  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  setYellowAppearance(){
    this.setAmbient(0.6, 0.6, 0, 1.0);
    this.setDiffuse(0.6, 0.6, 0, 1.0);
    this.setSpecular(0.6, 0.6, 0, 1.0);
    this.setShininess(10.0);
  }
  setOrangeAppearance(){
    this.setAmbient(0.8, 0.5, 0, 1.0);
    this.setDiffuse(0.8, 0.5, 0, 1.0);
    this.setSpecular(0.8, 0.5, 0, 1.0);
    this.setShininess(10.0);
  }
  setPinkAppearance(){
    this.setAmbient(1, 0.4, 0.4, 1.0);
    this.setDiffuse(1, 0.4, 0.4, 1.0);
    this.setSpecular(1, 0.4, 0.4, 1.0);
    this.setShininess(10.0);
  }
  setGreenAppearance(){
    this.setAmbient(0, 0.6, 0, 1.0);
    this.setDiffuse(0, 0.6, 0, 1.0);
    this.setSpecular(0, 0.6, 0, 1.0);
    this.setShininess(10.0);
  }
  setRedApearance(){
    this.setAmbient(0.8, 0.1, 0, 1.0);
    this.setDiffuse(0.8, 0.1, 0, 1.0);
    this.setSpecular(0.8, 0.1, 0, 1.0);
    this.setShininess(10.0);
  }
  setPurpleApearance(){
    this.setAmbient(0.8, 0.1, 0.5, 1.0);
    this.setDiffuse(0.8, 0.1, 0.5, 1.0);
    this.setSpecular(0.8, 0.1, 0.5, 1.0);
    this.setShininess(10.0);
  }
  display() {
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
    // Draw axis
    if (this.displayAxis) this.axis.display();
    // Default object Matrix scale values

    var default_scale = [
      this.scaleFactor, 0.0, 0.0, 0.0, 
      0.0, this.scaleFactor, 0.0, 0.0, 
      0.0, 0.0, this.scaleFactor, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    this.multMatrix(default_scale);
  
    
    var T_x = 5.8;
    var T_y = 0;
    var T_z = 2.2;

    var matrix_translate = [
        1.0, 0.0, 0.0, 0.0, 
        0.0, 1.0, 0.0, 0.0, 
        0.0, 0.0, 1.0, 0.0, 
        T_x, T_y, T_z, 1.0, 
    ];

    this.multMatrix(matrix_translate);

    this.setDefaultAppearance();

    this.rotate(Math.PI/2, -1, 0, 0);
    this.tangram.display();

    this.popMatrix();
    this.pushMatrix();

    var scale_x = 10.8;
    var scale_y = 4.0;
    var scale_z = 1.0;

    var cube_scale = [
      scale_x, 0.0, 0.0, 0.0, 
      0.0, scale_y, 0.0, 0.0, 
      0.0, 0.0, scale_z, 0.0, 
      0.0, 0.0, 0.0, 1.0,
    ];

    var T_x = -0.4;
    var T_y = 0.2;
    var T_z = -0.01;

    var matrix_translate = [
      1.0, 0.0, 0.0, 0.0, 
      0.0, 1.0, 0.0, 0.0, 
      0.0, 0.0, 1.0, 0.0, 
      T_x, T_y, T_z, 1.0, 
    ];


    this.multMatrix(matrix_translate);
    this.multMatrix(cube_scale);

    this.setYellowAppearance();
    this.cube_quad.display();
  }
}
