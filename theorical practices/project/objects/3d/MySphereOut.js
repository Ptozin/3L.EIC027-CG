import {CGFobject} from '../../../lib/CGF.js';

export class MySphere extends CGFobject {

    constructor(scene, slices, stacks, scale) {
        super(scene);
        this.latitude_divs = stacks * 2;
        this.longitude_divs = slices;
        this.scale = scale;
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

                // vertices in esferic coordinates (scale, lat_ang, long_ang)
                var x = this.scale * Math.sin(lat_ang) * Math.cos(+long_ang);
                var y = this.scale * Math.cos(lat_ang);
                var z = this.scale * Math.sin(lat_ang) * Math.sin(-long_ang);
                this.vertices.push(x, y, z);

                // normals
                let n = {
                    x: x/(this.scale*this.scale),
                    y: y/(this.scale*this.scale),
                    z: z/(this.scale*this.scale)
                };
                // normalizing
                let r = Math.sqrt(n.x*n.x + n.y*n.y + n.z*n.z);
                this.normals.push(n.x/r, n.y/r, n.z/r);

                // texture coords
                this.texCoords.push(long * long_div_text, lat * lat_div_text);

                // indices
                if (lat < this.latitude_divs && long < this.longitude_divs) {
                    var current = lat * lat_vertices + long;
                    var next = current + lat_vertices;
                    this.indices.push(current + 1, current, next);
                    this.indices.push(current + 1, next, next + 1);
                }
            }
        }   

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
