varying vec2 vUv;
uniform float uAspect;

void main() {
    vec2 uv = vec2(vUv.x * uAspect, vUv.y);
    vec2 center = vec2(0.5 * uAspect, 0.5);
    float dist = 0.05 / length(uv - center);
    vec4 color = vec4(vec3(dist), 1.0);
    color *= vec4(0.3, 0.3, 1.0, 1.0);
    
    gl_FragColor = color;
}
