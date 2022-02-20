# width-splitter
dom width splitter

# Install
```
npm install width-splitter
```

# Usage & Api
```html
<div style='position:relative;width:300px;height:300px;'>
	<div id='div1' style='position:absolute;left:0px;top:0px;bottom:0px;width:30%;background:#FFeeee;'></div>
	<div id='div2' style='position:absolute;left:0px;top:0px;bottom:0px;width:70%;background:#eeFFee;'></div>
	<div id='splitter1' style='z-index:1;position:absolute;left:100px;width:10px;top:20px;bottom:30px;'></div>
</div>

<div id='div3' style='width:100px;height:100px;background:#eeeeFF;'></div>

<script>
/*
width_splitter(elSplitter, leftWidthList, rightBorderList, leftBorderList, rightWidthList, options)

	options:
		.minLeft		min width of left side, default 0;
		.maxLeft		max width of left side;
		.minRight		min width of right side, default 0;
		.maxRight		max width of right side;
		.min			min width of both left and right side;		//shortcut when `option` is number
		.max			max width of both left and right side;
		.cb/.callback	callback function after the width is changed.	//shortcut when `option` is function
*/
//init width splitter
width_splitter('splitter1',['div1','div3'],'div2',10);

</script>

```
