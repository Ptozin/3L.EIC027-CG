import {CGFobject, CGFappearance, CGFshader} from '../../../lib/CGF.js';
import {MyPlane} from '../2d/MyPlane.js';

export class MyWater extends CGFobject {
    constructor(scene, CGFtexture, CGFHeightMapTexture) {
        super(scene);
        this.texture = CGFtexture;
        this.textureHeigthMap = CGFHeightMapTexture;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.shader = new CGFshader(this.scene.gl, "shaders/water.vert", "shaders/water.frag");
        this.shader.setUniformsValues({ uSampler2: 2, timeFactor: 0, sinusoidalWaveValue: 0});

        this.plane = new MyPlane(this.scene, 30);
    }
    update(t) {
        this.shader.setUniformsValues({ timeFactor: t / 1000 % 1000, sinusoidalWaveValue: Math.sin(2*Math.PI * (t / 10000)) });
    }
    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);

        this.textureHeigthMap.bind(2);

        this.appearance.apply();
        this.scene.translate(0,-78,0);
        this.scene.scale(400,100,400);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}