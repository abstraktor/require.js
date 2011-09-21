/* this script adds the require functionn to the global scope to require libraries once
*  dependencies: jquery (needs to be loaded manually before require.js)
*  usage: require(string, OPTIONAL callback, OPTIONAL context)
*
*  the string provided will be fetched via $.ajax and afterwards 
*	the callback is called within the specified context
*
*  if the file is already loaded, the callbacks will be called immediately
*  if the file is already loading, the callbacks will be called, when the file arrived 
*  if the request failes for some reason, an error message is thrown via console.error and 
*	the callback won't be called!
*  if the script contains errors, you will be informed with console.error about error and filename,
*	not about the line as I don't know how to fetch the line number from that error object :)
*
*  require.js is released under the MIT license
*
*  Bastian Kruck (ich@bkruck.de)
*/

 (function() {
    this._require = this.require;
    this.urls = {};
    this.register_callback = function(url, callback, context) {
        if (callback) this.urls[url].push([callback, context]);
    },

    this.require = function(url, callback, context) {


        if (typeof(this.urls[url]) == "string") {
            if ("success" == this.urls[url]) {
                if (callback) callback.call(context);
            }
            else {
                //this script is loaded but with errors
                console.error("requireing errored (" + this.urls[url] + ") file " + url)
            }
        }
        else if (this.urls[url]) {
            //this script is loading! hinten anstellen!
            this.register_callback(url, callback, context);
        } else {
            this.urls[url] = [];
            this.register_callback(url, callback, context);

            function callthemback(textStatus) {
                for (var i = 0; i < this.urls[url].length; i++) {
                    this.urls[url][i][0].call(this.urls[url][i][1], textStatus);
                }
                this.urls[url] = textStatus;
            }

            $.ajax({
                url: url,
                dataType: "script",
                success: function(data, textStatus) {
                    callthemback(textStatus);
                },
                error: function(data, state, error) {
                    console.error(state + " (" + error.message + ") appeared while loading " + url);
                }
            });
        }
    }
}).apply(window)