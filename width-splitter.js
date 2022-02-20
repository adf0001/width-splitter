
// width-splitter @ npm, dom width splitter.

/*
example:

	<div style='position:relative;width:300px;height:300px;'>
		<div id='div1' style='position:absolute;left:0px;top:0px;bottom:0px;width:30%;background:#FFeeee;'></div>
		<div id='div2' style='position:absolute;left:0px;top:0px;bottom:0px;width:70%;background:#eeFFee;'></div>
		<div id='splitter1' style='z-index:1;position:absolute;left:100px;width:10px;top:20px;bottom:30px;'></div>
	</div>
	
	<div id='div3' style='width:100px;height:100px;background:#eeeeFF;'></div>

	//init width splitter
	width_splitter('splitter1',['div1','div3'],'div2',10);
*/

var ele = require("ele-tool");
var to_px_by_offset = require("to-px-by-offset");
var drag_object = require("drag-object");

var widthSplitterDragObject = new drag_object.class({

	option: {},
	leftWidthList: null,
	rightBorderList: null,
	leftBorderList: null,
	rightWidthList: null,

	el1: null,
	top0: null,
	left0: null,

	leftWidth0: null,
	rightBorder0: null,
	rightBorderWidth0: null,
	leftBorder0: null,
	leftBorderWidth0: null,
	rightWidth0: null,

	start: function (evt, el1) {
		this.el1 = el1;
		this.top0 = el1.style.top;
		this.left0 = to_px_by_offset.left(el1);
		//console.log(this.top0+","+this.left0+","+el1.style.left);

		//leftWidth0
		var i, imax, el, wa, wa2;
		this.leftWidth0 = wa = [];
		imax = this.leftWidthList.length;
		for (i = 0; i < imax; i++) {
			wa[wa.length] = to_px_by_offset.width(this.leftWidthList[i]);
		}

		//rightWidth0
		this.rightWidth0 = wa = [];
		imax = this.rightWidthList.length;
		for (i = 0; i < imax; i++) {
			wa[wa.length] = to_px_by_offset.width(this.rightWidthList[i]);
		}

		//rightBorder0
		this.rightBorder0 = wa = [];
		this.rightBorderWidth0 = wa2 = [];
		imax = this.rightBorderList.length;
		for (i = 0; i < imax; i++) {
			el = ele(this.rightBorderList[i]);
			wa[wa.length] = to_px_by_offset.right(el);
			wa2[wa2.length] = el.offsetWidth;
		}

		//leftBorder0
		this.leftBorder0 = wa = [];
		this.leftBorderWidth0 = wa2 = [];
		imax = this.leftBorderList.length;
		for (i = 0; i < imax; i++) {
			el = ele(this.leftBorderList[i]);
			wa[wa.length] = to_px_by_offset.left(el);
			wa2[wa2.length] = el.offsetWidth;
		}

		//console.log(this.top0+","+this.left0+","+el1.style.left);

		this.el1.style.background = 'lightgrey';

		if (this.option.callback) this.option.callback("start");

		drag_object.start.apply(this, arguments);
	},

	onStop: function (evt) {
		drag_object.onStop.apply(this, arguments);
		this.el1.style.background = '';
		this.el1 = null;

		if (this.option.callback) this.option.callback("stop");
	},
	onMove: function (evt) {
		drag_object.onMove.apply(this, arguments);
		if (!this.moveChanged) return;

		this.el1.style.top = this.top0;	//restore top
		var dx = parseInt(this.el1.style.left) - this.left0;

		var i, imax, w, option = this.option;

		//check dx

		imax = this.leftWidthList.length;
		for (i = 0; i < imax; i++) {
			w = this.leftWidth0[i] + dx;
			if (w < option.minLeft) dx = option.minLeft - this.leftWidth0[i];
			if (option.maxLeft && w > option.maxLeft) dx = option.maxLeft - this.leftWidth0[i];
		}

		imax = this.rightBorderList.length;
		for (i = 0; i < imax; i++) {
			w = this.rightBorderWidth0[i] + dx;
			if (w < option.minLeft) dx = option.minLeft - this.rightBorderWidth0[i];
			if (option.maxLeft && w > option.maxLeft) dx = option.maxLeft - this.rightBorderWidth0[i];
		}

		imax = this.leftBorderList.length;
		for (i = 0; i < imax; i++) {
			w = this.leftBorderWidth0[i] - dx;
			if (w < option.minRight) dx = -(option.minRight - this.leftBorderWidth0[i]);
			if (option.maxRight && w > option.maxRight) dx = -(option.maxRight - this.leftBorderWidth0[i]);
		}

		imax = this.rightWidthList.length;
		for (i = 0; i < imax; i++) {
			w = this.rightWidth0[i] - dx;
			if (w < option.minRight) dx = -(option.minRight - this.rightWidth0[i]);
			if (option.maxRight && w > option.maxRight) dx = -(option.maxRight - this.rightWidth0[i]);
		}

		//update width
		imax = this.leftWidthList.length;
		for (i = 0; i < imax; i++) {
			ele(this.leftWidthList[i]).style.width = (this.leftWidth0[i] + dx) + "px";
		}

		imax = this.rightBorderList.length;
		for (i = 0; i < imax; i++) {
			ele(this.rightBorderList[i]).style.right = (this.rightBorder0[i] - dx) + "px";
		}

		imax = this.leftBorderList.length;
		for (i = 0; i < imax; i++) {
			ele(this.leftBorderList[i]).style.left = (this.leftBorder0[i] + dx) + "px";
		}

		imax = this.rightWidthList.length;
		for (i = 0; i < imax; i++) {
			ele(this.rightWidthList[i]).style.width = (this.rightWidth0[i] - dx) + "px";
		}

		//console.log(dx + "," + this.left0);
		this.el1.style.left = (dx + this.left0) + "px";

		if (option.callback) option.callback("move", dx);
	},

});

