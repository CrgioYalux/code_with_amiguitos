export const copyToClipboard = (text) => {
	const el = document.createElement('textarea');
	el.value = text;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.right = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};
