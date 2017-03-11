/**
 * Created by pawan on 1/2/17.
 */

num_enemy = 2;
SCORE = 0;

function loadImages() {
    pokemonImage = new Image();
    enemyImage = new Image();
    goalImage = new Image();

    pokemonImage.src = 'images/pika.png';
    enemyImage.src = 'images/gengar.png';
    goalImage.src = 'images/ball.png';
}

function isColliding(box1, box2) {
    x_axis = Math.abs(box1.x - box2.x) <=  box2.w/*(box1.x < box2.x ? box1.w : box2.w)*/;
    y_axis = Math.abs(box1.y - box2.y) <= box1.h/*(box1.y < box2.y ? box1.h : box2.h)*/;

    return x_axis && y_axis;
}

function initializeEnemies() {
    console.log(num_enemy);

    let dis = WIDTH/num_enemy;
    let x = 0;

    for (let i = 0; i < num_enemy; i++) {
        let temp = {
            x: 60 + Math.random() * (WIDTH - 150),
            y: Math.random() * HEIGHT,
            w: 30,
            h: 30,
            speed: Math.random() * 10,
            color: "red",
        }

        console.log(temp.x + " - speed: " + temp.speed);
        enemies.push(temp);
        x += dis;
    }
}

function init() {
    canvas = document.getElementById("mycanvas");
    scorediv = document.getElementById("score");

    pen = canvas.getContext('2d');

    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    GAME_OVER = false;

    pen.fillStyle = 'Blue';
    loadImages();

    pokemon = {
        x: 0,
        y: HEIGHT / 2,
        w: 30,
        h: 30,
        speed: 15,
        moving: false,
    }

    goal = {
        x: WIDTH - 40,
        y: HEIGHT / 2,
        w: 40,
        h: 100,
    }

    enemies = [];

    initializeEnemies();

    document.addEventListener('keydown', function (e) {
        // console.log(e)
        if (e.key == "ArrowRight") {
            pokemon.x += pokemon.speed;
        }
        else if (e.key == "ArrowLeft") {
            pokemon.x -= pokemon.speed;
        }
        else if (e.key == "ArrowUp") {
            pokemon.y -= pokemon.speed;
        }
        else if (e.key == "ArrowDown") {
            pokemon.y += pokemon.speed;
        }
    })

    document.addEventListener('mousedown', function (e) {
        pokemon.moving = true;
    })

    document.addEventListener('mouseup', function (e) {
        pokemon.moving = false;
    })
}

function draw() {
    //Erase the old screen
    pen.clearRect(0, 0, WIDTH, HEIGHT);

    //Draw pokemon
    pen.fillStyle = "green"
    pen.fillRect(pokemon.x, pokemon.y, pokemon.w, pokemon.h);
    // pen.drawImage(pokemonImage, pokemon.x, pokemon.y, pokemon.w, pokemon.h);


    //Draw Goal
    pen.fillRect(goal.x, goal.y, goal.w, goal.h);
    // pen.drawImage(goalImage,goal.x, goal.y, goal.w, goal.h);

    //Draw enemies
    for (var i = 0; i < enemies.length; i++) {
        pen.fillStyle = enemies[i].color;
        pen.fillRect(enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h);
        // pen.drawImage(enemyImage,enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h);
    }

    scorediv.textContent = 'score: ' + SCORE;
}

function update() {
    if (isColliding(pokemon, goal)) {
        GAME_OVER = true;
        num_enemy += 2;
        alert("You Won")
    }
    enemies.forEach(function (enemy, i) {
        if (isColliding(pokemon, enemy)) {
            GAME_OVER = true;
            num_enemy = 2;
            SCORE = 0;
            alert("Game Over")
        }
    })


    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].y >= HEIGHT - enemies[i].h || enemies[i].y <= 0) {
            enemies[i].speed *= -1;
        }
        enemies[i].y += enemies[i].speed;
    }
    if (pokemon.moving) {
        pokemon.x += pokemon.speed;
        SCORE += 2;
    }
}

function render() {
    update();

    if (!GAME_OVER) {
        draw();
        window.requestAnimationFrame(render);
    }
    else {
        startGame();
    }
}

function startGame() {
    init();
    render();
}

startGame();