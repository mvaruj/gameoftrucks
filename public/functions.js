function drawPlayer() { // Draw the player
    for (var i in players) {
        fill(players[i].color);
        rect(players[i].x, players[i].y, side, side);
        if (players[i].hasGold) {
            fill(255, 223, 0); // gold's color
            rect(players[i].x + (side / 8), players[i].y + (side / 8), side - (side / 4), side - (side / 4));
        }
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
    fill(0, 255, 0);
    for (var coords of energies) {
        rect(coords.x, coords.y, side, side);
    }
    for (var i in bases) {
        var x = bases[i].x;
        var y = bases[i].y;
        var color = bases[i].color;
        fill(color);
        rect(x, y, side * 2, side * 2);
    }
}

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

function Base_Collision_left(base) {

    var base1 = { x: base.x + side, y: base.y };
    var base2 = { x: base.x + side, y: base.y + side };
    if (Collision_left(base1) || Collision_left(base2)) {
        return true;
    }
    return false;
}
function Base_Collision_right(base) {

    var base3 = { x: base.x, y: base.y + side };

    if (Collision_right(base) || Collision_right(base3)) {
        return true;
    }
    return false;
}
function Base_Collision_down(base) {
    var base1 = { x: base.x + side, y: base.y };

    if (Collision_down(base) || Collision_down(base1)) {
        return true;
    }
    return false;
}
function Base_Collision_up(base) {
    var base2 = { x: base.x + side, y: base.y + side };
    var base3 = { x: base.x, y: base.y + side };

    if (Collision_up(base2) || Collision_up(base3)) {
        return true;
    }
    return false;
}
function GameOver() {
    background("grey");
    fill(0);
    textSize(58);
    text('GAME OVER', 30, 30);
    fill("red");
    textSize(38);
    text('RED PLAYER. Score: ' + plares[0].score + '; Energy: ' + players[0].energy, 30, 80);

    fill("green");
    textSize(38);
    text('GREEN PLAYER. Score: ' + plares[1].score + '; Energy: ' + players[1].energy, 30, 120);

    fill("blue");
    textSize(38);
    text('BLUE PLAYER. Score: ' + plares[2].score + '; Energy: ' + players[2].energy, 30, 160);

    fill("yellow");
    textSize(38);
    text('YELLOW PLAYER. Score: ' + plares[3].score + '; Energy: ' + players[3].energy, 30, 200);


}