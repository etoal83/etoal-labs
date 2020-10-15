uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
    vec2 mouse = u_mouse * u_resolution / min(u_resolution.x, u_resolution.y);
    float radius = 0.1 + sin(u_time) * 0.05;
    float brightness = radius * (1.0 / length(uv - mouse));
    vec4 color = vec4(vec3(brightness), 1.0);
    color *= vec4(0.3, 0.3, 1.0, 1.0);
    
    gl_FragColor = color;
}
