require.js
==========

this script adds the require functionn to the global scope to require libraries once

Dependencies
------------

jquery (needs to be loaded manually before require.js)


Usage
-----

require(string, OPTIONAL callback, OPTIONAL context)


Behavior
--------

* the string provided will be fetched via $.ajax and afterwards the callback is called within the specified context
* if the file is already loaded, the callbacks will be called immediately
* if the file is already loading, the callbacks will be called, when the file arrived 
* if the request failes for some reason, an error message is thrown via console.error and the callback won't be called!
* if the script contains errors, you will be informed with console.error about error and filename, not about the line as I don't know how to fetch the line number from that error object :)


License
-------
require.js is released under the MIT license

Author
------
Bastian Kruck (ich@bkruck.de)

feel free to contribute.
