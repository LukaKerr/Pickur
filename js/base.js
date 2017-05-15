var svgPath = document.getElementById('path');
var colorInput = document.getElementById('color-input');
var hexOutput = document.getElementById('hex-output');
var rgbOutput = document.getElementById('rgb-output');
var rgb = document.getElementById("rgb");
var rgb2 = document.getElementById("rgb2");
var rgb3 = document.getElementById("rgb3");

// HEX to RGB
function hexToRGB(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + ', ' + g + ', ' + b;
}

// RGB to HEX
function rgbToHEX(red, green, blue) {
    var rgb = blue | (green << 8) | (red << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
}

// Gets HEX input 
document.getElementById("hex").addEventListener("input", function() {
    // Sets colours for SVG, picker, converts HEX to RGB and prints out HEX
    svgPath.style.fill = '#' + this.value;
    colorInput.value = '#' + this.value;
    hexOutput.innerHTML = 'HEX: #' + this.value.toUpperCase();
    rgbOutput.innerHTML = 'RGB: rgb(' + hexToRGB(this.value) + ')';
}, false);

// Selects elements under .rgb class
var rgbInput = document.querySelectorAll('.rgb');
for(var i = 0; i < rgbInput.length; ++i){
    rgbInput[i].addEventListener("input", rgbCalc);
}

function rgbCalc() {
    // Skips to next input box if 3 characters have been entered
    if (rgb.value.length >= this.maxLength) {
        rgb2.focus();
    }
    if (rgb2.value.length >= this.maxLength) {
        rgb3.focus();
    }

    // Stores the r, g, b values
    var r = rgb.value;
    var g = rgb2.value;
    var b = rgb3.value;

    // Sets colours for SVG, picker, converts RGB to HEX and prints out RGB
    svgPath.style.fill = rgbToHEX(r, g, b);
    colorInput.value = rgbToHEX(r, g, b);
    rgbOutput.innerHTML = 'RGB: rgb(' + r + ', ' + g + ', ' + b + ')';
    hexOutput.innerHTML = 'HEX: ' + rgbToHEX(r, g, b).toUpperCase();
}

// Gets colour picker input value
colorInput.addEventListener("input", function() {
    // Sets colours for SVG, converts Hex to RGB and prints out HEX
    svgPath.style.fill = colorInput.value;
    hexOutput.innerHTML = "HEX: " + colorInput.value.toUpperCase();
    rgbOutput.innerHTML = "RGB: rgb(" + hexToRGB(colorInput.value.replace('#', ''))  + ')';
}, false);

// Reload when CMD+R is pressed & copies selected text
var map = {};
onkeydown = onkeyup = function(e){
    map[e.keyCode] = e.type == 'keydown';
    if(map[91] && map[82]){
        location.reload();
    } else if (map[91] && map[67]) {
        document.execCommand('copy');
    }
    map = {};
}

