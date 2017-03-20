Instead of making an initializer call for every ajax component on your page, you can make a generic call and use data attributes to customize each component.
Use `data-ac-ajax-*` attributes to set ajax settings. For example, using the `data-ac-ajax-url="/path/to/function/"` attribute is the same as passing `{ url: '/path/to/function' }` as the intializer's `ajaxOptions` argument. Use `data-ac-data-*` to set the data part of the ajax options. Use `data-ac-alert-*` to set alert options.
### Example: Using Data Attributes
In this example, we will use data attributes to avoid having to call the initializer on every ajax component.
#### JavaScript
```javascript
$(function() {
	$('.ajax-link').ac('click');
});
```
#### HTML
```javascript
<a class="ajax-link" data-ac-ajax-url="/path/to/function1/" data-ac-data-hello="world" data-ac-alert-title="Test 1">Link 1</a>
<a class="ajax-link" data-ac-ajax-url="/path/to/function2/" data-ac-data-foo="bar" data-ac-alert-title="Test 2">Link 2</a>
```
In this HTML snippet, the first link will first prompt the user with a Sweet Alert with the title `'Test 1'`, then it will make an ajax request to the URL `'/path/to/function1'` with the data `{ hello: 'world' }`. The second link will prompt with the title `'Test 2'` then make an ajax request to `'/path/to/function2'` with the data `{ foo: 'bar' }`. Notice that in the JavaScript we only have to make one call to the initializer.</p>
### Changing Attributes
Data attributes are read every time the event fires. This means that if the data attributes are changed programmatically, you do not have to re-run the initializer.
### JSON in Attributes
If an attribute value is valid JSON, the plugin will automatically parse it. This allows for more complex values to be passed in through the data attributes. For example, `data-ac-ajax='{"url":"/some/path/","data":{"foo":"bar"}}'` sets the entire ajax settings object in one attribute. Note that the attribute value in this example is strict JSON rather than JavaScript's object syntax.
