var memory = (function () {
	var field = document.getElementById('field'),
		steps = document.getElementById('steps'),
		newGame = document.getElementById('newgame'),
		colors = [],
		counter = 0,
		timerStarted = false,
		gameFinished = false,
		timerSec,
		timerMin,
		numSteps = 0,
		makeColors = function () {
			for (var i=0; i<field.children.length/2; i++) {
				var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
				colors.push(color, color);
			}
			console.log(colors);
		},
		setColors = function () {
				function getRandomInt(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
			var arr = [];
			for (var k = 0; k<field.children.length; k++) {
				arr.push(k);
			}
			console.log(arr);
			for (var i=0; i<field.children.length; i++) {
				var item = field.children[i];
				var l = getRandomInt(0, arr.length-1);
				console.log(l);
				item.style.backgroundColor = colors[arr.splice(l, 1)];
			}
		},
		animate = function (elem) {
			var angle = elem.dataset.angle = parseInt(elem.dataset.angle) + 180;
			elem.style.transform = 'rotatey(' + angle + 'deg)';
			elem.style.transitionDuration = '0.8s';
		},
		flip = function (e) {
			var target = (e.target.tagName === 'DIV')? e.target: e.target.parentElement;
			if (target === field || target.classList.contains('freezed')) {
				return;
			}
			animate(target);
			numSteps++;
			steps.innerHTML = numSteps;

			if (counter === 2) {
				for (var i=0; i<field.children.length; i++) {
					var item = field.children[i];
					if (item.classList.contains('freezed')) {
						continue;
					}
					item.firstChild.classList.remove('hidden');
				}
				counter = 0;

				target.firstChild.classList.add('hidden');
				counter++;
				return;
			}

			target.firstChild.classList.add('hidden');
			counter++;

			if (areSame()) {
				freeze();
			}
			// if game finished
			if (document.getElementsByClassName('item').length === document.getElementsByClassName('freezed').length) {
				finishGame();
			}
		},
		areSame = function () {
			var items = document.getElementsByClassName('hidden');
			if (items.length !== 2) return false;
			if (items[0].parentElement.style.backgroundColor === items[1].parentElement.style.backgroundColor) {
				return true;
			}
			return false;
		},
		freeze = function () {
			// querySelectorAll для того, чтобы список элементов был нединамическим
			var items = document.querySelectorAll('.hidden');
			for (var i=0; i<items.length; i++) {
				var item = items[i];
				item.parentElement.classList.add('freezed');
				item.classList.remove('hidden');
				item.classList.add('hidden-forever');
				playSound('audio/yes.mp3');
			}
		},
		playSound = function (src) {
			var audio = new Audio();
			audio.src = src;
			audio.autoplay = true;
		},
		startTimer = function () {
			if (timerStarted) {
				return;
			}
			timerStarted = true;
			var secSpan = document.getElementsByClassName('sec')[0];
				minSpan = document.getElementsByClassName('min')[0];
				minVal = 0,
				secVal = 0;
			timerSec = setInterval(function () {
				++secVal;
				if (secVal === 60) secVal = 0;
				secVal = (secVal<10) ? '0'+secVal : secVal;
				secSpan.innerHTML = secVal;
			}, 1000);
			timerMin = setInterval(function () {
				++minVal;
				minSpan.innerHTML = minVal;
			}, 60000);
		},
		stopTimer = function () {
			clearInterval(timerSec);
			clearInterval(timerMin);
		},
		finishGame = function () {
			stopTimer();
			var msg = document.createElement('div');
			var pos = field.getBoundingClientRect();
			field.classList.add('blured');
			msg.classList.add('win');
			msg.style.width = field.offsetWidth + 'px';
			msg.style.left = pos.left + 'px';
			msg.style.paddingTop = parseInt(field.offsetHeight)/2 - 32 + 'px';
			msg.innerHTML = 'Победа!'
			document.body.insertBefore(msg, field);
			playSound('audio/win.mp3');
		},
		addListeners = function () {
			field.addEventListener('click', flip);
			newGame.addEventListener('click', function () {
				location.reload();
			});
			field.addEventListener('click', startTimer);
		},
		init = function () {
			makeColors();
			setColors();
			addListeners();
		};
		return {
			init: init
		};
}());

memory.init();