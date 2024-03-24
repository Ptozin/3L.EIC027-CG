#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);

	vec4 colorSepiaGrey = color;

	float L = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b)/3.0;

	colorSepiaGrey = vec4(L, L, L, 1.0);

	gl_FragColor = colorSepiaGrey;
}