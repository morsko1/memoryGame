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
			for (var i=0; i<fronts.length; i++) {
				var front = fronts[i];
				var l = getRandomInt(0, arr.length-1);
				front.style.backgroundColor = colors[arr.splice(l, 1)];
			}
		},
		// Вспомогательный метод. Переворачивает все закрытые карточки
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
					if (item !== target && !item.classList.contains('freezed')) {
						item.classList.remove('flipped');
					}
				} // enf for
				counter = 0;
				if (target.classList.contains('flipped') === true)  {
					target.classList.remove('flipped');
				} else {
					target.classList.add('flipped');
					counter++;
				}

			} else { // counter not equal 2
				(target.classList.contains('flipped') === true) ? target.classList.remove('flipped') : target.classList.add('flipped');
				counter++;
			}

			if (areSame()) {
				freeze();
			}

			// if game finished
			if (document.getElementsByClassName('item').length === document.getElementsByClassName('freezed').length) {
				finishGame();
			}
			console.log(counter);

		},
		// отфильтровывает элементы, содержащие класс 'freezed'
		returnNotFreezed = function (elem) {
			if ( !elem.classList.contains('freezed')) {
				return elem;
			}
		},
		// метод, сравнивающий цвета двух открытых карточек
		areSame = function () {
			var items = document.getElementsByClassName('flipped');
			arr = Array.prototype.slice.call(items);

			// отфильтровать те, которые содержат класс freezed
			arr = arr.filter(returnNotFreezed);

			if (arr.length !== 2) {
				return false;
			}
			if (arr[0].firstElementChild.style.backgroundColor === arr[1].firstElementChild.style.backgroundColor) {
				return true;
			}
			return false;
		},
		// метод, замораживающий совпадающие карточки. Вызывается если метод areSame возвращает TRUE
		freeze = function () {
			// querySelectorAll для того, чтобы список элементов был нединамическим
			var items = document.querySelectorAll('.flipped');
			for (var i=0; i<items.length; i++) {
				var item = items[i];
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
