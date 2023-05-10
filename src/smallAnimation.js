const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const main_text = document.getElementById("main-text-content");
const intro = document.getElementById("intro");
const description_text = document.querySelector(".description-text");

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
            setTimeout(() => {
                intro.classList.add("invert");
            }, 200);
            setTimeout(() => {
                description_text.classList.add("show");
            }, 1500);
        }

        iteration += 1/6;
    }, 30);
}

hacker_effect();

const homeButtons = document.getElementsByClassName("go-home");
for (const homeButton of homeButtons) {
    homeButton.addEventListener("click", () => {
        document.querySelector('#main-page').classList.remove('in');
        document.querySelector("#main-page").classList.add("out");
        setTimeout(() => {window.location.href = '../index.html';}, 500);
    });  
}

const compares = document.getElementsByClassName("compare");
for (const compare of compares) {
    compare.addEventListener('click', () => {
        document.querySelector('#main-page').classList.remove('in');
        document.querySelector("#main-page").classList.add("out");
        setTimeout(() => {window.location.href = 'compare.html';}, 500);
    });
}
