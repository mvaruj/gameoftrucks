/*
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

var obstacleArr = []
var obstacles = 4;//count of Random obstacles

//random obstacles
for (var i = 0; i < 4; ++i) {
    var height = canvasHeight * side - side;
    var width = canvasWidth * side - side;
    var x = Math.round(Math.random() * width);
    var y = Math.round(Math.random() * height);
    for(var coords of obstacleArr){
        obstacleOX = coords.x + (side/2);
        obstacleOY = coords.y + (side/2);

        if()

    }
     if ((x > playerX && x < playerX + side) &&(y > playerY && y < playerY + side)) {
         --i;
    }
    else { 
            obstacleArr.push({x:x*side,y:y*side});

    }
}


function setup() {
    createCanvas(canvasWidth * side, canvasWidth * side);
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
        if (playerY >= (canvasHeight * side - 64)) {
            return;
        }
        for (var i in obstacleArr) {
            objectOX = obstacleArr[i][0] + (side / 2);
            objectOY = obstacleArr[i][1] + (side / 2);
            if (objectOY - playerOY <= side && objectOY - playerOY >= 0 && Math.abs(objectOX - playerOX) < side) {
                return;
            }
        }
        fill('#acacac');
        rect(playerX, playerY, side, side);

        playerY++;
    }
    else if (keyIsDown(38) || keyIsDown(87)) {//up
        if (playerY <=0) {
            return;
        }
        for (var i in obstacleArr) {
            objectOX = obstacleArr[i][0] + (side / 2);
            objectOY = obstacleArr[i][1] + (side / 2);
            if (playerOY - objectOY <= side && playerOY - objectOY >= 0 && Math.abs(objectOX - playerOX) < side) {
                return;
            }
        }
        fill('#acacac');
        rect(playerX, playerY, side, side);
        playerY--;
    }
    else if (keyIsDown(39) || keyIsDown(68)) {//right
        if (playerX >= (canvasWidth * side - 64)) {
            return;
        }
        for (var i in obstacleArr) {
            objectOX = obstacleArr[i][0] + (side / 2);
            objectOY = obstacleArr[i][1] + (side / 2);
            if (objectOX - playerOX <= side && objectOX - playerOX >= 0 && Math.abs(objectOY - playerOY) < side) {
                return;
            }
        }
        fill('#acacac');
        rect(playerX, playerY, side, side);
        playerX++;
    }
    else if (keyIsDown(37) || keyIsDown(65)) {//left
        if (playerX <= 0) {
            return;
        }
        for (var i in obstacleArr) {
            objectOX = obstacleArr[i][0] + (side / 2);
            objectOY = obstacleArr[i][1] + (side / 2);
            if (playerOX - objectOX <= side && playerOX - objectOX >= 0 && Math.abs(objectOY - playerOY) < side) {
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
var side = 32;
var obstacles = [{ x: 10 * side, y: 10 * side }];

var playerX = 0;
var playerY = 0;

function setup() {
    createCanvas(side * 16, side * 16);
}

function draw() {
    background('#acacac');
    fill('red');
    rect(playerX, playerY, side, side);
    fill('black');
    for (var coords of obstacles) {
        rect(coords.x, coords.y, side, side);
    }
    // Delete elses in this if_elseif contruction to unlock diagonal movement
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        for (var coords of obstacles) {
            var obstacleX = coords.x;
            var obstacleY = coords.y;

            var playerOX = playerX + (side / 2);
            var playerOY = playerY + (side / 2);

            var objectOX = obstacleX + (side / 2);
            var objectOY = obstacleY + (side / 2);

            if (objectOX - playerOX <= side && objectOX - playerOX >= 0) {
                if (Math.abs(playerOY - objectOY) < side) {
                    return;
                }
            }
        }
        playerX += side / 8;
    }
    else if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        for (var coords of obstacles) {
            var obstacleX = coords.x;
            var obstacleY = coords.y;

            var playerOX = playerX + (side / 2);

            var playerOY = playerY + (side / 2);

            var objectOX = obstacleX + (side / 2);

            var objectOY = obstacleY + (side / 2);

            if (playerOX - objectOX <= side && playerOX - objectOX >= 0) {
                if (Math.abs(playerOY - objectOY) < side) {
                    return;
                }
            }
        }
        playerX -= side / 8;
    }
    else if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        for (var coords of obstacles) {
            var obstacleX = coords.x;
            var obstacleY = coords.y;

            var playerOX = playerX + (side / 2);
            var playerOY = playerY + (side / 2);

            var objectOX = obstacleX + (side / 2);
            var objectOY = obstacleY + (side / 2);

            if (playerOY - objectOY <= side && playerOY - objectOY >= 0) {
                if (Math.abs(playerOX - objectOX) < side) {
                    return;
                }
            }
        }
        playerY -= side / 8;
    }
    else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        for (var coords of obstacles) {
            var obstacleX = coords.x;
            var obstacleY = coords.y;

            var playerOX = playerX + (side / 2);
            var playerOY = playerY + (side / 2);

            var objectOX = obstacleX + (side / 2);
            var objectOY = obstacleY + (side / 2);

            if (objectOY - playerOY <= side && objectOY - playerOY >= 0) {
                if (Math.abs(playerOX - objectOX) < side) {
                    return;
                }
            }
        }
        playerY += side / 8;
    }
}*/

