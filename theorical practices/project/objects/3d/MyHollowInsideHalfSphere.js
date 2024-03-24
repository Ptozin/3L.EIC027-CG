import {CGFobject} from '../../../lib/CGF.js';

export class MyHollowInsideHalfSphere extends CGFobject {

    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.latitude_divs = stacks;
        this.longitude_divs = slices;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var lat_vertices = this.longitude_divs + 1;
        const long_div_text = 1 / this.longitude_divs;
        const lat_div_text = 1 / this.latitude_divs;

        for (let lat = 0; lat <= this.latitude_divs; lat++) {
            const lat_ang = Math.PI * lat / this.latitude_divs;

            for (let long = 0; long <= this.longitude_divs; long++) {
                const long_ang = 2 * Math.PI * long / this.longitude_divs;

                // vertices in esferic coordinates (radius, lat_ang, long_ang)
                var x = this.radius * Math.sin(lat_ang) * Math.cos(+long_ang);
                var y = this.radius * Math.cos(lat_ang);
                var z = this.radius * Math.sin(lat_ang) * Math.sin(-long_ang);
                //this.vertices.push(x, y, z);
                this.vertices.push(x, y, z);

                // normals
                let n = {
                    x: x/(this.radius^2),
                    y: y/(this.radius^2),
                    z: z/(this.radius^2)
                };

                // normalizing
                let r = Math.sqrt(n.x*n.x + n.y*n.y + n.z*n.z);
                this.normals.push(-n.x/r, -n.y/r, -n.z/r);

                // texture coords
                this.texCoords.push(long * long_div_text, lat * lat_div_text);

                // indices
                if (lat < this.latitude_divs && long < this.longitude_divs) {
                    var current = lat * lat_vertices + long;
                    var next = current + lat_vertices;
                    
                    //Only include triangles that form the bottom half of the sphere
                    if(lat > this.latitude_divs/2){
                        this.indices.push(next, current, current + 1);
                        this.indices.push(next + 1, next, current + 1);
                    }
                }
            }
        }   

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        
        // For debugging only
        // console.log(this.vertices);
        // console.log(this.texCoords);
    }
}
