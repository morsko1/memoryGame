var memory = (function () {
	var field = document.getElementById('field'),
		colors = [],
		counter = 0,
		makeColors = function () {
			for (var i=0; i<field.children.length/2; i++) {
				var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
				colors.push(color, color);
			}
			colors.sort(function () {
				return Math.random-0.5;
			});
			console.log(colors);
		},
		setColors = function () {
			for (var i=0; i<field.children.length; i++) {
				var item = field.children[i];
				item.style.backgroundColor = colors[i];
			}
		},
		turn = function (e) {
			var target = (e.target.tagName === 'DIV')? e.target: e.target.parentElement;

			if (target === field || target.classList.contains('freezed')) {
				return;
			}
			if (counter === 2) {
				for (var i=0; i<field.children.length; i++) {
					var item = field.children[i];
					if (item.classList.contains('freezed')) continue;
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
			}
		},
		addListeners = function () {
			field.addEventListener('click', turn);
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