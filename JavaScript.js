var i=0;
var page=1;
function returnpage(){
	document.getElementById('numberpage').innerHTML="---"+page+"---";
}
$(document).ready(function() {
   	$("#imgMenu1,#imgMenu2,#imgMenu3").button();
});

$(document).ready(function() {
   	$("#st,#b1,#b2").button();
});
function theRotator() {
	// Устанавливаем прозрачность всех картинок в 0
	$('#rotator #list').css({opacity: 0.0});
 
	// Берем первую картинку и показываем ее (по пути включаем полную видимость)
	$('#rotator #list:first').css({opacity: 1.0});
 
	// Вызываем функцию rotate для запуска слайдшоу, 5000 = смена картинок происходит раз в 5 секунд
	setInterval('rotate()',5000);
}

function rotate() {	
	// Берем первую картинку
	var current = ($('#rotator #list.show')?  $('#rotator #list.show') : $('#rotator #list:first'));
 
	// Берем следующую картинку, когда дойдем до последней начинаем с начала
	var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('#rotator #list:first') :current.next()) : $('#rotator #list:first'));	
 
	// Расскомментируйте, чтобы показвать картинки в случайном порядке
	//var sibs = current.siblings();
	//var rndNum = Math.floor(Math.random() * sibs.length );
	//var next = $( sibs[ rndNum ] );
 
	// Подключаем эффект растворения/затухания для показа картинок, css-класс show имеет больший z-index
	next.css({opacity: 0.0}).addClass('show').animate({opacity: 1.0}, 1000);
 
	// Прячем текущую картинку
	current.animate({opacity: 0.0}, 1000).removeClass('show');
};

$(document).ready(function() {		
	// Запускаем слайдшоу
	theRotator();
});
function genereIelement(str){
	start(i+str-1,'img1','txt1');
	start(i+str,'img2','txt2');
	start(i+str+1,'img3','txt3');
	start(i+str+2,'img4','txt4');
	start(i+str+3,'img5','txt5');
	start(i+str+4,'img6','txt6');
	start(i+str+5,'img7','txt7');
	start(i+str+6,'img8','txt8');
}	
function start(i, namespan1,namespan2){
   	xhttp=new XMLHttpRequest();
   	xhttp.open('GET','DataBase.json',true);
   	xhttp.send();
   	//alert("Из шляпы достали "+i+" кролика!");
   	xhttp.onreadystatechange=function(){
      	if (xhttp.readyState==4){
        	//Принятое содержимое json файла должно быть вначале обработано функцией eval 
         	var json=eval( '('+xhttp.responseText+')' );
         	//Далее мы можем спокойно использовать данные
         	//if ((i>=0) && (i<=13)){
            	document.getElementById(namespan1).innerHTML='<img src="'+json.DataBase[i].image
            	+'" width=300 height=200 class="ui-widget ui-corner-all"/>';
         		document.getElementById(namespan2).innerHTML=json.DataBase[i].title;
         	//}
      	}
   	}
   	
}