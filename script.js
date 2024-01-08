score = 0;
cross = true;

audio = new Audio('./img/One-Piece-Luffy-Theme.mp3');
audiogo = new Audio('./img/gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        luffy = document.querySelector('.luffy');
        luffy.classList.add('animateluffy');
        setTimeout(() => {
            luffy.classList.remove('animateluffy')
        }, 700);
    }
    if (e.keyCode == 39) {
        luffy = document.querySelector('.luffy');
        luffyX = parseInt(window.getComputedStyle(luffy, null).getPropertyValue('left'));
        luffy.style.left = luffyX + 112 + "px";
    }
    if (e.keyCode == 37) {
        luffy = document.querySelector('.luffy');
        luffyX = parseInt(window.getComputedStyle(luffy, null).getPropertyValue('left'));
        luffy.style.left = (luffyX - 112) + "px";
    }
}

setInterval(() => {
    luffy = document.querySelector('.luffy');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    lx = parseInt(window.getComputedStyle(luffy, null).getPropertyValue('left'));
    ly = parseInt(window.getComputedStyle(luffy, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(lx - ox);
    offsetY = Math.abs(ly - oy);
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}