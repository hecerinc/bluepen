// Utils.js

const annotationWidth = 185;
const markerWidth = 40;

function isRightMarginEnough(event) {
	return (window.outerWidth - (event.clientX+markerWidth) > annotationWidth);
}

export {isRightMarginEnough, annotationWidth};
