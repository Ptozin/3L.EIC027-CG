#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float textureColorWeigth;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

uniform float ambientLight;

void main() {
	vec4 colorTexture1 = texture2D(uSampler, vTextureCoord);
	vec4 colorTexture2 = texture2D(uSampler2, vTextureCoord);
	vec4 color = vec4(0.0,0.0,0.0,0.0);

	float heigth = 1.0 - colorTexture2.r;

	vec4 colorTexture3 = texture2D(uSampler3, vec2(1.0, heigth));

	// heigth -= 0.5;
	// float intensification = 1.5* heigth*heigth + 0.3;

	// F(x) = 1.5 * (x-0.5)^2 + 0.3
	// This function shall give a desirable intensification effect (ranges from 0.3 to 0.675)
	// It intensifies the heigth texture on the lowest/highests spots

	// For now we will use the default texture

	color = mix(colorTexture1,colorTexture3, textureColorWeigth);

	//color *= ambientLight;

	color = vec4(color.rgb * ambientLight, color.a);

	gl_FragColor = color;
}
