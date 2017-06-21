
### Setup
Simply include the JavaScript file after including [jQuery](https://api.jquery.com/) (required) and [SweetAlert](http://t4t5.github.io/sweetalert/) (optional).

```html
<script src="jquery.ajax-components.js"></script>
```

### Basic Initialization
Use the {@link jQuery#ac} function to initialize ajax components. The function has the following form:
`$(jQuerySelectorString).ac(eventName[, ajaxConfiguration, [alertConfiguration]]) -> PseudoDeferred`

Always check the generated documentation page {@link jQuery#ac|here} for up-to-date function parameters

Note that the `ajaxConfiguration` parameter is only optional when selecting a `form` tag. For more information on using the initializer with `form` tags, check out the {@tutorial form-tags} tutorial.

#### Events
Every ajax component needs to bind to one or more events. When that event is fired for the component, an ajax call will be made. (More on specifying the ajax configuration the next section.)

The events accepted by the plugin are the same as those accepted by [jQuery#on](http://api.jquery.com/on/) and can even include custom events. You can also use the `ac.init` event to bind to the initialization of the component.

```javascript
//binding to the component initialization
$('#my-component').on('ac.init', { /* ajax configuration */ });

//binding to multiple events
$('#my-component').on('ac.init click', { /* ajax configuration */ });
```

The plugin also supports delegated events. See the {@tutorial delegated-events} tutorial for more information.

### Ajax Configuration
You can specify ajax parameters after the event. These parameters are the same as those passed to [jQuery.ajax](http://api.jquery.com/jquery.ajax/). The only difference is that the `dataType` setting is defaulted to `'json'`.

```javascript
$('#my-link').ac('click', {
	url: '/path/to/remote/',
	method: 'get',
	cache: false
});
```

You can also specify ajax configuration options via data attributes. Check out the {@tutorial data-attributes} tutorial for more information.

### Alert Configuration
Sometimes you want to display a warning before submitting a form or making some other ajax request (such as a request to delete something). This functionality is simple to implement for your ajax components. The argument after the ajax configuration is the alert configuration.

The alert configuration has the same form as the options for [Sweet Alert](http://t4t5.github.io/sweetalert/). If you have SweetAlert included on the page (recommended) it will be used to display the alert, otherwise a generic stand-in will be used.

This code selects a button and initializes it for the `click` event, but this time it will show a popup alert before sending the ajax request. If the user cancels out of the alert (hitting Cancel instead of hitting OK), no events are fired and no ajax request is made.

```javascript
$('#delete-button').ac('click', {
	/* ajax configuration */
}, {
	title: 'Are you really sure?',
	text: 'This file will be deleted forever!!'
});
```

You can also specify alert configuration options via data attributes. Check out the {@tutorial data-attributes} tutorial for more information.

### Handling Responses
The plugin includes a system of directives that can be used to interpret server responses and make changes to the page content.

#### Using Callbacks
In this example, the ajax response includes some new HTML content. The code below takes that content and puts it on the page.

```javascript
$('#my-button').ac('click', {
	url: '/path/to/remote/function/'
	success: function(data) {
		$('#my-div').html(data.html);
	}
});
```

#### Using Deferred Callbacks
This method is similar to the previous one, but it uses a promise-like interface instead of a configured callback.

```javascript
$('#my-button').ac('click', {
	url: '/path/to/remote/function/'
}).done(function(data) {
	$('#my-div').html(data.html);
});
```

Note that this is not a true promise interface and could be less reliable than the callback method. See {@link AjaxComponents.PseudoDeferred} in the documentation.

#### Using Response Handlers
This optional feature of the plugin allows you to use special directives in the JSON data returned by the server to manipulate the page content client-side. This is enabled by default; to disable use this code:

```javascript
$.ac.config.enableResponseHandlers = false;
```

The built-in response handlers look at certain keys in any received response data and use them to update page content. The most basic directive is `"html"` which is used to update the content of some page element, replacing the old content that was there. Check out the {@tutorial server-response} tutorial for more information about server response handlers and directives.

To use this method, you should have the ajax page return a JSON object like the one below.

```json
{
	"html": {
		"#my-div": "My <strong>new</strong> content!"
	},
	"hide": [ "#my-other-div" ]
}
```

This object tells the plugin to perform the following operations:
- Find `"#my-div"` on the page and replace its content with `"My <strong>new</strong> content!"` (uses [jQuery#html](http://api.jquery.com/html/))
- Find `"#my-other-div"` on the page and hide it (uses [jQuery#hide](http://api.jquery.com/hide/))