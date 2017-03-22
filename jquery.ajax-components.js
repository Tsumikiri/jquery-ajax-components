/**
 * @author Alex Furey
 * @version 1.0.0
 * @requires jQuery
 * @requires serializeObject
 * @requires sweetAlert
 * @description A jQuery plugin for binding ajax functionality to page components
 */

/**
 * @external "jQuery.fn"
 * @description This plugin requires jQuery. This plugin will add {@linkcode ac|ac} to <code>$.fn</code>.
 * @see {@link http://docs.jquery.com/Plugins/Authoring The jQuery Plugin Guide|jQuery Plugin Guide}
 */

/**
 * @callback ajaxDoneCallback
 * @see {@linkcode http://api.jquery.com/deferred.done/|jQuery Done Callback}
 * @param {Object} data - The response data.
 */

/**
 * @callback ajaxErrorCallback
 * @see {@linkcode http://api.jquery.com/deferred.fail/|jQuery Fail Callback}
 * @param {Object} jqXHR - The {@link http://api.jquery.com/jQuery.ajax/#jqXHR|jQuery XHR object} for the ajax request.
 * @param {string} statusText - Text representing the status of the request.
 * @param {string} errorThrown - Text representing the error that was thrown.
 */

/**
 * @callback ajaxAlwaysCallback
 * @see {@linkcode http://api.jquery.com/deferred.always/|jQuery Always Callback}
 */

/**
 * @callback objectResponseCallback
 * @see {@linkcode http://api.jquery.com/jquery.each/|jQuery Each}
 * @summary A callback function used to loop over an object in an ajax response.
 * @param {string} key - The current key from the object to process.
 * @param value - The value assigned to the current key.
 */

/**
 * @callback arrayResponseCallback
 * @see {@linkcode http://api.jquery.com/jquery.each/|jQuery Each}
 * @summary A callback function used to loop over an array in an ajax response.
 * @param {number} index - The current index from the array to process.
 * @param value - The value assigned to the current index.
 */

