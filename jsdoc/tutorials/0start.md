### Setup
Simply include the JavaScript file after including [jQuery](https://api.jquery.com/), [serializeObject](https://github.com/hongymagic/jQuery.serializeObject" title="There are lots of versions of this made by different people. This is just a random one from a Google search.), and [SweetAlert](http://t4t5.github.io/sweetalert/) (optional).
```html
<script src="jquery.ajax-components.js"></script>
```
### Basic Initialization
Use the plugin function to initialize ajax components.
```javascript
$(function() {
	$('#my-form').ac('submit');
});
```
### Basic Server Response
You should create a server-side script that returns a JSON object.
```json
{
	"content": {
		"#my-div": "My new content!"
	}
}
```