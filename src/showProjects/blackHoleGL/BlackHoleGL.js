import React, { useRef, useState, useEffect } from "react";
import { frag } from "./webGL/shaders/blackholeGLFrag";
import { vertex } from "./webGL/shaders/blackholeGLVertex";

export function BlackHoleGL({ width = 500, height = 500 }) {
  const canvasRef = useRef(null);
  const [rotationLeftRight, setRotationLeftRight] = useState(Math.PI / 2);
  const [rotationUpDown, setRotationUpDown] = useState(Math.PI / 2);

  const programRef = useRef(null);
  const uRotationRef = useRef(null);
  const vRotationRef = useRef(null);
  const glRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }
    glRef.current = gl;

    const ext = gl.getExtension("OES_texture_float");
    if (!ext) {
      console.error("OES_texture_float not supported on this device!");
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // --- Shaders ---
    const vsSource = vertex;
    const fsSource = frag;

    // --- Compile helper ---
    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);

    const viewGrid = createViewGrid(canvas.width, canvas.height);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const uRotation = gl.getUniformLocation(program, "rotationAngleLeftRight");
    const vRotation = gl.getUniformLocation(program, "rotationAngleUpDown");

    programRef.current = program;

    // --- Fullscreen quad (two triangles) ---
    const vertices = new Float32Array([
      // First triangle
      -1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1,

      // Second triangle
      -1, 1, 0, 1, 1, -1, 1, 0, 1, 1, 1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(aPosition);

    const aTexCoord = gl.getAttribLocation(program, "aTexCoord");
    gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 16, 8);
    gl.enableVertexAttribArray(aTexCoord);

    // --- ViewGrid ---
    const viewGridTexture = createViewGridTexture(
      gl,
      canvas.width,
      canvas.height,
      viewGrid
    );

    const uViewGrid = gl.getUniformLocation(program, "viewGrid");
    gl.activeTexture(gl.TEXTURE1); // use texture unit 1
    gl.bindTexture(gl.TEXTURE_2D, viewGridTexture);
    gl.uniform1i(uViewGrid, 1);

    // const angle = rotationLeftRight;

    uRotationRef.current = gl.getUniformLocation(
      program,
      "rotationAngleLeftRight"
    );

    vRotationRef.current = gl.getUniformLocation(
      program,
      "rotationAngleUpDown"
    );

    gl.useProgram(program);

    // --- Load texture ---
    const texture = gl.createTexture();
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = "/images/skybox.webp";
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );

      // Set parameters **after uploading**
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Now bind texture unit and assign uniform
      const environmentTexture = gl.getUniformLocation(
        program,
        "environmentTexture"
      );
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(environmentTexture, 0);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    function createViewGrid(width, height) {
      const stepSize = 1.0;
      const numPixels = width * height;
      const viewGridData = new Float32Array(numPixels * 2);

      for (let i = 0; i < height; i++) {
        const y = (i - height / 2) * stepSize;
        for (let j = 0; j < width; j++) {
          const x = (j - width / 2) * stepSize;
          const index = (width * i + j) * 2;
          viewGridData[index] = x;
          viewGridData[index + 1] = y;
        }
      }

      return viewGridData;
    }

    function createViewGridTexture(gl, width, height, viewGridData) {
      const numPixels = width * height;
      const texData = new Float32Array(numPixels * 4); // RGBA per pixel

      for (let i = 0; i < numPixels; i++) {
        texData[i * 4] = viewGridData[i * 2]; // x -> R
        texData[i * 4 + 1] = viewGridData[i * 2 + 1]; // y -> G
        texData[i * 4 + 2] = 0; // unused
        texData[i * 4 + 3] = 1; // unused
      }

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Upload as float RGBA texture
      const ext = gl.getExtension("OES_texture_float");
      if (!ext) console.error("OES_texture_float not supported");

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        width,
        height,
        0,
        gl.RGBA,
        gl.FLOAT,
        texData
      );

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      return texture;
    }
  }, [width, height]);

  useEffect(() => {
    const gl = glRef.current;
    if (!gl || !programRef.current) return;

    gl.useProgram(programRef.current);
    gl.uniform1f(uRotationRef.current, rotationLeftRight);
    gl.uniform1f(vRotationRef.current, rotationUpDown);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }, [rotationLeftRight, rotationUpDown]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height * 0.9} />
      <input
        type="range"
        min="0"
        max={2 * Math.PI}
        step={0.01}
        value={rotationLeftRight}
        onChange={(e) => setRotationLeftRight(parseFloat(e.target.value))}
        style={{ width: "100%" }}
      />
      <input
        type="range"
        min="0"
        max={2 * Math.PI}
        step={0.01}
        value={rotationUpDown}
        onChange={(e) => setRotationUpDown(parseFloat(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default BlackHoleGL;
