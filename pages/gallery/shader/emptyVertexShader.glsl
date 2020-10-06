void main() {
    vec3 pos = position;
    pos.y = ( pos.y * 0.5 ) + sin( pos.x * 3.0 ) * 0.5;
    gl_Position = vec4(pos, 1.0);
}
