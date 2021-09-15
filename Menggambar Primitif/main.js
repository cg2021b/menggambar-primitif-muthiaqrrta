function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    /**
     * Titik Segitiga
     * A(-0.5, 0.5); B(-0.5, -0.5), C(0.5, -0.5)
     */

    // Koordinat titik segitiga --> butuh 6 titik untuk jadi persegi panjang
    var vertices = [
        -0.5, 0.5,   //Titik A
        -0.5, -0.5,  //Titik B
        0.5, -0.5,   //Titik C
        0.5, -0.5,   //Titik C
        0.5, 0.5,    //Titik D
        -0.5, 0.5   //Titik A
    ];

    var positionBuffer = gl.createBuffer();
    // create buffer : jumlah titik
    // bind buffer untuk menggabungkan banyak titik
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    //buffer data : copy data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
     
    // Mendefinisikan vertex
    var vertexShaderCode = `
    attribute vec2 a_Position;
    void main(){
        gl_Position = vec4(a_Position, 0.0, 1.0);
        gl_PointSize = 20.0;
    }`;

    //var vertexShaderCode = document.getElementById("vertexShaderCode").text;

     // Membuat vertex shader
     var vertexShader = gl.createShader(gl.VERTEX_SHADER);
     gl.shaderSource(vertexShader, vertexShaderCode);
     gl.compileShader(vertexShader);

     // Mendefinisikan fragment shader dari html
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
    
    // Membuat fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    // Package program --> compile
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // untuk menggambar 3 titik x, y vertex
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // set warna background
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    // clear background
    gl.clear(gl.COLOR_BUFFER_BIT);

    // instruksi untuk menggambar
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
