const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function enhance(element) {
    const text = element.innerText.split("");
    
    element.innerText = "";
    
    text.forEach((value, index) => {
        const outer = document.createElement("span");
        outer.className = "outer";
        const inner = document.createElement("span");
        inner.className = "inner";
        inner.style.animationDelay = `${rand(0, 5000)}ms`;
        const letter = document.createElement("span");
        letter.className = "letter";
        letter.innerText = value;
        inner.appendChild(letter);    
        outer.appendChild(inner);    
        element.appendChild(outer);
    });
}

function letHimCook(event) {
    let target = event.target;
    while (!target.classList.contains("fancy"))
        target = target.parentNode;
    let outers = target.querySelectorAll(".outer");
    outers.forEach((outer, index) => {
        outer.style.transform = `translate(${rand(-30, 30)}%, ${rand(-20, 20)}%) rotate(${rand(-10, 10)}deg)`;
    });
    fadeIn(document.getElementById("scroll-down"));
    document.getElementById("main-page").classList.add("allow-scrolling");
}

function startCooking(target) {
    let letters = target.querySelectorAll('.outer > .inner > .letter');
    console.log("here we go");
    console.log(letters);
    for (let letter of letters) {
        letter.style = "background: linear-gradient(to right, salmon, orange, cyan, salmon); background-size: 1000%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: background-pan 60s ease-out infinite;";
    }
    while (!target.classList.contains("fancy"))
        target = target.parentNode;
    let outers = target.querySelectorAll(".outer");
    outers.forEach((outer, index) => {
        outer.style.transform = `translate(${rand(-30, 30)}%, ${rand(-20, 20)}%) rotate(${rand(-10, 10)}deg)`;
    });
    setInterval(() => {
        outers.forEach((outer, index) => {
            outer.style.transform = `translate(${rand(-30, 30)}%, ${rand(-20, 20)}%) rotate(${rand(-10, 10)}deg)`;
        });
    }, 1500);
    fadeIn(document.getElementById("scroll-down"));
    document.getElementById("main-page").classList.add("allow-scrolling");
}

function letHimFinish(event) {
    let target = event.target;
    while (!target.classList.contains("fancy"))
        target = target.parentNode;
    let outers = target.querySelectorAll(".outer");
    outers.forEach((outer, index) => {
        outer.style.transform = `translate(0%, 0%) rotate(0deg)`;
    });
}

function fadeIn(element) {
    element.style.opacity = 1;
}

const main_text = document.getElementById("main-text");

function hacker_effect() {
    let iteration = 0;

    let interval = setInterval(() => {
        main_text.innerText = main_text.innerText.split("").map((letter, index) => {
            if(index < iteration) {
                return main_text.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * 26)]
        }).join("");

        if (iteration >= main_text.dataset.value.length) { 
            clearInterval(interval);
            enhance(main_text);
            const fancy = document.querySelector('.fancy');
            outers = fancy.querySelectorAll('.outer');
            setTimeout(() => { startCooking(fancy); }, 500);
        }

        iteration += 1/5;
    }, 30);
}

hacker_effect();

const track = document.querySelector(".image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

let fancyElts = document.querySelectorAll('.fancy');
for (const fancy of fancyElts) {
    if (fancy === main_text) continue;
    enhance(fancy);
}

function typeText(description) {
    const targetText = description.dataset.value;
    if (description.textContent.length < targetText.length) {
        description.textContent += targetText.charAt(description.textContent.length);
        setTimeout(() => {
            typeText(description);
        }, 50);
    }
}

function letOverlayCook(event) {
    let target = event.target.firstElementChild;
    let description = event.target.querySelector('.description');
    let outers = target.querySelectorAll(".outer");
    outers.forEach((outer, index) => {
        outer.style.transform = `translate(${rand(-5, 5)}%, ${rand(-5, 5)}%) rotate(${rand(-10, 10)}deg)`;
    });
    setTimeout(() => {
        typeText(description);
    }, 50);
}

function letOverlayFinish(event) {
    let target = event.target.firstElementChild;
    let outers = target.querySelectorAll(".outer");
    outers.forEach((outer, index) => {
        outer.style.transform = `translate(0%, 0%) rotate(0deg)`;
    });
}

// Add exploding effect to overlays
const overlays = document.querySelectorAll('.overlay');
overlays.forEach(overlay => {
    overlay.addEventListener('mouseenter', letOverlayCook);
    overlay.addEventListener('mouseleave', letOverlayFinish);
});

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);