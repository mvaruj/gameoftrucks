var socket = io();
var config = {};

var playerName = ""//= prompt("Choose a username");
var side = 32;
var canvasHeight = 15;//*side
var canvasWidth = 25;//*side
var fogRadius = 50;
var players, obstacles, energies, golds;
var gameStarted = false;
var gameOver = false;
var onSpace = false;
var playerX;
var playerY;
var playerHasGold = false;
var bases = [{ x: 0, y: 0, color: 'red' },
{ x: (canvasWidth - 2) * side, y: 0, color: 'green' },
{ x: 0, y: (canvasHeight - 2) * side, color: "blue" },
{ x: (canvasWidth - 2) * side, y: (canvasHeight - 2) * side, color: "yellow" }];

var scoreP = document.getElementById("scoreP");
var energyP = document.getElementById("energyP");
var eventsDiv = document.getElementById("events");

// if (gameStarted) {
//     alert("You Are " + config.color);
// }
function setup() {
    createCanvas(side * canvasWidth, side * canvasHeight);
    noStroke()
}

function draw() {
    // if (gameOver) {
    //     GameOver()
    //     // background("#acacac");
    //     // textSize(58);
    //     // text('GAME OVER', 30, 60);
    //     // textSize(28);
    //     // text('Energy is over', 30, 90);
    //     // textSize(38);
    //     // text('Your Score:' + playerScore, 30, 110);
    // }
    if (gameStarted) {
        background('#acacac'); // Clear the screen
        drawPlayer(); // Draw the player

        drawResources(); // Draw the resources
        // WAR FOG
        fill('#191919');
        rect(0, 0, playerX - fogRadius, canvasHeight * side);
        rect(0, 0, canvasWidth * side, playerY - fogRadius);
        rect(playerX + side + fogRadius, 0, canvasWidth * side, canvasHeight * side);
        rect(0, playerY + side + fogRadius, canvasWidth * side, canvasHeight * side);

        var eng = Math.floor(playerEnergy);
        energyP.innerHTML = 'Energy:' + eng;

        if (golds.length <= 0) {
            GameOver();
            return;
        }
        if (playerEnergy <= 0.1) {
            playerEnergy = 0;
            background("#acacac");
            fill(0);
            textSize(38);
            text('Your energy is over', 30, 160);
            return;
        }
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
                    playerHasGold = true;
                    golds.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energies) {
                var coords = energies[i];
                if (Collision_right(coords)) {
                    ++playerEnergy;
                    energies.splice(i, 1);
                    socket.emit('splice Energy', i);
                }
            }
            for (var i in bases) {
                if (Base_Collision_right(bases[i])) {
                    if (playerHasGold && bases[i].color == playerColor) {
                        playerHasGold = false;
                        ++playerScore;
                        scoreP.innerHTML = 'Score:' + playerScore;
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
            playerEnergy -= 0.01;
            playerX += side / 8;
            socket.emit('move', { nick: playerName, x: playerX, y: playerY, color: config.color, hasGold: playerHasGold, energy: Math.floor(playerEnergy), score: playerScore });
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
                    playerHasGold = true;
                    golds.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energies) {
                var coords = energies[i];
                if (Collision_left(coords)) {
                    ++playerEnergy;
                    energies.splice(i, 1);
                    socket.emit('splice Energy', i);
                }
            }
            for (var i in bases) {
                if (Base_Collision_left(bases[i])) {
                    if (playerHasGold && bases[i].color == playerColor) {
                        playerHasGold = false;
                        ++playerScore;
                        scoreP.innerHTML = 'Score:' + playerScore;
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
            playerEnergy -= 0.01;
            playerX -= side / 8;
            socket.emit('move', { nick: playerName, x: playerX, y: playerY, color: config.color, hasGold: playerHasGold, energy: Math.floor(playerEnergy), score: playerScore });
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
                    playerHasGold = true;
                    golds.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energies) {
                var coords = energies[i];
                if (Collision_up(coords)) {
                    ++playerEnergy;
                    energies.splice(i, 1);
                    socket.emit('splice Energy', i);
                }
            }
            for (var i in bases) {
                if (Base_Collision_up(bases[i])) {
                    if (playerHasGold && bases[i].color == playerColor) {
                        playerHasGold = false;
                        ++playerScore;
                        scoreP.innerHTML = 'Score:' + playerScore;
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
            playerEnergy -= 0.01;
            playerY -= side / 8;
            socket.emit('move', { nick: playerName, x: playerX, y: playerY, color: config.color, hasGold: playerHasGold, energy: Math.floor(playerEnergy), score: playerScore });
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
                    playerHasGold = true;
                    golds.splice(i, 1);
                    socket.emit('splice gold', i);
                }
            }
            for (var i in energies) {
                var coords = energies[i];
                if (Collision_down(coords)) {
                    ++playerEnergy;
                    energies.splice(i, 1);
                    socket.emit('splice Energy', i);
                }
            }
            for (var i in bases) {
                if (Base_Collision_down(bases[i])) {
                    if (playerHasGold && bases[i].color == playerColor) {
                        playerHasGold = false;
                        ++playerScore;
                        scoreP.innerHTML = 'Score:' + playerScore;
                        Gold_In_Base(playerScore);
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
            playerEnergy -= 0.01;
            playerY += side / 8;
            socket.emit('move', { nick: playerName, x: playerX, y: playerY, color: config.color, hasGold: playerHasGold, energy: Math.floor(playerEnergy), score: playerScore });
        }


    }//game started
    else {
        background("#acacac");
        textSize(38);
        text('Wainting for players to join the game or no space', 30, 60);
    }
    // if (noSpace) {
    //     background("#acacac");
    //     textSize(38);
    //     text('No space left, please wait until the next session', 30, 60);
    // }
}//draw end
// setInterval(function () {
//     if (playerEnergy > 1) {
//         --playerEnergy;
//         energyP.innerHTML = "Energy:" + playerEnergy;
//     }
//     else if (playerEnergy <= 1) {
//         --playerEnergy;
//         energyP.innerHTML = "Energy:" + playerEnergy;
//         gameOver = true;
//     }
// }, 10000);


socket.on('game started', function (data) {
    gameStarted = true;
    golds = data.golds;
    energies = data.energies;
    obstacles = data.obstacles;
    players = data.players;
    Game_Started()
});

socket.on('config data', function (data) {
    config = data;
    playerX = config.x;
    playerY = config.y;
    playerColor = config.color;
    playerScore = config.score;
    playerEnergy = config.energy;
    while (playerName === "" || playerName === null) {
        playerName = prompt("Choose a username");
    }
    config.nick = playerName;
    alert('You are '+playerColor)
    socket.emit('player has join', config)
});

socket.on('main data', function (data) {
    golds = data.golds;
    energies = data.energies;
    obstacles = data.obstacles;
    players = data.players;
});
socket.on('no space', function () {
    var onSpace = true;
});
socket.on('join message',function (data){
    Join_Msg(data)
});