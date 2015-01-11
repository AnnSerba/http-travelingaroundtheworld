
function theRotator() {
	// Устанавливаем прозрачность всех картинок в 0
	$('#rotator #list').css({opacity: 0.0});
 
	// Берем первую картинку и показываем ее (по пути включаем полную видимость)
	$('#rotator #list:first').css({opacity: 1.0});
 
	// Вызываем функцию rotate для запуска слайдшоу, 5000 = смена картинок происходит раз в 5 секунд
	setInterval('rotate()',5000);
};

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

$(document).ready(
  function() {		
	// Запускаем слайдшоу
	  theRotator();
    $("#imgMenu1,#imgMenu2,#imgMenu3").button();
    $("#st,#b1,#b2").button();
  
    
    $('#ddmenu li').hover(
      function () {
        clearTimeout(
          $.data(this,'timer'));
          $('ul',this).stop(true,true).slideDown(200);
      }, 
      function () {
        $.data(this,'timer', setTimeout(
          $.proxy(
            function() {
              $('ul',this).stop(true,true).slideUp(200);
            }, this), 100));
      }
  );

});

var pageCount=1;
var page;
var tag;
function checkNextPage(){
  page=returnPage();
  tag=returnTag();
	if(page<pageCount)
	{
		page++;
    window.location.hash='#'+tag+'#'+page; 
    start(page,tag);
	}else{
		alert("Далее страниц нет");
	};
};
function checkBackPage(){
  page=returnPage();
  tag=returnTag();
	if(page>1)
	{
		page--;
    window.location.hash='#'+tag+'#'+page;
    start(page,tag);
	}else{
		alert("Ранее страниц нет");
	};
};
$(window).bind('hashchange', function() { 
   page=returnPage();
   tag=returnTag();
   start(page,tag); 
}); 
function returnTag(){
  var tag="";
  for (var i =1; i < window.location.hash.length; i++) {
    if(window.location.hash[i]!='#'){
      tag+=window.location.hash[i];
    }else{
        return tag;
    }
  };
}
function returnPage(){
  for (var i =1; i < window.location.hash.length; i++) {
    if(window.location.hash[i]=='#'){
      return new Number(window.location.hash.substr(i+1,window.location.hash.length-1));
    }
  };
}
function setTagPage(){
  if(window.location.hash==""){
    window.location.hash="#all#1";
  };
}
function setPageTag(page,tag){
  var hash="";
  hash=hash.concat("#",tag,"#",page);
  window.location.hash=hash;
  start(page,tag);
}
function start(page,tag){
    for (var i = 8; i >= 1; i--) {
        document.getElementById('element'+i).innerHTML="";
    };
   	xhttp=new XMLHttpRequest();
   	xhttp.open('GET','DataBase.json',true);
   	xhttp.send();
   	
   	xhttp.onreadystatechange=function(){
      	if (xhttp.readyState==4){
        	//Принятое содержимое json файла должно быть вначале обработано функцией eval 
         	var json=eval( '('+xhttp.responseText+')' );
         	//Далее мы можем спокойно использовать данные
         	if(tag=='all'){
            var length=json.DataBase.length;
         		pageCount=Math.ceil(length/8);

         		document.getElementById('numberpage').innerHTML="---"+page+"-я-страница-из-"+pageCount+"---";
            var i = page*8-1;
            if(page==pageCount){
              i-=8-length%8;
            }
         		for (; i>=(page-1)*8 ; i--) {
              document.getElementById('element'+(i%8+1)).innerHTML=
              '<a href="showElement.html#'+json.DataBase[length-1-i].title+'">'+
                '<img src="images/'+json.DataBase[length-1-i].way+'/'+json.DataBase[length-1-i].way+'.jpg" width="200px" "height="auto" class="ui-widget ui-corner-all"/>'+
                '<h4>'+json.DataBase[length-1-i].title+'</h4>'+
              '</a>';
              document.getElementById('element'+(i%8+1)).style.display = "block";
         		};
          }else {
            var arrayTitle=[];
            var arrayWay=[];
            arrayTag=tag.split(':');
            if(arrayTag[0]=="Части cвета"){
              for (var i = 0,j=0; i < json.DataBase.length; i++) {
                if(json.DataBase[i].pathWorld==arrayTag[1]){
                  arrayTitle[j]=json.DataBase[i].title;
                  arrayWay[j]=json.DataBase[i].way;
                  j++;
                }
              };
            }else if(arrayTag[0]=="Страны"){
              for (var i = 0,j=0; i < json.DataBase.length; i++) {
                if(json.DataBase[i].country==arrayTag[1]){
                  arrayTitle[j]=json.DataBase[i].title;
                  arrayWay[j]=json.DataBase[i].way;
                  j++;
                }
              };
            }else if(arrayTag[0]=="Творения человека"){
              for (var i = 0,j=0; i < json.DataBase.length; i++) {
                if(json.DataBase[i].human.indexOf(arrayTag[1])>=0){
                  arrayTitle[j]=json.DataBase[i].title;
                  arrayWay[j]=json.DataBase[i].way;
                  j++;
                }
              };
            }else if(arrayTag[0]=="Природа"){
              for (var i = 0,j=0; i < json.DataBase.length; i++) {
                if(json.DataBase[i].nature.indexOf(arrayTag[1])>=0){
                  arrayTitle[j]=json.DataBase[i].title;
                  arrayWay[j]=json.DataBase[i].way;
                  j++;
                }
              };
            }else if(arrayTag[0]=="Люди"){
              for (var i = 0,j=0; i < json.DataBase.length; i++) {
                if(json.DataBase[i].people.indexOf(arrayTag[1])>=0){
                  arrayTitle[j]=json.DataBase[i].title;
                  arrayWay[j]=json.DataBase[i].way;
                  j++;
                }
              };
            }else if(arrayTag[0]=="Туризм"){
              for (var i = 0,j=0; i < json.DataBase.length; i++) {
                if(json.DataBase[i].tourism.indexOf(arrayTag[1])>=0){
                  arrayTitle[j]=json.DataBase[i].title;
                  arrayWay[j]=json.DataBase[i].way;
                  j++;
                }
              };
            }else{
              alert("Ошибка перехода на страницу #"+arrayTag[0]+":"+arrayTag[1]+"#"+page);
            }
            var length=arrayTitle.length;
            pageCount=Math.ceil(length/8);

            document.getElementById('numberpage').innerHTML="---"+page+"-я-страница-из-"+pageCount+"---";
            if(length>0){
              var i = page*8-1;
              if(page==pageCount){
                i-=8-length%8;
              }
              for (; i>=(page-1)*8 ; i--) {
                document.getElementById('element'+(i%8+1)).innerHTML=
                  '<a href="showElement.html#'+arrayTitle[length-1-i]+'">'+
                    '<img src="images/'+arrayWay[length-1-i]+'/'+arrayWay[length-1-i]+'.jpg" width="200px" "height="auto" class="ui-widget ui-corner-all"/>'+
                    '<h4>'+arrayTitle[length-1-i]+'</h4>'+
                  '</a>';
                document.getElementById('element'+(i%8+1)).style.display = "block";
              };
            }
          }
      	};
   	}
}