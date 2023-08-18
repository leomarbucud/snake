var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
c.height = 170;
c.width = 200;
var cs = c.width / 20;
var food = {x: 0, y: 0};
var velocity = {x: 1, y: 0};
var score = 0;

var snake = [{x: cs, y: 0}];
var random = {x:0, y:0};
var stop = false;

function moveSnake() {
    for( var i = snake.length - 1; i > 0; i-- ) {
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }
    snake[0].x += (velocity.x * cs);
    snake[0].y += (velocity.y * cs);
}

function checkWallHit() {
    var h = snake[0];
    if( h.x >= c.width ) {
        snake[0].x = 0
    }
    if( h.x < 0 ) {
        snake[0].x = c.width - cs;
    }
    if( h.y >= c.height ) {
        snake[0].y = 0;
    }
    if( h.y < 0 ) {
        snake[0].y = c.height - cs;
    }
}

function randomXY() {
    var x = Math.round(Math.floor(Math.random() * (c.width - cs)) / cs) * cs;
    var y = Math.round(Math.floor(Math.random() * (c.height - cs)) / cs) * cs;
    random = {x:x,y:y};
}

function createFood() {
    food = {x:random.x,y:random.y};
    snake.forEach(s => {
        if( s == food ) {
            createFood();
            return;
        }
    });
}

function checkBodyHit() {
    var h = snake[0];
    if( snake.length == 0 ) return;
    for( var i = snake.length - 1; i > 0; i-- ) {
        if( h.x == snake[i].x && h.y == snake[i].y ) {
            gameOver();
        }
    }
}

function gameOver() {
    score = 0;
    snake = [{x:random.x, y:random.y}];
    stop = true;
}

function setScore() {
    document.getElementById('score').innerText = score;
}

function play() {
    if( stop ) return;

    ctx.fillStyle = '#798837';
    ctx.fillRect(0, 0, c.width, c.height);

    // snake
    for( var i = 0; i < snake.length; i++ ) {
        ctx.fillStyle = '#4f4303';
        var a = Math.min(i, 3);
        ctx.fillRect(snake[i].x+a, snake[i].y+a, cs-a*2, cs-a*2);
    }

    ctx.strokeStyle = '#4f4303';
    ctx.fillRect(food.x, food.y, cs, cs);

    moveSnake();
    checkWallHit();
    checkBodyHit();

    if( food.x == snake[0].x && food.y == snake[0].y ) {
        snake.push({x:food.x, y:food.y});
        createFood();
        score++;
    }
    randomXY();
    setScore();
}

document.addEventListener('keydown', function(e) {
    if( e.code == 'ArrowDown' && velocity.y == 0 ) {
        velocity.y = 1;
        velocity.x = 0;
    }
    if( e.code == 'ArrowRight' && velocity.x == 0 ) {
        velocity.y = 0;
        velocity.x = 1;
    }
    if( e.code == 'ArrowLeft' && velocity.x == 0 ) {
        velocity.y = 0;
        velocity.x = -1;
    }
    if( e.code == 'ArrowUp' && velocity.y == 0 ) {
        velocity.y = -1;
        velocity.x = 0;
    }
    if( e.code == 'Space' ) {
        stop = false;
    }
});

// game loop
setInterval(play, 100);
