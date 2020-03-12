"use strict"
let picture1 = document.getElementById("picture1");
let picture2 = document.getElementById("picture2");
let picture3 = document.getElementById("picture3");
let pictureShow = document.getElementById("pictureShow");
let count = 0;

setInterval(() => {
    if(count%pictureShow.children.length == 0){
        picture1.style.transform = 'translate3d(-500px, 0px, 0px)';
        picture2.style.transform = 'translate3d(-500px, 0px, 0px)';
        picture2.style.zIndex = count + 1;
        picture3.style.transform = 'translate3d(-500px, 0px, 0px)';
        count++;
    } else if(count%pictureShow.children.length == 1){
        picture1.style.transform = 'translate3d(500px, 0px, 0px)';
        picture2.style.transform = 'translate3d(-1000px, 0px, 0px)';
        picture3.style.transform = 'translate3d(-1000px, 0px, 0px)';
        picture3.style.zIndex = count + 1;
        count++;
    } else {
        picture1.style.transform = 'translate3d(0px, 0px, 0px)';
        picture1.style.zIndex = count + 1;
        picture2.style.transform = 'translate3d(0px, 0px, 0px)';
        picture3.style.transform = 'translate3d(-1500px, 0px, 0px)';
        count++;
    }
}, 6000)

let ps2 = document.getElementById('ps2');
    let pl = document.getElementById('pl');
    let bg = document.getElementById('bg');
    let width1 = pl.offsetWidth;
    let width2 = document.getElementById('prt').offsetWidth;
    // console.log(width1, width2);
    // console.log(bg.style);
    ps2.onmouseover = function(){
        bg.style.transform = "translate3d(-100%, 0, 0)";
        bg.style.width = width1 + 'px';
    };
    ps2.onmouseleave = () => {
        bg.style.transform = "translate3d(0, 0, 0)";
        bg.style.width = width2 + "px";
    }