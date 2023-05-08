const text = document.getElementById("text");

function fadeInText() {
  console.log("scroll");
  let textPosition = text.getBoundingClientRect().top;
  let screenPosition = window.innerHeight / 1.3;

  if (textPosition < screenPosition) {
    text.style.opacity = "1";
  }
}

window.addEventListener("scroll", fadeInText);
