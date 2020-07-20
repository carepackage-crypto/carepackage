//$(document).ready(() => {
//    let play_bt = document.getElementById("playbutton");
//    play_bt.addEventListener("click", ()=>{
//        const audioObj = new Audio("assets/pigeon.mp3");
//        play_bt.style.display="none";
//        audioObj.addEventListener("canplaythrough", event => {
//            /* the audio is now playable; play it if permissions allow */
//            audioObj.play();
//        });
//        pigeonsAppear(1);
//    })
//});

function start(){
    //const play_bt = document.getElementById("playbutton");
    //play_bt.addEventListener("click", ()=>{
    
    unfade("textgroup1", 50);
    
    
    const PAUSEBEFORESTAMPS=3000;
    const PAUSE=1500;
    const PAUSEBEFOREPIGEONS=2000;
    setTimeout(function(){
        document.getElementById("stamp_3hp").style.display="block";
        setTimeout(function(){
            document.getElementById("stamp_ws").style.display="block";
            setTimeout(function(){
                document.getElementById("august").style.display="block";
                setTimeout(function(){
                    const audioObj = new Audio("assets/pigeon.mp3");
                        //play_bt.style.display="none";
                    audioObj.addEventListener("canplaythrough", event => {
                            /* the audio is now playable; play it if permissions allow */
                            audioObj.play();
                    });
                    pigeonsAppear(1);
                    setTimeout(function(){
                        document.getElementById("text_cp").remove();
                        document.getElementById("text_click").style.display="block";
                    }, 7000);
                }, PAUSEBEFOREPIGEONS);
            }, PAUSE);
        }, PAUSE);
    }, PAUSEBEFORESTAMPS);
    //})
}

function hide_class(class_name) {
  var list_class_elem = document.getElementsByClassName(class_name);
    var i;
    for (i=0; i<list_class_elem.length; i++){
        list_class_elem[i].style.display = "none";  
    }
}

var PIGEONS_CLICKABLE = false;
var PIGEONS_GONE = 0;
var audioPigeonMap = new Map();

function pigeonsAppear(i){
    if (i<6){
        setTimeout(function(){
            var element = document.getElementById('pigeon'+i.toString());
            element.style.display = 'block';
            pigeonsAppear(i+1);
        }, 650);    
    }else{
       //finally, this happens
        audioPigeonMap.set('pigeon1', "assets/whoosh.mp3");
        audioPigeonMap.set('pigeon2', "assets/sparkle.mp3");
        audioPigeonMap.set('pigeon3', "assets/spell.mp3");
        audioPigeonMap.set('pigeon4', "assets/wink.mp3");
        audioPigeonMap.set('pigeon5', "assets/bubble.mp3");

        const box =document.getElementById("box");
        box.style.display='block';

        PIGEONS_CLICKABLE = true; 
    }   
}
function pigeonDisappear(pigeon_name){
    if(PIGEONS_CLICKABLE) {
        const audiostring = audioPigeonMap.get(pigeon_name);
        const audioObj = new Audio(audiostring);
        var elem=document.getElementById(pigeon_name);
        audioObj.addEventListener("canplaythrough", event => {
                audioObj.play();
        });
        elem.remove();
        PIGEONS_GONE += 1;
    }if (PIGEONS_GONE == 5){
        // wait 5 seconds.
        const box = document.getElementById("box");
        box.style.zIndex="10";
        const PAUSELEN=2000;
        const BOXANIMATELEN=10;
        const BLACKNESSLEN=2.5;
        
        setTimeout(function(){
            box.style.animation = "boxAnimate "+BOXANIMATELEN+"s";
        }, PAUSELEN);
        
         setTimeout(function(){
            document.getElementById("blackscene").style.display="block";
            box.style.display="none";
                
            setTimeout(function(){
                document.getElementById("blackscene").remove();
                document.getElementById("virtualscene").style.display="block";
            }, BLACKNESSLEN*1000);
        }, BOXANIMATELEN*1000);
    }
}


var descriptMap = new Map();
const xMap = new Map();
var EXPAND = true;

