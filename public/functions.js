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
}
function inside(objects) {
    for (var coords of objects) {
        objectOX = coords.x + (side / 2);
        objectOY = coords.y + (side / 2);
        OX = x + (side / 2);
        OY = y + (side / 2);
        if (Math.abs((OX - objectOX) <= 32) && Math.abs((OY - objectOY) <= 32)) {
            
            continue;
        }

    }}
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

