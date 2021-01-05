const p1 = {
    name: 'Player One',
    score: 0,
    display: document.querySelector('#p1Score'),
    button: document.querySelector('#p1Btn')
}

const p2 = {
    name: 'Player Two',
    score: 0,
    display: document.querySelector('#p2Score'),
    button: document.querySelector('#p2Btn')
}

let gameOverScore = document.querySelector('#game')
let resetBtn = document.querySelector('#reset')
let winner = document.querySelector('#winner')
let isGameOver = false;
let limit = 3

gameOverScore.addEventListener('change', function () {
    reset()
    limit = parseInt(gameOverScore.value);
})

// function to update score
function updateScore(player, opponent) {
    player.score++;
    if (!isGameOver) {
        player.display.textContent = player.score;
        if (limit === 6) {
            if ((player.score === 5 && player.score === opponent.score)) {
                player.display.classList.add('has-text-warning')
                opponent.display.classList.add('has-text-warning')
                winner.classList.add('notification')
                winner.textContent = `Draw! Game now ends at 3`
                setTimeout(reset, 3000)
            }
        }
        if (player.score >= limit) {
            isGameOver = true;
            player.display.classList.add('has-text-success')
            opponent.display.classList.add('has-text-danger')
            winner.classList.add('notification', 'is-info', 'is-light')
            winner.textContent = `${player.name} WINS!!!`
            gameOverScore.value = 3
        }
    }
}

// function to reset scores and display
function reset() {
    limit = 3
    isGameOver = false
    winner.textContent = ``
    winner.classList.remove('notification')
    for (const p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger', 'has-text-warning')
    }
}

p1.button.addEventListener('click', function () {
    updateScore(p1, p2)
})

p2.button.addEventListener('click', function () {
    updateScore(p2, p1)
})

resetBtn.addEventListener('click', reset)

