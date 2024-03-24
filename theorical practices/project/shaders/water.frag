#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

uniform float timeFactor;

void main() {
	vec2 moveCoords = mod(vTextureCoord + timeFactor*0.01, 1.0);

	vec4 color = texture2D(uSampler, moveCoords);
	vec4 filter = texture2D(uSampler2, moveCoords);

	color.b -= color.b * filter.b * 0.2;
    color.r -= color.r * filter.b * 0.2;
    color.g -= color.g * filter.b * 0.2;
	
	gl_FragColor = color;
}