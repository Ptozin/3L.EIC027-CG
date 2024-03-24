import {CGFobject, CGFappearance, CGFshader} from '../../../lib/CGF.js';
import {MyPlane} from '../2d/MyPlane.js';

export class MyTerrain extends CGFobject {
    constructor(scene, CGFtexture, CGFHeightMapTexture, CGFAltimetryTexture) {
        super(scene);
        this.texture = CGFtexture;
        this.textureHeigthMap = CGFHeightMapTexture;
        this.textureAltimetry = CGFAltimetryTexture;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.shader = new CGFshader(this.scene.gl, "shaders/texture3.vert", "shaders/texture3.frag");
        this.shader.setUniformsValues({ uSampler2: 1, uSampler3: 2, normScale: 2.5, textureColorWeigth: 0.3 });

        // USE THIS SHADER TO DEBUG TREES ONLY
        //this.shader.setUniformsValues({ uSampler2: 1, uSampler3: 2, normScale: 0.0, textureColorWeigth: 0.3, ambientLight: 1.0 });

        this.plane = new MyPlane(this.scene, 30);
    }
    update(ambientLight) {
        this.shader.setUniformsValues({ ambientLight: ambientLight });
    }
    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);

        this.textureHeigthMap.bind(1);
        this.textureAltimetry.bind(2);

        this.appearance.apply();
        this.scene.translate(0,-100,0);
        this.scene.scale(400,400,400);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}