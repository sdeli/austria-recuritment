const resizeNavbar = require('./moduls/resize-navbar/resize-navbar.js');
const dropDownNavOnMobile = require('./moduls/drop-down-nav-on-mobile/drop-down-nav-on-mobile.js');

function manageNavbar() {
	dropDownNavOnMobile();
	resizeNavbar();
}

module.exports = manageNavbar;