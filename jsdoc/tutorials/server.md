The response returned by the server after making an ajax request must be a JSON object. The JSON object may have zero or more of the following recognized keys: `"content"`, `"remove"`, `"hide"`, `"show"`. Each key is used to perform a particular action on the page after the response is received. Each of these keys and their functionalities are detailed below.
### `content`
The value assigned to this key should be an object. The keys of the object are selectors and the values are HTML content. When the response is received, the handler will replace the content of each selected element with the value using jQuery's [`.html()`](http://api.jquery.com/html/) function.
### `remove`
The value assigned to this key should be an array. The items in the array are selectors. When the response is received, the handler will call jQuery's [`.remove()`](http://api.jquery.com/remove/) function on each selector.
### `hide`
The value assigned to this key should be an array. The items in the array are selectors. When the response is received, the handler will call jQuery's [`.hide()`](http://api.jquery.com/hide/) function on each selector.
### `show`
The value assigned to this key should be an array. The items in the array are selectors. When the response is received, the handler will call jQuery's [`.show()`](http://api.jquery.com/show/) function on each selector.
### Example: Full Response
This example explains how the server response is processed by the plugin.
##### HTML
```html
<a id="link">Click me!</a>
<div id="div1"></div>
<div id="div2"></div>
<div id="div3"></div>
<div id="div4"></div>
<div id="div5"></div>
<div id="div6"></div>
<div id="div7" style="display: none;"></div>
<div id="div8" style="display: none;"></div>

```
##### JavaScript
```javascript
$(function() {
	$('#link').ac('click', null, {
		url: '/path/to/remote/function/'
	});
});
```
##### Response
```json
{
	"content": {
	"#div1": "Some new content!",
		"#div2": "Some other new content!"
	},
	"remove": [ "#div3", "#div4" ],
	"hide": [ "#div5", "#div6" ],
	"show": [ "#div7", "#div8" ]
}
```
After receiving the above response, the content of `div1` will be set to `'Some new content!'` and the content of `div2` to `'Some other new content!'`. Also, `div3` and `div4` will be removed, `div5` and `div6` will be hidden, `div7` and `div8` will be shown.
