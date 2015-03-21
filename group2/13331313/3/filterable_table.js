/*
Ҷ�㿭
13331313
*/

function appendInputArea(table) {

}

function getALLTables() {
	return document.getElementsByTagName("table");
}

function makeTableFilterable(table) {
    var search = document.createElement("input");
    var parent = table.parentNode;
    parent.insertBefore(search, table);
    search.addEventListener('input', function() {tableFilter(table, this);});           //��������¼�
}

function tableFilter(table, that) {
   var rows = table.getElementsByTagName('tr');
   for (var i = 1; i < rows.length; i++) {
        rows[i].style.display="table-row";          //�ָ�ԭ�ȱ����ص���
        var founddSubstring = false;                //���Ա���Ƿ��ҵ��Ӵ�
        if (that.value == "") {                     //������Ϊ��ʱ���ָ�������������ʾ
            for (var j = 0; j < rows[i].cells.length; j++) {
                var v1 = new RegExp("<span>", "g");
                var v2 = new RegExp("</span>", "g");
                rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace(v1, "");    //�رո���
                rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace(v2, ""); 
            }
        } else {
            for (var j = 0; j < rows[i].cells.length; j++) {
                rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace("<span>", "");
                rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace("</span>", ""); 
                if (rows[i].cells[j].innerHTML.search(that.value) != -1) {        //�ҵ�ƥ���Ӵ�
                    var v = new RegExp(that.value, "g");       //һ��
                    rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace(v, "<span>"+that.value+"</span>");      //Ϊ��Ӧ�Ӵ����ϡ�span���������Ч��
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
