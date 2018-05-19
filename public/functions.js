function drawPlayer() { // Draw the player
    fill('red');
    rect(playerX, playerY, side, side);
    if (playerHasGold) {
        fill(255, 223, 0); // gold's color
        rect(playerX + (side / 8), playerY + (side / 8), side - (side / 4), side - (side / 4))
    }
}

function drawResources() { // Draw the resources
    fill('black');
    for (var coords of obstacles) {
        rect(coords.x, coords.y, side, side);
    }
    fill(255, 223, 0);
    for (var coords of golds) {
        rect(coords.x, coords.y, side, side);
    }
    fill(255, 33, 0);
    for (var coords of bases) {
        rect(coords.x, coords.y, 2 * side, 2 * side);
    }
}
function inside(obj1, obj2) {

    var object1OX = obj1.x + (side / 2);
    var object1OY = obj1.y + (side / 2);
    var object2OX = obj2.x + (side / 2);
    var object2OY = obj2.y + (side / 2);
    if (Math.abs((object2OX - object1OX) <= side) && Math.abs((object2OY - object1OY) <= side)) {
        return true;
    }
    return false;
}
function getRandObj(object, n) {
    for (var i = 0; i < n; ++i) {
        var newX = Math.floor(Math.random() * canvasWidth);
        var newY = Math.floor(Math.random() * canvasHeight);
        object.push({ x: newX * side, y: newY * side });
    }
}
// function baseCollision() {
//     var baseOX = bases[1].x + side;
//     var baseOY = bases[1].y + side;
//     var playerOX = playerX + (side/2);
//     var playerOY = PlayerY + (side/2);
//     if (Math.abs((baseOX - playerOX) <= 48) && Math.abs((baseOY - playerOY) <= 48)) {
//         playerHasGold = false;
//         return true;
//     }
//     return false;
// }
// Detect the collision
function Collision_right(coords) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var objectOX = obstacleX + (side / 2);
    var objectOY = obstacleY + (side / 2);

    if (objectOX - playerOX <= side && objectOX - playerOX >= 0) {
        if (Math.abs(playerOY - objectOY) < side) {
            return true;
        }
    }
    return false;
}

function Collision_left(coords) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var objectOX = obstacleX + (side / 2);
    var objectOY = obstacleY + (side / 2);

    if (playerOX - objectOX <= side && playerOX - objectOX >= 0) {
        if (Math.abs(playerOY - objectOY) < side) {
            return true;
        }
    }
    return false;
}

function Collision_up(coords) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var objectOX = obstacleX + (side / 2);
    var objectOY = obstacleY + (side / 2);

    if (playerOY - objectOY <= side && playerOY - objectOY >= 0) {
        if (Math.abs(playerOX - objectOX) < side) {
            return true;
        }
    }
    return false;
}

function Collision_down(coords) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = playerX + (side / 2);
    var playerOY = playerY + (side / 2);

    var objectOX = obstacleX + (side / 2);
    var objectOY = obstacleY + (side / 2);

    if (objectOY - playerOY <= side && objectOY - playerOY >= 0) {
        if (Math.abs(playerOX - objectOX) < side) {
            return true;
        }
    }
    return false;
}

