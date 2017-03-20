If an ajax component uses a Sweet Alert of type `'input'`, the text entered into the input alert will be sent with the request's ajax data. The enetered string will be put into the `"input"` key of the ajax data.
### Using an Input Alert
This example uses an input alert to pass data to the server.
#### JavaScript
```javascript
$(function() {
	$('#my-link').ac('click', {
		url: '/path/to/function/'
	}, {
		type: 'input'
	});
});
```
#### HTML
```javascript
<a id="my-link">Click Me</a>
```