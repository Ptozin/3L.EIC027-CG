attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float timeFactor;

uniform sampler2D uSampler2;

uniform float sinusoidalWaveValue;

void main() {

	vTextureCoord = aTextureCoord;

	vec3 offs = aVertexNormal * texture2D(uSampler2, sin(timeFactor)*vec2(0.0,0.1)+vTextureCoord).b * 0.05;

	vec3 offset=aVertexNormal * texture2D(uSampler2, vec2(1.0,1.0)+aTextureCoord).b; // offset is bound by any of the color components
	
	offs.z += offset.y*50.0 + sinusoidalWaveValue * 0.025;
	


    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offs, 1.0);
}

