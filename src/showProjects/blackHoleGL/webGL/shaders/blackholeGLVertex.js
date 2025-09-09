export const vertex = `
      attribute vec2 aPosition;
      attribute vec2 aTexCoord;
      varying vec2 TexCoord;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
        TexCoord = aTexCoord;
      }
    `;
