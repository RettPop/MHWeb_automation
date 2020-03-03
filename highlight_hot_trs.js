// ==UserScript==
// @name         Highligt hot TRs
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  highlight MHWeb hot TRs
// @author       Rett Pop
// @match        https://mhweb.ericsson.se/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function handleDoc(doc)
    {
        var tables = doc.getElementsByTagName("table");
        for (var idx = 0; idx < tables.length; idx++)
        {
            const table = tables[idx];
            for (let hdrIdx = 0; hdrIdx < tables.length; hdrIdx ++)
            {
                var hotTrCol = -1;
                const table = tables[hdrIdx];
                // running through table headers
                if(null == table.tHead) {
                    // console.log("No header in table " + table);
                    // the table has no headers. skip
                    continue;
                }
    
                // checking the first header's row for having "Hot TR" cell
                const hdrRow = table.tHead.rows[table.tHead.rows.length-1];
                var hotTrHdrCell = null;
                for (let hdrRowIdx = 0; hdrRowIdx < hdrRow.cells.length; hdrRowIdx++) {
                    hotTrHdrCell = hdrRow.cells[hdrRowIdx];
                    if(hotTrHdrCell.innerText.startsWith("Hot TR"))
                    {
                        // console.log("Found HOT TR column on position " + hdrRowIdx);
                        hotTrCol = hdrRowIdx;
                        break;
                    }
                }
    
                // did not find a Hot TR column
                if(hotTrCol < 0) {
                    // console.log("Did not find HOT TR column");
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
    }

    handleDoc(document);

    var framez = document.getElementsByTagName("iframe");
    for (var idx = 0; idx < framez.length; idx++)
    {
        handleDoc(framez[idx].contentWindow.document);
    }
})();
