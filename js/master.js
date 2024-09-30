//check if there's locale sterage color option
let mainColor = localStorage.getItem('color-option');
if(mainColor!==null){
    document.documentElement.style.setProperty("--main-color", mainColor)
    document.querySelectorAll(".colors-list li").forEach(li =>{
        li.classList.remove("active");
        
        //add class active on element with data-color === locale storage item
        if(li.dataset.color===mainColor){
            li.classList.add('active')
        }
    })
}
//change the color of the page option

//change --main-color 
const colorList = document.querySelectorAll(".colors-list li");
colorList.forEach(li =>{
    li.addEventListener("click", (e)=>{
        //set color on root
        document.documentElement.style.setProperty("--main-color",`${e.target.dataset.color}`);

        handleActive(e);

        localStorage.setItem('color-option' , e.target.dataset.color)
    })
})

//switch the color in heading area(links)
let linkList = document.querySelectorAll(".header-area .links li a");
linkList.forEach(li=>{
    li.addEventListener('click',(e)=>{
    linkList.forEach(link=>{
        link.classList.remove("active")
    })
    li.classList.add("active")
}
)});


//######################################################################
//random background


//variable to stored the choose (yes/no)
let backgroundRandom = true;
//here we will check in the value of background random option in local storage
if(localStorage.getItem("background_option") === "false"){
    backgroundRandom = false;
    document.querySelectorAll(".random-backgrounds span").forEach(e =>{
        e.classList.remove("active");
        document.querySelector(".random-backgrounds .No").classList.add("active")
    })
}else{
    document.querySelector(".random-backgrounds .Yes").classList.add("active")
}
//variable to controle the intervale (use in clearInterval)
let backgroundIntervale;
// call the radomizerImges function active the random background
radomizeImges();
//switch color in random background sitting
let randomBackground = document.querySelectorAll(".random-backgrounds span");
randomBackground.forEach(e=>{
    e.addEventListener('click',()=>{
    randomBackground.forEach(link=>{
        link.classList.remove("active");
    });
    e.classList.add("active");
    if(e.classList.contains("Yes")){
        backgroundRandom = true;
        radomizeImges();
        localStorage.setItem("background_option",true)
    }
    else{
        backgroundRandom = false;
        clearInterval(backgroundIntervale)
        localStorage.setItem("background_option",false) 
    }
})})
// (yes/no) change the show bullet state
let ShowBullet = document.querySelectorAll(".option-box .bullets-option span")
ShowBullet.forEach(e=>{
    e.addEventListener("click" , (el)=>{
        // ShowBullet.forEach(link=>{
        //     link.classList.remove("active");
        // });
        
        // e.classList.add("active");
        handleActive(el);
    })
})

// (yes/no) change the background imge
let landingpage = document.querySelector(".landing-page");
let imgsarray = ["01.jpg","02.jpg","03.jpg"];
landingpage.style.backgroundImage = 'url("imgs/02.jpg")';
//function to randomize imgs
function radomizeImges(){
    if(backgroundRandom===true){
    backgroundIntervale = setInterval(()=>{
    let randomnumber = Math.floor(Math.random() * imgsarray.length);
    landingpage.style.backgroundImage = 'url("imgs/'+ imgsarray[randomnumber]+'")';
},15000)
    }
    else{
        clearInterval(backgroundIntervale)
    }
}


//##############################################################################
//settingbox move
let gearContanier = document.querySelector(".toggle-setting");
let gear =document.querySelector(".fa")
let settingbox = document.querySelector(".setting-box")
gearContanier.addEventListener("click",()=>{
    settingbox.classList.toggle("open");
    gear.classList.toggle("fa-spin")
})


//slect skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function(){
    // skills offset (وهو المسافة بين راس الصفحة و بداية العنصر يلي محددينو)
    let skillsoffSetTop = ourSkills.offsetTop;
    //skills outer height (ارتفاع العنصر بشكل كامل بالصفحة يعني ارتفاعو هو والبوردر و المارجن)
    let skillsOuterHeight = ourSkills.offsetHeight;
    //window height (ارتفاع الصفحة المعروضة في الشاشة)
    let windowHeight = this.innerHeight;
    //window scrollTop(البكسلات يلي وصلنالها نحنا وعم نعمل سكرول)
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop>(skillsoffSetTop + skillsOuterHeight - windowHeight -300)){
        let allskills =document.querySelectorAll(".skill-box .skill-level span");
        allskills.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    }
}

