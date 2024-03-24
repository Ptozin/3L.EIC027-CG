import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            -0.5, -0.5, -0.5,	    //0
            -0.5, -0.5, -0.5,	    //1
            -0.5, -0.5, -0.5,	    //2

            -0.5, -0.5, 0.5, 	    //3
            -0.5, -0.5, 0.5,	    //4
            -0.5, -0.5, 0.5,	    //5

            -0.5, 0.5, -0.5,	    //6
            -0.5, 0.5, -0.5, 	    //7
            -0.5, 0.5, -0.5,        //8

            -0.5, 0.5, 0.5,         //9
            -0.5, 0.5, 0.5, 	    //10
            -0.5, 0.5, 0.5, 	    //11

            0.5, -0.5, -0.5,	    //12
            0.5, -0.5, -0.5,	    //13
            0.5, -0.5, -0.5,	    //14

            0.5, -0.5, 0.5, 	    //15
            0.5, -0.5, 0.5, 	    //16
            0.5, -0.5, 0.5, 	    //17

            0.5, 0.5, -0.5, 	    //18
            0.5, 0.5, -0.5, 	    //19
            0.5, 0.5, -0.5, 	    //20

            0.5, 0.5, 0.5, 	        //21
            0.5, 0.5, 0.5, 	        //22
            0.5, 0.5, 0.5, 	        //23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            14, 20, 23, // +X Side
            14, 23, 17, // +X Side
            2, 11, 8,   // -X Side
            2, 5, 11,   // -X Side

            22, 19, 7,  // +Y Side
            22, 7, 10,  // +Y Side
            16, 1, 13,  // -Y Side
            16, 4, 1,   // -Y Side

            21, 9, 15,  // +Z Side
            15, 9, 3,   // +Z Side
            18, 12, 6,  // -Z Side
            12, 0, 6,   // -Z Side
		];
        
        // Generating normals
        this.normals = [
            0, 0, -1,	//0
            0, -1, 0,	//1
            -1, 0, 0,	//2
            
            0, 0, 1,    //3
            0, -1, 0,	//4
            -1, 0, 0,	//5

            0, 0, -1,	//6
            0, 1, 0,	//7
            -1, 0, 0,	//8

            0, 0, 1,	//9
            0, 1, 0,	//10
            -1, 0, 0,	//11

            0, 0, -1,	//12
            0, -1, 0,	//13
            1, 0, 0,	//14

            0, 0, 1,	//15
            0, -1, 0,	//16
            1, 0, 0,	//17

            0, 0, -1,	//18
            0, 1, 0,	//19
            1, 0, 0,	//20

            0, 0, 1,	//21
            0, 1, 0,	//22
            1, 0, 0,	//23
        ];  
        
        
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of nDivs
     */
    updateBuffers(complexity){
        this.nDivs = 1 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 1-10
        this.patchLength = 1.0 / this. nDivs;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

