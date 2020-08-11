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

//transition into next (downloads) screen
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
        const BOXANIMATELEN=9.4;
        const BLACKNESSLEN=2.2;
        
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
        const note = document.getElementById("sendnote");
        note.style.display="none";
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
        const note = document.getElementById("sendnote");
        note.style.display="block";
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
    var PASSWORD_STRING = "P!g3on";
    var testV = 1; 
    var pass1 = prompt('Please enter your password',' '); 
    while (testV < 3) { 
        if (!pass1)  history.go(-1); 
        if (pass1 == PASSWORD_STRING) { 
            //alert('Password correct !'); 
            document.getElementById("passwordform").remove();
            start();
            break; 
        }  
        testV+=1; 
        var pass1 =  prompt('Wrong Password!','Password'); } 
        if (pass1.toLowerCase()!=PASSWORD_STRING & testV ==3)  history.go(-1); return " "; 
}




descriptMap.set("main", 'A MESSAGE FROM WS AND 3HP. <br><br>Welcome to our care package! These works and resources will be available for free downloads through the month of August. <br><br> A kind request to our readers: These files are provided in happy cooperation with the individuals and organizations  involved. If you would like to share these works further, please visit our websites where you can support our independent organizations  directly. Thank you for being a part of our community and helping it grow at the pace of enthusiasm. Enjoy!');
descriptMap.set("mmarz", '<a class="sitelink" rel="noopener noreferrer" target="_blank" href="http://mmarzmix.com">mmarz</a> is a Los Angeles-based music collective founded by Max Salty, Mikayla (Ruling Planet), Ariella (Saffron), Radha and Zach. Along with guest DJs from around the globe, mmarz releases a new mixtape each and every Thursday, highlighting music from all corners of the soundscape, from disco to downtempo to dancehall.<br><br>Summer Dream is an exclusive mix for 3 Hole Press and Wendy’s Subway, featuring tracks selected by all five of mmarz’s founders. Put this one on for an hour of unhurried, contemplative tunes for a hazy summer afternoon. If you enjoy the diversity of sounds here, check out their website at mmarzmix.com for a whole library of mixes for every mood.<br><br><a class="downloadlink" rel="noopener noreferrer" target="_blank" href="https://drive.google.com/file/d/1bTpOkT-d0XE0vBFTZ6cpSg1Drbwgz5JD/view?usp=sharing">Download Mix</a><br><br><a class="downloadlink" rel="noopener noreferrer" target="_blank" href="files/summer_dream_tracklist.jpg">Download Tracklist</a>');
descriptMap.set("cfba", 'Located in New York city, the <a class="sitelink" rel="noopener noreferrer" target="_blank" href="http://centerforbookarts.org">Center for Book Arts</a> promotes active explorations of both contemporary and traditional artistic practices related to the book as an art object. The Center seeks to fascinate communication between the book arts community and the larger spheres of contemporary visual and literary arts, while being a model organisation locally, nationally, and internationally within the field. We achieve this through exhibitions, classes, public programming, literary presentations, opportunities for artists and writers, publications, and collections. <br> <br> <i> Poetry is Not a Luxury Exhibition Catalog</i> — Including Audre Lorde\'s full 1977 essay <i>Poetry is Not a Luxury</i>, this catalog archives the namesake exhibition, curated by Maymanah Farhat. Through gathering a collection of artworks by artists that utilize the book arts as a sanctuary to render visible their personal experiences, Farhat amplifies Lorde’s statement. The diverse examples of artists books, zines and broadsides contained within this exhibition are not only artworks—they are, as Farhat describes them, “sites of resistance.” <a class="downloadlink" rel="noopener noreferrer" target="_blank" href="files/Poetry_is_Not_A_Luxury.pdf">Download</a><br><br><i>Posters for Protest, A Workshop with Beth Sheehan </i> — In this workshop, students will learn some quick and dirty printing techniques for creating their own protest posters as well as discussing design tips, materials, and legibility. We will cover the basics of relief printing including carving linocut images and making letter stamps from potatoes, as well as exploring pochoir and stenciling techniques.  <a class="downloadlink" rel="noopener noreferrer" target="_blank" href="https://drive.google.com/file/d/1V2kJLF-_WL7AYIdvuBeiTttta1pfYcuc/view?usp=sharing">Download</a>');
descriptMap.set("ws", '<a class="sitelink" rel="noopener noreferrer" target="_blank" href="http://www.wendyssubway.com/">Wendy\'s Subway</a> is a non-profit reading room, writing space, and independent publisher located in Bushwick, Brooklyn. <br> <br> <i>PEER REVIEW: Reading Rooms & Libraries</i>, by Press Press x Wendy\'s Subway, is the first in a series of discussions which aim to address key questions facing independent, socially-oriented organizations, such as independent libraries, publishers, community spaces, and artistic or cultural initiatives. Through in-person encounters, site visits, and ongoing collaborations, PEER REVIEW aims to build support structures across organizations.  <a class="downloadlink" href="files/Peer_Review.pdf" rel="noopener noreferrer" target="_blank">Download</a>');
descriptMap.set("3hp", '<a class="sitelink" rel="noopener noreferrer" target="_blank" href="http://www.3holepress.org/">3 Hole Press</a> is a home for performance in book form and everyday life. We publish titles and offer programs that expand our understanding of being together. <br> <br> THE IMMEASURABLE WANT OF LIGHT by Daaimah Mubashshir —  The Immeasurable Want of Light is a collection of many short plays drawn from Mubashshir’s two-year personal practice of writing a play a day to capture and express the ever-shifting perspective of living in black skin. Inspired by Chris Ofili’s Afro Muses, each play is distinct in subject, form and tone, presenting a constellation of theatrical portraits.<br> <br> <a class="downloadlink" rel="noopener noreferrer" target="_blank" href="files/Immeasurable_Want_of_Light.pdf">Download</a>');
descriptMap.set("randwich", 'Jenn de la Vega went from picky eater to wide-eyed culinary autodidact who buries herself in archaic cookbooks, gastrophysics papers, and food science lab reports. On her menus, you\'ll find a mash-up of her Filipino-American heritage, Spanish tapas, artisanal cheese, and 90\'s inspired fast-food cuisine. She is known for her <a class="sitelink" rel="noopener noreferrer" target="_blank" href="https://www.randwich.es/">Randwiches</a> or "random sandwiches" in Brooklyn, where clients are given no choice in what they order. Outside of the food industry, Jenn serves on the Board of Directors for The Tank, a nonprofit arts presenter for emerging artists.<br><br>Here is a simple recipe from Jenn — Berry Trifle Jars.<br> <br> <a class="downloadlink" href="files/Berry_Trifle_Jars.pdf" rel="noopener noreferrer" target="_blank">Download</a>');
descriptMap.set("secret", '<a class="sitelink" rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/bk_secretgarden/?hl=en">Secret Garden</a> is a tropical oasis, offering a variety of juices, teas, and vegan cuisine. Secret Garden is essentially a therapeutic destination. Visit them at 347 Lewis Ave, Brooklyn NY. <br> <br> This is an offering from Joy,  the owner and chef of Secret Garden, for a healthy meal plan that each person can use each day to maintain a healthy body, spirit, and mind.<br> <br> <a class="downloadlink" href="files/Secret_Garden.pdf" rel="noopener noreferrer" target="_blank">Download</a>');
descriptMap.set("coconspirator", '<a class="sitelink" rel="noopener noreferrer" target="_blank" href="https://cocopress.womenscenterforcreativework.com/">Co-Conspirator Press</a> is a publishing platform for artists, writers, designers, printers, social justice workers, and editors from historically marginalised communities who use their voice to address intersectional feminist issues and challenge cis-hetero-patriarchy; white-supremacy; and exclusionary, colonial, capitalist, and ableist systems. At the forefront of experimental and exploratory print and graphic design, we are testing ground for new, critical thought, invested in creating democratic print projects including books, pamphlets, and other documents. Through its publications, Co-Co Press invites its audiences to become well-informed, thoughtful collaborators in building a more just and equitable society that celebrates the voices of historically marginalised artists, writers and thinkers.<br><br> <i>The Creative Black Woman\'s Playbook</i> — An interactive guide for Black women of all ages, to not only create the creative life they want, but to monetize every aspect of it. Self published by Co—Conspirator Press with the support of Women\'s Center for Creative Work. <a class="downloadlink" rel="noopener noreferrer" target="_blank" href="files/Creative_Black_Womans_Playbook.pdf">Download</a><br><br> <i>Experiments in Joy</i> — Created by Black women artists, this dynamic workbook can help you shift joy from a feeling to a practice. Engage its prompts, reflections, and resources for personal and creative transformation! Compiled by Gabrielle Civil with contributions by Call & Response Artists Gabrielle Civil, Duriel E. Harris, Kenyatta A. C. Hinkle, Rosamond S. King, Wura-Natasha Ogunji, Miré Regulus and Awilda Rodríguez Lora. Self published by Co—Conspirator Press with the support of Women\'s Center for Creative Work. <a class="downloadlink" rel="noopener noreferrer" target="_blank" href="files/Experiments_in_Joy.pdf">Download</a>');