const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function enhance(id) {
    const element = document.getElementById(id);
    const text = element.innerText.split("");
    
    element.innerText = "";
    
    text.forEach((value, index) => {
        const outer = document.createElement("span");
        outer.className = "outer";
        const inner = document.createElement("span");
        inner.className = "inner";
        inner.style.animationDelay = `${rand(-5000, 0)}ms`;
        const letter = document.createElement("span");
        letter.className = "letter";
        letter.innerText = value;
        letter.style.textShadow = "1px 1px 1px gray";
        inner.appendChild(letter);    
        
        outer.appendChild(inner);    
        
        element.appendChild(outer);
    });
}

enhance("main-text");
const fancy = document.querySelector('.fancy');

fancy.addEventListener('mouseenter', letHimCook);
fancy.addEventListener('mouseleave', letHimFinish);

const outers = fancy.querySelectorAll('.outer');

function letHimCook() {
    outers.forEach((outer, index) => {
        outer.style.transform = `translate(${rand(-30, 30)}%, ${rand(-30, 30)}%) rotate(${rand(-10, 10)}deg)`;
    });
    fadeIn(document.getElementById("scroll-down"));
}

function letHimFinish() {
    outers.forEach((outer, index) => {
        outer.style.transform = `translate(0%, 0%) rotate(0deg)`;
    });
}

function fadeIn(element) {
    element.style.opacity = 1;
}