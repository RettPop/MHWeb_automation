// ==UserScript==
// @name         Highligt hot TRs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mhweb.ericsson.se/mhweb/faces/dashboard/MHWeb.xhtml
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var framez = document.getElementsByTagName("iframe");
    for (var idx = 0; idx < framez.length; idx++)
    {
        var tables = framez[idx].contentWindow.document.getElementsByTagName("table");
        for (let hdrIdx = 0; hdrIdx < tables.length; hdrIdx ++)
        {
            var hotTrCol = -1;
            const table = tables[hdrIdx];
            // running through table headers
            if(null == table.tHead) {
                // the table has no headers. skip
                continue;
            }

            // checking the first header's row for having "Hot TR" cell
            const hdrRow = table.tHead.rows[0];
            var hotTrHdrCell = null;
            for (let hdrRowIdx = 0; hdrRowIdx < hdrRow.cells.length; hdrRowIdx++) {
                hotTrHdrCell = hdrRow.cells[hdrRowIdx];
                if(hotTrHdrCell.innerText.startsWith("Hot TR"))
                {
                    hotTrCol = hdrRowIdx;
                    break;
                }
            }

            // did not find a Hot TR column
            if(hotTrCol < 0) {
                continue;
            }

            const tblBody = table.tBodies[0];
            var hotTRsCnt = 0;
            for (let bodyRowIdx = 0; bodyRowIdx < tblBody.rows.length; bodyRowIdx++)
            {
                var oneBodyRow = tblBody.rows[bodyRowIdx];
                const hotTrCell = oneBodyRow.cells[hotTrCol];
                if(hotTrCell.innerText == "true")
                {
                    oneBodyRow.style.backgroundColor = "red";
                    hotTRsCnt++;
                }
            }

            hotTrHdrCell.innerText = "Hot TR (" + hotTRsCnt + ")";
        }
    }
})();
