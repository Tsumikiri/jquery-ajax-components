# jQuery Ajax Components
jQuery plugin for binding event handlers to page elements to fetch dynamic a page content via ajax. Check out the [documentation](https://cdn.rawgit.com/tsumikiri/jquery-ajax-components/master/index.html) (generated with [JSDoc](http://usejsdoc.org/)).

## What it Does
This plugin initializes ajax components that make ajax requests when specified events are triggered. The work of making the ajax request and processing the returned server response is handled by the plugin. The plugin also supports delegated events and data attributes.

## What it Doesn't Do
You must create your own server-side implementation for delivering compatible JSON responses. Usually this involves a server-side scripting language like PHP or Python, some database queries, etc.

## Requirements
This plugin requries [jQuery](https://jquery.com/download/), [serializeObject](https://github.com/hongymagic/jQuery.serializeObject). The plugin will make use of [SweetAlert](http://t4t5.github.io/sweetalert/) if it is available (recommended).
