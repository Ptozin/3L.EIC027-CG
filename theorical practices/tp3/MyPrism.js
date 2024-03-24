import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices
 * @param stacks - number of stacks
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.slices = slices;
        this.stacks = stacks;
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

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        for(var i = 0; i < this.slices; i++){ 
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different  
            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            var p1 = [ca, sa, 0];
            var p2 = [caa, saa, 0];
            var p3 = [ca, sa, 1];

            var A = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
            var B = [p3[0] - p1[0], p3[1] - p1[1], p3[2] - p1[2]];

            var normal = [
                A[1] * B[2] - A[2] * B[1],
                A[2] * B[0] - A[0] * B[2],
                A[0] * B[1] - A[1] * B[0]
            ]
            ang+=alphaAng;
            
            for(var step = 0; step < this.stacks; step++){
                var z = step/this.stacks;
                var z_1 = (step+1)/this.stacks;

                this.vertices.push(ca, sa, z);
                this.vertices.push(caa, saa, z);
                this.vertices.push(ca, sa, z_1);
                this.vertices.push(caa, saa, z_1);
    
                this.vertices.push(ca, sa, z);
                this.vertices.push(caa, saa, z);
                this.vertices.push(ca, sa, z_1);
                this.vertices.push(caa, saa, z_1);
    
                // push normal once for each vertex of this triangle
                this.normals.push(...this.normalVector(normal));
                this.normals.push(...this.normalVector(normal));
                this.normals.push(...this.normalVector(normal));
                this.normals.push(...this.normalVector(normal));
    
                this.normals.push(...this.normalVector(normal));
                this.normals.push(...this.normalVector(normal));
                this.normals.push(...this.normalVector(normal));
                this.normals.push(...this.normalVector(normal));

                console.log(this.vertices.length)

                var i_0 = this.vertices.length/3 - 8;
                var i_1 = this.vertices.length/3 - 8 + 1;
                var i_2 = this.vertices.length/3 - 8 + 2;
                var i_3 = this.vertices.length/3 - 8 + 3;
                
                this.indices.push(i_0, i_1, i_2);
                this.indices.push(i_1, i_3, i_2);
            }
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
        this.slices = 3 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 3-12
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

