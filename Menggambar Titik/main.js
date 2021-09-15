function main() {
  // Media untuk menggambar
  var canvas = document.getElementById("myCanvas");
  // Alat untuk menggambar
  var context = canvas.getContext("webgl");

  // Mendefinisikan vertex
  var vertexShaderCode = `
  void main() {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 10.0;
  }
  `;

  // Membuat vertex shader
  var vertexShader = context.createShader(context.VERTEX_SHADER);
  context.shaderSource(vertexShader, vertexShaderCode);
  context.compileShader(vertexShader);

  // Mendefinisikan fragmen
  var fragmentShaderCode = `
  void main() {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  }
  `;

  // Membuat fragment shader
  var fragmentShader = context.createShader(context.FRAGMENT_SHADER);
  context.shaderSource(fragmentShader, fragmentShaderCode);
  context.compileShader(fragmentShader);

  var shaderProgram = context.createProgram();
  context.attachShader(shaderProgram, vertexShader);
  context.attachShader(shaderProgram, fragmentShader);
  context.linkProgram(shaderProgram);
  context.useProgram(shaderProgram);

  // warna background
  context.clearColor(1.0, 0.0, 0.0, 0.9);
  context.clear(context.COLOR_BUFFER_BIT);

  context.drawArrays(context.POINTS, 0, 1);
}
