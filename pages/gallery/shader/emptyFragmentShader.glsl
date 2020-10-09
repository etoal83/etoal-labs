varying vec2 vUv;
uniform float uAspect;
uniform float uTime;

void main() {
    vec2 uv = vec2(vUv.x * uAspect, vUv.y);
    vec2 center = vec2(0.5 * uAspect, 0.5);
    float radius = 0.05 + sin(uTime) * 0.025;
    float brightness = radius / length(uv - center);
    vec4 color = vec4(vec3(brightness), 1.0);
    color *= vec4(0.3, 0.3, 1.0, 1.0);
    
    gl_FragColor = color;
}
