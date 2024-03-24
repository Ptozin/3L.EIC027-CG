#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float textureColorWeigth;

uniform sampler2D uSampler;
uniform float ambientLight;


void main() {
	vec4 colorTexture1 = texture2D(uSampler, vTextureCoord);
	vec4 color = vec4(0.0,0.0,0.0,0.0);

	if(colorTexture1.a < 1.0) {
		discard;
	} else {
		color = vec4(colorTexture1.rgb * ambientLight, 1.0);
	}

	gl_FragColor = color;
}
