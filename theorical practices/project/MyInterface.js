import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Slider element in GUI
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');

        this.gui.add(this.scene, 'fovFactor', 0.5, 2).name("FOV");

        this.gui.add(this.scene, 'windAngle', 0, 2*Math.PI).name("Wind Angle");
        this.gui.add(this.scene, 'windStrength', 0, 0.5).name("Wind Strength");
        this.gui.add(this.scene, 'isWind').name("Wind");

        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.gui.add(this.scene, 'fixedPanorama').name("Fixed panorama");


        this.initKeys();

        this.initKeys();
        return true;
    }
    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    }

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }
}