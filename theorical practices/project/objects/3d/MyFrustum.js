import {CGFobject} from '../../../lib/CGF.js';
/**
 * MyFrustum
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices
 * @param stacks - number of stacks
 */
export class MyFrustum extends CGFobject {
	constructor(scene, slices, stacks, diff) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
        this.diff = diff;
		this.initBuffers();
	}

	normalVector(vector) {
		var mod = Math.sqrt(vector[0]*vector[0]+vector[1]*vector[1]+vector[2]*vector[2]);
		return [vector[0]/mod, vector[1]/mod, vector[2]/mod];
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];


		// vertices
		var slice_angle = Math.PI*2/this.slices;
		var angle = 0;
		var side_size = 1;
		var stack_size = side_size/this.stacks;
        var diff_size = this.diff/this.stacks;

		for (var slice = 0; slice < this.slices; slice++) {
			for (var stack = 0; stack <= this.stacks; stack++) {
                var x = Math.cos(angle)*(1+diff_size*stack);
                var y = Math.sin(angle)*(1+diff_size*stack);
				this.vertices.push(x, y, stack_size*stack);
				this.texCoords.push(slice/this.slices, stack/this.stacks);
			}
			angle += slice_angle;
		}

		// indices
		var index = 0;
		var index2 = this.stacks+1;
		var num_vertices = (this.stacks+1)*this.slices

		for (var i = 0; i < this.slices; i++) {
			for (var j = 0; j < this.stacks; j++) {
				this.indices.push((index)%num_vertices, (index2)%num_vertices, (index+1)%num_vertices);
				this.indices.push((index+1)%num_vertices, (index2)%num_vertices, (index2+1)%num_vertices);
				index += 1; index2 += 1;
			}
			index += 1; index2 += 1;
		}

		//normals
		for (var slice = 0; slice < this.slices; slice++) {
			for (var stack = 0; stack <= this.stacks; stack++) {
				this.normals.push(...this.normalVector([Math.cos(angle), Math.sin(angle), 0]));
			}
			angle += slice_angle;
		}
		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	 /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
	 updateBuffers(complexity){
        // this.slices = 3 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 3-12
        // this.stacks = 1 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 3-12
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

