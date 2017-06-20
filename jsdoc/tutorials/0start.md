
### Setup
Simply include the JavaScript file after including [jQuery](https://api.jquery.com/) (required) and [SweetAlert](http://t4t5.github.io/sweetalert/) (optional).
```html
<script src="jquery.ajax-components.js"></script>
```

### Basic Initialization
Use the plugin function to initialize ajax components.
The below snippet turns an ordinary form tag into an ajax form. Instead of submitting the entire page on submit, the ajax form will send an ajax request with all of the form's data. It is even smart enough to use the `action` and `method` attributes from the `form` tag itself in this ajax request.
```javascript
$(function() {
	$('#my-form').ac('submit');
});
```
When the ajax response is received, we usually want to update the page in some way such as by inserting some new content into the page. There are a few different ways to do this, detailed in the Handling Responses section below.

#### Handling Responses

##### Using Callbacks
In this example, our form submits to a page and that page sends back some new HTML content in the response data. The code below takes that content and puts it in a `div` on the page.
```javascript
$(function() {
	$('#my-form').ac('submit', {
		success: function(data) {
			$('#my-div').html(data.content);
		}
	});
});
```

##### Using Deferred Callbacks
This method is similar to the previous one, but it uses a promise-like interface instead of a configured callback.
```javascript
$(function() {
	$('#my-form').ac('submit').done(function(data) {
		$('#my-div').html(data.content);
	});
});
```

##### Using Response Handlers
If your page loads a lot of page content from ajax, it may be more convenient to use the plugin's response handlers. These handlers look at certain keys in returned server data and uses them to update page content. The most basic key is `"content"` which is used to update the content of some page element.
To use this method, you should have the page that the form submits to return a JSON object like the one below.
```json
{
	"content": {
		"#my-div": "My <strong>new</strong> content!"
	}
}
```
This object tells the ajax form to find `"#my-div"` on the page and replace its content with `"My new content!"` Check out the server response tutorial for more information about server response handlers.

#### Alerts
Sometimes you want to display a warning before submitting a form or making some other ajax request (such as a request to delete something). This functionality is simple to implement for your ajax components. The argument after the ajax configuration is the alert configuration. If you have SweetAlert on your site, the alert configuration will be passed to it, otherwise a system alerts stand-in with be used.
```javascript
$(function() {
	$('#my-form').ac('submit', null, {
		title: 'Are you really sure?',
		text: 'Don\'t be reckless.'
	});
});
```
If the user cancels out of the alert (hitting Cancel instead of hitting OK), no events are fired and no ajax request is made.