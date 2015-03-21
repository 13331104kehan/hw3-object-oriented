window.onload = function() {
    var tables = getAllTables();
    //makeAllTablesSortable(tables);
    makeAllTablesFilterable(tables);
}



function getAllTables() {
    return document.getElementsByTagName("table");
}
/*
var isAscend = true;
function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var ths = tables[i].getElementsByTagName("th");
        for (var j = 0; j < ths.length; j++) {
            ths[j].addEventListener("click", tableSort, false);
        }
    }
}

function tableSort() {
    var tmpForRows = [];
    var trColIndex = this.cellIndex;
    var tmpRows = [];
    //此为获得table下除了thead以外的所有行
    var trRows = this.parentNode.parentNode.parentNode.getElementsByTagName("tr");
    var thsSibiling = this.parentNode.getElementsByTagName("th");

    for (var i = 1; i < trRows.length; i++) {
        tmpRows[i-1] = trRows[i];
    }

    for (var i = 0; i < tmpRows.length; i++) {  //将表格每一行的内容存入一个二维数组
        tmpForRows[i] = [];
        for (var j = 0; j < tmpRows[i].cells.length; j++) { // 每一行有多少列
            tmpForRows[i][j] = tmpRows[i].cells[j].innerHTML;
        }
    }

    tmpForRows.sort(function (a, b) {
        if (isNaN(a[trColIndex])) return a[trColIndex] > b[trColIndex];
        else return parseInt(a[trColIndex]) > parseInt(b[trColIndex]);
    })

    for (var i = 0; i < thsSibiling.length; i++) {
        if (thsSibiling[i].classList.contains('ascend')) thsSibiling[i].classList.remove('ascend');
        if (thsSibiling[i].classList.contains('descend')) thsSibiling[i].classList.remove('descend');

    }
    if (isAscend) {
        isAscend = false;
        this.classList.add('ascend');
    } else {
        isAscend = true;
        this.classList.add('descend');
        tmpForRows.reverse();
    }

    for (var i = 0; i < tmpRows.length; i++) {
        tmpRows[i].innerHTML = "<td>" + tmpForRows[i].join("</td><td>") + "</td>";
    }
}
*/

function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var inputs = document.createElement("input");
        inputs.placeholder = "请输入搜索字段";
        tables[i].appendChild(inputs);
        inputs.addEventListener("change", filterable);
    }
}

function filterable() {
    var tmp_table = this.parentNode;
    var trRows = tmp_table.getElementsByTagName("tr");
    for (var i = 1; i < trRows.length; i++) {
        var is_found = false;
        for (var j = 0; j < trRows[i].cells.length; j++) {
            var input = this.value;
            var td_content = ensureNoDOM(trRows[i].cells[j].innerHTML);
            var pos = td_content.toLowerCase().indexOf(input.toLowerCase());

            if (pos != -1) {
                is_found = true;
                var start_content = "";
                var strong_content = "";
                var rest_content = "";

                for (var k = 0; k < pos; k++) {
                    start_content += td_content.charAt(k);
                }

                for (var k = pos; k < pos + input.length; k++) {
                    strong_content += td_content.charAt(k);
                }

                for (var k = pos + input.length; k < td_content.length; k++) {
                    rest_content += td_content.charAt(k);
                }

                trRows[i].cells[j].innerHTML = start_content + "<b>" + strong_content + "</b>" + rest_content;
            }
        }
        if (trRows[i].classList.contains('hidden')) trRows[i].classList.remove('hidden');
        if (is_found == false) trRows[i].classList.add('hidden');
    }
}

//不用此函数，在标签内，会将<b>当做字符去处理了，可搜寻
function ensureNoDOM(content) {
    var newcontent = "";
    for (var i = 0; i < content.length; i++) {
        if (content.charAt(i) == '<') {
            while (content.charAt(i) != '>') i++;
        } else {
            newcontent += content.charAt(i);
        }
    }
    return newcontent;
}
