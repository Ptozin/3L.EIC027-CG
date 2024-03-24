import {CGFobject} from '../../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	// 0
			2, 0, 0,	// 1
			1, 1, 0,	// 2
			-1, 1, 0,	// 3

			0, 0, 0,	// 4
			2, 0, 0,	// 5
			1, 1, 0,	// 6
			-1, 1, 0		// 7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // front side
			0, 1, 2,
			3, 0, 2,
            // back side
            6, 5, 4,
			7, 6, 4
		];

		/*
		Sets Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0.75, 0.75, //A 
			0.25,0.75, //B 
			0.5, 1, //C 
			1, 1, //D 

			1, 1, //D 
			0.5 ,1, //C 
			0.25, 0.75, //B 
			0.75, 0.75, //A 
		]

		this.normals = [];

		for (var i = 0; i < 4; i++) 
			this.normals.push(0, 0, 1);
		for (var i = 0; i < 4; i++)
			this.normals.push(0, 0, -1);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

