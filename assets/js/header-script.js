document.addEventListener("DOMContentLoaded", () => {
    searchBoxChange(68, 16, "none");
    underMore.style.overflow = "hidden"
});

localStorage.setItem("searchState", "0")
localStorage.setItem("accInfoState", "0")

const accLogo = document.querySelector("#acc--logo")
const accMore = document.querySelector("#acc--more")
const underMore = document.querySelector("#under--acc-info")

const moveNext = document.querySelectorAll(".move--next-icon")

const lHeader = document.querySelector("#header--left")
const rHeader = document.querySelector("#header--right")
const mHeader = document.querySelector("#header--mid")
const returnBtn = document.querySelector(".return--icon")

const searchBox = document.querySelector("#text--search")
const searchInp = document.querySelector("#search--input")
const searchIcon = document.querySelector(".search--icon")
const searchBtn = document.querySelector("#header--trigger")

function searchBoxChange(mL, pL, style) {
    searchBox.style.marginLeft = `${mL}px`; // 68 - 40
    searchInp.style.paddingLeft = `${pL}px`; // 16 - 44    
    searchIcon.style.display = style; // none - block
}

function headerDisplay(lH, rH, mH) {
    lHeader.style.display  = lH;
    rHeader.style.display  = rH;
    mHeader.style.display  = mH;
}

window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 565px)").matches) {
        headerDisplay("flex", "flex", "flex");
        returnBtn.style.display ="none";
    } else {
        if (localStorage.getItem("searchState") == "0") headerDisplay("flex", "flex", "none");
        else {
            headerDisplay("none", "none", "flex");
            returnBtn.style.display ="inline-block";
        }
    }
})

accLogo.addEventListener('click', (event) => {
    if (localStorage.getItem("accInfoState") == "0") {
        accMore.style.display = "block"
    } else accMore.style.display = "none";
    accMore.style.transition = "display 0.1s"
    localStorage.setItem("accInfoState", `${1 - Number(localStorage.getItem("accInfoState"))}`)
    
    close_all_tag();
    event.stopPropagation();
})

accMore.addEventListener('click', (event) => {
    event.stopPropagation();
})

underMore.addEventListener("click", () => {
    accMore.style.display = "none";
    accMore.style.transition = "display 0.1s"
    localStorage.setItem("accInfoState", "0")
})

searchInp.addEventListener('focusin', () => {searchBoxChange(40, 44, "block");})

searchInp.addEventListener('focusout', () => {searchBoxChange(68, 16, "none");})

searchBtn.addEventListener("click", () => {
    headerDisplay("none", "none", "flex");
    returnBtn.style.display ="inline-block";
    localStorage.setItem("searchState", "1")
})

returnBtn.addEventListener("click", () => {
    headerDisplay("flex", "flex", "none");
    mHeader.style.transition = "display 0.05s";
    localStorage.setItem("searchState", "0")
})

underMore.addEventListener("mouseover", () => {
    underMore.style.overflow = "scroll"
    moveNext.forEach((icon) => {
        icon.style.marginRight = "-8px";
    })

})

underMore.addEventListener("mouseleave", () => {
    underMore.style.overflow = "hidden"
    moveNext.forEach((icon) => {
        icon.style.marginRight = "0px";
    })
})