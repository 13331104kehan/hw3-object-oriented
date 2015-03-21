/*
Ҷ�㿭
13331313
*/

function getALLTables() {
	return document.getElementsByTagName("table");
}

function makeTableFilterable(table) {
    var search = document.createElement("input");       //�ڱ���Ϸ����һ����������input��
    var parent = table.parentNode;
    parent.insertBefore(search, table);
    
    search.addEventListener('input', function() {tableFilter(table, this);});           //����input�����������������Ϣɸѡ
}

//���ڳ�ʼ�����ĺ���
function initialCells(rows) {
    for (var i = 1; i < rows.length; i++) {                              //ȥ��spans
        for (var j = 0; j < rows[i].cells.length; j++) {
            var v1 = new RegExp("<span>", "g");
            var v2 = new RegExp("</span>", "g");
            rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace(v1, "");
            rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace(v2, ""); 
        }
        rows[i].style.display="table-row";          //�ָ�ԭ�ȱ����ص���
    }
}

//�����Ϣɸѡ
function tableFilter(table, that) {
   var rows = table.getElementsByTagName('tr');
   initialCells(rows);                      //�ָ���ʼ״̬
   for (var i = 1; i < rows.length; i++) {
        var founddSubstring = false;                //���Ա���Ƿ��ҵ��Ӵ�
        if (that.value == "") {                     //������Ϊ��ʱ������
        } else {
            for (var j = 0; j < rows[i].cells.length; j++) {
                if (rows[i].cells[j].innerHTML.search(that.value) != -1) {        //�ҵ�ƥ���Ӵ�
                    var v = new RegExp(that.value, "g");
                    rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace(v, "<span>"+that.value+"</span>");      //Ϊ�����Ӵ����ϡ�span���������Ч��
                    founddSubstring = true;             //��Ǹ�����ƥ���Ӵ�
                }
            }
            if (founddSubstring == false) rows[i].style.display="none";         //δ�ҵ�ƥ���ַ�����row��������
        }
   }
}

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		makeTableFilterable(tables[i]);
	}
    return tables;
}

window.onload = function() {
	var tables = getALLTables();
	makeAllTablesFilterable(tables);
}