(function($) {
	
	/**
	 * @name ac
	 * @namespace external:"jQuery.fn".ac
	 * @summary The plugin namespace
	 * @description This namespace includes just two items: the main plugin function (detailed below) and the {@link external:"jQuery.fn".ac.config|config} sub-namespace, which holds configurable plugin settings.
	 */
	
	/**
	 * @memberof external:"jQuery.fn".ac
	 * @function
	 * @summary The plugin function.
	 * @description This is the main function for this plugin. It binds a special event handler to the given page element(s). This handler makes an ajax request which must return a JSON response. That response can leverage several special keys (<code>"content"</code> is the most common) to manipulate the page. Read more about this in the {@tutorial server|Server Response tutorial}.
	 * @example <caption>Initializing an ajax link. Alternatively, you can leave out the second argument and instead use a data attribute on the anchor tag e.g. <code>data-ac-ajax-url="/path/to/remote/function/"</code>.</caption>
	 * $('#my-link').ac('click', {
	 *     url: '/path/to/remote/function/'
	 * });
	 * @example <caption>Initializing an ajax form. The URL and method will be automatically taken from the form's <code>action</code> and <code>method</code> attributes.</caption>
	 * $('#my-form').ac('submit');
	 * @param {string} eventName - The name of an event to use for the binding, such as <code>'click'</code> or <code>'submit'</code>
	 * @param {string} filterSelector - A filter selector for delegated binding
	 * @param {Object} ajaxOptions - The options to use for ajax requests made by this component
	 * @param {Object} alertOptions - The options to use for alerts created by this component
	 * @returns {Array} The jQuery result set is returned by this method, allowing for chaining.
	 */
	$.fn.ac = function() {
		var params = [];
		for (var i = 0; i < arguments.length; i++) {
			//insert a null for the selector argument if it wasn't passed in
			if (i === 1 && $.isPlainObject(arguments[i])) {
				params.push(null);
			}
			params.push(arguments[i]);
		}
		return this.each(function() {
			initializeComponent.apply(this, params);
		});
	}
	
	/**
	 * @name ac.config
	 * @namespace external:"jQuery.fn".ac.config
	 * @summary The plugin configuration object.
	 * @description These configuration options can be used to change how the plugin behaves.
	 * @example <caption>In this code snippet, we set the value of a config property.</caption>
	 * $.fn.ac.config.alertAllowEmpty = false;
	 * @example <caption>Adding a new response processor. This processor will take an array of selectors and run jQuery's <code>.slideUp()</code> on each one.</caption>
	 * $.fn.ac.config.responseHandlers.slideUp = function(index, selector) {
	 *     $(selector).slideUp();
	 * };
	 * //Example of expected server response: { "slideUp": [ "#div-to-slide-up", "#other-div-to-slide-up" ] }
	 * @property {ajaxDoneCallback} doneHandler - Callback to use for successful ajax calls.
	 * @property {ajaxErrorCallback} errorHandler - Callback to use for failed ajax calls.
	 * @property {ajaxAlwaysCallback} alwaysHandler - Callback to use for all ajax calls.
	 * @property {objectResponseCallback|arrayResponseCallback} responseHandlers.content - Server response handler for inserting page content.
	 * @property {objectResponseCallback|arrayResponseCallback} responseHandlers.remove - Server response handler for removing page content.
	 * @property {objectResponseCallback|arrayResponseCallback} responseHandlers.hide - Server response handler for hiding page content.
	 * @property {objectResponseCallback|arrayResponseCallback} responseHandlers.show - Server response handler for showing page content.
	 * @property {RegExp} ajaxAttrRegex - Regular expression used to match data-* attributes the specify ajax options.
	 * @property {RegExp} alertAttrRegex - Regular expression used to match data-* attributes that specify alert options.
	 * @property {string} eventSuffix - String appended to the name of any event that is bound using this plugin.
	 * @property {boolean} preventDefault - Whether or not to call <code>.preventDefault()</code> in the event handler.
	 * @property {boolean} stopPropagation - Whether or not to call <code>.stopPropagation()</code> in the event handler.
	 * @property {boolean} eventReturn - Value to return from the event handler.
	 * @property {string} alertInputDataKey - Key to use for data sent by input alerts.
	 * @property {boolean} alertAllowEmpty - Whether or not to allow empty strings to be submitted from input alerts.
	 * @property {Object} ajaxDefaults - The default values to use for ajax options.
	 * @property {Object} alertDefaults - The default values to use for alert options.
	 * @property {function} swal - Points to the <code>swal()</code> function from the Sweet Alert plugin. If Sweet Alert is not available, the plugin will make due with built-in alert functions.
	 */
	$.fn.ac.config = {
		doneHandler: null,
		errorHandler: null,
		alwaysHandler: null,
		responseHandlers: {
			content: function(selector, content) {
				$(selector).html(content);
			},
			remove: function(index, selector) {
				$(selector).remove();
			},
			hide: function(index, selector) {
				$(selector).hide();
			},
			show: function(index, selector) {
				$(selector).show();
			}
		},
		ajaxAttrRegex: /acAjax(Accepts|Contents|Context|Converters|Data|Headers|StatusCode|XhrFields)?([a-z]*)/i,
		alertAttrRegex: /acAlert([a-z]*)/i,
		eventSuffix: '.ac',
		preventDefault: true,
		stopPropagation: false,
		eventReturn: true,
		alertInputDataKey: 'input',
		alertAllowEmpty: true,
		ajaxDefaults: {
			dataType: 'json'
		},
		alertDefaults: {
			title: 'Are you sure?',
			type: 'warning',
			showCancelButton: true
		},
		swal: (typeof swal === 'function' ? swal : null)
	};
	
	/**
	 * @private
	 * @constant
	 * @default
	 */
	const ajaxKey             = 'ajax';
	/**
	 * @private
	 * @constant
	 * @default
	 */
	const alertKey            = 'alert';
	
	/**
	 * @private
	 * @function
	 * @summary Process server response
	 * @see $.fn.ac.configresponseHandlers
	 */
	function processResponse(data) {
		$.each($.fn.ac.configresponseHandlers, function(key, handler) {
			if (key in data) {
				if ($.isPlainObject(data[key]) || $.isArray(data[key])) {
					$.each(data[key], handler);
				} else {
					handler.call(data[key], data[key]);
				}
			}
		});
	}
	
	/**
	 * @private
	 * @function
	 * @summary Wrapper for <code>$.ajax</code> with response processing and ajax event handlers included
	 * @param {Object} opts - jQuery Ajax settings object (plugin defaults will be added automatically)
	 * @returns {Object} jqXHR
	 */
	function ajaxWrapper(opts) {
		return $.ajax($.extend(true, {}, $.fn.ac.configajaxDefaults, opts)).done(processResponse).done($.fn.ac.configdoneHandler).error($.fn.ac.configerrorHandler).always($.fn.ac.configalwaysHandler);
	}
	
	/**
	 * @private
	 * @function
	 * @summary Wrapper for <code>swal</code> that can default to built-in alerts if <code>swal</code> is not available
	 * @param {Object} alertOpts - Sweet Alert settings object
	 * @param {Object} ajaxOpts - jQuery Ajax settings object
	 */
	function alertWrapper(alertOpts, ajaxOpts) {
		var handler = function(input) {
			if (input === false || input === null) {
				return false;
			}
			if (!$.fn.ac.configalertAllowEmpty && input === '') {
				return false;
			}
			if (typeof input === 'string') {
				objectParam(ajaxOpts, 'data')[$.fn.ac.configalertInputDataKey] = input;
			}
			ajaxWrapper(ajaxOpts);
		};
		alertOpts = $.extend(true, {}, $.fn.ac.configalertDefaults, alertOpts);
		if (typeof $.fn.ac.configswal === 'function') {
			$.fn.ac.configswal(alertOpts, handler);
		} else if ('type' in alertOpts && alertOpts.type === 'input') {
			handler(prompt(alertOpts.title + (alertOpts.text ? '\n' + alertOpts.text : ''), ('inputValue' in alertOpts ? alertOpts.inputValue : '')));
		} else if ('showCancelButton' in alertOpts && alertOpts.showCancelButton) {
			handler(confirm(alertOpts.title + (alertOpts.text ? '\n' + alertOpts.text : '')));
		} else {
			alert(alertOpts.title + (alertOpts.text ? '\n' + alertOpts.text : ''));
			handler();
		}
	}
	
	/**
	 * @private
	 * @function
	 * @summary Used to reference a key in an object, assigning a default value to the key if the it was not found in the object
	 * @param {Object} obj - Object to which to add the key
	 * @param {string} key - Key to add to the object
	 * @param def - Default value to assign the the created key
	 * @returns The value assigned to the given key in the given object
	 */
	function objectParam(obj, key, def) {
		if (def === undefined) {
			def = {};
		}
		if (!(key in obj)) {
			obj[key] = def;
		}
		return obj[key];
	}
	
	/**
	 * @private
	 * @function
	 * @summary Inserts a value into an object, safely extending any sub-objects or arrays
	 * @param {Object} obj - The object into which to insert the value
	 * @param {string} key - The key to use to insert the value into the object
	 * @param value - The value to insert into the object
	 */
	function objectInsert(obj, key, value) {
		if ($.isPlainObject(value) && key in obj && $.isPlainObject(obj[key])) {
			$.extend(true, obj[key], value);
		} else if ($.isArray(value) && key in obj && $.isArray(obj[key])) {
			obj.push.apply(obj[key], value);
		} else {
			obj[key] = value;
		}
	}
	
	/* Get data attributes from an element that match the given regular expression */
	/**
	 * @private
	 * @function
	 * @summary Build an object from matched data attributes from a given page element
	 * @param element - A jQuery result set containing a single page element from which to get data attirubtes
	 * @param {RegExp} regex - A regular expression to use to filter data attributes
	 * @returns {Object} Constructed data object
	 */
	function getMarkupData(element, regex) {
		var data = {};
		$.each($(element).data(), function(attr, value) {
			var match = attr.match(regex);
			var key;
			var node;
			if (match) {
				match = match.filter(function(m) {
					return m;
				});
				if (match.length > 1) {
					node = data;
					for (var i = 1; i < match.length; i++) {
						if (match[i]) {
							key = match[i].charAt(0).toLowerCase() + match[i].slice(1);
							if (i < match.length - 1) {
								node = objectParam(node, key);
							} else {
								objectInsert(node, key, value);
							}
						}
					}
				} else if ($.isPlainObject(value)) {
					$.extend(true, data, value);
				}
			}
		});
		return data;
	}
	
	/**
	 * @private
	 * @function
	 * @summary Adds form data from a page element to a given object
	 * @param {Object} data - The data object to which the form data will be added
	 * @param element - A jQuery result set containing a single page element from which to pull form data
	 */
	function extendWithFormData(data, element) {
		if ($(element).prop('tagName') === 'FORM') {
			data.ajax.url = $(element).attr('action') || data.ajax.url;
			data.ajax.method = $(element).attr('method') || data.ajax.method;
			$.extend(true, objectParam(data.ajax, 'data'), $(element).serializeObject());
		}
	}
	
	/**
	 * @private
	 * @function
	 * @summary Adds data to the given object from the given element
	 * @param {Object} data - The data object to which the form data will be added
	 * @param element - A jQuery result set containing a single page element from which to pull data
	 */
	function extendWithData(data, element) {
		$.extend(true, objectParam(data, alertKey), getMarkupData(element, $.fn.ac.configalertAttrRegex));
		$.extend(true, objectParam(data, ajaxKey), getMarkupData(element, $.fn.ac.configajaxAttrRegex));
		extendWithFormData(data, element);
	}
	
	/**
	 * @private
	 * @function
	 * @summary Event handler to bind to initialized components
	 * @param {Object} event - The event object
	 * @returns {boolean} The event return
	 */
	function componentEventHandler(event) {
		//IMPORTANT: deep copy the event data before meddling with it
		var data = $.extend(true, {}, event.data);
		var element = this;
		if (event.target !== event.delegateTarget) {
			extendWithData(data, event.delegateTarget);
		}
		extendWithData(data, event.target);
		if (alertKey in data && data[alertKey] && !$.isEmptyObject(data[alertKey])) {
			alertWrapper(data[alertKey], data[ajaxKey]);
		} else {
			ajaxWrapper(data[ajaxKey]);
		}
		if ($.fn.ac.configstopPropagation) {
			event.stopPropagation();
		}
		if ($.fn.ac.configpreventDefault) {
			event.preventDefault();
		}
		return $.fn.ac.configeventReturn;
	}
	
	/**
	 * @private
	 * @function
	 * @summary Component initializer
	 * @param {string} event - The name of an event to which to bind the event handler.
	 * @param {string} [selector] - Selector used as a filter for delegated events.
	 * @param {Object} [ajax] - Ajax settings to use.
	 * @see http://api.jquery.com/jquery.ajax/
	 * @param {Object} [alert] - Alert settings to use.
	 * @see http://t4t5.github.io/sweetalert/
	 * @return this
	 */
	function initializeComponent(event, selector, ajax, alert) {
		var opts = {};
		opts[ajaxKey] = ajax;
		opts[alertKey] = alert;
		$(this).on(event + $.fn.ac.configeventSuffix, selector, opts, componentEventHandler);
		return this;
	}
	
})(jQuery);
