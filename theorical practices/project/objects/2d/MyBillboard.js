import {CGFobject, CGFappearance, CGFshader} from '../../../lib/CGF.js';
import {MyTreePlane} from './MyTreePlane.js'

export class MyBillboard extends CGFobject {
    constructor(scene, CGFtexture, wind, CGFHeightMapTexture, heigthScale) {
        super(scene);
        this.texture = CGFtexture;
        this.wind = wind;
        this.heigthScale = 1.0;

        this.scale = [20.0*this.heigthScale, 25.0*this.heigthScale,25.0*this.heigthScale];

        this.heigthAdjust = 12.5*this.heigthScale;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.textureHeigthMap = CGFHeightMapTexture;

        this.shader = new CGFshader(this.scene.gl, "shaders/billboardTree.vert", "shaders/billboardTree.frag");
        this.shader.setUniformsValues({windAngle: this.wind[0], windSpeed: this.wind[1], isWind: this.wind[2], heigthMapSampler: 1, heigthMapScale : 0.3, xPos: 0, zPos: 0});

        this.plane = new MyTreePlane(this.scene, 30);
    }
    followCamera(x, y, z) {
        let vector1 = vec2.fromValues(this.scene.camera.position[0] - x, this.scene.camera.position[2] - z);
        let vector2 = vec2.fromValues(0, 1);

        vec2.normalize(vector1, vector1);
        
        let angle = 0;

        if(vector1[0] < 0)
            angle = - Math.acos(vec2.dot(vector1, vector2));
        else 
            angle = Math.acos(vec2.dot(vector1, vector2));

            
        this.scene.translate(x,y,z);
        
        this.scene.rotate(angle,0.0,1.0,0.0); 
        
        this.scene.scale(this.scale[0], this.scale[1], this.scale[2]);

        this.shader.setUniformsValues({ cameraAngle: angle });

        this.plane.display();

        this.scene.rotate(-angle,0.0,1.0,0.0);   
    } 
    // called periodically (as per setUpdatePeriod() in init())
	update(t, ambientR, ambientG, ambientB) {
         this.shader.setUniformsValues({ sinusoidalWaveValue: Math.sin(2*Math.PI * (t / 2000)), ambientLight: ambientR });
	}
    display(x, y, z, wind) {
        this.wind = wind;
        this.scene.setActiveShader(this.shader);
        this.shader.setUniformsValues({windAngle: this.wind[0], windSpeed: this.wind[1], isWind: this.wind[2], yPos: y - this.heigth, xPos: x/400.0, zPos: z/400.0});

        this.scene.pushMatrix();

        this.textureHeigthMap.bind(1);

        this.appearance.apply();

        this.followCamera(x, y, z);

        this.scene.popMatrix();
    }

}