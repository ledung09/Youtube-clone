localStorage.setItem("infoState", "0")

const videoSts = document.querySelectorAll(".video--setting")
const infoBtns = document.querySelectorAll('.more--setting');
const infoTags = document.querySelectorAll('.video--setting');
const infoAlls = document.querySelectorAll(".video--info-row2")

function setNthChild(n) {
    videoSts.forEach((videoSt, index) => {
        if ((index + 1) % n == 0) videoSt.style.right = "0px";
        else videoSt.style.right = "";
    })
}

function editNthchild() {
    if (window.matchMedia("(max-width: 700px)").matches) setNthChild(1);
    else if (window.matchMedia("(max-width: 1096px)").matches) setNthChild(2);
    else if (window.matchMedia("(max-width: 1424px)").matches) setNthChild(3);
    else {
        if (localStorage.getItem("sideState") == "1") setNthChild(3);
        else setNthChild(4);
    }
}

editNthchild();

window.addEventListener("resize", () => editNthchild())

window.addEventListener('click', (event) => {
    close_all_tag();
    infoBtns.forEach((infoBtn) => {infoBtn.style.opacity = 0;})
    
    if (localStorage.getItem("accInfoState") == "1") {
        accMore.style.display = "none"
        accMore.style.transition = "display 0.1s"
        localStorage.setItem("accInfoState", "0")
    }
})

function close_all_tag() {
    infoTags.forEach((tag) => {tag.style.display= "none";})
}

infoAlls.forEach((infoAll, index) => {
    infoAll.addEventListener("mouseover", () => {infoBtns[index].style.opacity = 1;})

    infoAll.addEventListener("mouseleave", () => {
        if (localStorage.getItem("infoState") == "1") infoBtns[index].style.opacity = 1;
        else infoBtns[index].style.opacity = 0;
    })
});

infoBtns.forEach((infoBtn, index) => {
    infoBtn.addEventListener("click", (event) => {
        if (localStorage.getItem("accInfoState") == "1") {
            accMore.style.display = "none"
            accMore.style.transition = "display 0.1s"
            localStorage.setItem("accInfoState", "0")
        }
        
        if (localStorage.getItem("infoState") == "0") {
            infoTags[index].style.display = "flex";
            infoTags[index].style.transition = "display 0.1s";
            localStorage.setItem("infoState", "1")
        } else {
            close_all_tag();
            localStorage.setItem("infoState", "0")
        };
        event.stopPropagation();
    })
});
