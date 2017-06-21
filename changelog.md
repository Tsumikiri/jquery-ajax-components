# 1.0.0
- Initial version
# 1.1.0
- Changed when data-\* attributes are read when using non-delegated events to be consistent with the documentation
- Removed $.fn.ac.dataAttrRegex
- Changed how data-\* attributes are read so that each regex group is one level of the object structure
- Changed $.fn.ac.ajaxAttrRegex to properly include the sub-objects of the ajax options object
- Added functionality for using built-in JavaScript alerts when Sweet Alert is not available
- Added $.fn.ac.swal to point to the Sweet Alert function
- Added $.fn.ac.alertAllowEmpty to set whether or not to allow empty values for input alerts
# 1.1.1
- Greatly improved documentation (now can be generated via JSDoc)
- Added several tutorials
# 1.1.2
- Bug fixes
# 1.2.1
- Added a promise-like interface for setting up callbacks
# 1.2.2
- Added the jQuery.ac function (not to be confused with jQuery#ac)
- Updated the documentation significantly
    + Now includes documentation for the PseudoDeferred class
    + Namespaces are now more correct
    + Updated several tutorials