import $ from '../../core/dom';

export default function resizeHandler($root, event) {
	return new Promise((resolve) => {
		const $target = $(event.target);
		const $parent = $target.closest('[data-type="resizable"]');
		const coords = $parent.getCoords();
		const type = $target.data.resize;
		const { col } = $parent.data;
		let value;

		document.onmousemove = (e) => {
			if (type === 'col') {
				const delta = e.pageX - coords.right;
				value = coords.width + delta;
				$target.css({ right: `${-delta}px` });
			} else if (type === 'row') {
				const delta = e.pageY - coords.bottom;
				value = coords.height + delta;
				$target.css({ bottom: `${-delta}px` });
			}
		};

		document.onmouseup = () => {
			document.onmousemove = null;
			document.onmouseup = null;

			if (type === 'col') {
				$parent.css({ width: `${value}px` });
				$root.findAll(`[data-col="${col}"]`).forEach((node) => {
					node.style.width = `${value}px`;
				});
				$target.css({ right: 0 });
			} else if (type === 'row') {
				$parent.css({ height: `${value}px` });
				$target.css({ bottom: 0 });
			}

			resolve({
				value,
				type,
				id: $parent.data[type],
			});
		};
	});
}
