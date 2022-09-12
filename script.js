const screens = document.querySelectorAll('.screen'),
		start = document.querySelector('.start'),
		timeList = document.querySelector('.time-list'),
		timer = document.querySelector('#time'),
		board = document.querySelector('#board'),
		gameScore = document.querySelector('.score');
		// reset = document.querySelector('.reset');

const colors = ['#c3a3a3', '#DDA0DD', '#018749', '#fd5c63', '#FEBE10'];

let gameTime = 0;
let score = 0;


start.addEventListener('click', (e) => {
	e.preventDefault();
	screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
	const target = e.target;

	if (target.classList.contains('time-btn')) {
		gameTime = +target.getAttribute('data-time');
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', e => {
	const target = e.target;

	if (target.classList.contains('circle')) {
		score++;
		target.remove();
		changeScore();
		createRandomCircle();
	}
	if (gameTime > 0) {
		if (target.classList.contains('board')) {
			board.firstChild.remove();
			createRandomCircle();
		}
	}
});

// reset.addEventListener('click', () => {
// 	screens[1].classList.remove('up');
// 	score = 0;
// 	timer.parentNode.classList.toggle('hide');
// });

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(gameTime);
	// reset.classList.toggle('hide');
}

function decreaseTime() {
	let current = --gameTime;
	
	if (current === 0) {
		finishGame();
	} 
	// if (current > 0) {
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	// }

}

function setTime(value) {
	timer.innerHTML = `00:${value}`;
}

function finishGame() {
	timer.parentNode.classList.toggle('hide');
	gameScore.classList.add('hide');
	board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
	// reset.classList.toggle('hide');
}

function createRandomCircle() {
	const circle = document.createElement('div');
	const size = getRandomNumber(10, 60);
	const {width, height} = board.getBoundingClientRect();
	
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);

	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	setColor(circle);

	board.append(circle);
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
	const color = getRandomColor();
	element.style.backgroundColor = color;
}

function getRandomColor () {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
}

function changeScore() {
	gameScore.innerHTML = `Ваши очки: <span class="primary">${score}</span>`;
}
