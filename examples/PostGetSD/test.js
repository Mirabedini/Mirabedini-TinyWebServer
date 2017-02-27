var hdr=[];
var dataPoints=[];
function changeParam()
{
	var selectParam = document.getElementById("myParam");
	var index=parseInt(selectParam.options[selectParam.selectedIndex].value);
	var chart1 = new CanvasJS.Chart("chartContainer", {
	zoomEnabled: true,
	title: {text: "Mirabedini's Room"},
	data: [{type: "line", dataPoints: dataPoints[index],showInLegend: true,legendText: hdr[index]}]
	 });
	chart1.render();
}
function changeFunc()
{
	hdr=[];
	dataPoints=[];
	var selectParam = document.getElementById("myParam");
	var selectBox = document.getElementById("myList");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
	var textarea = document.getElementById("myText");
	$.get(selectedValue, function(data) 
	{
		textarea.value=data;
		var csvLines=points=[];
		csvLines = data.split(/[\r?\n|\r|\n]+/);
		points = csvLines[0].split(",");
		selectParam.options.length=0;
		for (var i = 1; i < points.length; i++){
			dataPoints.push([]);
			hdr.push(points[i]);
			selectParam.options[selectParam.options.length] = new Option(points[i],i-1);
		}
		for (var i = 1; i < csvLines.length; i++){
			points = csvLines[i].split(",");
			for(var j = 1; j<points.length; j++){
				if (csvLines[i].length > 0) {
					dataPoints[j-1].push({
						x: parseInt(points[0]),
						y: parseFloat(points[j])
					});
				}
			}

		}		
	});
}
function pageLoad()
{
	//var listFile="list.txt?time=" + new Date().getTime();
	$.get("list.txt", function(data) 
	{
		var selectParam = document.getElementById("myParam");
		selectParam.options.length=0;
		var selectBox = document.getElementById("myList");
		selectBox.options.length=0;
		var tLines = data.split(/[\r?\n|\r|\n]+/);
		for (var i = 0; i < tLines.length; i++) {
			if(tLines[i].length>0){
				selectBox.options[selectBox.options.length] = new Option(tLines[i],tLines[i].toLowerCase());
			}
		}
	});
}
window.onload = pageLoad;