function clickicon(name){
   if (EXPAND){
       const audioObj = new Audio('assets/wink.mp3');
       audioObj.addEventListener("canplaythrough", event => {
                audioObj.play();
        });
       EXPAND=false;
    
       //fadeicons, stop wiggle animation
        const iconslist = document.getElementsByClassName("icons");
        const this_icon = document.getElementById("icons_"+name);
        const this_x = document.getElementById("x_"+name);
        const this_title = document.getElementById("title_"+name);
        const this_pic_div = document.getElementById("pic_"+name)
        const this_pics = this_pic_div.children;
       
        
        for (i=0; i<iconslist.length; i++){
            var element = iconslist[i];
            element.style.opacity = 0.1;      
            element.style.animation='none 3s infinite';
        }
        this_icon.style.display='none'; 
        this_icon.style.zIndex= '8';
        this_x.style.display='block';
        this_title.style.display='block';
        this_pic_div.style.display='block';
        

       for (i=0; i<this_pics.length; i++){
            var element = this_pics[i];
            element.style.display='block';
        }
    
        //replace text in box
        document.getElementById("text").innerHTML = descriptMap.get(name);
   }     
}
function restore(){
    if (!EXPAND){
        EXPAND=true;
         //unfadeicons, start wiggle animation
        const iconslist = document.getElementsByClassName("icons");   
        for (i=0; i<iconslist.length; i++){
            var element = iconslist[i];
            element.style.opacity = 1.0;
            element.style.zIndex='10';
            element.style.display='block';
            element.style.animation='wiggle 1.3s infinite';
        }
        const xlist = document.getElementsByClassName("X");
        for (i=0; i<xlist.length; i++){
            var element = xlist[i];
            element.style.zIndex='9';
            element.style.display='none';
        }
        const titlelist = document.getElementsByClassName("title");
        for (i=0; i<titlelist.length; i++){
            var element = titlelist[i];
            element.style.display='none';
        }
        
        const picslist = document.getElementsByClassName("expandpics");
        for (i=0; i<picslist.length; i++){
            var element = picslist[i];
            element.style.display='none';
        }

        //replace text in box (with default)
        document.getElementById("text").innerHTML = descriptMap.get('main');

        //disappear title and images   
    }
          
}

function unfade(class_name, fadelen) {
    var list_class_elem = document.getElementsByClassName(class_name);
    
    var op = 0.1;  // initial opacity
    
    var timer = setInterval(function () {
    if (op >= 1){
        clearInterval(timer);
    }
    var i;
    for (i=0; i<list_class_elem.length; i++){
        var element = list_class_elem[i];
        element.style.display = 'block';
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }
    }, fadelen); 
}
function passWord(){ 
    var PASSWORD_STRING = "cp";
    var testV = 1; 
    var pass1 = prompt('Please enter your password',' '); 
    while (testV < 3) { 
        if (!pass1)  history.go(-1); 
        if (pass1.toLowerCase() == PASSWORD_STRING) { 
            //alert('Password correct !'); 
            document.getElementById("passwordform").remove();
            start();
            break; 
        }  
        testV+=1; 
        var pass1 =  prompt('Wrong Password!','Password'); } 
        if (pass1.toLowerCase()!=PASSWORD_STRING & testV ==3)  history.go(-1); return " "; 
}


descriptMap.set("main", 'FROM WS and 3HP. <br><br>Message about what the site is, when it will be taken down, and not sharing downloads.<br><br>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.');
descriptMap.set("mmarz", 'mmarz is a Los Angeles-based music collective founded by Max Salty, Mikayla (Ruling Planet), Ariella (Saffron), Radha and Zach. Along with guest DJs from around the globe, mmarz releases a new mixtape each and every Thursday, highlighting music from all corners of the soundscape, from disco to downtempo to dancehall.<br><br>Summer Dream is an exclusive mix for 3 Hole Press and Wendy’s Subway, featuring tracks selected by all five of mmarz’s founders. Put this one on for an hour of unhurried, contemplative tunes for a hazy summer afternoon. If you enjoy the diversity of sounds here, check out their website at mmarzmix.com for a whole library of mixes for every mood.<br><br><div id="downloadlink">Download</div>');
descriptMap.set("cfba", '<div id="downloadlink">Download</div>');
descriptMap.set("ws", '<div id="downloadlink">Download</div>');
descriptMap.set("3hp", '<div id="downloadlink">Download</div>');
descriptMap.set("randwich", '<div id="downloadlink">Download</div>');
descriptMap.set("secret", 'This tropical oasis offers a variety of juices,teas and vegan cuisine🌿Secret Garden is essentially a therapeutic destination🌿347 Lewis Ave Brooklyn Ny <br> <br> <div id="downloadlink">Download</div>');
descriptMap.set("coconspirator", '<div id="downloadlink">Download</div>');