
The plugin has built-in functionality for interpreting special directives that can be sent back by the server in an ajax response. This functionality is enabled by default but can be disabled via the plugin's configuration.

```javascript
$.ac.config.enableResponseHandlers = false;
```

In order to take advantage of the plugin's response handlers, the response returned by the server after making an ajax request must be a JSON object. The JSON object may have zero or more recognized directives, detailed below. Each directive is a key in the JSON object.

After the response is received, each directive is interpreted by the plugin and used to perform a particular action on the page. Each of these directives and their functionalities are detailed below.

### `html`
The value assigned to this key should be an object. The keys of the object are [jQuery selectors](http://api.jquery.com/category/selectors/) (strings) and the values are HTML content. When the response is received, the handler will replace the content of each selected element with the value using [jQuery#html](http://api.jquery.com/html/).

### `append` and `prepend`
These directives are the same as `html` but they appends or prepends the content instead of replacing it.

### `remove`
The value assigned to this key should be an array. The items in the array are jQuery selectors (strings). When the response is received, the handler will call [jQuery#remove](http://api.jquery.com/remove/) on each selector.

### `hide` and `show`
The value assigned to each of these keys should be an array. The items in the array are jQuery selectors (strings). When the response is received, the handler will call [jQuery#hide](http://api.jquery.com/hide/) on each selector in the `hide` array, and it will call [jQuery#show](http://api.jquery.com/show/) on each selector in the `show` array.

### `hideModal` and `showModal`
This directive is the same as `hide` and `show` but for bootstrap modals. Calls [jQuery#modal](http://getbootstrap.com/javascript/#modals-methods) to hide and show modals.

### Example: Server Response Directives
This example shows how the server response is processed by the plugin.

Our page has several containers and a link. When the link is clicked, it will send an ajax request to the server. The server will then return a response that contains directives.

##### HTML
```html
<a id="link">Click me!</a>
<div id="div1"></div>
<div id="div2"></div>
<div id="div3">Remove me!</div>
<div id="div4">Remove me, too!</div>
<div id="div5">Hide me!</div>
<div id="div6">Hide me, too!</div>
<div id="div7" style="display: none;">Show me!</div>
<div id="div8" style="display: none;">Show me, too!</div>
```

##### JavaScript
```javascript
$(function() {
	$('#link').ac('click', null, {
		url: '/path/to/remote/function/'
	});
});
```

##### Server Response
```json
{
	"html": {
		"#div1": "Some new content!",
		"#div2": "Some other new content!"
	},
	"remove": [ "#div3", "#div4" ],
	"hide": [ "#div5", "#div6" ],
	"show": [ "#div7", "#div8" ]
}
```

The above directives tell the plugin to perform each of the following operations when the ajax response is received.
- Set the HTML content of `div1` to `Some new content!`
- Set the HTML content of `div2` to `Some other new content!`
- Remove `div3` and `div4` from the DOM
- Hide `div5` and `div6`
- Show `div7` and `div8`
