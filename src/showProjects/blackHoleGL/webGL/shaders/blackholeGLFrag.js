export const frag = `
    precision mediump float;
    varying vec2 TexCoord;
    uniform sampler2D environmentTexture; 
    uniform sampler2D viewGrid;
    uniform float rotationAngleLeftRight;
    uniform float rotationAngleUpDown;

    const float VIEWGRIDZ = -1.0;
    const float PI = 3.14159265359;


    void main() {
        vec2 xyNorm = (TexCoord * 2.0 - 1.0);
        
        mat3 viewRotUppDown = mat3(
              1.0,        0.0,         0.0,
              0.0,  cos(rotationAngleUpDown), -sin(rotationAngleUpDown),
              0.0,  sin(rotationAngleUpDown),  cos(rotationAngleUpDown)
        );

        mat3 viewRotLeftRight = mat3(
            cos(rotationAngleLeftRight), 0.0, sin(rotationAngleLeftRight),
            0.0,      1.0, 0.0,
        -sin(rotationAngleLeftRight), 0.0, cos(rotationAngleLeftRight)
        );

        // apply rotation
        vec3 cartesian = viewRotUppDown * viewRotLeftRight * normalize(vec3(xyNorm, VIEWGRIDZ));

        float r = length(cartesian);
        float theta = atan(cartesian.z, cartesian.x); // azimuth around y
        float phi   = acos(cartesian.y);              // polar with y up
          // 0 .. PI

        vec2 envUV = vec2((theta + PI) / (2.0 * PI), 1.0 - phi / PI);

        vec4 envColor = texture2D(environmentTexture, envUV);
        vec4 frag = envColor;

        gl_FragColor = frag;
    }
`;
