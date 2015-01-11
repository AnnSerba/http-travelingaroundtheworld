$(window).bind('hashchange', function() { 
   start(window.location.hash.substr(1,window.location.hash.length-1));
}); 

function start(content){
   	xhttp=new XMLHttpRequest();
   	xhttp.open('GET','DataBase.json',true);
   	xhttp.send();
   	
   	xhttp.onreadystatechange=function(){
      	if (xhttp.readyState==4){
        	//Принятое содержимое json файла должно быть вначале обработано функцией eval 
         	var json=eval( '('+xhttp.responseText+')' );
         	//Далее мы можем спокойно использовать данные
        	for (var i = json.DataBase.length - 1; i >= 0; i--) {
        		if(json.DataBase[i].title==content){

        			document.getElementById('titleElement').innerHTML=
        				'<h1>'+json.DataBase[i].title+'</h1>';
        			document.getElementById('contentShowElement').innerHTML=
        				'<h3>'+json.DataBase[i].text+'</h3>';
				}
        	};
   		}
	}
}