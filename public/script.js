
var matrix = [[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
var side = 32;



// function preload() {
//     img = loadImage('img/gui/truck/default.png');
//   }

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    //image(img, 0, 0);
    background('#acacac');

}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
    
                fill('#acacac');
                rect(x * side, y * side, side, side);

            }
            if (matrix[y][x] == 1) {
                fill('red');

                var playerx = x;
                var playery = y;
                rect(playerx * side, playery * side, side, side);

            }
        }
    }

    if (keyIsDown(40)) {
        matrix[playery][playerx] = 0;
        matrix[(playery+1)][playerx] = 1;
        
    }

}