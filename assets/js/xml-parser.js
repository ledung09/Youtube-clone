const videoThumbNails = document.querySelectorAll('.video--thumbnail');
const videoTime = document.querySelectorAll('.video--time');
const videoTitle = document.querySelectorAll('.video--title');
const videoStats = document.querySelectorAll('.video--stats');

const navChannels = document.querySelectorAll(".video--channel-logo")
const navAlls = document.querySelectorAll(".main--ele")

navChannels.forEach((navChannel) => {
    navChannel.addEventListener("click", (event) => {
        window.location.href = "https://www.youtube.com/@onthicungDung"
        event.stopPropagation();
    })
})

navAlls.forEach((navAll, index) => {
    navAll.addEventListener("click", (event) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML;
            var url = xmlDoc.getElementsByTagName("url");
            window.location.href = `https://www.youtube.com/watch?v=${url[index].textContent}`
        }
    };
    xhttp.open("GET", "assets/data/data.xml", false);
    xhttp.send();
        event.stopPropagation();
    })
})

document.addEventListener("DOMContentLoaded", () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML;
            var title = xmlDoc.getElementsByTagName("title");
            var view = xmlDoc.getElementsByTagName("view");
            var upload = xmlDoc.getElementsByTagName("upload");
            var length = xmlDoc.getElementsByTagName("length");
            var url = xmlDoc.getElementsByTagName("url");

            videoThumbNails.forEach((video, index) => {video.src = `https://i.ytimg.com/vi/${url[index].textContent}/maxresdefault.jpg`})
            videoTime.forEach((video, index)=>{video.innerHTML = length[index].textContent})
            videoTitle.forEach((video, index)=>{video.innerHTML = title[index].textContent})
            videoStats.forEach((video, index)=>{video.innerHTML = `${view[index].textContent} lượt xem <strong>&#183</strong> ${upload[index].textContent}`})
        }
    };
    xhttp.open("GET", "assets/data/data.xml", false);
    xhttp.send();
});

videoThumbNails.forEach((videoThumbNail) => {
    videoThumbNail.addEventListener("mouseover", () => {videoThumbNail.style.borderRadius = "0px"})
})

videoThumbNails.forEach((videoThumbNail) => {
    videoThumbNail.addEventListener("mouseout", () => {videoThumbNail.style.borderRadius = "13px"})
})