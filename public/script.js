var socket = io();
var config = {};

//var playerName = prompt("input your name");
var side = 32;
var canvasHeight = 25;//*side
var canvasWidth = 25;//*side
var fogRadius = 50;
var players, obstacles, energies, golds;
var gameStarted = false;
var gameOver = false;
var playerX;
var playerY;
var playerHasGold = false;
var score = 0;
var energy = 10;
var scoreP = document.getElementById("scoreP");
var energyP = document.getElementById("energyP");
var bases = [{ x: 0, y: 0, color: 'red' },
{ x: (canvasWidth - 2) * side, y: 0, color: 'green' },
{ x: 0, y: (canvasHeight - 2) * side, color: "blue" },
{ x: (canvasWidth - 2) * side, y: (canvasHeight - 2) * side, color: "yellow" }];

// if (gameStarted) {
//     alert("You Are " + config.color);
// }
function setup() {
    createCanvas(side * canvasWidth, side * canvasHeight);
}

function draw() {
    if (gameOver) {
        background("#acacac");
        textSize(58);
        text('GAME OVER', 30, 60);
        textSize(28);
        text('Energy is over', 30, 90);
        textSize(38);
        text('Your Score:' + score, 30, 110);
    }
    else if (gameStarted) {
        background('#acacac'); // Clear the screen
        drawPlayer(); // Draw the player

        drawResources(); // Draw the resources
        // WAR FOG
        fill(0);
        rect(0, 0, playerX - fogRadius, canvasHeight * side);
        rect(0, 0, canvasWidth * side, playerY - fogRadius);
        rect(playerX + side + fogRadius, 0, canvasWidth * side, canvasHeight * side);
        rect(0, playerY + side + fogRadius, canvasWidth * side, canvasHeight * side);


        // Add elses in this if contruction to lock diagonal movement
        //________________________RIGHT__________________   
        if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && playerX < (width - side)) {
            for (var coords of obstacles) {
                if (Collision_right(coords)) return;
            }
            for (var i in golds) {
                var coords = golds[i];
                if (Collision_right(coords)) {
                    if (playerHasGold) return;
                    ++score;
                    scoreP.innerHTML = 'Score:' + score;
                    playerHasGold = true;
                    golds.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energies) {
                var coords = energies[i];
                if (Collision_right(coords)) {
                    ++energy;
                    energyP.innerHTML = 'Energy:' + energy;
                    energies.splice(i, 1);
                    socket.emit('splice energy', i);
                }
            }
            for (var i in bases) {
                if (Base_Collision_right(bases[i])) {
                    if (playerHasGold && bases[i].color == playerColor) {
                        playerHasGold = false;
                        ++score;
                        scoreP.innerHTML = 'Score:' + score;
                    }
                    return;
                }
            }
            for (var i in players) {
                if (players[i].color != playerColor) {
                    if (Collision_right(players[i])) {
                        return;
                    }
                }
            }
            playerX += side / 8;
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold });
        }
        //__________________LEFT_____________________
        if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && playerX > 0) {
            for (var coords of obstacles) {
                if (Collision_left(coords)) return;
            }
            for (var i in golds) {
                var coords = golds[i];
                if (Collision_left(coords)) {
                    if (playerHasGold) return;
                    ++score;
                    scoreP.innerHTML = 'Score:' + score;
                    playerHasGold = true;
                    golds.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energies) {
                var coords = energies[i];
                if (Collision_left(coords)) {
                    ++energy;
                    energyP.innerHTML = 'Energy:' + energy;
                    energies.splice(i, 1);
                    socket.emit('splice energy', i);
                }
            }
            for (var i in bases) {
                if (Base_Collision_left(bases[i])) {
                    if (playerHasGold && bases[i].color == playerColor) {
                        playerHasGold = false;
                        ++score;
                        scoreP.innerHTML = 'Score:' + score;
                    }
                    return;
                }
            }
            for (var i in players) {
                if (players[i].color != playerColor) {
                    if (Collision_left(players[i])) {
                        return;
                    }
                }
            }

            playerX -= side / 8;
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold });
        }
        //____________________________UP_______________________
        if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && playerY > 0) {
            for (var coords of obstacles) {
                if (Collision_up(coords)) return;
            }
            for (var i in golds) {
                var coords = golds[i];
                if (Collision_up(coords)) {
                    if (playerHasGold) return;
                    ++score;
                    scoreP.innerHTML = 'Score:' + score;
                    playerHasGold = true;
                    golds.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energies) {
                var coords = energies[i];
                if (Collision_up(coords)) {
                    ++energy;
                    energyP.innerHTML = 'Energy:' + energy;
                    energies.splice(i, 1);
                    socket.emit('splice energy', i);
                }
            }
            for (var i in bases) {
                if (Base_Collision_up(bases[i])) {
                    if (playerHasGold && bases[i].color == playerColor) {
                        playerHasGold = false;
                        ++score;
                        scoreP.innerHTML = 'Score:' + score;
                    }
                    return;
                }
            }
            for (var i in players) {
                if (players[i].color != playerColor) {
                    if (Collision_up(players[i])) {
                        return;
                    }
                }
            }
            playerY -= side / 8;
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold });
        }
        //_________________________________DOWN_____________________________
        if ((keyIsDown(DOWN_ARROW) || keyIsDown(83)) && playerY < (height - side)) {
            for (var coords of obstacles) {
                if (Collision_down(coords)) return;
            }
            for (var i in golds) {
                var coords = golds[i];
                if (Collision_down(coords)) {
                    if (playerHasGold) return;
                    ++score;
                    scoreP.innerHTML = 'Score:' + score;
                    playerHasGold = true;
                    golds.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energies) {
                var coords = energies[i];
                if (Collision_down(coords)) {
                    ++energy;
                    energyP.innerHTML = 'Energy:' + energy;
                    energies.splice(i, 1);
                    socket.emit('splice energy', i);
                }
            }
            for (var i in bases) {
                if (Base_Collision_down(bases[i])) {
                    if (playerHasGold && bases[i].color == playerColor) {
                        playerHasGold = false;
                        ++score;
                        scoreP.innerHTML = 'Score:' + score;
                    }
                    return;
                }
            }
            for (var i in players) {
                if (players[i].color != playerColor) {
                    if (Collision_down(players[i])) {
                        return;
                    }
                }
            }
            playerY += side / 8;
            socket.emit('move', { x: playerX, y: playerY, color: config.color, hasGold: playerHasGold });
        }
    }
    else {
        background("#acacac");
        textSize(38);
        text('Wainting for players to join the game, please wait', 30, 60);
    }
}//draw end
setInterval(function () {
    if (energy > 1) {
        --energy;
        energyP.innerHTML = "Energy:" + energy;
    }
    else if (energy <= 1) {
        --energy;
        energyP.innerHTML = "Energy:" + energy;
        gameOver = true;
    }
}, 10000);


socket.on('game started', function (data) {
    gameStarted = true;
    golds = data.golds;
    energies = data.energies;
    obstacles = data.obstacles;
    players = data.players;
});

socket.on('config data', function (data) {
    config = data;
    playerX = config.x;
    playerY = config.y;
    playerColor = config.color
});

socket.on('main data', function (data) {
    golds = data.golds;
    energies = data.energies;
    obstacles = data.obstacles;
    players = data.players;
});
