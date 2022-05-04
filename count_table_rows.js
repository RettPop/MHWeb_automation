// ==UserScript==
// @name         TR counter
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Put lines counter on the each window table with header
// @author       Rett Pop
// @match        https://mhweb.ericsson.se/*
// @exclude      https://mhweb.ericsson.se/TREditWeb/faces/oo/object.xhtml*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready((function() {
    //'use strict';

    processDoc(document);
    var framez = document.getElementsByTagName("iframe");
    for (var idx = 0; idx < framez.length; idx++)
    {
        processDoc(framez[idx].contentWindow.document);
    }

    function processDoc(doc)
    {
        var tables = doc.getElementsByTagName("table");
        for (let hdrIdx = 0; hdrIdx < tables.length; hdrIdx ++)
        {
            const table = tables[hdrIdx];
            // running through table headers
            if(null == table.tHead) {
                // the table has no headers. skip
                continue;
            }

            // checking the first header's row for having "Hot TR" cell
            var cellText = table.tHead.rows[table.tHead.rows.length-1].cells[0].innerText;
            table.tHead.rows[table.tHead.rows.length-1].cells[0].innerText = cellText + " (" + table.tBodies[0].rows.length + ")";
            // console.log(cellText);
        }
    }
}));
