
//global variable, for html page, refer tpsvr @ npm.
width_splitter = require("../width-splitter.js");

module.exports = {

	"width_splitter()": function (done) {
		_ele('divResult2').innerHTML =
			"<div style='position:relative;width:300px;height:200px;'>" +
			"	<div id='div1' style='position:absolute;left:0px;top:0px;bottom:0px;width:30%;background:#FFeeee;border:2px solid red;box-sizing: border-box;'></div>" +
			"	<div id='div2' style='position:absolute;right:0px;top:0px;bottom:0px;width:70%;background:#eeFFee;border:2px solid green;box-sizing: border-box;'></div>" +
			"	<div id='splitter1' style='z-index:1;position:absolute;left:100px;width:10px;top:20px;bottom:30px;border:1px solid gray;'></div>" +
			"</div>" +
			"<div style='position:relative;width:300px;height:100px;'>" +
			"	<div id='div3' style='position:absolute;left:0px;top:0px;bottom:0px;right:70%;background:#FFeeee;border:2px solid red;box-sizing: border-box;'></div>" +
			"	<div id='div4' style='position:absolute;right:0px;top:0px;bottom:0px;left:30%;background:#eeFFee;border:2px solid green;box-sizing: border-box;'></div>" +
			"</div>" +
			"<div id='div5' style='width:60px;height:100px;background:yellow;'></div>" +
			"<br><br><br>";

		width_splitter('splitter1', ['div1', 'div5'], 'div3', 'div4', 'div2', 10);

		return 'ui test';
	},

	"width_splitter()/em": function (done) {
		_ele('divResult2').innerHTML =
			"<div style='position:relative;width:40em;height:200px;'>" +
			"	<div id='div1' style='position:absolute;left:0px;top:0px;bottom:0px;width:10em;background:#FFeeee;border:2px solid red;box-sizing: border-box;'></div>" +
			"	<div id='div2' style='position:absolute;right:0px;top:0px;bottom:0px;width:30em;background:#eeFFee;border:2px solid green;box-sizing: border-box;'></div>" +
			"	<div id='splitter1' style='z-index:1;position:absolute;left:15em;width:10px;top:20px;bottom:30px;border:1px solid gray;'></div>" +
			"</div>" +
			"<div style='position:relative;width:40em;height:100px;'>" +
			"	<div id='div3' style='position:absolute;left:0px;top:0px;bottom:0px;right:10em;background:#FFeeee;border:2px solid red;box-sizing: border-box;'></div>" +
			"	<div id='div4' style='position:absolute;right:0px;top:0px;bottom:0px;left:30em;background:#eeFFee;border:2px solid green;box-sizing: border-box;'></div>" +
			"</div>" +
			"<div id='div5' style='width:15em;height:100px;background:yellow;'></div>" +
			"<br><br><br>";

		width_splitter('splitter1', ['div1', 'div5'], 'div3', 'div4', 'div2', 10);

		return 'ui test';
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('width_splitter', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
