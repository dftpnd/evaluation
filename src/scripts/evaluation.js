(()=> {
	class Evaluation {
		constructor(el) {
			this.rootEl = el;
			this.itemDefaultClass = 'evaluation__item';
			this.itemActiveClass = 'evaluation__item--active';

			this.items = [
				{value: 4, label: 5},
				{value: 3, label: 4},
				{value: 2, label: 3},
				{value: 1, label: 2},
				{value: 0, label: 1}
			];

			this.addItems = this.addItems.bind(this);
			this.createItem = this.createItem.bind(this);
			this.createControls = this.createControls.bind(this);
			this.hoverHandler = this.hoverHandler.bind(this);
			this.clickHandler = this.clickHandler.bind(this);
			this.setActiveItem = this.setActiveItem.bind(this);
			this.getControlValue = this.getControlValue.bind(this);

			this.createControls();
		}

		hoverHandler(el) {
			el.addEventListener('mouseover', (e)=> {
				if (e.target.classList.contains(this.itemDefaultClass)) {
					this.setActiveItem(e.target, true);
				}

			});

			el.addEventListener('mouseleave', (e)=> {
				const prevValue = parseInt(el.dataset.newValue, 10);

				if (isNaN(prevValue)) {
					this.setActiveItem(null, true, el);
					return;
				}

				Array.prototype.forEach.call(e.target.childNodes, (item, index)=> {

					if (parseInt(item.dataset.value, 10) === prevValue) {
						this.setActiveItem(item, true);
					}
				});

				e.stopPropagation();
			});
		}

		clickHandler(el) {
			el.addEventListener('click', (e)=> {
				if (e.target.classList.contains(this.itemDefaultClass)) {
					this.setActiveItem(e.target, false);
				}
				e.stopPropagation();
			});
		}

		setActiveItem(el, hovered, evalution) {
			if (el === null) {
				Array.prototype.forEach.call(evalution.childNodes, (item, index)=> {
					item.setAttribute('class', this.itemDefaultClass);
				});

				return;
			}

			const prevValue = parseInt(el.parentNode.dataset.newValue, 10);
			const value = parseInt(el.dataset.value, 10);

			if (!hovered) {
				if (isNaN(prevValue)) {
					el.setAttribute('class', this.itemDefaultClass + ' ' + this.itemActiveClass);
					el.parentNode.dataset.newValue = value;
					return;
				}

				if (el.classList.contains(this.itemActiveClass) && value === 0) {
					el.setAttribute('class', this.itemDefaultClass);
					el.parentNode.dataset.newValue = '';
					return;
				}

				el.parentNode.dataset.newValue = value;
				return;
			}

			Array.prototype.forEach.call(el.parentNode.childNodes, (item)=> {
				item.setAttribute('class', this.itemDefaultClass);
			});
			el.setAttribute('class', this.itemDefaultClass + ' ' + this.itemActiveClass);

		}

		addItems(control, activeValue) {
			this.items.forEach((el)=> {
				const item = this.createItem(control, activeValue, el);
			});
		}

		createItem(control, activeValue, el) {
			const item = document.createElement('li');
			let elClassNames = this.itemDefaultClass;
			control.appendChild(item);
			item.innerHTML = '<div class="evaluation__star"></div>';

			if (el.value === activeValue) {
				elClassNames += ' ' + this.itemActiveClass;
			}
			item.dataset.value = el.value;
			item.setAttribute('class', elClassNames);
			return item;
		}

		getControlValue(controll) {
			const value = parseInt(controll.dataset.activeValue, 10);
			if (isNaN(value)) {
				return ''
			} else {
				return value;
			}

		}

		createControls() {
			Array.prototype.forEach.call(this.rootEl, (el)=> {
				const child = document.createElement('ul');
				child.setAttribute('class', 'evaluation');
				el.appendChild(child);
				const activeValue = this.getControlValue(el);
				child.dataset.newValue = activeValue;
				this.addItems(child, activeValue);
				this.hoverHandler(child);
				this.clickHandler(child);

			});
		}

	}

	var el = document.getElementsByClassName('some-rating');

	const evaluation = new Evaluation(el);
})();