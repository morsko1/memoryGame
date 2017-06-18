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
		},
		setColors = function () {
				function getRandomInt(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
			var fronts = document.getElementsByClassName('front');
			var arr = [];
			for (var k = 0; k<fronts.length; k++) {
				arr.push(k);
			}
			// console.log(arr);
			for (var i=0; i<fronts.length; i++) {
				var front = fronts[i];
				var l = getRandomInt(0, arr.length-1);
				front.style.backgroundColor = colors[arr.splice(l, 1)];
			}
		},
		showHide = function () {
			var items = document.getElementsByClassName('item');
			for (var i=0; i<items.length; i++) {
				items[i].classList.toggle('freezed');
			}
		},
		flip = function (event) {
			var target = event.target.parentElement;
			if (target === document.body || target.classList.contains('freezed')) {
				return;
			}

			numSteps++;
			steps.innerHTML = numSteps;

			if (counter === 2) {
				for (var i=0; i<field.children.length; i++) {
					var item = field.children[i];
					if (item.classList.contains('freezed')) {
						continue;
					}
					item.classList.remove('flipped');
				}
			counter = 0;
			} // end if

			target.classList.contains('flipped') === true ? target.classList.remove('flipped') : target.classList.add('flipped');
			counter++;

			if (areSame()) {
				console.log('same');
				freeze();
			}
			// if game finished
			if (document.getElementsByClassName('item').length === document.getElementsByClassName('freezed').length) {
				finishGame();
			}
		},
		areSame = function () {
			var items = document.getElementsByClassName('flipped');
			if (items.length !== 2) {
				return false;
			}
			if (items[0].firstElementChild.style.backgroundColor === items[1].firstElementChild.style.backgroundColor) {
				return true;
			}
			return false;
		},
		freeze = function () {
			// querySelectorAll для того, чтобы список элементов был нединамическим
			var items = document.querySelectorAll('.flipped');
			for (var i=0; i<items.length; i++) {
				var item = items[i];
				item.classList.remove('flipped');
				item.classList.add('freezed');
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
			document.getElementById('show').addEventListener('click', showHide);
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
