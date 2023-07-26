document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#sidebar").style.overflow = "hidden";
});

setStorage("sideState", "1")
setStorage("screenState", "4")
setStorage("defaultOpenState", "1")

const sideBtn = document.querySelector("#res--sidebar");
const sideBar = document.querySelector("#sidebar");

const sideBarEle1 = document.querySelectorAll(".sidebar1--ele")
const sideBarEle2 = document.querySelectorAll(".sidebar2--ele")
const endEle = document.querySelectorAll(".end--ele")

const mainCtn = document.querySelector("#main--content");
const pageCover = document.querySelector('#page--cover')
const textSearch = document.querySelector("#text--search");

const bodyTag = document.querySelector("body");

function getStorage(key) {
    return localStorage.getItem(key);
}

function setStorage(key, value) {
    localStorage.setItem(key, value);
    return;
}

function setModal(val) {
    stArr = []
    
    if (val ==1) stArr = ["hidden", "block", "1001", "0px", "56px", "12px", "60px"]
    else stArr = ["scroll", "none", "", "", "", "5px", "40px"]

    bodyTag.style.overflow = stArr[0];
    pageCover.style.display = stArr[1];
    sideBar.style.zIndex = stArr[2];
    sideBar.style.top = stArr[3];
    sideBar.style.marginTop = stArr[4];
    sideBar.style.paddingTop = stArr[5];
    textSearch.style.marginLeft = stArr[6];
}


function setSideState(numCol, oF) {
    realOf = oF;
    if (numCol < 0) realOf = -1;
    gridTpl = "";
    oFstyle = []
    dStyle = []

    if (Math.abs(numCol) == 4) gridTpl = "1fr 1fr 1fr 1fr";
    else if (Math.abs(numCol) == 3) gridTpl = "1fr 1fr 1fr";
    else if (Math.abs(numCol) == 2) gridTpl = "1fr 1fr";
    else if (Math.abs(numCol) == 1) gridTpl = "1fr";

    if (Math.abs(numCol) <=2) sideBar.style.display = "flex"

    if (realOf == -1) {
        oFstyle = ["hidden", "0px", "0px", "0px"]
        dStyle = ["none", "none", "none"]
    } else if (realOf == 0) {
        oFstyle = ["hidden", "64px", "5px 4px 0px 4px", "72px"]
        dStyle = ["flex", "none", "none"]
    } else {
        oFstyle = ["scroll", "212px", "12px", "236px"]
        dStyle = ["none", "flex", ""]
    }

    mainCtn.style.gridTemplateColumns = gridTpl;
    sideBar.style.overflow = oFstyle[0];
    sideBar.style.width = oFstyle[1];
    sideBar.style.padding = oFstyle[2];
    bodyTag.style.paddingLeft = oFstyle[3];
    sideBarEle1.forEach((ele)=> {ele.style.display = dStyle[0];});
    sideBarEle2.forEach((ele)=> {ele.style.display = dStyle[1];});
    endEle.forEach((ele)=> {ele.style.display = dStyle[2];});
}

setSideState(3, 1);

sideBtn.addEventListener("click", () => {
    setStorage("sideState", `${1 - Number(getStorage("sideState"))}`)
    val = getStorage("sideState")
    if (val == "1") {
        if (getStorage("screenState") == "4") setSideState(3, 1);
        else {
            setSideState(Math.abs(Number(getStorage("screenState"))), 1);
            setModal(1);
        }
    } else {
        setSideState(Number(getStorage("screenState")), 0);
        if (getStorage("screenState") != "4") {
            setModal(0);
        }
    }
})

pageCover.addEventListener('click', () => {
    setStorage("sideState", `${1 - Number(getStorage("sideState"))}`)
    setSideState(Number(getStorage("screenState")), 0);
    setModal(0);
})

window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width:1312px)").matches) {
        if (getStorage("sideState") == "1") setModal(0);
        if (getStorage("sideState") == "0") setSideState(4, 0);
        else setSideState(3, 1);
        setStorage("screenState", "4")
    }
    if (window.matchMedia("(max-width:1312px)" && getStorage("sideState") == "1").matches) setModal();
    
    if (window.matchMedia("(min-width:1096px) and (max-width: 1312px)").matches) {
        setSideState(3, 0)
        setStorage("screenState", "3")
    } else if (window.matchMedia("(min-width:792px) and (max-width: 1096px)").matches) {
        setSideState(2, 0);
        setStorage("screenState", "2")
    } else if (window.matchMedia("(min-width:700px) and (max-width: 792px)").matches) {
        setSideState(2, -1);
        setStorage("screenState", "-2")
    } else if (window.matchMedia("(max-width: 700px)").matches) {
        setSideState(1, -1);
        setStorage("screenState", "-1")
    }
})

sideBar.addEventListener('mouseover', () => {
    if (getStorage("sideState") == "1") sideBar.style.overflow = 'scroll';
    else sideBar.style.overflow = 'hidden';
})

sideBar.addEventListener('mouseleave', () => {
    sideBar.style.overflow = 'hidden'; 
})