widthSplitterDragObject.init();

/*
	options:
		.minLeft		min width of left side, default 0;
		.maxLeft		max width of left side;
		.minRight		min width of right side, default 0;
		.maxRight		max width of right side;
		.min			min width of both left and right side;		//shortcut when `option` is number
		.max			max width of both left and right side;
		.cb/.callback	callback function after the width is changed.	//shortcut when `option` is function

*/

WidthSplitterDragObjectClass = function (elSplitter, leftWidthList, rightBorderList, leftBorderList, rightWidthList, options) {
	//option
	var typeofOption = typeof options;
	if (typeofOption === "function") options = { callback: options };
	else if (typeofOption === "number") options = { min: options };
	else if (!options) options = {};

	options.minLeft = options.minLeft || options.min || 0;
	options.maxLeft = options.maxLeft || options.max || 0;
	options.minRight = options.minRight || options.min || 0;
	options.maxRight = options.maxRight || options.max || 0;

	options.callback = options.callback || options.cb;

	if (!(leftWidthList instanceof Array)) leftWidthList = leftWidthList ? [leftWidthList] : [];
	if (!(rightBorderList instanceof Array)) rightBorderList = rightBorderList ? [rightBorderList] : [];
	if (!(leftBorderList instanceof Array)) leftBorderList = leftBorderList ? [leftBorderList] : [];
	if (!(rightWidthList instanceof Array)) rightWidthList = rightWidthList ? [rightWidthList] : [];

	//init
	elSplitter = ele(elSplitter);
	elSplitter.style.cursor = "ew-resize";
	elSplitter.style.userSelect = "none";

	var o = Object.create(widthSplitterDragObject);
	o.init();

	o.option = options;
	o.leftWidthList = leftWidthList;
	o.rightBorderList = rightBorderList;
	o.leftBorderList = leftBorderList;
	o.rightWidthList = rightWidthList;

	elSplitter.onmousedown = function () { o.start(arguments[0], this); }
	elSplitter.ontouchstart = elSplitter.onmousedown;

	return o;
}

// module

module.exports = exports = function (elSplitter, leftWidthList, rightBorderList, leftBorderList, rightWidthList, option) {
	return new WidthSplitterDragObjectClass(elSplitter, leftWidthList, rightBorderList, leftBorderList, rightWidthList, option);
};

exports.widthSplitterDragObject = widthSplitterDragObject;
exports.class = WidthSplitterDragObjectClass;
