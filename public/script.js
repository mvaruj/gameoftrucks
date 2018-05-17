
// var matrix = [[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

var side = 32;


// // function preload() {
// //     img = loadImage('img/gui/truck/default.png');
// //   }

// function setup() {
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     //image(img, 0, 0);
//     background('#acacac');

// }
// function draw() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 0) {

//                 fill('#acacac');
//                 rect(x * side, y * side, side, side);

//             }
//             if (matrix[y][x] == 1) {
//                 fill('red');

//                 var playerX = x;
//                 var playerY = y;
//                 rect(playerX * side, playerY * side, side, side);

//             }
//         }
//     }

//     if (keyIsDown(40)) {
//         matrix[playerY][playerX] = 0;
//         matrix[(playerY+1)][playerX] = 1;

//     }

// }
var canvasWidth = 20;
var canvasHeight = 10;
var playerX = 0;
var playerY = 0;
var obstacleX
var obstacleY
var playerOX
var playerOY

var obstacleArr
var obstacles = 4;//count of Random obstacles

//random obstacles
for (var i = 0; i < obstacles; ++i) {
    var height = canvasHeight * side - 32;
    var width = canvasWidth * side - 32;
    var x = Math.round(Math.random() * width);
    var y = Math.round(Math.random() * height);
   // if ((!(x > playerX && x < (playerX + 32))) || (!(y > playerY) && !(y < !(playerY + 32)))) {
        obstacleArr.push([x, y]);
    //}
    //else { }
}


function setup() {
    createCanvas(20 * side, 10 * side);
    //image(img, 0, 0);
    background('#acacac');
    noStroke();
    fill('red');
    rect(playerX, playerY, side, side);
    for (var i in obstacleArr) {
        obstacleX = obstacleArr[i][0];
        obstacleY = obstacleArr[i][1];
        fill('black');
        rect(obstacleX, obstacleY, side, side);
    }
}
function draw() {
    playerOX = playerX + (side / 2);
    playerOY = playerY + (side / 2);

    fill('red');
    rect(playerX, playerY, side, side);

    if (keyIsDown(40) || keyIsDown(83)) {//down
        for (var i in obstacleArr) {
            objectOX = obstacleArr[i][0] + (side / 2);
            objectOY = obstacleArr[i][1] + (side / 2);
            if (objectOY - playerOY <= 32 && objectOY - playerOY >= 0 && Math.abs(objectOX - playerOX) < 32) {
                return;
            }
        }
        fill('#acacac');
        rect(playerX, playerY, side, side);

        playerY++;
    }
    else if (keyIsDown(38) || keyIsDown(87)) {//up
        for (var i in obstacleArr) {
            objectOX = obstacleArr[i][0] + (side / 2);
            objectOY = obstacleArr[i][1] + (side / 2);
            if (playerOY - objectOY <= 32 && playerOY - objectOY >= 0 && Math.abs(objectOX - playerOX) < 32) {
                return;
            }
        }
        fill('#acacac');
        rect(playerX, playerY, side, side);
        playerY--;
    }
    else if (keyIsDown(39) || keyIsDown(68)) {//right
        for (var i in obstacleArr) {
            objectOX = obstacleArr[i][0] + (side / 2);
            objectOY = obstacleArr[i][1] + (side / 2);
            if (objectOX - playerOX <= 32 && objectOX - playerOX >= 0 && Math.abs(objectOY - playerOY) < 32) {
                return;
            }
        }
        fill('#acacac');
        rect(playerX, playerY, side, side);
        playerX++;
    }
    else if (keyIsDown(37) || keyIsDown(65)) {//left
        for (var i in obstacleArr) {
            objectOX = obstacleArr[i][0] + (side / 2);
            objectOY = obstacleArr[i][1] + (side / 2);
            if (playerOX - objectOX <= 32 && playerOX - objectOX >= 0 && Math.abs(objectOY - playerOY) < 32) {
                return;
            }
        }
        fill('#acacac');
        rect(playerX, playerY, side, side);
        playerX--;
    }
    fill('red');
    rect(playerX, playerY, side, side);

}