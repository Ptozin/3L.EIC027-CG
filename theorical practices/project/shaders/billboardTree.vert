
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

uniform sampler2D heigthMapSampler;
uniform float heigthMapScale;

uniform float xPos;
uniform float yPos;
uniform float zPos;

// wind
uniform float windSpeed;
uniform float windAngle;
uniform float cameraAngle;
uniform bool isWind;

uniform float sinusoidalWaveValue;


void main() {

	vTextureCoord = aTextureCoord;

	vec3 offset=vec3(0.0,0.0,0.0);

	//offset = aVertexNormal*heigthMapScale*0.1 * texture2D(heigthMapSampler, vec2(1.0,1.0)+vTextureCoord).b;

	if(isWind){
		offset.x = windSpeed * sin(windAngle - cameraAngle) * sinusoidalWaveValue;
		offset.z = windSpeed * cos(windAngle - cameraAngle) * sinusoidalWaveValue;

		offset *= (aVertexPosition.y + 0.5); 

	}

	//offset.y = 16.0*heigthMapScale * texture2D(heigthMapSampler, vec2(xPos,zPos)).b;
	//offset.y = test.b;

	offset.y = 2.0;

	//offset.y = yPos/20.0;

	//offset.y = aVertexPosition.y + 0.1 * heigthMapScale * texture2D(uSampler2, vec2(1.0,1.0)+vec2(xPos,zPos)).b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

