// ==UserScript==
// @name         Mark hot TR in view
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make TR form highlited if it is hot
// @author       You
// @match        https://mhweb.ericsson.se/TREditWeb/faces/oo/object.xhtml?eriref=*
// @icon         https://mhweb.ericsson.se/fav.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var element = document.getElementById("frm_fieldHotmark_linkValue");
    var children = element.childNodes;
    children.forEach(function (arrayItem) {
        if(arrayItem.textContent == "Yes")
        {
            document.getElementById("frm_descGeneralLeft").setAttribute("style","background: darkorange;");
            return;
        }
    });
})();
