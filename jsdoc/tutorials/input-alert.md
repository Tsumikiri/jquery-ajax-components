
If an ajax component uses a Sweet Alert of type `'input'`, the text entered into the input alert will be sent with the request's ajax data. The entered string will be put into the `input` key of the ajax data.

You can change which key to use for alert inputs with the following code.
```javascript
$.ac.config.alertInputDataKey = 'mykey';
```


