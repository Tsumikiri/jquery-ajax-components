
Problems can arise when event handlers need to be bound to elements that are dynamically added or removed from the page. One solution is to instead bind event handlers to some static parent element and use a filter selector.
To bind the Ajax Components handler to a parent element, use the `filterSelector` parameter of the plugin function.

### Example: Binding to a Static Parent
In this example, we want to load dynamic content into `container`, but the link that fetches the new content is inside `container`. A regular initializer call to bind our event handler to the link will only work the first time, after which the link will be removed and replaced with a new, non-functional link. Instead, let's use a delegated event, as shown in the JavaScript section.

#### Response
```json
{
	"content": {
		"#container": "<p>New Content</p><a class=\"get-link\">Get Content</a>"
	}
}
```

#### HTML
```html
<div id="container">
    <p>Initial content</p>
    <a class="get-link">Get Content</a>
</div>
```

#### JavaScript
```javascript
$(function() {
	$('#container').ac('click', '.get-link', {
		url: '/path/to/remote/function/'
	});
});
```
This will bind the event handler to any element matching `'.get-link'` inside `container`, even if the contents of `container` changes. This works by "bubbling" the click even up from the child elements.
