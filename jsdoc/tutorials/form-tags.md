
For form elements, the plugin will automatically add the form data to the ajax request data. The `action` and `method` attributes will also be used for the ajax request. The form will be prevented from being submitted normally.

### Example: Automatically Passing Form Data
This example shows how the plugin works with form elements.

#### JavaScript
Notice that we don't have to specify any ajax configuration options, since the plugin will automatically get these from the form tag itself.

```javascript
$(function() {
	$('#my-form').ac('submit');
});
```

#### HTML
Our form tag specifies an `action` and `method`, which will be used in the ajax configuration automatically.

```html
<form id="my-form" action="/path/to/function/" method="post">
	<input type="hidden" name="id" value="7" />
	<input type="text" name="something" value="" />
	<button type="submit">Submit</button>
<form>
```

When the form is submitted, the ajax request will send the serialized form data to the URL `"/path/to/function/"` with the `"post"` method.
