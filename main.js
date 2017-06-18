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
			var fronts = document.getElementsByClassName('front');
			var arr = [];
			for (var k = 0; k<fronts.length; k++) {
				arr.push(k);
			}
			console.log(arr);
			for (var i=0; i<fronts.length; i++) {
				var front = fronts[i];
				var l = getRandomInt(0, arr.length-1);
				console.log(l);
				front.style.backgroundColor = colors[arr.splice(l, 1)];
			}
		},
		animate = function (elem) {
		},
		flip = function (event) {
			var target = event.target.parentElement;
			if (target === document.body || target.classList.contains('freezed')) {
				return;
			}
			console.log(target);

			target.classList.contains("flipped") === true ? target.classList.remove("flipped") : target.classList.add("flipped");
			// target.addEventListener( "click", function() {
			// 			var c = this.classList;
			// 			c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
			// 		});

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
			var items = document.getElementsByClassName('item');
			// for ( var i  = 0, len = items.length; i < len; i++ ) {
			// 		var item = items[i];
			// 		flip( item );
			// 	}
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