var side = 32;
var canvasHeight = 16;//*side
var canvasWidth = 16;//*side
var obstacles = [];
var golds = [];
var bases = [{ x: 0, y: (canvasHeight - 2) * side }]
//var players = [{ x: 2, y: (canvasHeight - 3) * side }]
var base = { x: 0, y: (canvasHeight - 2) * side };
var playerX = 2 * side;
var playerY = 13 * side;

var playerHasGold = false;

//random obstacles & golds
getRandObj(obstacles, 4);
getRandObj(golds, 4)



function setup() {
    createCanvas(canvasHeight * side, canvasWidth * side);
}

function draw() {
    background('#acacac'); // Clear the screen

    drawPlayer(); // Draw the player

    drawResources(); // Draw the resources


    // Add elses in this if contruction to lock diagonal movement
    if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && playerX < (width - side)) {
        for (var coords of obstacles) {
            if (Collision_right(coords)) return;
        }
        for (var coords of golds) {
            if (Collision_right(coords)) {
                playerHasGold = true;
                golds.splice(i, 1);
            }
        }

        playerX += side / 8;
    }
    if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && playerX > 0) {
        for (var coords of obstacles) {
            if (Collision_left(coords)) return;
        }
        for (var i in golds) {
            var coords = golds[i];
            if (Collision_left(coords)) {
                playerHasGold = true;
                golds.splice(i, 1);
            }
        }
        var base1 = { x: base.x + side, y: base.y };
        var base2 = { x: base.x + side, y: base.y + side };
        if ( Collision_left(base1) || Collision_left(base2)) {
            playerHasGold = false;
            return;
        }
        playerX -= side / 8;
    }
    if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && playerY > 0) {
        for (var coords of obstacles) {
            if (Collision_up(coords)) return;
        }
        for (var i in golds) {
            var coords = golds[i];
            if (Collision_up(coords)) {
                playerHasGold = true;
                golds.splice(i, 1);
            }
        }
        playerY -= side / 8;
    }
    if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && playerY < (height - side)) {
        for (var coords of obstacles) {
            if (Collision_down(coords)) return;
        }
        for (var i in golds) {
            var coords = golds[i];
            if (Collision_down(coords)) {
                playerHasGold = true;
                golds.splice(i, 1);
            }
        }
        var base1 = { x: base.x + side, y: base.y };

        if (Collision_down(base) || Collision_down(base1)) {
            playerHasGold = false;
            return;
        }
        playerY += side / 8;
    }

}
// var base1 = { x: base.x + side, y: base.y };
// var base2 = { x: base.x + side, y: base.y + side };
// if (Collision_right(base) || Collision_right(base1) || Collision_right(base2)) {


// }