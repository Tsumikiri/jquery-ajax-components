
Problems can arise when event handlers need to be bound to elements that are dynamically added or removed from the page. One solution is to instead bind event handlers to the nearest static parent element and use a filter selector.

You can read more about delegated events in the [jQuery#on](http://api.jquery.com/on/#direct-and-delegated-events) documentation.

To bind the Ajax Components handler to a parent element, use the `filterSelector` parameter of the plugin function. Use this parameter the same way you would use the `selector` parameter for [jQuery#on](http://api.jquery.com/on/).

### Example: Binding to a Static Parent
In this example, we want to load dynamic content into `container`, but the link that fetches the new content is inside `container`.

A regular initializer call to bind our event handler to the link will only work the first time. After that the link will be removed and replaced with a new, non-functional link. Instead, let's use a delegated event, as shown in the JavaScript section below.

#### Server Response
The server response uses the `"html"` directive to tell the plugin to replace the content of `"#container"` with `<p>New Content</p><a class="get-link">Get Content</a>`.

```json
{
	"html": {
		"#container": "<p>New Content</p><a class=\"get-link\">Get Content</a>"
	}
}
```

#### HTML
We have a static container containing some content, including a link. We want to update the contents of the container when the link is clicked.

```html
<div id="container">
    <p>Initial content</p>
    <a class="get-link">Get Content</a>
</div>
```

#### JavaScript
This will bind the event handler to any element matching `'.get-link'` inside `container`, even if the contents of `container` changes. This works by "bubbling" the `click` even up from the child elements.

```javascript
$(function() {
	$('#container').ac('click', '.get-link', {
		url: '/path/to/remote/function/'
	});
});
```

