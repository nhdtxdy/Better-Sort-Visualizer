const pages = document.querySelectorAll("section");
const mainPage = document.querySelector("#main-page");
let currentPage = 0;

document.addEventListener('wheel', (event) => {
    const direction = event.deltaY > 0 ? "down" : "up";
    const nextPage = direction === "down" ? currentPage + 1 : currentPage - 1;

    if (pages[nextPage] && mainPage.classList.contains("allow-scrolling")) {
        pages[currentPage].classList.remove("active");
        pages[nextPage].classList.add("active");
        currentPage = nextPage;
    }
    if (pages[currentPage].id == "gallery") {
        // adjust scroll behavior accordingly
    }
});