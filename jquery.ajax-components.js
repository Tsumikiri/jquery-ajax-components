/**
 * @author Alex Furey
 * @version 1.0.0
 * @requires serializeObject, SweetAlert
 */

(function($) {
	
	
	// PRIVATE VARIABLES
	
	var ajaxKey  = 'ajax';
	var alertKey = 'alert';
	
	
	// PRIVATE FUNCTIONS
	
	/* Process server response */
	function processResponse(data) {
		$.each($.fn.ac.responseHandlers, function(key, handler) {
			if (key in data) {
				if ($.isPlainObject(data[key]) || $.isArray(data[key])) {
					$.each(data[key], handler);
				} else {
					handler.call(data[key], data[key]);
				}
			}
		});
	}
	
	/* jQuery.ajax with server response processing and global ajax event handlers included */
	function customAjax(opts) {
		return $.ajax($.extend(true, {}, $.fn.ac.ajaxDefaults, opts)).done(processResponse).done($.fn.ac.doneHandler).error($.fn.ac.errorHandler).always($.fn.ac.alwaysHandler);
	}
	
	/* Takes an object and a key; if the key is not in the object, assigns an empty object to the key; returns value of the key */
	function objectParam(obj, key) {
		if (!(key in obj)) {
			obj[key] = {};
		}
		return obj[key];
	}
	
	/* Add form data to the ajax options if the element is a form; also pulls form data from data attributes */
	function pullFormData(event, element) {
		objectParam(event.data.ajax, 'data');
		$.extend(true, event.data.ajax.data, getMarkupData(element, $.fn.ac.dataAttrRegex));
		//special-case code for form elements
		if ($(element).prop('tagName') === 'FORM') {
			event.data.ajax.url = $(element).attr('action') || event.data.ajax.url;
			event.data.ajax.method = $(element).attr('method') || event.data.ajax.method;
			$.extend(true, event.data.ajax.data, $(element).serializeObject());
		}
	}
	
	/* Get data attributes from an element */
	function getMarkupData(element, regex) {
		var data = {};
		$.each($(element).data(), function(key, value) {
			var match = key.match(regex);
			if (match) {
				if (match[1] === '') {
					$.extend(true, data, value);
				} else {
					data[match[1].toLowerCase()] = value;
				}
			}
		});
		return data;
	}
	
	/* Event handler for ajax components */
	function componentEventHandler(event) {
		//deep copy the event before meddling with it
		var opts = $.extend(true, {}, event);
		var element = this;
		if (event.target !== event.delegateTarget) {
			objectParam(opts.data, alertKey);
			$.extend(true, opts.data[alertKey], getMarkupData(opts.target, $.fn.ac.alertAttrRegex));
			objectParam(opts.data, ajaxKey);
			$.extend(true, opts.data[ajaxKey], getMarkupData(opts.target, $.fn.ac.ajaxAttrRegex));
			pullFormData(opts, opts.delegateTarget);
		}
		pullFormData(opts, opts.target);
		if (opts.data[alertKey] && !$.isEmptyObject(opts.data[alertKey])) {
			swal($.extend(true, {}, $.fn.ac.alertDefaults, opts.data[alertKey]), function(input) {
				if (input) {
					if (typeof input === 'string') {
						objectParam(opts.data[ajaxKey], 'data')[$.fn.ac.inputAlertKey] = input;
					}
					customAjax.call(element, opts.data[ajaxKey]);
				}
			});
		} else {
			customAjax(opts.data[ajaxKey]);
		}
		if ($.fn.ac.stopPropagation) {
			event.stopPropagation();
		}
		if ($.fn.ac.preventDefault) {
			event.preventDefault();
		}
		return $.fn.ac.eventReturn;
	}
	
	/* Component initializer */
	function initializeComponent(event, selector, ajax, alert) {
		var opts = {};
		opts[ajaxKey] = $.extend(true, {}, getMarkupData(this, $.fn.ac.ajaxAttrRegex), ajax);
		opts[alertKey] = $.extend(true, {}, getMarkupData(this, $.fn.ac.alertAttrRegex), alert);
		$(this).on(event + $.fn.ac.eventSuffix, selector, opts, componentEventHandler);
		return this;
	}
	
	
	// PUBLIC FUNCTIONS
	
	/* jQuery plugin function - currently no methods, just the component initializer */
	$.fn.ac = function(method) {
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
	
	
	// PUBLIC VARIABLES
	
	/* Component ajax handlers */
	$.fn.ac.doneHandler      = null;
	$.fn.ac.errorHandler     = null;
	$.fn.ac.alwaysHandler    = null;
	
	/* Response handlers */
	$.fn.ac.responseHandlers = {
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
	};
	
	/* Data attribute regular expressions
	 * NOTE: jQuery's .data() function will automatically convert "data-some-thing" to "someThing"
	 * WARNING: do not allow these to be left-ambiguous
	 */
	$.fn.ac.dataAttrRegex    = /acData(.*)/i;
	$.fn.ac.ajaxAttrRegex    = /acAjax(.*)/i;
	$.fn.ac.alertAttrRegex   = /acAlert(.*)/i;
	
	/* Other settings */
	$.fn.ac.eventSuffix      = '.ac';
	$.fn.ac.preventDefault   = true;
	$.fn.ac.stopPropagation  = false;
	$.fn.ac.eventReturn      = true;
	$.fn.ac.inputAlertKey    = 'input';
	$.fn.ac.ajaxDefaults     = {
		dataType: 'json'
	};
	$.fn.ac.alertDefaults    = {
		title: 'Are you sure?',
		text: '',
		type: 'warning',
		showCancelButton: true
	};
	
})(jQuery);
