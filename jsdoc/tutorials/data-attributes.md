
Instead of making an initializer call for each ajax component on your page, you can make a generic call and use data attributes to customize each component.

Use `data-ac-ajax-*` attributes to set ajax settings. For example, using the `data-ac-ajax-url="/path/to/function/"` attribute is the same as passing `{ url: '/path/to/function' }` as the {@link jQuery#ac|intializer}'s `ajaxOptions` argument. Use `data-ac-alert-*` to set alert options.

Data attributes override arguments passed to the initializer.

### Example: Using Data Attributes
In this example, we will use data attributes to avoid having to call the initializer on every ajax component.

#### JavaScript
This code turns any anchor tag with the class `"ajax-link"` into an ajax component that triggers on the `click` event. Notice that no ajax configuration is specified in the initializer arugments.

```javascript
$(function() {
	$('a.ajax-link').ac('click');
});
```

#### HTML
Here we use data attributes on the anchor tags to specify our ajax configuration.

```html
<a class="ajax-link" data-ac-ajax-url="/path/to/function1/">Link 1</a>
<a class="ajax-link" data-ac-ajax-url="/path/to/function2/">Link 2</a>
```

In this HTML snippet, the first link will make an ajax request to the URL `"/path/to/function1"`. The second link will make an ajax request to `"/path/to/function2"`.

### Changing Attributes
Data attributes are read every time the event fires. This means that if the data attributes are changed programmatically, you do not have to re-run the initializer.

### JSON in Attributes
If an attribute value is valid JSON, the plugin will automatically parse it. This allows for more complex values to be passed in through the data attributes. For example, `data-ac-ajax='{"url":"/some/path/","data":{"foo":"bar"}}'` sets the entire ajax settings object in one attribute. Note that the attribute value in this example is strict JSON rather than JavaScript's object syntax.