// create popup with the images
let Mycertificates = document.querySelectorAll(".certificate .container .imges-box img");
Mycertificates.forEach(img => {
    
    img.addEventListener('click' , (e)=>{
        //create overlay element
        let overlay = document.createElement("div");
        //add class to overlay
        overlay.className = 'popup-overlay';
        // append overlay to the body
        document.body.appendChild(overlay);
        //create the popup Box
        let popupBox = document.createElement("div");
        //add calss to the popup Box
        popupBox.className = 'popup-box'
        if(img.alt !== null){
            //crate heading
            let imgHeading = document.createElement("h3");
            //create text for heading
            let imgText = document.createTextNode(img.alt);
            //Append the text to the heading
            imgHeading.appendChild(imgText);
            //append the heading to the popup box
            popupBox.appendChild(imgHeading);
        }
        //create the image
        let popupImg = document.createElement("img");
        //set image source
        popupImg.src = img.src;
        //add image to popup box
        popupBox.appendChild(popupImg);
        //append popup box to body
        document.body.appendChild(popupBox);

        //create the close span 
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        //append text to close button 
        closeButton.appendChild(closeButtonText);
        //add class to the close button
        closeButton.className = "close-button";
        //add close button to the popup box
        popupBox.appendChild(closeButton);
    });

});
//close popup 
document.addEventListener('click' , (e)=>{

    if(e.target.className == 'close-button'){
        //remove the current popup
        e.target.parentNode.remove();
        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }

});

function scrollToSection(elements){
    elements.forEach(element =>{
        
        element.addEventListener('click' , (e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
            
        })
        
    });
}
//select All bullets 
const allbullets = document.querySelectorAll(".nav-bullets .bullet");
//select All links
const allLinks = document.querySelectorAll(".header-area .links li");
scrollToSection(allbullets);
scrollToSection(allLinks);

//fuction handle active state
function handleActive(event){
    event.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });

    event.target.classList.add("active");
}
//bullet opotion handle
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsNav = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if(bulletLocalItem !== null){
    bulletsSpan.forEach(span =>{
        
        span.classList.remove("active");
    });

    if(bulletLocalItem === "block"){
        bulletsNav.style.display ="block";
        document.querySelector(".bullets-option .Yes").classList.add("active");
    } else{
        bulletsNav.style.display ="none";
        document.querySelector(".bullets-option .No").classList.add("active");

    }
}

bulletsSpan.forEach(span =>{

    span.addEventListener('click' , (e)=>{

        if(span.dataset.display === "Show"){
            bulletsNav.style.display = "block";
            localStorage.setItem("bullets-option" , "block");
        }
        else{
            bulletsNav.style.display = "none";
            localStorage.setItem("bullets-option" , "none");
        }

    });
});


// reset button
document.querySelector(".reset-options").onclick = function(){
//اذا كان في اشياء مهمة في ال ستوريج نقوم بحذف الاشياء التي نريدها عنصر عنصر
    localStorage.clear();
    window.location.reload();
}


//togge menu
let togglebtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
let settingNav = document.querySelector(".setting-box");
let toggleSetting = document.querySelector(".toggle-setting")
let toggleSettingSpare = document.querySelector(".toggle-setting i");
togglebtn.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open")

}
//close the menu when click in the screen
document.addEventListener('click' , (e)=>{
    if(e.target !== togglebtn && e.target !== tLinks){
        //check if the menu is open
        if(tLinks.classList.contains("open")){
            togglebtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
    let settingBox = document.querySelector(".option-box");
    if(e.target !== settingNav&&e.target !== toggleSetting && e.target!==settingBox){
        if(settingNav.classList.contains("open")){
            settingNav.classList.toggle("open");
            toggleSettingSpare.classList.toggle("fa-spin");
        }
    }
})
toggleSetting.onclick = function (e){
    e.stopPropagation();
}
//stop probagation on menu
tLinks.onclick = function(e){
    e.stopPropagation();
}
