function drawPlayer() { // Draw the player
    fill('red');
    rect(player.x, player.y, side, side);
    //image(img, player.x, player.y);
    if (playerHasGold) {
        fill(255, 223, 0); // gold's color
        rect(player.x + (side / 8), player.y + (side / 8), side - (side / 4), side - (side / 4))
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
    fill(0, 233, 0);
    for (var coords of energies) {
        rect(coords.x, coords.y,  side,  side);
    }
}
function inside(obj1, obj2) {

    var object1OX = obj1.x + (side / 2);
    var object1OY = obj1.y + (side / 2);
    var object2OX = obj2.x + (side / 2);
    var object2OY = obj2.y + (side / 2);
    if (Math.abs(object2OX - object1OX) <= side && Math.abs(object2OY - object1OY) <= side) {
        return true;
    }
    return false;
}
function getRandObj(object, n) {
    for (var i = 0; i < n; ++i) {
        var newX = Math.round(Math.random() * (canvasWidth - 3) * side + side);
        var newY = Math.round(Math.random() * (canvasHeight - 3) * side + side);
        var newObject = { x: newX, y: newY };
        var ok = true;
        if (inside(newObject, player) || insideBase(newObject, base)) {
            --i;
            continue;
        }
        for (var j in obstacles) {
            if (inside(newObject, obstacles[j])) {
                var ok = false;
            }
        }
        for (var j in golds) {
            if (inside(newObject, golds[j])) {
                var ok = false;
            }
        }
        if (ok) {
            object.push({ x: newX, y: newY });
        }
        else { --i; }
    }
}
function insideBase(obj, base) {
    var baseOX = base.x + side;
    var baseOY = base.y + side;
    var objOX = obj.x + (side / 2);
    var objOY = obj.y + (side / 2);
    if (Math.abs((baseOX - objOX) <= 48) && Math.abs((baseOY - objOY) <= 48)) {
        return true;
    }
    return false;
}
// Detect the collision
function Collision_right(coords) {
    var obstacleX = coords.x;
    var obstacleY = coords.y;

    var playerOX = player.x + (side / 2);
    var playerOY = player.y + (side / 2);

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

    var playerOX = player.x + (side / 2);
    var playerOY = player.y + (side / 2);

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

    var playerOX = player.x + (side / 2);
    var playerOY = player.y + (side / 2);

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

    var playerOX = player.x + (side / 2);
    var playerOY = player.y + (side / 2);

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

    var base3 = { x: base.x , y: base.y+ side };

    if (Collision_left(base) || Collision_left(base3)) {
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
    var base2 = { x: base.x + side, y: base.y+ side };
    var base3 = { x: base.x , y: base.y+ side };

    if (Collision_down(base2) || Collision_down(base3)) {
        return true;
    }
    return false;
}