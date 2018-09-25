function createCssClasses(navbar) {
	let styleTag = $('<style title="navbar-positioning-styles"></style>');
	$('head').append(styleTag);

	let navsHeight = getNavsHeight(navbar);

	styleTag.append(cssClassHideNav, cssClassShowNav, cssClassSmoothSlide, cssClassDisplayNavbar);
}

module.exports = 