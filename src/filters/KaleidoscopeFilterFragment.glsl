precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float sides;

void main() {
  // normalize to the center
  // vec2 p = position - 0.5;
  vec2 p = vTextureCoord - 0.5;

  // cartesian to polar coordinates
  float r = length(p);
  float a = atan(p.y, p.x);
  
  // kaleidoscope
  // float sides = 14.;
  float tau = 2. * 3.1416;
  a = mod(a, tau/sides);
  a = abs(a - tau/sides/2.);
  
  // polar to cartesian coordinates
  p = r * vec2(cos(a), sin(a));
  
  // sample the webcam
  vec4 color = texture2D(uSampler, p + 0.5);
  gl_FragColor = color;
}